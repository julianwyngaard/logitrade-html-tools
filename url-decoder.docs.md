# URL Decoder

Decode and deconstruct any URL into its individual components. No server-side processing — everything runs client-side.

## Features

- Real-time parsing as you type or paste
- Breaks URLs into protocol, domain, port, path, hash, and query parameters
- Automatically decodes URL-encoded characters (`%20`, `+`, `%0d%0a`, etc.)
- Copy buttons on every component and parameter for quick copying
- Shareable URLs with the input URL embedded
- Remembers your last URL via localStorage

## How to Use

1. Paste a URL into the input field
2. The tool instantly parses it and shows all components
3. Click any copy button to copy that component to your clipboard
4. Click **Share URL** to copy a link that pre-loads the URL for others

## Technical Details

- Uses the browser's built-in `URL` constructor for reliable parsing
- Handles edge cases: missing ports, empty hashes, duplicate query keys, keys without values
- XSS-safe rendering using textContent (never innerHTML for user data)
- State priority: URL parameter > localStorage > empty
