# Changelog

## 1.0.0

First release. Fork of the Publii **Terminal** theme (TidyCustoms' port of
panr's `hugo-theme-terminal`). Templates and layout are unchanged from Terminal;
the additions are:

### Added
- **Colour system** — Theme settings → Colors:
  - Accent presets from the original Hugo Terminal palette, plus a custom colour
  - Colour scheme: **Dark** (background auto-derived from the accent, like Hugo),
    **Light** (white background, dark text), or **Custom**
  - Custom background / text colour pickers
- **Bilingual content tabs** — `.lang-tabs` / `.lang-btn` / `.lang-content`
  markup with a `localStorage`-persisted language choice and `<html lang>`
  updates (`assets/js/lang.js`)
- ISO date formats `YYYY.MM.DD` (new default), `YYYY/MM/DD`, `YYYY-MM-DD`
- Footer copyright year is kept current on page load

### Changed
- `theme-variables.js` now derives `--accent`, `--background` and `--color`
  from the colour options (all emitted as `H, S%, L%` triplets)
- Tighter vertical rhythm: smaller gaps above post titles and images, first
  post sits flush to the top of the page (listing and single views)
- Post navigation ("Read other posts") no longer carries a ~100px top margin;
  the empty share-buttons row is hidden when no share buttons are enabled
- Flatter dropdown submenu (no stacked shadow, 1px border) and a slimmer
  featured-image frame (5px)
- Page alignment defaults to **center**
- The scrollbar gutter is reserved (`overflow-y: scroll`), so switching between
  short and long pages no longer shifts the layout sideways
- Default hero and footer text rewritten for Terminal-Pub (no external links)
