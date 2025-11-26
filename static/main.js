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
   * Initialize
   */
  function init() {
    addUtmToExternalLinks();
    detectLanguage();
    updateLanguageToggleLabel();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/**
 * Set the language toggle label based on the current path
 */
function updateLanguageToggleLabel() {
  const langToggle = document.querySelector('.lang-toggle');
  if (!langToggle) return;

  const path = window.location.pathname.toLowerCase();
  const isEnglish = path === '/en' || path.startsWith('/en/');
  langToggle.textContent = isEnglish ? 'ES' : 'EN';
}

/**
 * Toggle between Spanish and English versions of the current page
 */
function toggleLanguage(event) {
  event.preventDefault();

  const currentPath = window.location.pathname;
  let newPath;

  if (currentPath.startsWith('/en/')) {
    // Switch from English to Spanish
    newPath = currentPath.replace('/en/', '/es/');
  } else if (currentPath.startsWith('/es/')) {
    // Switch from Spanish to English
    newPath = currentPath.replace('/es/', '/en/');
  } else {
    // Root path - go to English
    newPath = '/en' + currentPath;
  }

  window.location.href = newPath;
}
