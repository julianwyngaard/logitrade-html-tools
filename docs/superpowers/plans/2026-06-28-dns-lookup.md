# DNS Lookup Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a single-file `dns-lookup.html` tool with parity to Simon Willison's DNS tool, Cloudflare-only, built to this repo's conventions.

**Architecture:** Standalone HTML file, inline CSS/JS, no build step for the tool. Queries Cloudflare's DNS-over-HTTPS JSON API client-side. Registered in `tools.json`; `index.html`/`colophon.html` regenerated via `npm run build`.

**Tech Stack:** Vanilla HTML/CSS/JS, Cloudflare DoH JSON API. No CDN libs needed.

## Global Constraints

- Single self-contained HTML file, inline CSS/JS, no external runtime deps.
- Primary color `#0066cc`; repo chrome (back-link, `<h1>`, one-line intro, footer); body `max-width: 900px`, system font.
- Inline `<script>` starts with two `ABOUTME:` comment lines.
- URL-param state + `localStorage` + status div, matching Base64 / Subnet Calculator.
- **TDD is explicitly excluded for this implementation** (per Julz). No test file. Verify in a real browser instead.
- Spec: `docs/superpowers/specs/2026-06-28-dns-lookup-design.md`.

---

### Task 1: Build the tool and its docs

**Files:**
- Create: `dns-lookup.html`
- Create: `dns-lookup.docs.md`

**Implementation details (all verified live 2026-06-28):**

- **Resolvers** (segmented control, Base64 mode-toggle style):
  - `1.1.1.1` none → `https://cloudflare-dns.com/dns-query`
  - `1.1.1.2` malware → `https://security.cloudflare-dns.com/dns-query`
  - `1.1.1.3` malware + adult → `https://family.cloudflare-dns.com/dns-query`
- **Request:** `GET {endpoint}?name={domain}&type={type}[&cd=1][&do=1]`, header `Accept: application/dns-json`.
- **Record types** (dropdown): A, AAAA, CNAME, MX, NS, TXT, SOA, CAA, SRV, PTR.
- **Type map** (number↔name) incl. DNSSEC types RRSIG 46, DS 43, NSEC 47, DNSKEY 48; unknown numeric → `TYPE<n>` (never crash). Base map: A=1, NS=2, CNAME=5, SOA=6, PTR=12, MX=15, TXT=16, AAAA=28, SRV=33, CAA=257.
- **RCODE map** for status badge: 0 NOERROR, 1 FORMERR, 2 SERVFAIL, 3 NXDOMAIN, 4 NOTIMP, 5 REFUSED.
- **Empty answers:** `Answer` may be absent — drive messaging off `Status` (RCODE), not `Answer.length`.
- **TXT data:** strip surrounding literal `"…"` quotes for display.
- **`AD` flag:** show a "DNSSEC authenticated" badge when `true`.
- **TTL:** human-readable, e.g. `3600 (1h)`, `185 (3m)`.
- **Buttons:** Look up (primary), Query all types, Share URL, Clear. "Query all types" fires all types concurrently, renders only those with answers, and **skips PTR unless the input is an IP**.
- **Reverse DNS:** at lookup time, if input is IPv4/IPv6, build reverse name (`4.3.2.1.in-addr.arpa` / nibble-reversed `ip6.arpa`), force PTR, show a hint.
- **Output:** one result card per query — header `domain · TYPE · resolver · RCODE badge` (+ AD badge); table of Name · TTL · Data, data monospace with per-row copy button.
- **Share URL:** `?domain=&type=&resolver=&cd=&do=`, auto-runs on load.
- **History:** recent lookups (domain+type+resolver) in `localStorage`, clickable chips that re-run; cap ~10, de-duplicated.
- Loading state on buttons; graceful `fetch`-rejection message (offline / DoH blocked).

**Steps:**

- [ ] **Step 1:** Create `dns-lookup.html` implementing everything above, copying the chrome/CSS patterns from `base64-encoder-decoder.html` (back-link, `.primary` button, `.mode-toggle` segmented control, `.status` success/error/info, footer, mobile `@media`). Inline script begins with two `ABOUTME:` lines.
- [ ] **Step 2:** Create `dns-lookup.docs.md` following the repo docs structure (Title, intro, Features, Usage, URL Parameters, Technical Notes incl. "all lookups go directly to Cloudflare DoH from your browser", Created `2026-06-28`).
- [ ] **Step 3:** Verify in a real browser (`npm run serve`, open `dns-lookup.html`, or Playwright). Confirm: `example.com` A; `google.com` TXT (quotes stripped) and MX; `cloudflare.com` with DO checked → AD badge shows; an NXDOMAIN name → red NXDOMAIN badge, friendly message; a reverse IP (e.g. `1.1.1.1`) → auto PTR with hint; Query all types; resolver switch to `1.1.1.2`/`1.1.1.3`; Share URL round-trips; a history chip re-runs.
- [ ] **Step 4:** Commit.

```bash
git add dns-lookup.html dns-lookup.docs.md
git commit -m "feat: add DNS Lookup tool"
```

---

### Task 2: Register and build

**Files:**
- Modify: `tools.json` (add entry)
- Regenerate: `index.html`, `colophon.html`

**Steps:**

- [ ] **Step 1:** Add a `tools.json` entry (place near the `subnet-calculator` networking entry or with the other recent tools):

```json
{
  "slug": "dns-lookup",
  "name": "DNS Lookup",
  "description": "Look up DNS records (A, AAAA, MX, TXT, and more) via Cloudflare DNS-over-HTTPS. Shareable via URL.",
  "category": "networking",
  "created": "2026-06-28",
  "updated": "2026-06-28"
}
```

- [ ] **Step 2:** Run the build.

```bash
npm run build
```
Expected: regenerates `index.html` and `colophon.html` with no errors; DNS Lookup appears under Networking.

- [ ] **Step 3:** Commit.

```bash
git add tools.json index.html colophon.html
git commit -m "build: register DNS Lookup tool"
```

---

## Self-Review

- **Spec coverage:** parity record types, three Cloudflare resolvers, CD/DO + AD, reverse DNS, query-all-types (PTR-skip), share URL, history, RCODE-driven empty handling, TXT quote-strip, DNSSEC type-map fallback, TTL formatting — all in Task 1. Registration + build in Task 2. ✅
- **Deviation from spec:** test file (`dns-lookup.test.mjs`) and TDD dropped per Julz's explicit instruction; verification is in-browser instead. ✅
- **No placeholders:** all endpoints, maps, and params are concrete. ✅
