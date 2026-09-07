# URL Cleaner

Remove click-tracking and UTM parameters from a URL while keeping everything else.

## Features

- Strips tracking parameters from a pasted link live, as you type
- Covers five families of click tags: UTM (`utm_*`), Google (`gclid`, `dclid`, …), social (`fbclid`, `igsh`, …), email (`mc_cid`, `mc_eid`), and other (`msclkid`, `pk_*`)
- Toggle any family on or off to control exactly what gets removed
- Keeps every other parameter, the path, and the hash — ordering and duplicates preserved
- Shows each removed parameter as a tag so you can see what was dropped
- Copy button for the cleaned URL
- Shareable URLs with the input and selected families embedded
- Remembers your last URL and family selection via localStorage

## Usage

1. Paste a link into the URL field
2. Adjust the family checkboxes if you want to keep some trackers (all are on by default)
3. The cleaned URL and the list of removed parameters update instantly
4. Click **Copy** to copy the cleaned URL, or **Share URL** to copy a link that pre-loads it

## URL Parameters

- `input` — the URL to clean
- `fam` — comma-separated family ids to strip (`utm,google,social,email,other`); when absent, all families are enabled. Only the non-default selection is written into shared links.

## Technical Notes

- Parsing is done with plain string splitting on `?` and `#`, so it works on real URLs and on strings the `URL` constructor would reject
- Parameter names are matched case-insensitively after `decodeURIComponent`; UTM matches on the `utm_` prefix, other families match on exact names
- Kept parameters keep their original (still-encoded) segment text; the `?` is dropped when no parameters survive
- Rendering uses `textContent` only — user input is never inserted as HTML

## Created

2026-08-30 - Initial implementation
