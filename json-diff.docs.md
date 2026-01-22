# JSON Diff Tool

A browser-based tool for comparing two JSON documents and visualizing the differences in a git-like diff format.

## Features

- **Side-by-side editors**: Two text areas for original and modified JSON
- **Deep recursive comparison**: Compares nested objects and arrays at all levels
- **Color-coded output**: Green for additions, red for removals, yellow for modifications
- **JSON path tracking**: Shows the exact path to each change (e.g., `$.address.city`, `$.skills[2]`)
- **Type change detection**: Highlights when a value changes type (string to number, etc.)
- **Statistics bar**: Shows counts of added, removed, and modified items
- **Format button**: Prettify JSON in each editor
- **Swap button**: Flip original and modified content
- **Sample data**: Load example data to test functionality
- **Keyboard shortcut**: Ctrl/Cmd + Enter to compare

## Usage

1. Paste or type JSON into the "Original (Base)" panel
2. Paste or type JSON into the "Modified (New)" panel
3. Click "Compare JSON" or press Ctrl/Cmd + Enter
4. View the diff output showing all changes

## Diff Output Legend

- **+** (green): Property or value was added in the modified version
- **-** (red): Property or value was removed from the original
- **~** (yellow): Property value was changed (shows old → new)

## Technical Notes

- All processing happens client-side; no data leaves your browser
- Uses recursive deep comparison algorithm for accurate nested diffs
- Handles arrays by index comparison
- Detects and reports type mismatches between values
- Syntax errors are reported with line and column numbers

## Created

2026-01-22 - Initial implementation with side-by-side editors, deep diff algorithm, and color-coded output.
