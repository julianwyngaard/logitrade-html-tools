# AGENTS.md

Instructions for AI agents (and humans) working on this repository. Read this whole file before building or changing a tool.

## What this repo is

A collection of single-file HTML tools hosted at tools.julianwyngaard.dev. Each tool is one `[slug].html` file at the repo root with inline JavaScript and tool-specific CSS. Shared look and feel comes from one stylesheet, `tools.css`, which every page links.

- `tools.json` is the source of truth for the tool list and categories.
- `index.html` and `colophon.html` are **generated** by `scripts/` and **committed**.
- `tools.css` is the shared stylesheet; `STYLE.md` is the style guide; `docs/tool-template.html` is the skeleton every new tool starts from.
- No npm dependencies, no tests, no linter. Verification is done in a browser.

## Commands

```bash
npm run build           # Regenerate index.html and colophon.html — run before every commit that touches a tool
npx serve . -l 3737     # Local server (port 3000 is usually taken); open http://localhost:3737/[slug].html
```

## Adding a tool — checklist

1. **Branch**: `git checkout -b feature/[slug]`. Never commit to `main`.
2. **`[slug].html`**: copy `docs/tool-template.html` to the repo root, change `href="../tools.css"` to `href="tools.css"`, and fill in the tool. Keep the template's chrome (header, `.buttons`, `#status`, footer) and its helper functions.
3. **`[slug].docs.md`**: use exactly these headings, in this order:
   ```markdown
   # Tool Name

   One-line description on a single line. (The colophon build extracts this line — no wrapping.)

   ## Features
   ## Usage
   ## URL Parameters
   ## Technical Notes
   ## Created
   YYYY-MM-DD - Initial implementation
   ```
4. **`tools.json`**: append an entry with `slug`, `name`, `description`, `category`, `created`, `updated`.
   - `slug` matches the filename stem.
   - `description` is one sentence and ends with `Shareable via URL.`
   - `category` is one of `data`, `networking`, `image`, `dev`, `misc` (add a new key with `name` + `order` if none fit).
   - `created` and `updated` are `YYYY-MM-DD` and **equal** on creation.
5. `npm run build`.
6. Verify in the browser at desktop width and 600px (see Verification).
7. Commit **all five files**: `[slug].html`, `[slug].docs.md`, `tools.json`, `index.html`, `colophon.html`.
8. Push and open a PR (see Git workflow).

## Updating a tool

- Bump `updated` in `tools.json` and add/extend `## Updated` in the docs (`YYYY-MM-DD - what changed`).
- Always `npm run build` and commit `colophon.html` — it embeds the git log of each tool's `.html`, so it changes on every tool commit.
- Commit subjects are published verbatim on the colophon page. Write them for a reader.

## Required functionality in every tool

The reference implementation of all of this lives in `docs/tool-template.html`. Copy it; don't reinvent it.

| Feature | Rule |
|---|---|
| Header | `<a href="index.html" class="back-link">&larr; All Tools</a>`, `<h1>`, then `<p class="lede">` — one sentence telling the user what to do. |
| Toolbar | A `<div class="buttons">` directly under the lede. Order: primary action (`button.primary`) if there is one, then **Share URL**, then **Clear** (or **Reset** for tools that always have state). |
| Shareable URL | State lives in query params via `URLSearchParams` + `history.replaceState` (never `pushState`, never the hash). Read on load with validation of every value; unknown or malformed values fall back to defaults. Cap the query string at ~1500 characters and show `URL too long to share` beyond that. |
| Share button | Writes the URL, copies `origin + pathname + '?' + qs` to the clipboard, shows `URL copied to clipboard`; on clipboard failure shows `URL updated — copy from address bar` as `info`. Guard empty state with `Nothing to share`. |
| Copy buttons | Every output the user would paste elsewhere gets a `button.small` "Copy". Use `copyText()`; report failure honestly (`Copy failed — select and copy manually`), never fake success. Guard with `Nothing to copy`. |
| Status box | `<div id="status" class="status" role="status" aria-live="polite"></div>` before the footer. `showStatus(message, type)` with type `success`/`error`/`info`/`warning`, auto-clears after 3 s except errors, and uses a `clearTimeout` guard. All feedback (copy, share, load, clear, errors) goes through it. |
| Persistence | `localStorage` key `[slug]-state`, JSON, always in `try/catch`. Precedence on load: URL param → localStorage → built-in sample. |
| Default input | Load with a useful sample so the tool demonstrates itself; or focus the input if a sample makes no sense. Show `Loaded from URL` when state came from the URL. |
| Clear/Reset | Blanks the fields and status, removes the storage key, `history.replaceState({}, '', location.pathname)`, shows `Cleared`. |
| Keyboard | `Enter` submits single-line inputs. Never remove focus outlines; `tools.css` provides the `:focus-visible` ring. |
| Responsive | Works at 600px wide. One breakpoint only: `@media (max-width: 640px)`. |
| Dependencies | Client-side only. External libraries via CDN `<script>` only, pinned to an exact version. No analytics. |
| Script header | The `<script>` starts with two `// ABOUTME:` lines: what the tool is, and how it works. |
| Wiring | `addEventListener` on ids, not inline `onclick`. |

### Canonical strings

Use these exactly so the tools read as one product:

`Share URL` · `URL copied to clipboard` · `URL updated — copy from address bar` · `Nothing to share` · `URL too long to share` · `Copied to clipboard` · `Copy failed — select and copy manually` · `Nothing to copy` · `Loaded from URL` · `Cleared`

## Styling

- First line in `<head>` after the title: `<link rel="stylesheet" href="tools.css">`.
- Use the components and tokens in `STYLE.md` (`.buttons`, `button.primary`, `button.small`, `.segmented`, `.field`, `.card`, `.status`, `.chip`, `.badge`, tables). Do not redefine base tokens or restyle base elements.
- Tool-specific CSS goes in the tool's inline `<style>`, scoped under a tool-specific class, and uses `var(--…)` tokens for colours, radius, and borders.
- Primary colour `#0066cc`, system font stack, light mode only.

## Verification

Serve on 3737 and open the tool. Check, at ~1200px and ~600px wide:

- Loads with a sensible default; `?param=` URL loads the same state; malformed params don't crash.
- Share URL copies and the address bar updates; Copy buttons work; Clear empties everything and the URL.
- Tab through the page — every control shows a focus ring.
- Status messages appear and clear.
- `git status` shows only the intended files; no screenshots or binaries in the tree.

## Git workflow

- Branches: `feature/[slug]` for new tools, `fix/[topic]` for fixes. Every change lands via a GitHub PR to `main`.
- Commit subjects: imperative, sentence case, no prefixes — `Add Colour Picker tool`, `Fix DST handling in Timezone Comparison`. Body: a short paragraph on why, then a bullet list of what changed.
- Keep the working tree free of build-unrelated binaries; reference images from the PR, not the repo.
