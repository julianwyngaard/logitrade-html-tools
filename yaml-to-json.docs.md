# YAML to JSON

A browser-based tool for converting YAML to JSON.

## Features

- **Pretty Print**: Formatted JSON output with 2-space indentation (default)
- **Compact Mode**: Minified single-line JSON output via toggle
- **Live Conversion**: Converts as you type with 200ms debounce
- **Copy**: One-click copy of JSON output
- **Share**: Generate shareable URLs with YAML embedded (up to 1500 chars)
- **Persistence**: Input saved to localStorage between sessions

## Usage

1. Paste or type YAML into the input area
2. JSON output updates automatically
3. Toggle "Pretty print" checkbox for formatted or compact output
4. Click "Copy" to copy the JSON output
5. Use "Share URL" to create a link with your YAML embedded

## URL Parameters

- `?yaml=<encoded-yaml>` - Pre-populate the input with URL-encoded YAML

## Technical Notes

- All processing happens client-side; no data leaves your browser
- Uses js-yaml v4 for YAML parsing
- Only single-document YAML is supported
- URL sharing limited to ~1500 characters to ensure browser compatibility
- Responsive layout: side-by-side on desktop, stacked on mobile

## Created

2026-03-25 - Initial implementation with pretty/compact output toggle.
