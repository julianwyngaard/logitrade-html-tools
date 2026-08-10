# Color Picker

Pick a color visually and convert freely between hex, RGB, and HSL, or sample any color from your screen or from an image.

## Features

- **Visual picker** - A saturation/value square with a draggable handle plus a hue slider, built with pointer events (no dependencies)
- **Keyboard control** - Both the square and the hue slider are focusable; arrow keys nudge the color (hold Shift for bigger steps), with ARIA slider semantics for screen readers
- **Hex, RGB, and HSL** - All three formats are editable and stay in sync as you adjust the color
- **Any CSS color accepted** - The HEX field also understands `rgb(...)`, `hsl(...)`, and named colors like `rebeccapurple`, so you can paste straight from devtools
- **Screen eyedropper** - Sample any pixel on your screen using the browser's native EyeDropper API (Chromium browsers)
- **Image eyedropper** - Load an image via the file picker, drag-and-drop, or clipboard paste, then hover with a magnifier loupe and click to pick a pixel - works in every browser
- **Copy buttons** - Copy the `#hex`, `rgb(...)`, or `hsl(...)` string with one click
- **Recent colors** - Your last eight picks are saved and can be re-selected with a click; re-picking moves a color back to the front
- **URL sharing** - The address bar always carries the current color as `?color=`, and **Share URL** copies the link
- **localStorage** - Remembers your current color and recent colors between sessions

## Usage

1. Drag inside the square to set saturation and brightness, and drag the slider to change hue - or focus either control and use the arrow keys
2. Or type a value directly into any of the HEX, RGB, or HSL fields - the others update automatically
3. Click **Pick from screen** to sample a color from anywhere on your display (Chromium browsers)
4. Click **Pick from image** (or drop / paste an image anywhere on the page) to sample colors from an image: hover to magnify, click to pick
5. Use a **Copy** button to grab the color in your preferred format
6. Click **Share URL** to copy a link that reopens the tool on the current color

## URL Parameters

- `?color=RRGGBB` - Loads the tool with the given hex color (with or without a leading `#`)

## Technical Notes

- All processing happens client-side; no color data leaves your browser
- The screen eyedropper uses the native [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper), available in Chromium-based browsers. In browsers without it (Firefox, Safari), the button is hidden and the image eyedropper is suggested instead.
- The image eyedropper draws the image to a canvas (capped at 4096px on the longest side) and samples with `getImageData`; semi-transparent pixels are composited over white since the picker has no alpha channel
- Color state is stored internally in HSV so the picker maps directly to your position without round-trip drift; hex, RGB, and HSL are derived for display
- Recording to recents is debounced, so stepping a number input's spinner doesn't flood the row with intermediate values
- Only the primary mouse button starts a picker drag, so right-clicking the square can't leave it stuck in a drag

## Created

2026-07-01 - Initial implementation

## Updated

2026-08-09 - Image eyedropper with magnifier loupe, keyboard accessibility, CSS color paste, and fixes for stuck drags, recents flooding, sticky error messages, and stale share URLs
