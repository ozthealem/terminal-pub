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
| **Accent color** | Preset list (Terminal-Pub's Green plus the original Hugo Terminal palette) or `Custom`; the setting's note shows a swatch of each |
| **Custom accent color** | HEX / RGB / HSL, shown when Accent = `Custom` |
| **Color scheme** | `Dark` (original look, background auto-derived from the accent), `Light` (white background, dark text), or `Custom` |
| **Background color** / **Text color** | shown when Color scheme = `Custom` |

Preset accents: Green `#45AE13` (Terminal-Pub default), Matrix `#00FF41`
(bright code-rain green), then the Hugo
Terminal palette: Golden `#eec35e` (Terminal's default), Orange `#FFA86A`,
Blue `#23B0FF`, Olive `#78E2A0` (Terminal's green), Pink `#EE72F1`, Red
`#FF6266`, Purple `#C48AF0`. In **Dark** mode the background reproduces
Hugo's `mix($accent, #1D1E28, 2%)`. Sites that already saved an accent keep
it.

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
  A year range keeps its start year and only the end year moves on:
  `© 2019–2024` becomes `© 2019–2026`.
- **Theme settings → Layout → RSS Toggle**: **Show RSS link in the footer**
  adds a small "RSS" link at the end of the footer copyright line, pointing
  to `/feed.xml`. The link only appears while Publii's RSS feed is on
  (**Site settings → Feed**), so it never points to a missing file.

## Post list layouts

**Theme settings → Layout → Layout mode** (right under Entry width) picks how
the home, tag and author pages list posts. A tag can use its own layout:
pick **Layout: Full / Half / Compact / List** under **Tag → Other options →
Custom template** (also offered when creating a tag), e.g. an archive tag
shown as a List while the home page stays Full:

- **Full** (default): everything stacked, as in Terminal. The featured image
  fills the column and is at most 16:9 high, so a 1920×1080 image fits
  exactly; a taller one is trimmed top and bottom. Icon-size images (under
  240 px) keep their size.
- **Half**: image on the left, title (2 lines), details and a 4-line excerpt
  on the right. The image is the featured image or, if there is none, the
  first image in the post. It takes the height of the text (at least 7.5 rem)
  and is cropped to fit; icon-size images are centred instead of enlarged; a
  post with no image at all uses the full width. The frame hugs the image. On phones the
  image sits above the text.
- **Compact**: text only. A details line on top (date and word count in the
  accent colour, tags like the text), a large title and a 3-line excerpt.
- **List**: date on the left, title with tags and word count on the right,
  all one size. **List: text size** sets it (0.9 to 1.5 rem, default 1.05).

**Frame around images** (shown for Full and Half) switches the featured
image frame in the post list on or off.

The Post list switches (date, word count, author, tags, featured image) apply
to every layout. Half, Compact and List come from `partials/listing-item.hbs`;
`helpers.js` adds `ifListingMode`, `listingModeClass`, `firstImage` and
`plainText` for them.

## Comments in the Publii preview

Comment services check the page's address, so they refuse Publii's preview
(`127.0.0.1`). Some, Comentario among them, then scroll their error box into
view and the post jumps to its end. In the preview the theme shows a short
note in place of the comments instead; the published site loads them as
usual.

## Word count

Post pages and post listings (home, tag, author) show the word count right
after the date, e.g. `2026.09.14 · 1200 words`. It is counted by the theme's
`helpers.js` at render time, so it costs nothing in the browser. In bilingual
posts only one `.lang-content` block is counted (the one marked `active`,
otherwise the first), since the same text is there once per language. The
label comes from `post.words` in `terminal-pub.lang.json` (`word` / `words`)
and can be translated like any other theme string.

Two switches turn it off: **Post options → Display word count** for post
pages (also per post), and **Theme settings → Layout → Post list → Show word
count** for listings. Both are on by default.

## Accessibility

- Each `.lang-content` block is automatically tagged with `lang="<code>"`
  (from its own `id`), so screen readers switch pronunciation correctly.
  Doesn't override a `lang` you set yourself.
- A visible `:focus-visible` outline (theme accent colour) is shown on
  links, buttons and the language tabs when navigating by keyboard. Mouse
  clicks stay outline-free, same as before.
- Navbar submenus (dropdown menu items) are reachable by keyboard, Tab now
  opens and steps through them instead of skipping past.
- The language tabs follow the WAI-ARIA Tabs pattern, added automatically by
  `lang.js`: screen readers announce them as tabs with the selected one
  ("English, tab, selected, 2 of 2"), Tab reaches the selected tab, Left/Right
  switch tabs, Home/End jump to the first/last. No markup change needed.
  Tested with the NVDA screen reader in a Chromium browser.
- Language tab buttons carry `lang` too, so their labels are read in their
  own language. Form fields get the same accent focus ring as links.
- A "Skip to content" link is the first Tab stop on every page and jumps past
  the navbar to the main content. It stays off-screen until focused.
- Screen readers can read navbar submenus opened by keyboard. Terminal marked
  every submenu `aria-hidden="true"` and only cleared it on mouse hover; a
  closed submenu is already hidden by `visibility: hidden`, so the attribute
  is gone.
- The mobile menu is a `<nav>` landmark labelled "Menu", so screen readers
  list it with the other page regions.
- Every page has exactly one `h1`: with the hero on, later home pages (page 2
  and on) give it to the first post.

## Theme settings

Everything lives under two groups in Theme Settings: **Layout** (page, hero,
tags, featured image, post list, navbar, share, footer, gallery, additional) and
**Colors & Fonts**. Nothing was removed from Terminal, just regrouped.

**Layout → Featured image → Corner radius** (0 to 30 px, default 10) rounds
the slim 3 px frame around featured images (the image inside follows the
curve) and every other post image: frameless featured images, images in the
text, in excerpts and in galleries. Set it to 0 for square corners.

Below it are two switches, both off by default:
**Posts: show featured image without frame** (post pages and post lists) and
**Pages: show featured image without frame** (pages). Each removes the
accent-coloured frame for edge-to-edge images.

**Colors & Fonts → Readable small text** (off by default). Terminal fades the
minor details on purpose: the date and word count line, tags and the footer
sit back so titles and text lead. Switch this on if you'd rather have every
small text pass WCAG AA (4.5:1). The theme works out, from your own accent and
background, the smallest change that gets there: the accent keeps its hue
and only gets darker (or lighter on a dark background) for the meta line and
"Read more", and the faded text gets just enough opacity. A colour that
already reads is left as it is. Headings don't change.

## Files that differ from Terminal

| File | Change |
|---|---|
| `config.json` | `Colors` option group, RSS toggle, extra date-format options, `name` is `Terminal-Pub`, settings regrouped into Layout / Colors & Fonts |
| `theme-variables.js` | derives `--accent`, `--background`, `--color` from the colour options (emitted as `H, S%, L%` triplets); computes the readable small-text colours when that option is on |
| `assets/js/lang.js` | new, bilingual tab logic plus automatic `lang` tagging and ARIA tabs |
| `assets/css/main.css` | colour system support, bilingual tab styles, RSS footer link, accessibility fixes (compiled into `style.css` by Publii on render) |
| `partials/footer.hbs` | loads `lang.js`, current-year script, RSS link |
| `partials/menu.hbs`, `assets/js/scripts.js` | submenus no longer `aria-hidden` (`scripts.min.js` rebuilt with terser) |
| `index.hbs`, `tags.hbs`, `partials/share-buttons.hbs` | one `h1` per page, no nested `.content` wrapper, no X `via` without a handle |
| `helpers.js` | new, `wordCount` helper for the post meta word count |
| `terminal-pub.lang.json` | renamed from `terminal.lang.json`, `post.words` and `partials.skipLink` strings |

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
