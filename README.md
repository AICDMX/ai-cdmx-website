# AI CDMX Website

A bilingual (Spanish/English) static website for the AI CDMX community, built with Hugo and Rosey for internationalization.

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

## Tech Stack

- [Hugo](https://gohugo.io/) - Static site generator
- [Rosey](https://rosey.app/) - Internationalization (i18n) tool
- [Alpine.js](https://alpinejs.dev/) - Lightweight JS framework for interactivity
- GitHub Pages hosting

## Features

- Bilingual website (Spanish at `/`, English at `/en/`)
- Dark mode design with custom color palette
- Rosey-powered internationalization
- Mobile responsive with hamburger menu
- Auto UTM tracking on external links
- SVG sprite system for optimized icon loading

## Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.110.0+
- Node.js 18+
- npm

### Local Development

```bash
# Clone the repo
git clone https://github.com/AICDMX/ai-cdmx-website.git
cd ai-cdmx-website

# Install dependencies
npm install

# Run Hugo development server (Spanish version)
npm run dev

# Build for production
npm run build
```

### Build Process

The build process consists of three main steps:

1. **Build SVG Sprite** (`npm run build:sprite`)
   - Optimizes and combines all SVG icons from `assets/svg-purple-logos/`
   - Generates `assets/sprite.svg` and `assets/sprite-inline.js`

2. **Build Hugo Site** (`npm run build:hugo`)
   - Compiles Hugo templates and content
   - Outputs to `public/` directory
   - Minifies HTML output

3. **Build Multilingual with Rosey** (`npm run rosey:build`)
   - Takes the Hugo output from `public/`
   - Applies translations from `rosey/locales/en.json`
   - Generates final multilingual site in `dist/`
   - Spanish version at root (`/`)
   - English version at `/en/`

### Project Structure

```
.
├── content/              # Hugo content (markdown)
│   ├── _index.md        # Homepage content
│   ├── privacy/         # Privacy policy
│   └── tos/             # Terms of service
├── layouts/             # Hugo templates
│   ├── _default/        # Default templates
│   │   ├── baseof.html  # Base template
│   │   └── single.html  # Single page template
│   ├── partials/        # Reusable components
│   │   ├── head.html
│   │   ├── header.html
│   │   └── footer.html
│   └── index.html       # Homepage template
├── static/              # Static assets
│   ├── assets/          # Logos and sprites
│   ├── css/            # Stylesheets
│   └── main.js         # JavaScript
├── rosey/              # Rosey translations
│   ├── locales/        # Translation files
│   │   └── en.json     # English translations
│   ├── base.json       # Generated base (Spanish)
│   └── base.urls.json  # URL mappings
├── hugo.toml           # Hugo configuration
├── rosey.toml          # Rosey configuration
└── package.json        # Node.js dependencies & scripts
```

## Translations

Translations are managed using Rosey. The Spanish content (default language) is marked up with `data-rosey` attributes in the Hugo templates. The English translations are stored in `rosey/locales/en.json`.

### Adding New Translations

1. Add `data-rosey="key-name"` attributes to every translatable element (page `<title>` tags also use keys that start with `meta-`).
2. Add `data-meta-key="meta-*-description"` to `<meta name="description">` tags so the meta-description updater can wire in the right English copy.
3. Run `npm run rosey:generate` to update `rosey/base.json`.
4. Add corresponding English translations to `rosey/locales/en.json` (include entries for both the visible content keys and every `meta-*-title` / `meta-*-description` pair you added).
5. Run `npm run build` to regenerate the site.

### Translation Files

- `rosey/base.json` - Auto-generated from Spanish content (don't edit manually)
- `rosey/locales/en.json` - English translations (edit to update English text)

## Deployment

The site deploys automatically to GitHub Pages via GitHub Actions when changes are pushed to the `master` branch. The workflow:

1. Installs Node.js dependencies
2. Sets up Hugo Extended
3. Runs the full build process (`npm run build`)
4. Deploys the `dist/` folder to GitHub Pages

## License

MIT
