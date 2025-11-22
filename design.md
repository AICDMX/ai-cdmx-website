# AI CDMX Design System

## Philosophy

Modern, clean, minimal. Dark mode only. Fast loading, no bloat.

## Color Palette

| Hex       | Name          | Spanish       | Usage                          |
|-----------|---------------|---------------|--------------------------------|
| `#00aeff` | Electric Blue | Azul Eléctrico | Primary accent, links, CTAs   |
| `#88c778` | Soft Green    | Verde Suave   | Success, positive highlights   |
| `#e748c7` | Hot Pink      | Rosa Intenso  | Secondary accent, highlights   |
| `#440264` | Deep Purple   | Morado Profundo | Backgrounds, cards           |
| `#210039` | Midnight      | Medianoche    | Main background                |

### CSS Variables

```css
:root {
  --color-electric-blue: #00aeff;
  --color-soft-green: #88c778;
  --color-hot-pink: #e748c7;
  --color-deep-purple: #440264;
  --color-midnight: #210039;

  /* Semantic */
  --color-bg: var(--color-midnight);
  --color-bg-card: var(--color-deep-purple);
  --color-primary: var(--color-electric-blue);
  --color-secondary: var(--color-hot-pink);
  --color-accent: var(--color-soft-green);
  --color-text: #ffffff;
  --color-text-muted: #b0b0b0;
}
```

## Typography

- **Font**: System font stack (fast, native feel)
- **Headings**: Bold, clean
- **Body**: Regular weight, good line height for readability

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

## Layout

- Mobile-first responsive
- Max content width: 1200px
- Generous whitespace
- Card-based sections

## Components

### Buttons
- Rounded corners (8px)
- Solid fill for primary actions
- Outline for secondary actions
- Hover: subtle glow effect

### Cards
- Background: Deep Purple
- Border radius: 12px
- Subtle shadow or border
- Padding: 24px

### Links
- Electric Blue default
- Hot Pink on hover
- No underline unless in body text

## Spacing Scale

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

## Animations

- Keep minimal and subtle
- Transitions: 200ms ease
- No heavy animations (performance first)
