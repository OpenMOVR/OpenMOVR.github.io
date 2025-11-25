#!/usr/bin/env python3
"""
Simple HTTP server to serve the data dictionary viewers locally.
This resolves CORS issues when opening HTML files directly.

Usage:
    python3 start_server.py

Then open: http://localhost:8080/index.html
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8080

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow local file access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    # Change to the directory containing the HTML files
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"🚀 MDA MOVR Data Dictionary Tools")
        print(f"📡 Server running at: http://localhost:{PORT}")
        print(f"🏠 Navigation Hub: http://localhost:{PORT}/index.html")
        print(f"📊 Data Dictionary: http://localhost:{PORT}/data_dictionary_viewer.html")
        print(f"🔗 Vendor Mapping: http://localhost:{PORT}/vendor_mapping_viewer.html")
        print(f"\n💡 Press Ctrl+C to stop the server")
        
        # Automatically open the browser
        webbrowser.open(f'http://localhost:{PORT}/index.html')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n✅ Server stopped.")