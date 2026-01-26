# Lorem Ipsum Generator

Generate placeholder text for your designs and layouts. Choose from words, characters, sentences, or paragraphs.

## Features

- **Multiple units**: Generate by words, characters, sentences, or paragraphs
- **Configurable amount**: Set any amount from 1 to 10,000
- **Classic Lorem Ipsum**: Option to start with the traditional "Lorem ipsum dolor sit amet..."
- **One-click copy**: Copy generated text to clipboard instantly
- **Shareable links**: Share your settings via URL
- **Persistent state**: Settings and generated text saved to localStorage

## Usage

1. Enter the desired amount (1-10,000)
2. Select a unit type: Words, Characters, Sentences, or Paragraphs
3. Toggle "Start with Lorem ipsum..." checkbox as needed
4. Click **Generate** to create placeholder text
5. Click **Copy Text** to copy to clipboard
6. Click **Share URL** to share your settings

## URL Parameters

- `?amount=50` - Number of units to generate (1-10,000)
- `?unit=words` - Unit type: `words`, `characters`, `sentences`, or `paragraphs`
- `?lorem=1` - Start with "Lorem ipsum...": `1` (yes) or `0` (no)

Example: `?amount=100&unit=words&lorem=1`

## Technical Notes

- All processing happens client-side in your browser
- No data is sent to any server
- Settings persist in localStorage between sessions
- URL parameters take priority over saved localStorage state
- Generated text uses classic Latin-based Lorem Ipsum vocabulary

## Created

2026-01-26 - Initial implementation
