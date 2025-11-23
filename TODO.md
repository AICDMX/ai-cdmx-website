# TODO

## AI CDMX Website

### WhatsApp Community
- [ ] Create WhatsApp Community hub section
- [ ] Add invite/join flow hint

### Internationalization (i18n)
- [ ] Auto-detect browser/system language (redirect to /en/ if English detected)
- [ ] Client-side language switching (no page reload)
  - Keep different URLs (`/` for ES, `/en/` for EN) using `history.pushState()`
  - **Option 1 (Quick):** Fetch other HTML file, swap DOM content
  - **Option 2 (Cleaner):** Store translations in JS object, use `data-i18n` attributes

### Icons
**All icons now using SVG (assets/svg-purple-logos/):**
- [x] X / Twitter
- [x] Instagram
- [x] Facebook
- [x] LinkedIn
- [x] TikTok
- [x] Discord
- [x] Telegram
- [x] Signal
- [x] WhatsApp
- [x] Meetup
- [x] Luma
- [x] YouTube

### Polish
- [x] Add favicon (created from purple 750x750 logo)
- [ ] Configure GitHub Pages deployment
