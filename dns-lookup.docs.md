# DNS Lookup

Query live DNS records over DNS-over-HTTPS directly from your browser — no server, no command line. Results are grouped by record type and shareable via URL.

## Features

- Looks up A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, and PTR records
- "All common" mode sweeps the most-used record types in a single click
- Choice of resolver: Cloudflare or Google public DNS-over-HTTPS APIs
- Results grouped into cards by record type, with human-readable TTLs
- One-click copy on every record value
- Status summary (NOERROR / NXDOMAIN / SERVFAIL), answer count, and a DNSSEC-authenticated indicator
- Collapsible raw JSON response for the full picture
- Shareable URLs (`?domain=&type=&resolver=`) and last-lookup recall via localStorage

## How to Use

1. Type a domain name (you can also paste a full URL — the hostname is extracted)
2. Pick a record type, or leave it on **All common** to sweep everything at once
3. Choose **Cloudflare** or **Google** as the resolver
4. Press **Look up** (or hit Enter)
5. Use the copy buttons to grab any value, or expand **Raw JSON response** for the unprocessed answer
6. Click **Share URL** to copy a link that reproduces the exact query

## Technical Details

- Lookups use the CORS-enabled DNS-over-HTTPS JSON APIs at `cloudflare-dns.com/dns-query` and `dns.google/resolve` with the `Accept: application/dns-json` header — entirely client-side, no backend
- Numeric record types in responses are mapped back to their names; answers are regrouped per type so CNAME chains and "All common" sweeps render cleanly
- TTLs are shown in human-readable units (s/m/h/d) with the exact seconds on hover
- All record data is rendered with `textContent` (never `innerHTML`) to stay XSS-safe
- On an empty answer for a single query, the authority section (e.g. the SOA on NXDOMAIN) is shown instead
