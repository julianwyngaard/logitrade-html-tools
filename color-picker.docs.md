# Color Picker

Pick a color visually and convert freely between hex, RGB, and HSL, or sample any color on your screen with the eyedropper.

## Features

- **Visual picker** - A saturation/value square with a draggable handle plus a hue slider, built with pointer events (no dependencies)
- **Hex, RGB, and HSL** - All three formats are editable and stay in sync as you adjust the color
- **Screen eyedropper** - Sample any pixel on your screen using the browser's native EyeDropper API
- **Copy buttons** - Copy the `#hex`, `rgb(...)`, or `hsl(...)` string with one click
- **Recent colors** - Your last eight picks are saved and can be re-selected with a click
- **URL sharing** - Share the current color via a `?color=` link
- **localStorage** - Remembers your current color and recent colors between sessions

## Usage

1. Drag inside the square to set saturation and brightness, and drag the slider to change hue
2. Or type a value directly into any of the HEX, RGB, or HSL fields - the others update automatically
3. Click **Pick from screen** to sample a color from anywhere on your display (Chrome and Edge)
4. Use a **Copy** button to grab the color in your preferred format
5. Click **Share URL** to copy a link that reopens the tool on the current color

## URL Parameters

- `?color=RRGGBB` - Loads the tool with the given hex color (with or without a leading `#`)

## Technical Notes

- All processing happens client-side; no color data leaves your browser
- The eyedropper uses the native [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper), available in Chromium-based browsers. In browsers without it (Firefox, Safari), the button is hidden and a note is shown.
- Color state is stored internally in HSV so the picker maps directly to your position without round-trip drift; hex, RGB, and HSL are derived for display

## Created

2026-07-01 - Initial implementation
