/**
 * AI CDMX Website - Main JavaScript
 */

(function() {
  'use strict';

  // UTM Configuration
  const UTM_CONFIG = {
    source: 'aicdmx_website',
    // URLs to exclude from UTM tracking (exact match or startsWith)
    excludeList: [
      // Add URLs that shouldn't have UTM params
      // Example: 'https://example.com'
    ]
  };

  /**
   * Check if URL should be excluded from UTM tracking
   */
  function isExcluded(url) {
    return UTM_CONFIG.excludeList.some(excluded =>
      url === excluded || url.startsWith(excluded)
    );
  }

  /**
   * Add UTM parameters to external links
   */
  function addUtmToExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    const currentHost = window.location.hostname;

    links.forEach(link => {
      const url = new URL(link.href);

      // Skip internal links
      if (url.hostname === currentHost) return;

      // Skip excluded URLs
      if (isExcluded(link.href)) return;

      // Skip if already has utm_source
      if (url.searchParams.has('utm_source')) return;

      // Add UTM parameters
      url.searchParams.set('utm_source', UTM_CONFIG.source);
      link.href = url.toString();
    });
  }

  /**
   * Detect browser language and offer redirect (optional)
   * Only runs on first visit, respects user choice
   */
  function detectLanguage() {
    const hasVisited = localStorage.getItem('aicdmx_visited');
    if (hasVisited) return;

    const browserLang = navigator.language || navigator.userLanguage;
    const isEnglish = browserLang.startsWith('en');
    const isOnEnglishPage = window.location.pathname.startsWith('/en');
    const isOnSpanishPage = window.location.pathname === '/' || window.location.pathname === '/index.html';

    // If English browser and on Spanish page, could redirect to /en/
    // Currently disabled - uncomment to enable auto-redirect
    // if (isEnglish && isOnSpanishPage) {
    //   window.location.href = '/en/';
    // }

    localStorage.setItem('aicdmx_visited', 'true');
  }

  /**
   * Inline the SVG sprite when running over the file: protocol to avoid
   * browser security restrictions with <use href="file://...">.
   */
  function inlineSpriteForFileProtocol() {
    if (window.location.protocol !== 'file:') return;

    const uses = Array.from(document.querySelectorAll('use'));
    const spriteHref = uses
      .map((el) => el.getAttribute('href') || el.getAttribute('xlink:href'))
      .filter((href) => href && href.includes('sprite.svg#'))[0];

    if (!spriteHref) return;

    const [spritePath] = spriteHref.split('#');

    const fetchWithXhrFallback = () => new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', spritePath, true);
      xhr.overrideMimeType('image/svg+xml');
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else if (xhr.status === 0 && xhr.responseText) {
          // Most browsers report status 0 for successful file:// loads
          resolve(xhr.responseText);
        } else {
          reject(new Error(`XHR sprite load failed with status ${xhr.status}`));
        }
      };
      xhr.onerror = () => reject(new Error('XHR sprite load failed'));
      xhr.send();
    });

    const fetchSprite = typeof fetch === 'function'
      ? fetch(spritePath).then((response) => {
          if (!response.ok) {
            throw new Error(`Sprite request failed with status ${response.status}`);
          }
          return response.text();
        }).catch(() => fetchWithXhrFallback())
      : fetchWithXhrFallback();

    fetchSprite
      .then((svgText) => {
        const holder = document.createElement('div');
        holder.style.display = 'none';
        holder.innerHTML = svgText;
        document.body.insertBefore(holder, document.body.firstChild);

        uses.forEach((el) => {
          const href = el.getAttribute('href') || el.getAttribute('xlink:href');
          if (!href || !href.startsWith(spritePath + '#')) return;
          const id = href.split('#')[1];
          if (!id) return;
          el.setAttribute('href', `#${id}`);
          el.setAttribute('xlink:href', `#${id}`);
        });
      })
      .catch((error) => {
        console.error('Failed to inline SVG sprite for local preview:', error);
      });
  }

  /**
   * Initialize
   */
  function init() {
    addUtmToExternalLinks();
    detectLanguage();
    inlineSpriteForFileProtocol();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
