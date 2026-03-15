# Diagram Visualiser

Render Graphviz DOT notation into diagrams directly in your browser.

## Features

- **Live preview** — diagrams re-render as you type (with debounce)
- **Export** — download as SVG or PNG (2x resolution)
- **Copy** — copy DOT source or rendered SVG to clipboard
- **Share** — generate a shareable URL with the diagram encoded
- **Examples** — built-in flowchart, state machine, and cluster examples
- **Local storage** — your last diagram is saved automatically
- **Tab support** — Tab key inserts spaces in the editor

## DOT Language

The tool supports the full [Graphviz DOT language](https://graphviz.org/doc/info/lang.html), including:

- Directed graphs (`digraph`) and undirected graphs (`graph`)
- Node shapes: `box`, `diamond`, `ellipse`, `circle`, `record`, and more
- Edge labels, colors, and styles
- Subgraphs and clusters
- Layout engines (default: `dot`)

## Technology

Uses [@viz-js/viz](https://github.com/mdaines/viz-js) — a WebAssembly build of Graphviz — loaded via CDN. All rendering happens client-side.
