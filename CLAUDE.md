# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A collection of single-file HTML tools hosted at tools.julianwyngaard.dev. Each tool is a standalone HTML file with inline CSS and JavaScript - no build step needed for the tools themselves.

## Commands

```bash
npm run build           # Regenerate index.html and colophon.html (run before committing)
npm run build:index     # Rebuild only index.html
npm run build:colophon  # Rebuild only colophon.html (requires git history)
npm run serve           # Local dev server at http://localhost:3000
```

No `npm install` needed - build scripts use only Node.js built-ins.

## Architecture

**Source of truth:** `tools.json` defines all tools and categories

**Generated files (commit these):**
- `index.html` - Tool listing by category (from `scripts/build-index.js`)
- `colophon.html` - Tool history with git commits (from `scripts/build-colophon.js`)

**Per-tool files:**
- `[tool-name].html` - Standalone tool (inline CSS/JS)
- `[tool-name].docs.md` - Extended documentation for colophon

## Adding a Tool

1. Create `[slug].html` using template from README
2. Create `[slug].docs.md` for documentation
3. Add entry to `tools.json` with slug, name, description, category, created, updated
4. Run `npm run build`
5. Commit all files including generated index.html and colophon.html

## Key Conventions

- Tools are self-contained single HTML files with inline CSS/JS
- External libraries via CDN only (no npm packages in tools)
- URL parameters for shareable state
- Client-side processing only (no server required)
- All script files start with two-line `ABOUTME:` comment header
- Primary color: `#0066cc`
