"""Serve the real exported Casa UI with fictional, read-only screenshot data.

python3 docs/casa-agent/src/demo-server.py /path/to/casa-agent/web/out
No application imports, credentials, model calls, or database connections.
"""
import http.server
import json
from pathlib import Path
import sys
from urllib.parse import urlparse, parse_qs, unquote

ROOT = Path(sys.argv[1]).resolve()
SOP = """# Arrival checklist

## Before the visit

Confirm the property in the work request. This sheet applies to Casa Azul only.

## On arrival

- Check the work request against the property name.
- Photograph any existing damage before starting.
- Report a missing supply item before buying a replacement.

## When to ask the manager

Do not admit an unexpected visitor. Ask the manager to confirm access.

Purchases above the contact's spending limit need approval. A previous approval
does not authorize a new purchase.

## After the visit

Send a short completion note and report anything that needs a follow-up.

*Fictional procedure for this portfolio demonstration.*
"""
STATE = {
    "contacts": [
        {"id": "demo-rui", "slug": "rui", "name": "Rui Silva", "enabled": True,
         "roles": ["maintenance"], "properties": ["casa-azul", "casa-jardim"],
         "brief": "Regular caretaker for both houses. Confirm the house before giving property-specific instructions.",
         "notes": "Fictional contact for the portfolio demonstration.",
         "rules": {"language": "European Portuguese", "money_threshold_eur": 75}},
        {"id": "demo-ana", "slug": "ana", "name": "Ana Costa", "enabled": True,
         "roles": ["cleaner"], "properties": ["casa-azul"],
         "brief": "Handles changeover cleaning at Casa Azul.",
         "rules": {"language": "European Portuguese", "money_threshold_eur": 25}},
        {"id": "demo-tomas", "slug": "tomas", "name": "Tomas Reis", "enabled": False,
         "roles": ["pool-contractor"], "properties": ["casa-jardim"],
         "brief": "Pool contractor. Awaiting approved operating instructions.", "rules": {"always_escalate": True}},
    ],
    "roles": [{"id": "role-"+slug, "slug": slug, "name": name, "description": desc}
              for slug, name, desc in [
                  ("maintenance", "Maintenance", "Routine checks and approved maintenance procedures."),
                  ("cleaner", "Cleaner", "Arrival, cleaning and completion checks."),
                  ("pool-contractor", "Pool contractor", "Pool maintenance by an appointed specialist.")]],
    "properties": [{"id": "property-"+slug, "slug": slug, "name": name, "notes": "Fictional property for the portfolio demonstration."}
                   for slug, name in [("casa-azul", "Casa Azul"), ("casa-jardim", "Casa Jardim")]],
    "documents": [
        {"path": "sop/arrival-checklist.md", "title": "Arrival checklist", "roles": ["maintenance", "cleaner"], "properties": ["casa-azul"], "indexed": True, "authority": "canonical"},
        {"path": "sop/visit-report.md", "title": "Visit completion report", "roles": ["maintenance"], "properties": ["casa-azul", "casa-jardim"], "indexed": True, "authority": "canonical"},
    ],
    "proposals": [{"id": "demo-proposal", "contact_id": "demo-ana", "title": "Restocking linen after a changeover", "kind": "addition",
                   "proposed_text": "After each changeover at Casa Azul, record the remaining clean linen sets. Tell the manager if fewer than two complete sets remain. Do not order replacements without approval.",
                   "evidence": "For Casa Azul, please count the clean sets after each changeover and let me know if we have fewer than two. Ask me before ordering more.",
                   "rationale": "A repeatable stock check from the manager's answer. Purchase permission stays with the manager.",
                   "roles": ["cleaner"], "properties": ["casa-azul"]}],
    "needs_edit": [],
    "escalations": [{"id": "demo-escalation", "contact_id": "demo-rui", "question": "A replacement part costs EUR 120. Can I order it for Casa Azul?", "status": "open"}],
    "files": {"transcripts": []},
}

class Handler(http.server.SimpleHTTPRequestHandler):
    def reply(self, body, content_type="application/json", status=200):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        url = urlparse(self.path)
        if url.path == "/admin/api/state":
            return self.reply(json.dumps(STATE).encode())
        if url.path == "/admin/api/file":
            path = parse_qs(url.query).get("path", [""])[0]
            return self.reply(json.dumps({"path": path, "body": SOP}).encode())
        if not url.path.startswith("/admin/"):
            return self.reply(b"Not found", "text/plain", 404)
        path = (ROOT / unquote(url.path.removeprefix("/admin/"))).resolve()
        if not path.is_relative_to(ROOT):
            return self.reply(b"Not found", "text/plain", 404)
        if path.is_dir():
            path /= "index.html"
        if not path.is_file():
            return self.reply(b"Not found", "text/plain", 404)
        data = path.read_bytes()
        if path.suffix == ".html":
            data = data.replace(b"__TOKEN__", b"portfolio-demo")
        self.reply(data, self.guess_type(str(path)))

    def do_POST(self):
        self.reply(b'{"error":"Read-only portfolio demo"}', status=405)

    do_DELETE = do_POST

if __name__ == "__main__":
    assert ROOT.is_dir(), "Pass the Casa web/out directory"
    http.server.ThreadingHTTPServer(("127.0.0.1", 8791), Handler).serve_forever()
