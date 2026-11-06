---
primary: "#865910"
secondary: "#d4a04a"
accent: "#f3ebdd"
neutral: "#15141a"
background: "#f5f4f0"
white: "#ffffff"
---

# Wove — Style Reference
> A precision engine of aged parchment and industrial obsidian. The visual language feels like a high-frequency trading floor built inside a heritage library, where warm ochre embers meet the cold, sharp edges of global logistics.

**Website URL:** https://wove.com/
**Theme:** light

Wove employs a sophisticated "Execution Engine" aesthetic that balances high-density data with a warm, tactile palette. The canvas alternates between a deep Obsidian (#15141a) and a soft, breathable Alabaster (#f5f4f0), creating a rhythmic high-contrast experience. Typography is a disciplined mix of technical Monospace for data and authoritative Sans-Serif for messaging, often utilizing tight negative letter-spacing to imply speed and efficiency. The shape language is strictly functional, using minimal 4px radii for structural elements and full-pill radii for interactive badges, all grounded by a radial dot-grid motif that suggests a digital fabric or "wove" texture.

## Tokens — Colors

| Name | Value | Token | Role |
| :--- | :--- | :--- | :--- |
| Obsidian | #15141a | `color-neutral-obsidian` | The primary dark surface and text color. It provides the heavy industrial weight for headers and primary canvas sections. |
| Alabaster | #f5f4f0 | `color-neutral-alabaster` | The primary light canvas and background color. Used to create a soft, paper-like reading environment. |
| Raw Umber | #865910 | `color-primary-umber` | The brand's signature "Execution" color. Used for high-impact backgrounds, borders, and primary semantic emphasis. |
| Ochre | #d4a04a | `color-secondary-ochre` | A lighter, glowing metallic tone used for secondary accents, text highlights, and interactive states. |
| Parchment | #f3ebdd | `color-accent-parchment` | A warm, tinted neutral used for subtle section backgrounds and pulse animations. |
| Stone | #cecbc6 | `color-neutral-stone` | The primary border color. Used to define the grid and separate UI elements without high contrast. |
| Charcoal | #4a4643 | `color-neutral-charcoal` | A muted text color used for secondary body copy and metadata to reduce visual noise. |
| White | #ffffff | `white` | White (#ffffff) — text on filled buttons, canvas. Never used as a standalone surface color. |

## Tokens — Typography

### Sans — Primary Interface · `font-sans`
- **Substitute:** Inter, Manrope, Public Sans
- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold)
- **Sizes:** 15px, 16px, 17px, 19px, 26px, 32px, 48px, 60px, 84px
- **Line height:** 24px to 84px
- **Letter spacing:** -3.36px at 84px (-0.04em)
- **OpenType features:** Default
- **Role:** The workhorse of the system. It handles everything from massive display headlines to functional button labels. The tight negative letter-spacing on larger sizes gives the brand a compressed, urgent, and modern feel.

### Mono — Technical Data · `font-mono`
- **Substitute:** JetBrains Mono, IBM Plex Mono
- **Weights:** 400, 500
- **Sizes:** 11px, 15px
- **Line height:** 16.5px
- **Letter spacing:** 2.2px
- **OpenType features:** Default
- **Role:** Used exclusively for technical metadata, captions, and the "Execution Engine" details. The wide letter-spacing (2.2px) at small sizes ensures legibility and reinforces the machine-readable aesthetic.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
| :--- | :--- | :--- | :--- | :--- |
| Display | 84px | 84px | -3.36px | `text-display` |
| Heading-lg | 60px | 60px | -2.1px | `text-h1` |
| Heading | 48px | 50.4px | -1.44px | `text-h2` |
| Subheading | 32px | 36.8px | -0.64px | `text-h3` |
| Body-lg | 22px | 31.9px | -0.44px | `text-body-lg` |
| Body | 16px | 24px | normal | `text-body` |
| Caption | 11px | 16.5px | 2.2px | `text-caption` |

## Tokens — Spacing & Shapes

**Density:** spacious

### Spacing Scale

| Name | Value | Token | Description |
| :--- | :--- | :--- | :--- |
| 2px | 2px | `spacing-2px` | Micro-padding for inline spans and tight borders. |
| 6px | 6px | `spacing-6px` | Gap for button icons and small text groupings. |
| 3 | 12px | `spacing-3` | Standard gap for small div containers and navigation items. |
| 4 | 16px | `spacing-4` | Default padding for inputs and small buttons. |
| 6 | 24px | `spacing-6` | Section-level gaps and internal card padding. |
| 10 | 40px | `spacing-10` | Large gaps between text blocks and section headers. |
| 28 | 112px | `spacing-28` | Major vertical section padding. |

### Border Radius

| Element | Value |
| :--- | :--- |
| Small | 2px |
| Buttons/Inputs | 4px |
| Cards | 4px |
| Pills | 9999px |

### Layout
- **Page max-width:** 1200px
- **Section gap:** 112px
- **Card padding:** 20px
- **Element gap:** 24px

## Components

### Primary CTA Button
**Role:** Main Action
A solid Obsidian (#15141a) rectangular block with a subtle 4px border-radius. Text is set in Alabaster (#f5f4f0) at 14px, weight 400. The component is characterized by its lack of internal vertical padding (0px) in specific contexts, relying on fixed heights or flex centering.

### Category Tag Badge
**Role:** Metadata Label
A full-pill (#9999px) badge with a Raw Umber (#865910) background. Text is set in Charcoal (#107, 103, 98) at a tiny 10px size with a 400 weight. It uses 2px vertical and 8px horizontal padding.

### Search Input Field
**Role:** Data Entry
A stark White (#ffffff) field with a Stone (#cecbc6) border. It features a unique asymmetrical radius (4px 0px 0px 4px) for grouped layouts. Text is Obsidian (#15141a) at 15px with 16px horizontal padding.

### Feature Card
**Role:** Content Container
A light surface card using Alabaster (#fbfaf8) with a 4px radius. It features a soft Obsidian shadow (rgba(21, 20, 26, 0.35)) with a 6px blur and -10px spread, creating a "lifted" effect without harsh edges.

## Do's and Don'ts

### Do
- Use negative letter-spacing on all headings above 32px.
- Pair technical Monospace text with wide 2.2px tracking for captions.
- Use the Raw Umber (#865910) for primary brand pulses and highlights.
- Maintain a strict 4px radius for all functional UI components.
- Utilize the radial dot-grid background for large Obsidian sections.
- Keep section vertical padding generous at 112px.

### Don't
- Never use pure White (#ffffff) as a primary section background.
- Do not use rounded corners on images; keep them square (0px).
- Avoid using Bold (700) weights; stick to 600 (Semi-bold) for emphasis.
- Never pair Alabaster text on Ochre backgrounds (fails accessibility).
- Do not use shadows on buttons; keep them flat and architectural.
- Avoid irregular spacing; stick to the 4px-based scale.

## Surfaces

| Level | Name | Value | Purpose |
| :--- | :--- | :--- | :--- |
| Level 0 | Canvas | #15141a | Deep background for high-impact hero and footer sections. |
| Level 1 | Section | #f5f4f0 | Main reading surface for content-heavy areas. |
| Level 2 | Card | #865910 | High-contrast brand containers for featured content. |
| Level 3 | Elevated | #d4a04a | Interactive highlights and secondary containers. |
| Level 4 | Overlay | #3a383d | Dark mode popovers and tooltips. |

## Elevation
The system uses a "Flat-Lift" philosophy. Depth is primarily achieved through high-contrast color blocking (Obsidian vs. Alabaster). Where physical elevation is required, it uses a single, highly-diffused shadow (rgba(21, 20, 26, 0.35)) that pulls the element away from the surface without creating a traditional "floating" look.

## Imagery
Imagery is strictly functional and square. Product thumbnails and partner logos are treated as "fill" objects with 0px border-radii. The visual style is augmented by two radial gradients: a soft Alabaster glow for lighting and a technical dot-matrix pattern (1px dots) for texture.

## Agent Prompt Guide

### Quick Color Reference
- **Canvas Dark**: `#15141a` (Obsidian)
- **Canvas Light**: `#f5f4f0` (Alabaster)
- **Brand Primary**: `#865910` (Raw Umber)
- **Brand Secondary**: `#d4a04a` (Ochre)
- **Border**: `#cecbc6` (Stone)

### Example Component Prompts
1. **Primary Button**: Create a button with background-color #15141a, text-color #f5f4f0, font-size 14px, border-radius 4px, and padding 8px 22px.
2. **Feature Card**: Create a container with background-color #fbfaf8, border-radius 4px, box-shadow 0px 6px 18px -10px rgba(21, 20, 26, 0.35), and padding 20px.
3. **Technical Caption**: Create a text element using font-mono, size 11px, color #6b6762, letter-spacing 2.2px, and line-height 16.5px.
4. **Hero Heading**: Create an H1 heading with font-sans, size 84px, weight 600, color #15141a, and letter-spacing -3.36px.

### Signature Motifs
1. **Compressed Display**: Massive headlines with aggressive negative tracking.
2. **The Dot Matrix**: Radial dot-grid patterns used as a background texture.
3. **Industrial Ochre**: The specific use of #865910 as a structural rather than decorative color.

### Similar Brands
- **Flexport** — Shared DNA in global trade logistics and clean, data-heavy interface design.
- **Stripe** — Similar use of high-precision typography and subtle elevation.
- **Linear** — Shared focus on high-density, high-performance tool aesthetics.
- **Vercel** — Similar high-contrast dark/light mode transitions and geometric discipline.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-obsidian: #15141a;
  --color-alabaster: #f5f4f0;
  --color-umber: #865910;
  --color-ochre: #d4a04a;
  --color-stone: #cecbc6;

  /* Typography — Font Families */
  --font-sans: '__fontSans_4eb6f8';
  --font-display: '__fontDisplay_c32a4e';
  --font-mono: '__fontMono_d8f362';

  /* Typography — Scale */
  --text-display: 84px;
  --text-h1: 60px;
  --text-body: 16px;
  --leading-display: 84px;
  --leading-body: 24px;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-28: 112px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 112px;
  --card-padding: 20px;
  --element-gap: 24px;

  /* Border Radius */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-full: 9999px;

  /* Surfaces */
  --surface-canvas: #15141a;
  --surface-section: #f5f4f0;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-obsidian: #15141a;
  --color-alabaster: #f5f4f0;
  --color-umber: #865910;
  --color-ochre: #d4a04a;

  /* Typography */
  --font-sans: '__fontSans_4eb6f8';
  --font-mono: '__fontMono_d8f362';

  /* Typography — Scale */
  --text-display: 84px;
  --text-h1: 60px;

  /* Spacing */
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-112: 112px;

  /* Border Radius */
  --radius-md: 4px;
}
```