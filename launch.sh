#!/bin/bash

# MOVR 2.0 Website Launch Script
# This script starts a local development server to preview the website

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🚀 Starting MOVR 2.0 website with Python 3..."
    echo "📍 Website will be available at: http://localhost:8000"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 Starting MOVR 2.0 website with Python 2..."
    echo "📍 Website will be available at: http://localhost:8000"
    echo "⏹️  Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. Please install Python to run the local server."
    echo "💡 Alternative: Open index.html directly in your web browser"
fi
