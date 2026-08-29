# Style guide

Every page on tools.julianwyngaard.dev shares one stylesheet, `tools.css`. It carries the design
tokens, base typography and the handful of components a tool needs, so a new tool is mostly markup.
Light mode only. Tool-specific CSS stays inline in the tool's `<style>`.

Start from `docs/tool-template.html` — it is the canonical skeleton.

## Include it

```html
<title>[Tool Name] - tools.julianwyngaard.dev</title>
<link rel="stylesheet" href="tools.css">
```

Root-level tools use `href="tools.css"`. The template, which lives in `docs/`, uses `../tools.css`.

## Tokens

| Token | Value | Use |
|---|---|---|
| `--primary` | `#0066cc` | Links, primary buttons, active states, focus |
| `--primary-dark` | `#0055aa` | Hover on primary buttons |
| `--ink` | `#1f2733` | Body text, control text |
| `--muted` | `#6b7686` | Ledes, labels, table headers, footer, metadata |
| `--line` | `#e6e9ee` | Hairlines: card borders, table rows, footer rule |
| `--border` | `#ccd2da` | Control borders: inputs, selects, buttons |
| `--surface` | `#fff` | Page and control background |
| `--surface-alt` | `#f7f8fa` | Card headers, code blocks, list cards |
| `--surface-hover` | `#eef1f5` | Hover on buttons and chips |
| `--ok-bg` / `--ok-ink` | `#e5f6ea` / `#1f7a3d` | Success status, `.badge.ok` |
| `--warn-bg` / `--warn-ink` | `#fbeacf` / `#9a6416` | Warning status, `.badge.warn` |
| `--err-bg` / `--err-ink` | `#fdecec` / `#c0392b` | Error status, `.badge.err` |
| `--info-bg` / `--info-ink` | `#eaf3ff` / `#0a4a8f` | Info status, `.badge.info` |
| `--radius` | `6px` | Every corner except pills |
| `--radius-pill` | `999px` | Chips and other pills |
| `--font` | `system-ui, -apple-system, sans-serif` | Everything |
| `--mono` | `'SF Mono', SFMono-Regular, Monaco, Consolas, 'Liberation Mono', monospace` | Data, code, textareas |
| `--focus-ring` | `0 0 0 3px rgba(0,102,204,0.28)` | `box-shadow` ring on focused fields |
| `--max-width` | `900px` | Page width |

No web fonts. No shadows on cards — a soft one on a floating dropdown is the only exception.

## Type and spacing

| Role | Size | Notes |
|---|---|---|
| `h1` | `1.9rem` | 600, `letter-spacing: -0.02em`, tight bottom margin (the lede follows) |
| `h2` | `1.15rem` | 600, `margin-top: 2rem` |
| Body | `1rem` / 1.6 | |
| Controls | `0.95rem` | Buttons, inputs, selects |
| Small | `0.85–0.9rem` | Table cells, status, code, footer |
| Micro label | `0.72rem` | 700, uppercase, `letter-spacing: 0.04em`, muted — `label` and `th` |

Spacing is multiples of `0.25rem`. One block of content to the next is `1rem`; a section is `2rem`.
Button rows and inline groups use `gap: 0.5rem`. Use `rem` everywhere; `px` only for borders.

Transitions are `0.12s` on `background`, `border-color` and `box-shadow` only, and
`prefers-reduced-motion: reduce` switches them off.

## Components

**Header**

```html
<a href="index.html" class="back-link">&larr; All Tools</a>
<h1>Tool Name</h1>
<p class="lede">One sentence telling the user what to do.</p>
```

**Toolbar** — `.buttons` is the only toolbar container. `.toolbar` and `.actions` are retired.

```html
<div class="buttons">
    <button id="run" class="primary">Format</button>
    <button id="share">Share URL</button>
    <button id="clear">Clear</button>
</div>
```

**Buttons** — default is white with a hairline border; `.primary` for the one main action;
`.small` for in-card actions like Copy; `disabled` dims to 50%.

```html
<button class="primary">Format</button>
<button>Share URL</button>
<button class="small">Copy</button>
<button disabled>Run</button>
```

**Segmented toggle** — mutually exclusive modes. Buttons overlap by 1px, so no double seam.

```html
<div class="segmented">
    <button class="active">Encode</button>
    <button>Decode</button>
</div>
```

**Field** — a label stacked over its control. Wrap several in `.field-row` to sit them side by
side; the row stacks at the breakpoint.

```html
<div class="field">
    <label for="input">Input</label>
    <textarea id="input" rows="8" spellcheck="false"></textarea>
</div>
```

**Card** — an output pane. Header holds the title, a `.spacer`, then actions.

```html
<div class="card">
    <div class="card-header">
        <span>Output</span>
        <span class="spacer"></span>
        <button class="small">Copy</button>
    </div>
    <div class="card-body">…</div>
</div>
```

**Status** — one per page, immediately before the footer. Empty means hidden.

```html
<div id="status" class="status" role="status" aria-live="polite"></div>
<!-- showStatus() sets: class="status success | error | warning | info" -->
```

**Chip** (clickable pill) and **badge** (state label)

```html
<button class="chip">example.com</button>
<span class="badge ok">NOERROR</span>
<span class="badge err">SERVFAIL</span>
<span class="badge warn">Truncated</span>
<span class="badge info">DNSSEC</span>
```

**Table** — headers are uppercase micro labels, rows are hairlines, numbers are tabular. Drop a
table straight into `.card` (no `.card-body`) for an edge-to-edge result pane. Wrap anything wider
than the page in `.scroll-x`.

```html
<table>
    <thead><tr><th>Name</th><th>TTL</th></tr></thead>
    <tbody><tr><td>example.com</td><td>300</td></tr></tbody>
</table>
```

## Do

- Consume tokens: `var(--line)`, `var(--radius)`, `var(--mono)`.
- Keep tool CSS inline and scoped under a tool-specific class or id.
- Use single class or element selectors; no IDs in CSS, no `!important`.
- One breakpoint: `@media (max-width: 640px)`.
- Give every interactive element a visible focus state — `tools.css` already does.

## Don't

- Don't redefine base tokens or restyle base elements (`button`, `input`, `table`) in a tool.
- Don't write `outline: none` without a replacement ring.
- Don't add breakpoints, radii, greys or status palettes that aren't in the table above.
- Don't put shadows on cards, add web fonts, or animate for decoration.
- Don't use `px` for anything but borders.

## Canonical strings

Use these exactly, so the tools read as one product:

Share URL · URL copied to clipboard · URL updated — copy from address bar · Nothing to share ·
Copied to clipboard · Copy failed — select and copy manually · Nothing to copy · Loaded from URL ·
Cleared

Plus `URL too long to share` when the query string exceeds the 1500-character cap. Note the em dash
in the two failure messages.
