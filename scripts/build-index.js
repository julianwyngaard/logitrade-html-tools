#!/usr/bin/env node
// ABOUTME: Generates index.html from tools.json metadata
// ABOUTME: Groups tools by category into a listing page styled by tools.css

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TOOLS_JSON = path.join(ROOT, 'tools.json');
const OUTPUT = path.join(ROOT, 'index.html');

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function loadTools() {
    const data = JSON.parse(fs.readFileSync(TOOLS_JSON, 'utf8'));
    return data;
}

function groupByCategory(tools, categories) {
    const grouped = {};

    // Initialize all categories
    for (const [key, cat] of Object.entries(categories)) {
        grouped[key] = { ...cat, key, tools: [] };
    }

    // Add tools to their categories
    for (const tool of tools) {
        const cat = tool.category || 'misc';
        if (!grouped[cat]) {
            grouped[cat] = { name: cat, order: 50, key: cat, tools: [] };
        }
        grouped[cat].tools.push(tool);
    }

    // Sort and filter empty categories
    return Object.values(grouped)
        .filter(cat => cat.tools.length > 0)
        .sort((a, b) => a.order - b.order);
}

function generateHTML(categories) {
    const toolsList = categories.map(cat => {
        const toolItems = cat.tools.map(tool => `
        <li>
            <a href="${tool.slug}.html">${escapeHtml(tool.name)}</a>
            <p>${escapeHtml(tool.description)}</p>
        </li>`).join('');

        return `
    <section>
        <h2>${escapeHtml(cat.name)}</h2>
        <ul class="tools-list">${toolItems}
        </ul>
    </section>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>tools.julianwyngaard.dev</title>
    <link rel="stylesheet" href="tools.css">
</head>
<body>
    <h1>tools.julianwyngaard.dev</h1>

    <p class="lede">A collection of single-file HTML tools. Each tool runs entirely in your browser with no server-side processing.</p>

    <p class="lede">They are utility and experimental low-stakes tools written predominantly by LLMs.</p>

    <p class="lede">The <a href="colophon.html">colophon</a> lists commit messages and transcripts for every tool.</p>
${toolsList}
    <footer>
        <a href="https://github.com/julianwyngaard/logitrade-html-tools">Source on GitHub</a> |
        <a href="colophon.html">Colophon</a>
    </footer>
</body>
</html>
`;
}

function main() {
    const data = loadTools();
    const categories = groupByCategory(data.tools, data.categories);
    const html = generateHTML(categories);

    fs.writeFileSync(OUTPUT, html);
    console.log(`Generated index.html with ${data.tools.length} tools in ${categories.length} categories`);
}

main();
