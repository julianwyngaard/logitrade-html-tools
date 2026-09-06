# URL Cleaner

Remove common click-tracking parameters from a URL while keeping its destination and useful query parameters unchanged.

## Features

- Removes every case-insensitive `utm_*` parameter
- Removes common Google, Meta, Microsoft, LinkedIn, TikTok, Twitter, HubSpot, Mailchimp, and other click identifiers
- Preserves non-tracking parameters, duplicate parameters, their original order and encoding, paths, and fragments
- Lists the exact parameter names removed from the URL
- Copies the cleaned URL to the clipboard
- Remembers the most recent URL in localStorage
- Shares the input through a URL

## Usage

1. Paste an absolute URL into the URL field
2. Click **Clean URL** or press Enter
3. Review the cleaned URL and the list of removed tracking parameters
4. Click **Copy** to copy the clean destination
5. Click **Share URL** to copy a link that reopens the same input
6. Click **Clear** to remove the input, result, saved state, and URL parameters

## URL Parameters

- `?url=` - Absolute URL to clean. Invalid or oversized values fall back to saved state or the built-in sample.

## Technical Notes

- Uses the browser's built-in `URL` constructor to validate input without sending it to a server
- Filters the original query string rather than serialising it through `URLSearchParams`, keeping all untouched content byte-for-byte identical
- Recognises encoded tracking parameter names and matches names case-insensitively
- State priority: URL parameter, then localStorage, then the built-in sample URL

## Created

2026-09-06 - Initial implementation
