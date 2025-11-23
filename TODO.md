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

### New Pages
- [ ] Add a "Popular Videos" page highlighting YouTube live streams of previous events
- [ ] Create a bilingual Resources page (ES + EN) to help newcomers get started in different AI areas
- [ ] Build an Event Archive page with recaps, slides, and recordings
- [ ] Publish a Previous Sponsors page showcasing past supporters
- [ ] Launch a Volunteering page explaining roles and how to help
- [ ] Create a Speaker Guide page outlining requirements, expectations, and signup process
- [ ] Add a Leadership page with bios, roles, and LinkedIn links
- [ ] Stand up a Job Board page to highlight roles from sponsors and community startups
- [ ] Showcase Open Source contributions and repositories page
- [ ] Highlight Hackathons page with upcoming and past hackathon info
- [ ] Tool Directory page with curated AI tools/frameworks/APIs and local alternatives
- [ ] Partner Communities page linking to groups like Python CDMX, Datapub, Google User Group
- [ ] Event Locations page featuring venues like Hashtag Gallery and Casa Reafel Galavan
- [ ] Code of Conduct page outlining community expectations and reporting process
- [ ] Unlisted Sponsor Prospectus page (no public links, no indexing)
- [ ] Accessibility & Inclusion page detailing venue accessibility and support services

### FAQ Page
- [ ] Draft FAQ structure and intro
- [ ] Explain how to join/attend events (registration, cost, locations)
- [ ] Summarize community guidelines and code of conduct
- [ ] Describe volunteering pathways and expectations
- [ ] Cover speaker submissions and review timelines
- [ ] Note how sponsors can partner or support initiatives

### Polish
- [ ] Acquire and configure a .com domain for the site (pointing to GitHub Pages)
- [ ] Launch an email list and integrate a signup form on the site
- [ ] Add privacy-friendly analytics (Clicky or open-source alternative)
- [ ] Configure search indexing (Google, Bing, DuckDuckGo) / webmaster verification
