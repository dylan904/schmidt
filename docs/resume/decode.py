"""Decode the Enhancv resume's page content streams back to text + positions.

Text is drawn one glyph at a time: Identity-H 2-byte codes inside PDF literal
strings, positioned by an initial Tm and successive relative Td. ToUnicode
CMaps map the subset glyph ids back to characters.
"""
import re, sys
from pypdf import PdfReader

SRC = '/Users/devbydylan/Downloads/DylanMaxeyResume 9-26.pdf'

def tounicode(font):
    if '/ToUnicode' not in font: return {}
    data = font['/ToUnicode'].get_object().get_data().decode('latin-1')
    m = {}
    for blk in re.findall(r'beginbfchar(.*?)endbfchar', data, re.S):
        for s, d in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>', blk):
            m[int(s,16)] = ''.join(chr(int(d[i:i+4],16)) for i in range(0,len(d),4))
    for blk in re.findall(r'beginbfrange(.*?)endbfrange', data, re.S):
        for lo, hi, d in re.findall(r'<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>', blk):
            lo, hi, d = int(lo,16), int(hi,16), int(d,16)
            for c in range(lo, hi+1): m[c] = chr(d + c - lo)
    return m

def fontinfo(page):
    cmaps, wide = {}, {}
    for k, v in page['/Resources'].get('/Font', {}).items():
        f = v.get_object()
        cmaps['/'+k.lstrip('/')] = tounicode(f)
        wide['/'+k.lstrip('/')] = f.get('/Subtype') == '/Type0'
    return cmaps, wide

OCT = {'n':10,'r':13,'t':9,'b':8,'f':12}
def unescape(s):
    """PDF literal string body -> bytes."""
    out, i = bytearray(), 0
    while i < len(s):
        c = s[i]
        if c != 0x5c: out.append(c); i += 1; continue
        i += 1
        if i >= len(s): break
        c = chr(s[i])
        if c in OCT: out.append(OCT[c]); i += 1
        elif c in '()\\': out.append(ord(c)); i += 1
        elif c.isdigit():
            j = i
            while j < len(s) and j < i+3 and chr(s[j]).isdigit(): j += 1
            out.append(int(s[i:j], 8) & 0xFF); i = j
        elif c in '\r\n':
            i += 1
            if c == '\r' and i < len(s) and s[i] == 0x0a: i += 1
        else: out.append(s[i]); i += 1
    return bytes(out)

# one regex over the operators we care about
OPS = re.compile(
    rb'BT|ET'
    rb'|\((?:\\.|[^\\()])*\)\s*Tj'
    rb'|/([A-Za-z0-9+._-]+)\s+([\d.]+)\s+Tf'
    rb'|([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+Tm',
    re.S)

def blocks(stream, cmaps, wide):
    out, cur = [], None
    for m in OPS.finditer(stream):
        t = m.group(0)
        if t == b'BT':
            cur = dict(start=m.start(), text='', font=None, size=None, x=None, y=None)
        elif t == b'ET':
            if cur is not None:
                cur['end'] = m.end(); out.append(cur); cur = None
        elif cur is None:
            continue
        elif t.endswith(b'Tj'):
            body = unescape(t[t.index(b'(')+1 : t.rindex(b')')])
            cm = cmaps.get(cur['font'], {})
            if wide.get(cur['font']):
                codes = [int.from_bytes(body[i:i+2],'big') for i in range(0, len(body)-1, 2)]
            else:
                codes = list(body)
            cur['text'] += ''.join(cm.get(c, '�') for c in codes)
        elif m.group(1) is not None:
            cur['font'] = '/' + m.group(1).decode(); cur['size'] = float(m.group(2))
        else:
            cur['x'] = float(m.group(7)); cur['y'] = float(m.group(8))
    return out

def page_blocks(pageno=0):
    r = PdfReader(SRC); page = r.pages[pageno]
    cmaps, wide = fontinfo(page)
    stream = page['/Contents'].get_object().get_data()
    return stream, blocks(stream, cmaps, wide)

if __name__ == '__main__':
    needle = sys.argv[1] if len(sys.argv) > 1 else 'linkedin'
    for pno in (0, 1):
        stream, bs = page_blocks(pno)
        hits = [b for b in bs if needle.lower() in b['text'].lower()]
        print('page %d: %d bytes, %d blocks, %d hits' % (pno+1, len(stream), len(bs), len(hits)))
        for b in hits:
            print('  [%d..%d] %s %.1fpt Tm(%s,%s)\n     %r'
                  % (b['start'], b['end'], b['font'], b['size'] or 0, b['x'], b['y'], b['text']))
