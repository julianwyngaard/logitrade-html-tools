#!/bin/bash
# ABOUTME: Main build script for Julian's HTML Tools
# ABOUTME: Runs all generators to produce index.html and colophon.html

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$ROOT_DIR"

echo "Building Tools..."

echo "  Generating index.html..."
node scripts/build-index.js

echo "  Generating colophon.html..."
node scripts/build-colophon.js

echo "Done!"
