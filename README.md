# Terminal-Pub

A [Publii](https://getpublii.com) theme. Fork of the **Terminal** theme
(TidyCustoms / Publii Team's port of panr's
[`hugo-theme-terminal`](https://github.com/panr/hugo-theme-terminal)).

Templates and layout are unchanged from Terminal. Terminal-Pub adds a real
**colour system**, **bilingual content tabs**, ISO date formats, a
self-updating copyright year, an optional RSS footer link, and a handful of
**accessibility fixes** for keyboard navigation and screen readers.

**Live demo:** https://terminal-demo.github.io/

## Recommended site settings

Under **Site Settings → URLs**, turn on **Clean URLs** (`/post/` instead of
`/post.html`). This is a per-site Publii setting, not something a theme controls.

## Colour system

**Theme settings → Colors:**

| Option | Meaning |
|---|---|
| **Accent color** | Preset list (original Hugo Terminal palette) or `Custom` |
| **Custom accent color** | HEX / RGB / HSL, shown when Accent = `Custom` |
| **Color scheme** | `Dark` (original look, background auto-derived from the accent), `Light` (white background, dark text), or `Custom` |
| **Background color** / **Text color** | shown when Color scheme = `Custom` |

Preset accents (from Hugo Terminal): Golden `#eec35e` (default), Orange
`#FFA86A`, Blue `#23B0FF`, Green `#78E2A0`, Pink `#EE72F1`, Red `#FF6266`,
Purple `#C48AF0`. In **Dark** mode the background reproduces Hugo's
`mix($accent, #1D1E28, 2%)`.

No `!important` overrides are needed, the options feed `--accent`,
`--background` and `--color`, which cascade to buttons, code blocks, borders,
selection, the submenu, etc.

## Bilingual content tabs

`assets/js/lang.js` (loaded on every page) powers optional per-page language
tabs. Add this markup to a post or page via an HTML block:

```html
<div class="lang-tabs">
  <button class="lang-btn" data-lang="tr">Türkçe</button>
  <button class="lang-btn" data-lang="en">English</button>
</div>
<div id="lang-tr" class="lang-content active">… Türkçe …</div>
<div id="lang-en" class="lang-content">… English …</div>
```

- `data-lang` on a button must match the `id="lang-<code>"` of a content block.
- Mark one `.lang-content` (and optionally its button) `active` as the default.
- The visitor's choice is stored in `localStorage` and re-applied on any page
  that offers the same language; `<html lang>` is updated to match.
- **Editing:** `assets/css/editor.css` shows both `.lang-content` blocks with
  a dashed border and a `lang: lang-tr` / `lang: lang-en` label right inside
  the Publii editor, so you can tell them apart and check placement without
  it affecting the published page.

### Optional: a Templates snippet, so you don't retype the markup

Publii's editor supports a Templates picker for reusable HTML, but it's a
**per-site** setup (it's stored in each site's own `tinymce.override.json`,
theme defaults can't ship it) and TinyMCE itself is dropping Templates in
version 7 (going paywalled), so treat this as a recipe, not something the
theme provides automatically.

1. In your site's `input/<theme>/` folder, create `tinymce.override.json`:
   ```json
   {
     "templates": [
       {
         "title": "Bilingual tabs (TR/EN)",
         "description": "Insert the lang-tabs / lang-content markup",
         "content": "<div class=\"lang-tabs\"><button class=\"lang-btn\" data-lang=\"tr\">Türkçe</button><button class=\"lang-btn\" data-lang=\"en\">English</button></div><div id=\"lang-tr\" class=\"lang-content active\">Türkçe metin</div><div id=\"lang-en\" class=\"lang-content\">English text</div>"
       }
     ]
   }
   ```
2. In `config.json`, set `"extensions": { "postEditorConfigOverride": true }`.
3. The snippet then shows up under the editor's Templates menu.

Credit to [@candidexmedia](https://github.com/candidexmedia) for pointing at
this mechanism, see their
[TinyMCE customization notes](https://gist.github.com/candidexmedia/367711a80274b4c005fd5983df97d20c).

## Date, year & footer

- Date format select adds `YYYY.MM.DD` (default), `YYYY/MM/DD`, `YYYY-MM-DD`.
- The footer rewrites the copyright year to the current year on load, so it
  never goes stale (works with `©`, `&copy;`, `(c)` or `(C)`, whichever you use).
- **Theme settings → Layout → RSS Toggle**: **Show RSS link in the footer**
  adds a small "RSS" link at the end of the footer copyright line, pointing
  to `/feed.xml`.

## Accessibility

- Each `.lang-content` block is automatically tagged with `lang="<code>"`
  (from its own `id`), so screen readers switch pronunciation correctly.
  Doesn't override a `lang` you set yourself.
- A visible `:focus-visible` outline (theme accent colour) is shown on
  links, buttons and the language tabs when navigating by keyboard. Mouse
  clicks stay outline-free, same as before.
- Navbar submenus (dropdown menu items) are reachable by keyboard, Tab now
  opens and steps through them instead of skipping past.

## Theme settings

Everything lives under two groups in Theme Settings: **Layout** (page, hero,
tags, post list, navbar, share, footer, gallery, additional) and
**Colors & Fonts**. Nothing was removed from Terminal, just regrouped.

## Files that differ from Terminal

| File | Change |
|---|---|
| `config.json` | `Colors` option group, RSS toggle, extra date-format options, `name` is `Terminal-Pub`, settings regrouped into Layout / Colors & Fonts |
| `theme-variables.js` | derives `--accent`, `--background`, `--color` from the colour options (emitted as `H, S%, L%` triplets) |
| `assets/js/lang.js` | new, bilingual tab logic plus automatic `lang` tagging |
| `assets/css/main.css` | colour system support, bilingual tab styles, RSS footer link, accessibility fixes (compiled into `style.css` by Publii on render) |
| `partials/footer.hbs` | loads `lang.js`, current-year script, RSS link |
| `terminal-pub.lang.json` | renamed from `terminal.lang.json` |

> Publii resolves the theme's asset folder as `themes/<config.json name,
> lowercased>/`, so `name` must be `Terminal-Pub` to match the folder
> `terminal-pub`.

## Install

1. Go to [**Releases**](../../releases) and download the **`.zip`** from the
   latest release (either `terminal-pub-x.y.z.zip` or *Source code (zip)*).
   The `.tar.gz` is the same files in a different format; you don't need it.
2. In Publii: **Themes → Install theme** → pick the zip.
3. Select **Terminal-Pub** for your site.

Works the same on Windows, macOS and Linux. Publii always wants the zip.

Alternatively, unzip the folder straight into Publii's `themes/` directory.

## Credits & license

**GNU General Public License v3.0 or later**, see [LICENSE](LICENSE) and
[COPYRIGHT](COPYRIGHT). Copyright (C) 2026 Özgür Alem (ozthealem).

Publii themes are distributed under the GPL-3.0, so this fork is too.

- [`hugo-theme-terminal`](https://github.com/panr/hugo-theme-terminal), Radoslaw Koziel (panr), MIT (MIT-licensed portions keep their original terms)
- **Terminal** for Publii, TidyCustoms / the Publii Team
- **Terminal-Pub**, Özgür Alem (ozthealem)
