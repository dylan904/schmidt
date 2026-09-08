"""Patch the Enhancv resume in place: swap the LinkedIn URL for the portfolio,
and correct the Destination Home bullet.

Text is re-emitted using the glyph ids and widths already embedded in the PDF's
Inter subsets, so no new font is added and the result is metrically identical to
what Enhancv produced. Two coordinate systems are in play: text draws under a
0.63431 CTM, the contact icons under 0.24.
"""
import re
from pypdf import PdfReader, PdfWriter
from pypdf.generic import DecodedStreamObject, NameObject
from decode import SRC, tounicode, page_blocks

TEXT_S = 0.63431187          # CTM scale for text
ICON_S = 0.23999999          # CTM scale for the contact-row icons

def parse_w(W):
    """CIDFont /W array -> {glyph code: width/1000em}."""
    out, i = {}, 0
    while i < len(W):
        c = int(W[i])
        nxt = W[i+1]
        if hasattr(nxt, '__len__') and not isinstance(nxt, (str, bytes)):
            for j, w in enumerate(nxt): out[c+j] = float(w)
            i += 2
        else:
            for cc in range(c, int(nxt)+1): out[cc] = float(W[i+2])
            i += 3
    return out

reader = PdfReader(SRC)
page = reader.pages[0]
FONTS = page['/Resources']['/Font']

def font_tables(key):
    f = FONTS[key].get_object()
    cm = tounicode(f)
    rev = {}
    for code, ch in sorted(cm.items()):
        rev.setdefault(ch, code)
    desc = f['/DescendantFonts'][0].get_object()
    return rev, parse_w(desc['/W']), float(desc.get('/DW', 1000))

REV7, W7, DW7 = font_tables('/F7')   # Inter-Bold
REV8, W8, DW8 = font_tables('/F8')   # Inter-Regular
FONT = {'/F7': (REV7, W7, DW7), '/F8': (REV8, W8, DW8)}

raw = page['/Contents'].get_object().get_data()

# The em dash has a broken ToUnicode entry (maps to U+0000), so take the glyph
# id straight from the run it already appears in rather than trusting the map.
_lit = re.compile(rb'\((?:\\.|[^\\()])*\)\s*Tj', re.S)
from decode import unescape
_first = _lit.findall(raw[129518:131240])
_b = unescape(_first[1][_first[1].index(b'(')+1:_first[1].rindex(b')')])
EMDASH = int.from_bytes(_b[:2], 'big')
REV8['—'] = EMDASH

def codes(text, key):
    rev, _, _ = FONT[key]
    out = []
    for ch in text:
        if ch not in rev: raise KeyError('%r not in %s subset' % (ch, key))
        out.append(rev[ch])
    return out

def width(text, key, size):
    _, w, dw = FONT[key]
    return sum(w.get(c, dw) for c in codes(text, key)) * size / 1000.0

def escape(cs):
    return b''.join(b'\\%03o\\%03o' % (c >> 8, c & 0xFF) for c in cs)

def actual_text(s):
    """Marked-content span carrying the real text.

    Some subset glyphs have a broken ToUnicode entry (the em dash maps to
    U+0000), so the glyph renders but extracts as nothing. Enhancv works around
    this the same way. Without it the bullet's dash is invisible to any ATS
    reading the file as text.
    """
    b = b'\xfe\xff' + s.encode('utf-16-be')
    return b'/Span <<\n/ActualText (%s)\n>> BDC\n' % b''.join(b'\\%03o' % c for c in b)

def emit(runs, x, y, size):
    """runs = [(text, fontkey)] on one baseline. Returns content-stream bytes."""
    out = [b'BT\n']
    dx = 0.0
    for i, (text, key) in enumerate(runs):
        if not text: continue
        out.append(b'%s %g Tf\n' % (key.encode(), size))
        if i == 0:
            out.append(b'1 0 0 -1 %.6f %g Tm\n' % (x, y))
        else:
            out.append(b'%.6f 0 Td\n' % dx)
        out.append(actual_text(text))
        out.append(b'(%s) Tj\nEMC\n' % escape(codes(text, key)))
        dx = width(text, key, size)
    out.append(b'ET\n')
    return b''.join(out)

# ---------------------------------------------------------------- edit 1: URL
URL_OLD  = (93526, 94631)
URL_NEW  = 'https://devbydylan.com'
URL_X, URL_Y, URL_SZ = 349.0, 118.0, 12.0
old_w = width('https://www.linkedin.com/in/devbydylan', '/F7', URL_SZ)
new_w = width(URL_NEW, '/F7', URL_SZ)
shift = (old_w - new_w) * TEXT_S          # in page points
print('URL  old %.2fpt  new %.2fpt  -> shift trailing items left %.2fpt'
      % (old_w * TEXT_S, new_w * TEXT_S, shift))

# ------------------------------------------------------------- edit 2: bullet
BULLET = (129019, 140732)
BX, BY0, BSZ, LEAD = 57.328125, 586.0, 13.0, 16.0
COL = 298.5 / TEXT_S                       # column width in text units
BOLD = 'Destination Home'
BODY = (' — Built an AI-powered relocation assistant using Angular, .NET, OpenAI, '
        'DuckDB, and Overture Maps; citation-grounded conversational intake and '
        'fair-housing-aware neighborhood scoring enforced by tests, not policy. '
        'An evaluation harness picked the shipping model on measurement, 92% against '
        '79% across 12 runs; tracing live call sites cut Google API cost 93%, under '
        'a cent per session.')

def wrap():
    """Greedy wrap; first line carries the bold name. -> [[(text,font)],...]"""
    lines, cur, curw = [], [(BOLD, '/F7')], width(BOLD, '/F7', BSZ)
    for word in BODY.split(' '):
        if not word: continue
        piece = (' ' if cur else '') + word
        ww = width(piece, '/F8', BSZ)
        if cur and curw + ww > COL:
            lines.append(cur)
            cur, curw = [(word, '/F8')], width(word, '/F8', BSZ)
        else:
            if cur and cur[-1][1] == '/F8':
                cur[-1] = (cur[-1][0] + piece, '/F8')
            else:
                cur.append((piece, '/F8'))
            curw += ww
    if cur: lines.append(cur)
    return lines

lines = wrap()
print('\nbullet wraps to %d lines (original was 6):' % len(lines))
for i, l in enumerate(lines):
    w = sum(width(t, k, BSZ) for t, k in l)
    print('  %d  %6.1fpt  %s' % (i + 1, w * TEXT_S, ''.join(t for t, _ in l)))
if len(lines) != 6:
    raise SystemExit('ABORT: %d lines would push the rest of the page down' % len(lines))

bullet_bytes = b''.join(emit(l, BX, BY0 + i * LEAD, BSZ) for i, l in enumerate(lines))
url_bytes = emit([(URL_NEW, '/F7')], URL_X, URL_Y, URL_SZ)

# --------------------------------------------- edit 3: close the gap the URL left
LOC   = (94632, 95134)                     # "Jacksonville, FL"
PIN   = (5023, 5128)                       # the map-pin icon
loc_old = raw[LOC[0]:LOC[1]]
m = re.search(rb'1 0 0 -1 ([\d.]+) 118 Tm', loc_old)
loc_new = loc_old[:m.start(1)] + (b'%.6f' % (float(m.group(1)) - shift / TEXT_S)) + loc_old[m.end(1):]

pin_old = raw[PIN[0]:PIN[1]]
def dedent_pin(b):
    dx = shift / ICON_S
    b = re.sub(rb'q\s+([\d.]+) ', lambda mm: b'q ' + b'%.4f ' % (float(mm.group(1)) - dx), b, count=1)
    return re.sub(rb'cm', b'cm', b).replace(b'1591.05725', b'%.5f' % (1591.05725 - dx))
pin_new = dedent_pin(pin_old)
assert pin_new != pin_old, 'pin icon not shifted'

# ------------------------------------------------------------------ apply, save
edits = sorted([(BULLET[0], BULLET[1], bullet_bytes),
                (URL_OLD[0], URL_OLD[1], url_bytes),
                (LOC[0], LOC[1], loc_new),
                (PIN[0], PIN[1], pin_new)], reverse=True)
out = raw
for lo, hi, new in edits:
    out = out[:lo] + new + out[hi:]
print('\nstream %d -> %d bytes' % (len(raw), len(out)))

stream = DecodedStreamObject()
stream.set_data(out)
writer = PdfWriter(clone_from=SRC)
writer.pages[0][NameObject('/Contents')] = writer._add_object(stream)
DEST = '/Users/devbydylan/Downloads/DylanMaxeyResume 9-26 updated.pdf'
with open(DEST, 'wb') as fh: writer.write(fh)
print('wrote', DEST)
