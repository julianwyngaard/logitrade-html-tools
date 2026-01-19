# Word & Character Counter

A browser-based tool for counting words and characters in text with support for multiple sections.

## Features

- **Word Count**: Accurately counts words by splitting on whitespace
- **Character Count**: Counts all characters including spaces and punctuation
- **Multiple Sections**: Track different pieces of text independently
- **Real-time Updates**: Counts update as you type
- **Shareable URLs**: Generate links with your content embedded (up to ~1500 chars)
- **Clean Interface**: Simple, distraction-free counting experience

## Usage

1. Type or paste text into the text area
2. Word and character counts update automatically
3. Click "Add Section" to track multiple pieces of text
4. Click "Remove" to delete a section (at least one section always remains)
5. Share the URL to preserve your content across sessions

## URL Parameters

- `?sections=<encoded-json>` - Pre-populate the tool with an array of text sections

The tool automatically updates the URL as you type, allowing you to bookmark or share your current state. If the content exceeds URL length limits (~1500 characters), the URL parameter is cleared.

## Technical Notes

- All processing happens client-side; no data leaves your browser
- Word counting uses whitespace splitting (`/\s+/` regex)
- Character count includes all characters (spaces, punctuation, etc.)
- Empty or whitespace-only text counts as 0 words
- Multiple sections are stored as a JSON array in the URL
- URL state updates automatically but only if content is under size limit

## Created

2026-01-19 - Initial implementation with multi-section support and URL sharing.
