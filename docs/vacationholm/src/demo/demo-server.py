"""Serve the bundled insight components with fictional read-only fixtures."""
import http.server
import json
from pathlib import Path
from urllib.parse import urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE / "dist"
FIXTURES = json.loads((HERE / "fixtures.json").read_text())
ENDPOINTS = {
    "/api/host/insights/questions": FIXTURES["questions"],
    "/api/host/insights/funnel": FIXTURES["funnel"],
    "/api/host/insights/changes": FIXTURES["changes"],
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def send(self, body, content_type="application/json", status=200):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = urlparse(self.path).path
        if path in ENDPOINTS:
            return self.send(json.dumps(ENDPOINTS[path]).encode())
        if path == "/":
            path = "/index.html"
        file = (ROOT / path.removeprefix("/")).resolve()
        if not file.is_relative_to(ROOT) or not file.is_file():
            return self.send(b"Not found", "text/plain", 404)
        return self.send(file.read_bytes(), self.guess_type(str(file)))

    def reject_write(self):
        self.send(b'{"error":"Read-only fictional portfolio fixture"}', status=405)

    do_POST = reject_write
    do_PUT = reject_write
    do_PATCH = reject_write
    do_DELETE = reject_write


if __name__ == "__main__":
    if not ROOT.is_dir():
        raise SystemExit("Run node build.mjs first")
    http.server.ThreadingHTTPServer(("127.0.0.1", 8794), Handler).serve_forever()
