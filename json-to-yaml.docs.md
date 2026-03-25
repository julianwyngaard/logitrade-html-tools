# JSON to YAML

A browser-based tool for converting JSON to YAML in multiple styles.

## Features

- **Block Style**: Standard YAML with 2-space indentation
- **Flow Style**: Compact inline YAML representation
- **Quoted Strings**: All string values wrapped in double quotes
- **Live Conversion**: Converts as you type with 200ms debounce
- **Copy**: One-click copy for each output style
- **Share**: Generate shareable URLs with JSON embedded (up to 1500 chars)
- **Persistence**: Input saved to localStorage between sessions

## Usage

1. Paste or type JSON into the input area
2. All three YAML styles update automatically
3. Click "Copy" next to any style to copy that output
4. Use "Share URL" to create a link with your JSON embedded

## URL Parameters

- `?json=<encoded-json>` - Pre-populate the input with URL-encoded JSON

## Technical Notes

- All processing happens client-side; no data leaves your browser
- Uses js-yaml v4 for YAML serialization
- URL sharing limited to ~1500 characters to ensure browser compatibility
- Responsive layout: side-by-side on desktop, stacked on mobile

## Created

2026-03-25 - Initial implementation with block, flow, and quoted string output styles.
