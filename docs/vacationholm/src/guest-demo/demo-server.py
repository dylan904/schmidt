"""Read-only fixture server for the real guest search and inquiry components."""
import http.server, json, os
from pathlib import Path
from urllib.parse import urlparse

HERE=Path(__file__).resolve().parent; ROOT=HERE/".build"; DATA=json.loads((HERE/"fixtures.json").read_text()); LISTINGS=Path(os.environ.get("LISTINGS_REPO","/Users/devbydylan/Documents/projects/listings"))
COLORS={"lagoon":("#397f78","#b8ddd6"),"cliff":("#526e87","#cbd9e6"),"garden":("#587b55","#d6e5cf")}
def art(name):
    dark,light=COLORS.get(name,COLORS["lagoon"])
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="{light}"/><circle cx="930" cy="170" r="85" fill="#f6d780"/><path d="M0 530L270 310 500 500 700 270 1200 550V800H0Z" fill="{dark}"/><path d="M350 560V365h390v195" fill="#fffaf0"/><path d="M310 380l235-160 235 160" fill="#a85d45"/><rect x="420" y="430" width="90" height="130" fill="#315d62"/><rect x="585" y="415" width="95" height="80" fill="#9ed2dd"/><rect x="0" y="670" width="1200" height="130" fill="#77a9a1"/><rect x="26" y="730" width="375" height="42" rx="8" fill="rgba(18,60,58,.9)"/><text x="46" y="758" fill="white" font-family="Arial,sans-serif" font-size="20">Illustrative property image · fictional fixture</text></svg>'''.encode()
class Handler(http.server.SimpleHTTPRequestHandler):
    def reply(self,body,ctype="application/json",status=200):
        self.send_response(status); self.send_header("Content-Type",ctype); self.send_header("Cache-Control","no-store"); self.send_header("Content-Length",str(len(body))); self.end_headers(); self.wfile.write(body)
    def do_GET(self):
        u=urlparse(self.path); p=u.path
        if p=="/api/search": return self.reply(json.dumps({"listings":DATA["search"]}).encode())
        if p=="/api/listings/demo-lagoon/public": return self.reply(json.dumps({"listing":DATA["listing"]}).encode())
        if p=="/api/calculate-rates": return self.reply(json.dumps(DATA["quote"]).encode())
        if p=="/api/check-availability": return self.reply(json.dumps(DATA["availability"]).encode())
        if p=="/api/islands": return self.reply('{"islands":["São Miguel","Terceira","Faial"]}'.encode())
        if p.startswith("/icons/"):
            f=(LISTINGS/"public"/p.removeprefix("/")).resolve()
            if f.is_relative_to(LISTINGS/"public") and f.is_file(): return self.reply(f.read_bytes(),self.guess_type(str(f)))
        if p.startswith("/fixture/"): return self.reply(art(Path(p).stem),"image/svg+xml")
        if p=="/": p="/index.html"
        f=(ROOT/p.removeprefix("/")).resolve()
        if not f.is_relative_to(ROOT) or not f.is_file(): return self.reply(b"Not found","text/plain",404)
        return self.reply(f.read_bytes(),self.guess_type(str(f)))
    def reject(self): self.reply(b'{"error":"Read-only fictional portfolio fixture"}',status=405)
    do_POST=reject; do_PUT=reject; do_PATCH=reject; do_DELETE=reject
if __name__=="__main__":
    http.server.ThreadingHTTPServer(("127.0.0.1",8796),Handler).serve_forever()
