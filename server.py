#!/usr/bin/env python3
"""
Simple HTTP server with CORS headers enabled
Used to serve the portfolio website locally without CORS restrictions
"""

import http.server
import socketserver
from http.server import SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == "__main__":
    PORT = 8000
    Handler = CORSRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print("CORS headers enabled")
        httpd.serve_forever()