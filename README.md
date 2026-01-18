# Julian's HTML Tools

A collection of single-file HTML tools hosted at [tools.julianwyngaard.dev](https://tools.julianwyngaard.dev).

Inspired by [Simon Willison's tools](https://tools.simonwillison.net/).

## Philosophy

Each tool is a standalone HTML file with inline CSS and JavaScript. No build step required for the tools themselves. Libraries are loaded from CDNs when needed.

## Tools

### Data & Text

- **[JSON Formatter](json-formatter.html)** - Format, validate, and minify JSON. Shareable via URL.

## Adding New Tools

1. Create `[tool-name].html` in the root directory
2. Create `[tool-name].docs.md` with documentation
3. Add an entry to `tools.json` with metadata
4. Run `npm run build` to regenerate index and colophon
5. Commit all files

### Tool File Structure

Each tool should follow the single-file pattern:
- Inline CSS in `<style>` tags
- Inline JS in `<script>` tags
- Reference shared patterns from `lib/` as needed

### Documentation File Structure

Each `[tool-name].docs.md` should include:
- Tool name and description
- Features list
- Usage instructions
- Technical notes
- Creation/update history

## Development

```bash
# Install nothing - no dependencies needed

# Build index and colophon
npm run build

# Serve locally for testing
npm run serve
```

## Project Structure

```
├── index.html           # Generated tool listing (don't edit directly)
├── colophon.html        # Generated tool history (don't edit directly)
├── tools.json           # Tool metadata (edit this to add tools)
├── [tool-name].html     # Individual tools
├── [tool-name].docs.md  # Tool documentation
├── lib/                 # Shared CSS/JS components
│   ├── common.css
│   └── common.js
└── scripts/             # Build scripts
    ├── build.sh
    ├── build-index.js
    └── build-colophon.js
```

## Deployment

Automatically deployed to GitHub Pages on push to `main`.

The GitHub Actions workflow runs the build script before deployment.

## License

Apache 2.0
