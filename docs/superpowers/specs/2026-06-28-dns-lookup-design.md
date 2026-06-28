# DNS Lookup — Design

**Date:** 2026-06-28
**Slug:** `dns-lookup` · **Category:** `networking` · **Status:** approved design, pending spec review

## Goal

A single-file HTML DNS lookup tool with at least the same functionality as
[Simon Willison's DNS tool](https://tools.simonwillison.net/dns), built to this
repo's conventions. Differentiation is **look & feel / consistency with the
site**, not new features — confirmed scope decision. Cloudflare-only resolvers.

## Scope (confirmed decisions)

- **Functional parity** with Simon's tool, no multi-provider comparison and no
  "smart record decoding."
- **Cloudflare-only** DNS-over-HTTPS, three resolver variants.
- Keep **all four extras**: query-all-types, reverse DNS (PTR), DNSSEC flags
  (CD/DO), shareable URL + recent-lookup history.

## API: Cloudflare DNS-over-HTTPS JSON

Verified live (2026-06-28) — all three endpoints return `200`,
`content-type: application/dns-json`, and `access-control-allow-origin: *`, so
they are usable directly from the browser with `fetch`.

| Resolver | Filtering | DoH endpoint |
|----------|-----------|--------------|
| `1.1.1.1` | none | `https://cloudflare-dns.com/dns-query` |
| `1.1.1.2` | malware | `https://security.cloudflare-dns.com/dns-query` |
| `1.1.1.3` | malware + adult | `https://family.cloudflare-dns.com/dns-query` |

Request: `GET {endpoint}?name={domain}&type={type}[&cd=1][&do=1]` with header
`Accept: application/dns-json`. No server, no API key, fully client-side.

Response shape (relevant fields):

```json
{ "Status": 0, "AD": false, "CD": false,
  "Question": [{ "name": "example.com", "type": 1 }],
  "Answer":   [{ "name": "example.com", "type": 1, "TTL": 185, "data": "..." }],
  "Authority":[{ "name": "", "type": 6, "TTL": 86400, "data": "..." }] }
```

### Findings from live verification (must handle)

1. **`do=1` adds RRSIG records** (numeric type `46`) to `Answer`. The type map
   must cover common DNSSEC types (RRSIG 46, DS 43, NSEC 47, DNSKEY 48) and fall
   back to `TYPE<n>` for anything unknown — never crash on an unmapped number.
2. **Empty results omit `Answer` entirely** (e.g. NXDOMAIN returns `Status:3`
   with only `Authority`). Drive messaging off the **RCODE**, not
   `Answer.length`; treat a missing `Answer` as "no records."
3. **TXT `data` is wrapped in literal `\"…\"`** — strip the outer quotes for
   display.
4. **`AD` flag** is meaningful — show a DNSSEC-authenticated indicator when true.

## UI

Standard repo chrome: back-link, `<h1>`, one-line instruction, footer; body
`max-width: 900px`, system font, primary `#0066cc`; status div + `localStorage`
+ Share-URL pattern matching Base64 / Subnet Calculator.

**Controls**
- **Domain input** (text).
- **Record-type dropdown:** A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, PTR.
- **Resolver picker:** segmented control (same visual pattern as Base64's
  mode-toggle) with `1.1.1.1` / `1.1.1.2` / `1.1.1.3`, each captioned with its
  filtering level.
- **DNSSEC checkboxes:** `CD` (skip validation) and `DO` (request DNSSEC).
- **Buttons:** **Look up** (primary), **Query all types**, **Share URL**,
  **Clear**.

**Behaviour**
- **Look up** queries the selected type against the selected resolver.
- **Query all types** fires every type concurrently and renders only those with
  answers. **PTR is skipped unless the input is an IP address.**
- **Reverse DNS:** evaluated **at lookup time** (not per keystroke). If the input
  is an IPv4/IPv6 address, build the reverse name
  (`4.3.2.1.in-addr.arpa` / nibble-reversed `ip6.arpa`), force type PTR, and show
  a hint indicating the conversion.
- Loading state on the button(s); graceful handling of `fetch` rejection
  (offline, or a privacy extension blocking Cloudflare DoH).

**Output (where the look & feel lives)**
- One result card per query: header line = `domain · TYPE · resolver · RCODE
  badge` (e.g. green NOERROR, red NXDOMAIN/SERVFAIL) + a DNSSEC-authenticated
  badge when `AD` is true.
- Table of **Name · TTL · Data**. TTL rendered human-readable (`3600 (1h)`),
  data in monospace with a per-row copy button. TXT outer quotes stripped.
- Empty/error responses get a friendly message keyed off the RCODE, not raw JSON.

## State & sharing

- **Share URL:** `?domain=&type=&resolver=&cd=&do=` — auto-runs the lookup on
  load (repo convention).
- **History:** recent lookups (domain + type + resolver) in `localStorage`,
  rendered as clickable chips that re-run the query. Capped at a small number
  (e.g. 10), de-duplicated.

## Pure logic (TDD targets)

The repo has **no test framework for tools** (existing tools ship untested). To
honour TDD without inventing a server, the bug-prone pure logic is extracted and
unit-tested with Node's built-in `node:test` in `dns-lookup.test.mjs` (no deps):

- `typeNumberToName(n)` / `typeNameToNumber(name)` — incl. DNSSEC types and
  `TYPE<n>` fallback.
- `rcodeToName(status)` — `0 NOERROR`, `2 SERVFAIL`, `3 NXDOMAIN`, etc.
- `formatTTL(seconds)` → `"3600 (1h)"`.
- `isIpAddress(str)` and `reverseDnsName(ip)` for IPv4 + IPv6.
- `stripTxtQuotes(data)` / record-data display formatting.
- Share-param parse/serialize round-trip.

**Single source of truth, no duplicated logic:** the pure helpers live in the
HTML's inline `<script>`, grouped in one clearly-delimited block (between marker
comments) and exposed as a `DnsLookup` object. The test file reads
`dns-lookup.html`, extracts that block, evaluates it, and asserts against it — so
there is exactly one copy of each function and the tests can never silently drift
from the shipped code. This keeps the tool a true single-file artifact (no
runtime external module) while still satisfying TDD. The live DoH `fetch` and DOM
rendering are verified in-browser (Playwright/`verify`) against real domains:
`example.com` (A), `google.com` (TXT/MX), `cloudflare.com` (`do=1` → AD true),
an NXDOMAIN name, and a reverse IP lookup.

## Files & build

- `dns-lookup.html` — the tool.
- `dns-lookup.docs.md` — colophon documentation.
- `dns-lookup.test.mjs` — pure-logic tests.
- `tools.json` — new entry (`networking`, created/updated `2026-06-28`).
- `npm run build` — regenerate `index.html` + `colophon.html`; commit all.

## Out of scope (YAGNI)

- Multi-resolver / cross-provider comparison.
- Smart record decoding (SPF/DMARC/DKIM explanations).
- Non-Cloudflare resolvers.
- DNS-over-HTTPS wireformat (JSON API only).
