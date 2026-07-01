# Timezone Comparison

Compare working hours across timezones to find a meeting slot that works for everyone. Everything runs client-side — no server, no tracking.

## Features

- Side-by-side 24-hour strips, one per place, all aligned to the same moment
- Search by city or country (e.g. "Portland", "Tokyo", "India", "New York") against a broad built-in list — your own timezone is added automatically
- The place keeps the name you searched for, even where several cities share one timezone (Portland stays "Portland", not "Los Angeles")
- Click any hour to select a meeting time and see it instantly in every timezone; hovering a column previews it everywhere
- Hours are shaded like a heat-map: green for working hours, amber for outside-hours-but-still-awake (early morning / evening), grey for night; the "Overlap" bar highlights hours when everyone is within working hours
- A day chip (e.g. "-1 day") flags places on a different calendar day, and a subtle divider marks each place's local midnight
- Adjustable global working hours and meeting date (so daylight saving is handled for the actual day)
- Shareable URLs with the full comparison embedded
- Remembers your last setup, including custom place names, via localStorage

## How to Use

1. Your local timezone appears first, alongside two common hubs to start
2. Search for a city or country and click it to add another timezone
3. Pick the meeting date and your working-hours window
4. Click any hour in any strip — the selected time updates everywhere, with the exact local time and date per place
5. Look for the green band in the "Overlap" bar: those hours fall within working hours for everyone
6. Click **Share link** to copy a URL that reproduces the exact comparison for others

## URL Parameters

- `?zones=Europe/London,America/New_York` — comma-separated IANA timezones (first is the anchor)
- `?date=YYYY-MM-DD` — the meeting date
- `?t=14` — selected hour (0–23, in the anchor timezone)
- `?w=9-17` — working-hours window (start–end, 24-hour)

## Technical Details

- Uses the browser's built-in `Intl.DateTimeFormat` for all conversions, so daylight saving transitions are handled automatically for the chosen date
- The hour strips are anchored to midnight in the first (anchor) timezone; each strip labels the same absolute hours with that place's local hour
- Timezone search falls back to the full IANA database via `Intl.supportedValuesOf` for places not in the curated list
- XSS-safe rendering using textContent for all place names
- State priority: URL parameters > localStorage > sensible defaults (your zone + New York + London)

## Created

2026-07-01 - Initial implementation
