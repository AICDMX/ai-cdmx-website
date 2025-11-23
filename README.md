# AI CDMX Website

A lightweight HTML/JS/CSS website for the AI CDMX community.

## About

AI CDMX is a community for AI enthusiasts in Mexico City. This website serves as a central hub to connect members with our various platforms and events.

## Events

- [Meetup](https://www.meetup.com/ai-cdmx)
- [Luma](https://luma.com/ai-cdmx)
- [YouTube](https://www.youtube.com/@AICDMX) - Event live streams

## Community Channels

- [Discord](https://discord.gg/FQ7fAdnnJ5)
- [Telegram](https://t.me/AI_CDMX)
- [Signal](https://signal.group/#CjQKIB5gZjyHMHQvQh9IJbr8OSd6EMGpWlgO2LKDDFcrKl_dEhBUBxMqcQI5OD_NuFeFS3o2)
- [WhatsApp](https://chat.whatsapp.com/EMPPXiTzSg57Efo1f3bysZ)

## Social Media

- [X / Twitter](https://x.com/ai_cdmx)
- [Instagram](https://www.instagram.com/cdmxai/)
- [Facebook](https://www.facebook.com/aicdmx)
- [LinkedIn](https://www.linkedin.com/company/ai-cdmx)
- [TikTok](https://www.tiktok.com/@ai.cdmx)

## Features

- Dark mode design with custom color palette
- Spanish (/) and English (/en/) versions with language toggle
- Embedded Luma calendar for upcoming events
- Mobile responsive with hamburger menu
- Auto UTM tracking on external links
- Alpine.js for lightweight interactivity
- No build tools required

## Tech Stack

- HTML5, CSS3, JavaScript
- [Alpine.js](https://alpinejs.dev/) - Lightweight JS framework
- GitHub Pages hosting

## Development

This is a static site hosted on GitHub Pages. No build tools required for editing content, but we do generate an SVG sprite before deploying so icons only load once.

```
# Clone the repo
git clone https://github.com/AICDMX/ai-cdmx-website.git

# Install sprite builder deps once
npm install

# Generate the sprite (runs in CI as well)
npm run build:sprite

# Open index.html in your browser
```

## Asset Pipeline

All purple icons inside `assets/svg-purple-logos/` are optimized and merged into `assets/sprite.svg` via `npm run build:sprite`. GitHub Actions calls the same script on every deploy, so just re-run it locally if you add or update icons.

## License

MIT
