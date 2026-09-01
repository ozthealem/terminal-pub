# Terminal-Pub

A [Publii](https://getpublii.com) theme. Fork of the **Terminal** theme
(TidyCustoms / Publii Team's port of panr's
[`hugo-theme-terminal`](https://github.com/panr/hugo-theme-terminal)).

Templates and layout are unchanged from Terminal. Terminal-Pub adds a real
**colour system**, **bilingual content tabs**, ISO date formats and a
self-updating copyright year.

**Live demo:** https://terminal-demo.github.io/

## Recommended site settings

Under **Site Settings → URLs**, turn on **Clean URLs** (`/post/` instead of
`/post.html`). This is a per-site Publii setting, not something a theme controls.

## Colour system

**Theme settings → Colors:**

| Option | Meaning |
|---|---|
| **Accent color** | Preset list (original Hugo Terminal palette) or `Custom` |
| **Custom accent color** | HEX / RGB / HSL — shown when Accent = `Custom` |
| **Color scheme** | `Dark` (original look, background auto-derived from the accent), `Light` (white background, dark text), or `Custom` |
| **Background color** / **Text color** | shown when Color scheme = `Custom` |

Preset accents (from Hugo Terminal): Golden `#eec35e` (default), Orange
`#FFA86A`, Blue `#23B0FF`, Green `#78E2A0`, Pink `#EE72F1`, Red `#FF6266`,
Purple `#C48AF0`. In **Dark** mode the background reproduces Hugo's
`mix($accent, #1D1E28, 2%)`.

No `!important` overrides are needed — the options feed `--accent`,
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

## Date & year

- Date format select adds `YYYY.MM.DD` (default), `YYYY/MM/DD`, `YYYY-MM-DD`.
- The footer rewrites `© <year>` in the copyright text to the current year on
  load, so it never goes stale.

## Files that differ from Terminal

| File | Change |
|---|---|
| `config.json` | `Colors` option group; extra date-format options; `name` is `Terminal-Pub` |
| `theme-variables.js` | derives `--accent` / `--background` / `--color` from the colour options (emitted as `H, S%, L%` triplets) |
| `assets/js/lang.js` | new — bilingual tab logic |
| `assets/css/style.css` | appended `.lang-tabs` / `.lang-btn` / `.lang-content` rules |
| `partials/footer.hbs` | loads `lang.js`; current-year script |
| `terminal-pub.lang.json` | renamed from `terminal.lang.json` |

> Publii resolves the theme's asset folder as `themes/<config.json name,
> lowercased>/`, so `name` must be `Terminal-Pub` to match the folder
> `terminal-pub`.

## Install

Download the latest release zip (or zip this folder) and use **Publii → Themes
→ Install theme**. Alternatively drop the folder into Publii's `themes/`
directory. Then select **Terminal-Pub** for your site.

## Credits & license

MIT — see [LICENSE](LICENSE).

- [`hugo-theme-terminal`](https://github.com/panr/hugo-theme-terminal) — Radoslaw Koziel (panr), MIT
- **Terminal** for Publii — TidyCustoms / the Publii Team
- **Terminal-Pub** — ozthealem
