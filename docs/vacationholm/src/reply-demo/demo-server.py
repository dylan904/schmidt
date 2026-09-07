"""Serve the actual ConversationView with a fictional, read-only inquiry fixture."""
import http.server
import json
import os
from pathlib import Path
from urllib.parse import urlparse

HERE = Path(__file__).resolve().parent
ROOT = HERE / "dist"
FIXTURE = json.loads((HERE / "fixtures.json").read_text())
INQUIRY = FIXTURE["inquiry_id"]


class Handler(http.server.SimpleHTTPRequestHandler):
    def send(self, body, content_type="application/json", status=200):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def json(self, value, status=200):
        self.send(json.dumps(value).encode(), status=status)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == f"/api/messages/inquiries/{INQUIRY}":
            return self.json(FIXTURE["conversation"])
        if path == f"/api/inquiries/{INQUIRY}/outcome":
            return self.json(FIXTURE["outcome"])
        if path == "/":
            path = "/index.html"
        file = (ROOT / path.removeprefix("/")).resolve()
        if not file.is_relative_to(ROOT) or not file.is_file():
            return self.send(b"Not found", "text/plain", 404)
        return self.send(file.read_bytes(), self.guess_type(str(file)))

    def do_PATCH(self):
        path = urlparse(self.path).path
        if path.startswith("/api/messages/ai-suggestions/"):
            return self.json({"success": True, "persisted": False, "fixture": "read-only"})
        return self.reject_write()

    def reject_write(self):
        self.json({"error": "Read-only fictional portfolio fixture"}, 405)

    do_POST = reject_write
    do_PUT = reject_write
    do_DELETE = reject_write

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    if not ROOT.is_dir():
        raise SystemExit("Run node build.mjs first")
    port = int(os.environ.get("REPLY_DEMO_PORT", "8796"))
    http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
