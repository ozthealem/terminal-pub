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
 * page that offers the same language. Each .lang-content block is also
 * auto-tagged with lang="<code>" (from its id) for screen readers, unless
 * you've already set one yourself.
 *
 * The tabs follow the WAI-ARIA Tabs pattern, added at load time so the
 * markup above needs no extra attributes: role="tablist"/"tab"/"tabpanel",
 * aria-selected, aria-controls, and keyboard support (Tab reaches the
 * selected tab, Left/Right switch tabs, Home/End jump to first/last).
 */
(function () {
    'use strict';

    var KEY = 'publiiLang';

    // Tag each block with its language (lang-tr -> lang="tr") so screen
    // readers pick the right pronunciation/voice, per WCAG 3.1.2. Runs once;
    // never overrides an attribute an author set on purpose.
    function tagLanguages(contents) {
        for (var i = 0; i < contents.length; i++) {
            var match = /^lang-(.+)$/.exec(contents[i].id || '');
            if (match && !contents[i].hasAttribute('lang')) {
                contents[i].setAttribute('lang', match[1]);
            }
        }
    }

    // WAI-ARIA Tabs pattern (https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
    // Without it a screen reader announces the tabs as plain buttons, can't
    // tell which one is selected, and a switch changes the content silently.
    // Never overrides a role, id or label the author set on purpose.
    function setupTabs() {
        var lists = document.querySelectorAll('.lang-tabs');
        for (var i = 0; i < lists.length; i++) {
            if (!lists[i].hasAttribute('role')) {
                lists[i].setAttribute('role', 'tablist');
            }

            var buttons = lists[i].querySelectorAll('.lang-btn');
            for (var j = 0; j < buttons.length; j++) {
                var button = buttons[j];
                var code = button.getAttribute('data-lang');
                var panel = code ? document.getElementById('lang-' + code) : null;

                button.setAttribute('role', 'tab');

                // the label is written in its own language ("Türkçe",
                // "English"), so screen readers should read it in that voice
                if (code && !button.hasAttribute('lang')) {
                    button.setAttribute('lang', code);
                }

                // ids must stay unique if a page repeats the tab bar
                if (!button.id && code && !document.getElementById('lang-tab-' + code)) {
                    button.id = 'lang-tab-' + code;
                }

                if (panel) {
                    button.setAttribute('aria-controls', panel.id);
                    if (!panel.hasAttribute('role')) {
                        panel.setAttribute('role', 'tabpanel');
                    }
                    if (button.id && !panel.hasAttribute('aria-labelledby')) {
                        panel.setAttribute('aria-labelledby', button.id);
                    }
                }
            }
        }
    }

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
            var selected = buttons[j].getAttribute('data-lang') === lang;
            buttons[j].classList.toggle('active', selected);
            buttons[j].setAttribute('aria-selected', selected ? 'true' : 'false');
            // roving tabindex: only the selected tab is a Tab stop
            buttons[j].setAttribute('tabindex', selected ? '0' : '-1');
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
        var contents = document.querySelectorAll('.lang-content');
        if (!contents.length) {
            return;
        }

        tagLanguages(contents);
        setupTabs();

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

        document.addEventListener('keydown', function (e) {
            var button = e.target && e.target.closest ? e.target.closest('.lang-btn') : null;
            var list = button ? button.closest('.lang-tabs') : null;
            if (!list) {
                return;
            }

            var tabs = Array.prototype.slice.call(list.querySelectorAll('.lang-btn'));
            var index = tabs.indexOf(button);
            var next;

            switch (e.key) {
                case 'ArrowRight': next = tabs[(index + 1) % tabs.length]; break;
                case 'ArrowLeft': next = tabs[(index - 1 + tabs.length) % tabs.length]; break;
                case 'Home': next = tabs[0]; break;
                case 'End': next = tabs[tabs.length - 1]; break;
                default: return;
            }

            e.preventDefault();
            var lang = next.getAttribute('data-lang');
            if (lang && apply(lang, true)) {
                next.focus();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
