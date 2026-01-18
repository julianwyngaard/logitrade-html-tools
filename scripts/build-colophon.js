#!/usr/bin/env node
// ABOUTME: Generates colophon.html showing tool creation history
// ABOUTME: Reads tools.json and optional .docs.md files for additional context

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const TOOLS_JSON = path.join(ROOT, 'tools.json');
const OUTPUT = path.join(ROOT, 'colophon.html');

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function loadTools() {
    const data = JSON.parse(fs.readFileSync(TOOLS_JSON, 'utf8'));
    return data.tools;
}

function getGitHistory(slug) {
    const file = `${slug}.html`;
    try {
        const log = execSync(
            `git log --format="%H|%aI|%s" -- "${file}"`,
            { cwd: ROOT, encoding: 'utf8' }
        );
        return log.trim().split('\n').filter(Boolean).map(line => {
            const [hash, date, message] = line.split('|');
            return { hash: hash.slice(0, 7), date: date.slice(0, 10), message };
        });
    } catch (e) {
        return [];
    }
}

function loadDocs(slug) {
    const docsPath = path.join(ROOT, `${slug}.docs.md`);
    if (fs.existsSync(docsPath)) {
        const content = fs.readFileSync(docsPath, 'utf8');
        // Extract first paragraph after the title
        const match = content.match(/^#[^\n]+\n+([^\n]+)/);
        return match ? match[1] : null;
    }
    return null;
}

function generateHTML(tools) {
    const toolEntries = tools.map(tool => {
        const history = getGitHistory(tool.slug);
        const docsDesc = loadDocs(tool.slug);
        const description = docsDesc || tool.description;

        const historyHTML = history.length > 0
            ? `<div class="history">
                <details>
                    <summary>Commit history (${history.length})</summary>
                    <ul>
                        ${history.map(h => `<li><code>${escapeHtml(h.hash)}</code> ${escapeHtml(h.date)} - ${escapeHtml(h.message)}</li>`).join('\n                        ')}
                    </ul>
                </details>
            </div>`
            : '';

        return `
        <div class="tool" id="${tool.slug}">
            <h3>
                <a href="${tool.slug}.html">${escapeHtml(tool.name)}</a>
                <a href="#${tool.slug}" class="hashref">#</a>
            </h3>
            <p>${escapeHtml(description)}</p>
            <p class="meta">Created: ${escapeHtml(tool.created)}${tool.updated !== tool.created ? ` | Updated: ${escapeHtml(tool.updated)}` : ''}</p>
            ${historyHTML}
        </div>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colophon - tools.julianwyngaard.dev</title>
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
        .intro {
            color: #666;
            margin-bottom: 2rem;
        }
        .tool {
            margin: 2rem 0;
            padding: 1.5rem;
            background: #f9f9f9;
            border-radius: 8px;
        }
        .tool h3 {
            margin: 0 0 0.5rem 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .tool h3 a:first-child {
            color: #0066cc;
            text-decoration: none;
        }
        .tool h3 a:first-child:hover {
            text-decoration: underline;
        }
        .hashref {
            color: #ccc;
            text-decoration: none;
            font-weight: normal;
        }
        .hashref:hover {
            color: #0066cc;
        }
        .tool p {
            margin: 0.5rem 0;
        }
        .meta {
            font-size: 0.85rem;
            color: #888;
        }
        .history {
            margin-top: 1rem;
        }
        .history summary {
            cursor: pointer;
            color: #666;
            font-size: 0.9rem;
        }
        .history ul {
            margin: 0.5rem 0;
            padding-left: 1.5rem;
            font-size: 0.85rem;
        }
        .history code {
            background: #e9e9e9;
            padding: 0.1rem 0.3rem;
            border-radius: 3px;
            font-size: 0.8rem;
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
    <h1>Colophon</h1>
    <p class="intro">
        Documentation and history for each tool in this collection.
        These tools are built as single-file HTML applications, often with AI assistance.
    </p>

    <p><a href="index.html">&larr; Back to all tools</a></p>
${toolEntries}
    <footer>
        <a href="index.html">All Tools</a> |
        <a href="https://github.com/julianwyngaard/logitrade-html-tools">Source on GitHub</a>
    </footer>
</body>
</html>
`;
}

function main() {
    const tools = loadTools();
    const html = generateHTML(tools);

    fs.writeFileSync(OUTPUT, html);
    console.log(`Generated colophon.html with ${tools.length} tools`);
}

main();
