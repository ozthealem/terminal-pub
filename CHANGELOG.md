# Changelog

## 1.2.1

### Fixed
- Language tab buttons get `lang="<code>"` from their `data-lang` (unless one
  is set), so screen readers read a label like "Türkçe" in its own language.
  Suggested by @candidexmedia in the announcement discussion.
- Form fields (`input`, `textarea`, `select`) get the same keyboard focus ring
  as links and buttons: accent colour, 2px offset (`:focus-visible`).
  Terminal gave them a text-coloured outline flush with the border.

## 1.2.0

### Added
- Post list layouts (Layout > Post list > Layout mode, `listingMode`): Full
  (default, Terminal's look), Half, Compact and List, for the home, tag and
  author pages. Full and Half share a frame switch (`listingFrame`, "Frame
  around images"), List a text size (`listingListSize`, `--list-size`). New `partials/listing-item.hbs`,
  `listing-date.hbs`, `listing-tags.hbs`; new helpers `ifListingMode`,
  `listingModeClass`, `firstImage` (Half falls back to the first image in the
  post) and `plainText`. A site saved before the option existed stays on Full.
  The option sits at the top of Layout, under Entry width, with its Half and
  List settings right below it. In Half, Compact and List the first post
  gets 24px of top space, which with the navbar's own spacing matches the
  gap above the footer.
- Per-tag layout: four tag templates, "Layout: Full", "Half", "Compact" and
  "List" (`tagTemplates`, files `tag-full.hbs` ... `tag-list.hbs`), chosen in
  Tag > Other options > Custom template, also when creating a tag. They wrap
  the shared `partials/tag-page.hbs` (the former `tag.hbs` body) in the new
  `withListingMode` helper, which hands the layout down as data; a tag with
  no template follows the theme setting.
- Publii preview shows a note ("Comments load on the published site, not in
  the Publii preview.", `post.commentsPreview`) in place of the comments.
  Comment services refuse the preview address, and Comentario then scrolled
  its error box into view, so the post jumped to its end.
- Full layout: the featured image and excerpt images fill the column at most
  16:9 high (a 1920×1080 image fits exactly, taller ones are trimmed);
  icon-size covers keep their size (`post__cover--small`).
- Word count after the date in the post meta line, on post pages and post
  listings (`2026.09.14 · 1200 words`). New `helpers.js` with a `wordCount`
  helper counts at render time; bilingual posts count one language only.
  Label string `post.words` (singular/plural). Two switches, both on by
  default: post option `displayWordCount` (post pages, also per post) and
  theme option `listingWordCount` (Layout > Post list).
- Language tabs follow the WAI-ARIA Tabs pattern: `lang.js` adds
  `role="tablist"`/`"tab"`/`"tabpanel"`, `aria-selected`, `aria-controls`
  and `aria-labelledby` at load time, with a roving tabindex and Left/Right,
  Home/End keyboard support. Existing tab markup needs no change.
  Tested with NVDA in a Chromium browser and axe-core.
- "Skip to content" link (`partials/head.hbs`, `.skip-link` in `main.css`,
  `partials.skipLink.label` string). Every template's `<main>` now has
  `id="main" tabindex="-1"` as its target.
- Theme options "Posts: show featured image without frame" and "Pages: show
  featured image without frame" (Layout > Featured image, `featuredImagePlain`
  and `featuredImagePlainPages`, both off by default, so existing sites keep
  the frame). When on, featured images on post pages and in post lists, or on
  pages, render edge to edge (`.post__cover--plain`).
- Theme option "Corner radius" (Layout > Featured image, `featuredImageRadius`,
  0 to 30 px, default 10), above the frame switches. Rounds the featured
  image frame (the image inside follows 4 px tighter), the frameless featured
  image, and every other post image: in the text, in excerpts and in
  galleries. Emitted as `--cover-radius`.
- Theme option "Readable small text" (Colors & Fonts, `readableSmallText`, off
  by default, so the faded look stays). When on, `theme-variables.js` checks
  the accent and the faded text against the background and moves each just
  far enough to reach WCAG AA 4.5:1: the accent keeps its hue and changes
  only lightness (meta line, its separators and author link, "Read more"),
  the faded text gets the lowest opacity that reads (tags, footer, RSS link).
  Colours that already pass are left alone; headings and hover colours don't
  change.
- New `thumbnail.png` showing the Terminal-Pub demo site (was the original
  Hugo Terminal image).

### Changed
- New default accent: Green `#45AE13` ("Green (Terminal-Pub default)", also
  the Custom accent's starting value). Terminal's green `#78E2A0` is now
  "Olive". New preset "Matrix" `#00FF41`. The Accent color note shows a
  swatch of every preset. Sites that already saved an accent keep it.
- Featured image frame is slimmer and rounded: 3 px border (was 5 px) with
  the new corner radius, on post pages and in post lists.

### Fixed
- Footer RSS link pointed to `//feed.xml` (relative URLs) or `https://site//feed.xml`
  (absolute URLs), because `@website.url` already ends with a slash. With relative
  URLs the browser read `//feed.xml` as the host "feed.xml". Now `{{@website.url}}feed.xml`.
- Previous/next post links read "[MISSING TRANSLATION]" to screen readers.
  `post.hbs` used `post.previousPost` and `post.nextPost`, which were never
  defined in `terminal-pub.lang.json` (inherited from the original Terminal
  theme). Added both strings and removed the stray double/trailing spaces in
  the `aria-label`.
- Footer RSS link is hidden while Publii's RSS feed is off (Site settings >
  Feed, `@config.site.feed.enableRss`), so it no longer leads to a 404.
- Copyright year script overwrote the start of a year range
  (`© 2019–2024` became `© 2026–2024`). A range now keeps its start year and
  only the end year is updated; a single year still becomes the current one.
- Screen readers couldn't read navbar submenus opened by keyboard. Terminal
  set `aria-hidden="true"` on every submenu (`partials/menu.hbs`) and cleared
  it only on mouse hover, so the `:focus-within` fix from 1.1.0 showed the
  links but kept them hidden from assistive tech. A closed submenu is already
  hidden by `visibility: hidden`, so the attribute is removed, and
  `scripts.js` no longer sets it back on mouse leave (`scripts.min.js`
  rebuilt).
- The mobile menu (sidebar and overlay) sat outside every landmark, so
  screen readers didn't list it as navigation (axe `region` rule, inherited
  from Terminal). `scripts.js` now builds its wrapper as a `<nav>` named like
  the menu button (`aria-label="Menu"`); `scripts.min.js` rebuilt. Checked in
  all four mobile menu modes (sidebar/overlay, expandable submenus on/off).
- With the hero on, home pages 2 and later had no `h1` (the first post got
  an `h2` on every page, but the hero only shows on page 1). Now the first
  post is the `h1` there.
- `tags.hbs` wrapped its content in a second `.content.page` div inside
  `<main class="content page">`; the duplicate wrapper is removed.
- X (Twitter) share link sent the site name as `via=` when no handle was set,
  which is not a valid handle. `via` is now left out in that case.
- `assets/css/style.css` was a 1.1.0 snapshot; refreshed from the current
  `main.css` (Publii rebuilds it on render either way).

## 1.1.2

### Fixed
- `assets/css/editor.css`: the `.lang-btn` tab labels ("Türkçe"/"English")
  were invisible in the Publii editor. `<button>` elements don't inherit
  `color`/`font` from the page by default, so without an explicit
  declaration they rendered in the browser's default button text style
  against the new dashed-border background. Added `color` and
  `font: inherit`.

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
