/*
 * Terminal-Pub - custom Handlebars helpers (loaded by Publii from the theme root)
 *
 * {{wordCount text}}  ->  number of words in a post's HTML
 *
 * Used in the post meta line on post pages and post listings:
 *   {{#with (wordCount text) as |words|}}{{#if words}}{{words}} {{translate 'post.words' words}}{{/if}}{{/with}}
 *
 * Bilingual posts (see assets/js/lang.js) carry the same text once per
 * language, so only one .lang-content block is counted: the one marked
 * "active" in the markup, otherwise the first. Text outside the blocks is
 * always counted.
 */

var LANG_BLOCK = /<div\b[^>]*\bclass\s*=\s*["'][^"']*\blang-content\b[^"']*["'][^>]*>/gi;

// index just past the </div> that closes the div opened before `from`
function closingDiv(html, from) {
    var tags = /<div\b|<\/div\s*>/gi;
    var depth = 1;
    var match;

    tags.lastIndex = from;

    while ((match = tags.exec(html))) {
        depth += match[0].charAt(1) === '/' ? -1 : 1;

        if (depth === 0) {
            return { inner: match.index, end: match.index + match[0].length };
        }
    }

    return { inner: html.length, end: html.length };
}

// the post HTML with every language block but one removed
function oneLanguage(html) {
    var outside = '';
    var chosen = null;
    var first = null;
    var last = 0;
    var match;

    LANG_BLOCK.lastIndex = 0;

    while ((match = LANG_BLOCK.exec(html))) {
        var bodyStart = match.index + match[0].length;
        var close = closingDiv(html, bodyStart);
        var body = html.slice(bodyStart, close.inner);

        outside += html.slice(last, match.index);
        last = close.end;
        LANG_BLOCK.lastIndex = close.end;

        if (first === null) {
            first = body;
        }

        if (chosen === null && /\bactive\b/.test(match[0])) {
            chosen = body;
        }
    }

    if (first === null) {
        return html;
    }

    return outside + html.slice(last) + ' ' + (chosen !== null ? chosen : first);
}

function countWords(html) {
    var plain = oneLanguage(String(html || ''))
        .replace(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&(nbsp|#160);/gi, ' ')
        .replace(/&[#a-z0-9]+;/gi, '');

    return plain.split(/\s+/).filter(function (word) {
        return /[\p{L}\p{N}]/u.test(word);
    }).length;
}

// value of an <img> attribute, or ''
function attribute(tag, name) {
    var match = tag.match(new RegExp('\\s' + name + '\\s*=\\s*("([^"]*)"|\'([^\']*)\')', 'i'));
    return match ? (match[2] !== undefined ? match[2] : match[3]) : '';
}

var LISTING_MODES = ['full', 'half', 'compact', 'list'];

// the post list layout: a tag template's choice (tag-half.hbs etc., set by
// withListingMode) when present, otherwise the theme setting (Layout > Layout
// mode); "full" when unset
function listingMode(options) {
    var data = options && options.data;
    if (data && LISTING_MODES.indexOf(data.listingModeOverride) > -1) {
        return data.listingModeOverride;
    }

    var custom = data && data.config && data.config.custom;
    return (custom && LISTING_MODES.indexOf(custom.listingMode) > -1) ? custom.listingMode : 'full';
}

module.exports = {
    wordCount: function (text) {
        return countWords(text);
    },

    /*
     * {{#withListingMode "half"}}{{> tag-page}}{{/withListingMode}}
     * Used by the tag templates (Tag > Other options > Custom template): the
     * layout is handed down as data, so every nested block and partial sees it.
     */
    withListingMode: function (mode, options) {
        var data = {};
        for (var key in options.data) {
            data[key] = options.data[key];
        }
        data._parent = options.data;
        data.listingModeOverride = mode;
        return options.fn(this, { data: data });
    },

    /*
     * {{#ifListingMode "half"}}...{{else}}...{{/ifListingMode}}
     * Block helper for the post list layout (Full / Half / Compact / List).
     * A site saved before the option existed falls back to "full".
     */
    ifListingMode: function (mode, options) {
        return listingMode(options) === mode ? options.fn(this) : options.inverse(this);
    },

    // " posts--full", " posts--half"... class for the .posts wrapper
    listingModeClass: function (options) {
        return ' posts--' + listingMode(options);
    },

    /*
     * {{#with (firstImage text)}}<img src="{{url}}" ...>{{/with}}
     * The first image in a post's HTML, used by the Half layout when a post
     * has no featured image. In bilingual posts only one language block is
     * searched, like wordCount. Nothing when the post has no image.
     */
    firstImage: function (text) {
        var tag = String(oneLanguage(String(text || ''))).match(/<img\b[^>]*>/i);
        if (!tag) {
            return null;
        }

        var url = attribute(tag[0], 'src');
        if (!url) {
            return null;
        }

        return {
            url: url,
            alt: attribute(tag[0], 'alt'),
            width: parseInt(attribute(tag[0], 'width'), 10) || 0,
            height: parseInt(attribute(tag[0], 'height'), 10) || 0
        };
    },

    // {{plainText excerpt}} -> the excerpt as plain text, images and tags removed
    plainText: function (html) {
        return String(html || '')
            .replace(/<(figure|script|style)\b[\s\S]*?<\/\1\s*>/gi, ' ')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/gi, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }
};
