# Julian's HTML Tools

A collection of single-file HTML tools hosted at [tools.julianwyngaard.dev](https://tools.julianwyngaard.dev).

## Philosophy

Each tool is a standalone HTML file with inline CSS and JavaScript. No build step required for the tools themselves. Libraries are loaded from CDNs when needed.

Inspired by [Simon Willison's tools](https://tools.simonwillison.net/).

## Tools

- **[JSON Formatter](json-formatter.html)** - Format, validate, and minify JSON

## Adding New Tools

1. Create a new `[tool-name].html` file in the root directory
2. Follow the single-file pattern: inline CSS in `<style>`, inline JS in `<script>`
3. Add the tool to `index.html` and this README

## Development

No build step. Just edit HTML files and push.

```bash
# Serve locally for testing
npx serve .
```

## Deployment

Automatically deployed to GitHub Pages on push to `main`.

## License

MIT
