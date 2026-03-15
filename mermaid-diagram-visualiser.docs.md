# Mermaid Diagram Visualiser

Render Mermaid diagrams in the browser with live preview.

## Features

- Live rendering as you type (500ms debounce)
- Six built-in examples: flowchart, sequence diagram, state diagram, ER diagram, class diagram, and Gantt chart
- Export to SVG or PNG (2x resolution)
- Copy diagram source or SVG to clipboard
- Shareable URLs with diagram encoded in query parameter
- Persistent state via localStorage
- Tab key inserts spaces in the editor

## Usage

Type or paste Mermaid syntax into the editor. The diagram renders automatically as you type, or click **Render** to trigger manually.

Use the **Load example** dropdown to explore supported diagram types.

## Dependencies

- [Mermaid.js](https://mermaid.js.org/) v11 via jsDelivr CDN (ESM module)
