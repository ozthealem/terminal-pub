/*
 * Terminal-Pub — in-page bilingual content tabs
 *
 * Markup pattern (place anywhere in a post/page, e.g. an HTML block):
 *
 *   <div class="lang-tabs">
 *     <button class="lang-btn" data-lang="tr">Türkçe</button>
 *     <button class="lang-btn" data-lang="en">English</button>
 *   </div>
 *   <div id="lang-tr" class="lang-content active">... Türkçe ...</div>
 *   <div id="lang-en" class="lang-content">... English ...</div>
 *
 * The visitor's choice is remembered (localStorage) and re-applied on every
 * page that offers the same language.
 */
(function () {
    'use strict';

    var KEY = 'publiiLang';

    function apply(lang, remember) {
        var contents = document.querySelectorAll('.lang-content');
        if (!contents.length) {
            return false;
        }

        var matched = false;
        for (var i = 0; i < contents.length; i++) {
            var on = contents[i].id === 'lang-' + lang;
            contents[i].classList.toggle('active', on);
            if (on) {
                matched = true;
            }
        }

        // this page has .lang-content blocks, but none for the requested language
        if (!matched) {
            return false;
        }

        var buttons = document.querySelectorAll('.lang-btn');
        for (var j = 0; j < buttons.length; j++) {
            buttons[j].classList.toggle('active', buttons[j].getAttribute('data-lang') === lang);
        }

        document.documentElement.setAttribute('lang', lang);

        if (remember) {
            try {
                localStorage.setItem(KEY, lang);
            } catch (e) {}
        }

        return true;
    }

    function init() {
        if (!document.querySelector('.lang-content')) {
            return;
        }

        var saved = null;
        try {
            saved = localStorage.getItem(KEY);
        } catch (e) {}

        if (!saved || !apply(saved, false)) {
            // fall back to the tab the author marked active, then the first one
            var fallback = document.querySelector('.lang-btn.active') || document.querySelector('.lang-btn');
            if (fallback) {
                apply(fallback.getAttribute('data-lang'), false);
            }
        }

        document.addEventListener('click', function (e) {
            var button = e.target && e.target.closest ? e.target.closest('.lang-btn') : null;
            if (!button) {
                return;
            }
            var lang = button.getAttribute('data-lang');
            if (lang) {
                apply(lang, true);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
