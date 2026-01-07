# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

```bash
# Install dependencies
npm install

# Full production build (sprite + hugo + rosey + meta descriptions)
npm run build
# Or: make build

# Development server (Spanish only, no Rosey i18n)
npm run dev
# Or: make dev

# Individual build steps
npm run build:sprite    # Build SVG sprite from assets/svg-purple-logos/
npm run build:hugo      # Build Hugo site to public/
npm run rosey:generate  # Extract Spanish base translations to rosey/base.json
npm run rosey:build     # Build multilingual site to dist/

# Serve production build locally
make serve              # Builds and starts server at http://localhost:8000
make down               # Stop the server

# Clean build artifacts
make clean
```

## Architecture

This is a bilingual Hugo static site using Rosey for internationalization. Spanish is the base language (`/`), English is generated at `/en/`.

### Build Pipeline

1. **SVG Sprite** (`scripts/build-sprite.mjs`) - Optimizes SVGs from `assets/svg-purple-logos/` into `assets/sprite.svg` and `assets/sprite-inline.js`
2. **Hugo** - Compiles templates + content to `public/`
3. **Rosey** - Takes `public/`, applies translations from `rosey/locales/en.json`, outputs to `dist/`
4. **Meta Descriptions** (`scripts/update-meta-descriptions.mjs`) - Post-processes English meta descriptions

### Key Directories

- `content/` - Markdown content with HTML using `data-rosey` attributes
- `layouts/` - Hugo templates (base, partials, page-specific)
- `rosey/locales/en.json` - English translations (manually edited)
- `rosey/base.json` - Spanish base extracted by Rosey (auto-generated, don't edit)
- `static/` - Static assets (CSS, JS, images)
- `assets/svg-purple-logos/` - Source SVGs for sprite generation

### Translation System

All translatable text requires `data-rosey="unique-key"` attributes in HTML:
```html
<h1 data-rosey="page-title">Título en Español</h1>
```

For meta descriptions, use `data-meta-key="meta-page-description"` on `<meta>` tags.

Translations go in `rosey/locales/en.json`:
```json
{
  "page-title": "Title in English",
  "meta-page-title": "Page Title",
  "meta-page-description": "Page description in English"
}
```

### Adding New Pages

1. Create `content/page-name/index.md` with HTML content using `data-rosey` attributes
2. Optionally create `layouts/page-name/single.html` for custom layout
3. Run `npm run rosey:generate` to extract Spanish text
4. Add English translations to `rosey/locales/en.json`
5. Run `npm run build`

### Design System

Dark mode only. Color palette defined in CSS variables:
- `--color-midnight` (#210039) - Main background
- `--color-deep-purple` (#440264) - Card backgrounds
- `--color-electric-blue` (#00aeff) - Primary accent, links
- `--color-hot-pink` (#e748c7) - Secondary accent
- `--color-soft-green` (#88c778) - Success states
