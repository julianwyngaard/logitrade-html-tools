# DNS Lookup

Look up DNS records for any domain (or reverse-lookup an IP address) using Cloudflare's DNS-over-HTTPS API, directly from your browser.

## Features

- **Record types**: A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, PTR
- **Three Cloudflare resolvers**: `1.1.1.1` (unfiltered), `1.1.1.2` (malware blocking), `1.1.1.3` (malware + adult content blocking)
- **Query all types**: fire a lookup for every record type at once and see only those that have records
- **Reverse DNS**: enter an IPv4 or IPv6 address and the tool automatically builds the `in-addr.arpa` / `ip6.arpa` name and performs a PTR lookup
- **DNSSEC flags**: `CD` to skip DNSSEC validation, `DO` to request DNSSEC records; an authenticated response shows a DNSSEC badge
- **Human-readable TTLs**: e.g. `3600 (1h)`
- **Shareable URLs**: share the exact query via URL parameters
- **Recent history**: your last lookups are saved in localStorage as clickable chips

## Usage

1. Enter a domain (e.g. `example.com`) or an IP address
2. Choose a record type, or click **Query all types**
3. Pick a resolver and, if needed, toggle the `CD` / `DO` DNSSEC flags
4. Click **Look up** (or press Enter)
5. Use **Share URL** to copy a link that reproduces the query

## URL Parameters

- `?domain=` - the name or IP to look up (auto-runs on load)
- `?type=` - record type (A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, PTR)
- `?resolver=` - resolver IP (`1.1.1.1`, `1.1.1.2`, or `1.1.1.3`)
- `?cd=1` - disable DNSSEC validation
- `?do=1` - request DNSSEC records

Example: `?domain=cloudflare.com&type=A&resolver=1.1.1.1&do=1`

## Technical Notes

- All lookups go directly from your browser to Cloudflare's DNS-over-HTTPS JSON endpoints (`cloudflare-dns.com`, `security.cloudflare-dns.com`, `family.cloudflare-dns.com`). No server is involved.
- Cloudflare receives the queries you run (as with any DNS resolver). No data is sent anywhere else; history is stored only in your browser's localStorage.
- A privacy extension or network that blocks Cloudflare DNS may cause lookups to fail with a request error.
- Record data is rendered as text, so a malicious TXT record cannot inject markup.

## Created

2026-06-28 - Initial implementation
