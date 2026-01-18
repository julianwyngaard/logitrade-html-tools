#!/usr/bin/env node
// ABOUTME: Generates index.html from tools.json metadata
// ABOUTME: Groups tools by category and creates a styled listing page

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
    <style>
        * { box-sizing: border-box; }
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1rem;
            line-height: 1.6;
            color: #333;
        }
        h1 {
            border-bottom: 2px solid #eee;
            padding-bottom: 0.5rem;
        }
        h2 {
            color: #555;
            font-size: 1.2rem;
            margin-top: 2rem;
            border-bottom: 1px solid #eee;
            padding-bottom: 0.25rem;
        }
        .intro {
            color: #666;
            margin-bottom: 2rem;
        }
        .tools-list {
            list-style: none;
            padding: 0;
        }
        .tools-list li {
            margin: 1rem 0;
            padding: 1rem;
            background: #f9f9f9;
            border-radius: 8px;
        }
        .tools-list a {
            font-size: 1.1rem;
            font-weight: 500;
            color: #0066cc;
            text-decoration: none;
        }
        .tools-list a:hover {
            text-decoration: underline;
        }
        .tools-list p {
            margin: 0.5rem 0 0 0;
            color: #666;
        }
        footer {
            margin-top: 3rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 0.9rem;
        }
        footer a {
            color: #0066cc;
        }
    </style>
</head>
<body>
    <h1>tools.julianwyngaard.dev</h1>

    <p class="intro">A collection of single-file HTML tools. Each tool runs entirely in your browser with no server-side processing.</p>

    <p class="intro">They are predominantly utility and experimental low-stakes tools written predominately by LLM's.</p>

    <p class="intro">The <a href="colophon.html">colophon</a> lists commit messages and transcripts for every tool.</p>
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
