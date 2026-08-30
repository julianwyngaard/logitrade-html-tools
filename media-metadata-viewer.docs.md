# Media Metadata Viewer

Preview a photo, video, or audio file and inspect the metadata the browser and the file itself expose.

## Features

- **Preview** — Images, video, and audio play in the page; HEIC and other types the browser cannot render still list metadata
- **File details** — Name, size, MIME type, and last-modified time
- **Media properties** — Pixel dimensions, aspect ratio, megapixels, and duration from the decoded media
- **Embedded tags** — EXIF, IPTC, XMP, ICC, JFIF, and GPS via [exifr](https://mutiny.cz/exifr/), including an OpenStreetMap link when coordinates are present
- **Container fields** — ISO BMFF brands, codecs, and tracks for MP4/MOV/HEIC/AVIF; PNG IHDR/text/pHYs; WAV fmt
- **Open from anywhere** — File picker, drag-and-drop, clipboard paste, or an `http(s)` URL
- **Shareable URLs** — A remote file is encoded as `?url=` so the same preview can be reopened
- **Copy** — The metadata table as plain text

## Usage

1. Drop a photo or video onto the page, click **Open file**, or paste an image from the clipboard
2. Or paste a media URL and press Enter (or **Load**)
3. Read the preview and the metadata table; use **Copy** to grab the listing
4. Click **Share URL** when the media was loaded from a URL to copy a link that reopens it
5. **Clear** removes the file, the table, and the stored URL

## URL Parameters

- `?url=` — `http` or `https` URL of an image, video, or audio file (auto-loads on open). Malformed values fall back to the sample image.

## Technical Notes

- All processing happens in the browser. Local files never leave the machine. A remote URL is fetched directly from your browser (the host must allow CORS for a full metadata read; otherwise only decoded dimensions/duration are shown).
- Embedded tags are parsed with exifr 7.1.3. Video/image containers are walked for `ftyp` / `moov` boxes; large files are read from the first and last 2 MB so `moov`-at-end MP4s still work without loading the whole file.
- State priority: URL parameter → localStorage (last remote URL) → built-in sample PNG. Local files are not persisted.
- XSS-safe rendering: every field value is assigned with `textContent`; GPS links set `href` from numeric coordinates.

## Created

2026-08-30 - Initial implementation

## Updated

2026-08-30 - Renamed to Media Metadata Viewer (`media-metadata-viewer`)
