# Changelog

## 1.1.1

### Added
- `assets/css/editor.css`: shown by Publii inside the WYSIWYG editor only
  (never on the published page). Draws a dashed border and a `lang: <id>`
  label around each `.lang-content` block, so you can tell `.lang-tr` from
  `.lang-en` and check placement while writing, instead of only seeing the
  one main.css shows active on the live site.
- README: documented the editor.css behavior above, and added an optional
  recipe for a Publii Templates snippet (`tinymce.override.json`) so the
  bilingual markup doesn't have to be retyped by hand. Flagged as per-site
  and not shippable as a theme default (TinyMCE is dropping Templates in
  v7), so it's a recipe, not a built-in feature.

Both promised to [@candidexmedia](https://github.com/candidexmedia) in the
[announcement discussion](https://github.com/GetPublii/Publii/discussions/2687).

## 1.1.0

### Added
- Footer RSS link: a **Show RSS link in the footer** toggle (`feedLink`,
  under a new "RSS Toggle" separator in the Layout group) adds a small
  "RSS" link at the end of the footer copyright line, pointing to
  `/feed.xml`.
- Accessibility: `.lang-content` blocks are auto-tagged with `lang="<code>"`
  (from their `id`) so screen readers use the right pronunciation, and a
  visible `:focus-visible` outline is restored on links/buttons/`.lang-btn`
  for keyboard navigation (Terminal's base CSS removed it unconditionally).
  Thanks to [@candidexmedia](https://github.com/candidexmedia) for flagging
  both in the [announcement discussion](https://github.com/GetPublii/Publii/discussions/2687).
- Accessibility: navbar submenus (dropdowns under "Works" etc.) were
  unreachable by keyboard. The reveal rule keyed off `.has-submenu:focus`,
  but `has-submenu` is a class on the `<li>`, which is never itself
  focusable, so Tab always skipped straight past the (hidden) submenu to
  the next top-level item. Added the same reveal rules keyed off
  `:focus-within`, which matches the `<li>` while focus is anywhere inside
  it, so the submenu now opens and stays open while tabbing through it.

### Changed
- License corrected from MIT to **GPL-3.0-or-later**. Publii themes are
  distributed under the GPL-3.0, and Terminal-Pub is a fork of the Publii
  "Terminal" theme, so it inherits that license. The MIT-licensed upstream
  portions from panr's `hugo-theme-terminal` keep their original terms. No
  code change.
- Default copyright text now reads `© 2026 · Terminal-Pub the Fork` (proper
  symbol and spacing).
- Theme Settings reorganized from 9 groups down to **2**: "Layout"
  (page, hero, tags, post list, navbar, share, footer, gallery,
  additional) and "Colors & Fonts". No options were removed, just
  regrouped under separators.
- `config.json` author field: em dash replaced with a comma.

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
