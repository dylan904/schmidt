"""Serve the existing React build with fictional, memory-only API fixtures.

Usage: python3 demo-server.py /absolute/path/to/app-aoai-chatGPT/static
No Azure, model, credentials, source-app imports, or database access.
"""
import json
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

STATIC = Path(sys.argv[1]).resolve()
MODELS = [
    dict(name="gpt-4o", label="GPT-4o", short_label="4o", blurb="Great for most tasks", api_version="2025-04-01-preview", reasoning=False, generates_title=True),
    dict(name="o4-mini", label="o4-mini", short_label="o4-mini", blurb="Fastest at advanced reasoning", api_version="2025-04-01-preview", reasoning=True, generates_title=False),
]
ASSISTANTS = [dict(name="BIM SOPs", model="o4-mini", instructions="Use the fictional demonstration handbook. Ask the coordinator when the answer is not documented.", icon=None, description="Find procedures in the BIM reference manual. Fictional demonstration data.", tools=[dict(type="file_search", vector_store_ids=["demo-vector-store"])])]
CONVERSATIONS = [dict(id="demo-checklist", title="Model handoff checklist", createdAt="2026-09-07T10:00:00Z", model="o4-mini", assistant="BIM SOPs")]
MESSAGES = [
    dict(id="demo-user", role="user", content="What should I check before sharing a coordination model?", createdAt="2026-09-07T10:00:00Z"),
    dict(id="demo-answer", role="assistant", content="**Demonstration response**\n\nThe fictional BIM handbook describes these checks before a coordination handoff:\n\n1. Confirm the agreed file naming and revision.\n2. Check that linked models use the agreed coordinates.\n3. Record unresolved issues for the coordinator.\n\n**Example source:** Demo BIM handbook, page 12.\n\nThis is a scripted fixture, not a live model answer. Confirm the current approved procedure before using it on a project.", createdAt="2026-09-07T10:00:01Z"),
]

class Handler(SimpleHTTPRequestHandler):
    def send_json(self, value, status=200):
        body = json.dumps(value).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        route = urlsplit(self.path).path
        if route == "/history/list" and int(parse_qs(urlsplit(self.path).query).get("offset", ["0"])[0]) > 0:
            return self.send_json([])
        fixtures = {
            "/models": MODELS,
            "/assistants": ASSISTANTS,
            "/.auth/me": [],
            "/history/ensure": {"message": "Demo history available"},
            "/history/list": CONVERSATIONS,
            "/frontend_settings": {"auth_enabled": False, "feedback_enabled": False, "sanitize_answer": True, "oyd_enabled": False, "ui": {"title": "Azure OpenAI Assistant", "logo": "/assets/Contoso-ff70ad88.svg", "chat_logo": "/assets/Contoso-ff70ad88.svg", "chat_title": "Ask about your documentation", "chat_description": "Portfolio demo: fictional procedures and conversations", "show_share_button": False, "show_chat_history_button": True}},
        }
        if route in fixtures:
            return self.send_json(fixtures[route])
        if route == "/":
            html = (STATIC / "index.html").read_text().replace("{{ title }}", "Azure OpenAI Assistant | Fixture demo").replace("{{ favicon }}", "/favicon.ico")
            body = html.encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        elif route.startswith("/assets/") or route == "/favicon.ico":
            super().do_GET()
        else:
            self.send_error(404)

    def do_POST(self):
        # Consume requests without persisting data or forwarding them anywhere.
        self.rfile.read(int(self.headers.get("Content-Length", "0")))
        route = urlsplit(self.path).path
        if route == "/history/read":
            return self.send_json({"messages": MESSAGES})
        if route in ("/select_model", "/select_assistant"):
            return self.send_json({"message": "Demo selection acknowledged; no backend inference"})
        self.send_json({"error": "This capture adapter does not generate answers or modify records."}, 405)

    def do_DELETE(self):
        self.send_json({"error": "Demo is read-only"}, 405)

if __name__ == "__main__":
    assert (STATIC / "index.html").is_file(), "Pass the source app's static directory"
    ThreadingHTTPServer(("127.0.0.1", 8794), partial(Handler, directory=str(STATIC))).serve_forever()
