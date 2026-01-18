# JSON Formatter

A browser-based tool for formatting, validating, and minifying JSON data.

## Features

- **Format**: Pretty-print JSON with 2-space indentation
- **Minify**: Compress JSON to a single line
- **Validate**: Check JSON syntax and display clear error messages
- **Share**: Generate shareable URLs with JSON embedded (up to 1500 chars)
- **Copy**: One-click copy to clipboard

## Usage

1. Paste or type JSON into the text area
2. Click "Format" to pretty-print or "Minify" to compress
3. Use "Share URL" to create a link with your JSON embedded

## URL Parameters

- `?json=<encoded-json>` - Pre-populate the editor with URL-encoded JSON

## Technical Notes

- All processing happens client-side; no data leaves your browser
- Uses native `JSON.parse()` and `JSON.stringify()` for reliability
- URL sharing limited to ~1500 characters to ensure browser compatibility

## Created

2026-01-18 - Initial implementation with format, minify, copy, clear, and share functionality.
