# JWT Decoder

Decode and inspect JSON Web Tokens (JWT) directly in the browser. No server-side processing — everything runs client-side.

## Features

- Real-time decoding as you type or paste
- Three view modes: JSON, Decoded (human-readable), and Encoded (raw segments)
- Recognizes standard claims (sub, iss, exp, iat, etc.) with descriptions
- Timestamps rendered as readable dates
- Shareable URLs with the JWT embedded
- Remembers your last JWT via localStorage

## How to Use

1. Paste a JWT into the input field
2. The tool instantly decodes it and shows a Valid/Invalid badge
3. Switch between tabs to view the token different ways:
   - **JSON** — Pretty-printed header and payload
   - **Decoded** — Claims table with human-readable labels and formatted timestamps
   - **Encoded** — The three raw base64url segments (header, payload, signature)
4. Click **Share URL** to copy a link with the JWT embedded

## Technical Details

- Handles base64url encoding (RFC 7515) with proper padding
- UTF-8 safe decoding for international characters in claims
- XSS-safe rendering using textContent (never innerHTML for user data)
- Validates three-part structure and JSON parseability of header and payload
