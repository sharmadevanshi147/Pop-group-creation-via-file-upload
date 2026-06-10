# Fold Health Design Tokens

> Source of truth: Figma file `Fold-Pixel-1.0` (fileKey: sl3qIVN0dpG7VztXV1V2BT).
> Every value here is extracted directly from Figma variables and node specs.
> Do not override or approximate these values.

---

## Core Design Rules (Non-Negotiable)

1. **Font**: Inter only. Only Regular (400) and Medium (500) weights. Never Bold, SemiBold, or any other weight.
2. **Icons**: Solar Icons (solar-icons.vercel.app) — outline style, 24×24px default.
3. **Border Radius**: 8px standard. 4px for small components (checkboxes, input fields, small badges). 12px for large containers (dialogs, calendars, cards, modals).
4. **Border Stroke**: Always 0.5px. Never 1px unless explicitly noted for active/focus states.
5. **Avatars**: Rounded square by default. Radii scale with size: XS=4, S=6, M=8, L=8, XL=12, 2XL=16.

---

## Font Family

**Inter** is the only typeface. No exceptions.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

Import via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

---

## Typography Scale

All text styles use `line-height: 1.2` and `letter-spacing: 0` unless noted.

### Heading Styles

| Style Name | Size | Weight | CSS Weight | Letter Spacing | Use For |
|------------|------|--------|------------|----------------|---------|
| H1/40/Medium | 40px | Medium | 500 | 0 | Hero headers, page titles |
| H1/40/Medium Alt | 40px | Medium | 500 | 0 | Page titles (lighter) |
| H1/40/Medium | 40px | Medium | 500 | 0 | Page titles (lightest) |
| H1/40/Regular | 40px | Regular | 400 | 0 | Display text |
| H1/36/Bold | 36px | Medium | 500 | 0 | Large section headers |
| H1/36/Semi Bold | 36px | Medium | 500 | 0 | Large section headers |
| H1/36/Medium | 36px | Medium | 500 | 0 | Large section headers |
| H1/36/Regular | 36px | Regular | 400 | 0 | Large display text |
| H2/30/Bold | 30px | Medium | 500 | 0 | Section headers |
| H2/30/Semi Bold | 30px | Medium | 500 | 0 | Section headers |
| H2/30/Medium | 30px | Medium | 500 | 0 | Section headers |
| H2/30/Regular | 30px | Regular | 400 | 0 | Section headers |
| H2/24/Bold | 24px | Medium | 500 | 0 | Sub-section headers |
| H2/24/Semi Bold | 24px | Medium | 500 | 0 | Sub-section headers |
| H2/24/Medium | 24px | Medium | 500 | 0 | Sub-section headers |
| H2/24/Regular | 24px | Regular | 400 | 0 | Sub-section headers |
| H2/20/Bold | 20px | Medium | 500 | 0 | Card/panel headers |
| H2/20/Semi Bold | 20px | Medium | 500 | 0 | Card/panel headers |
| H2/20/Medium | 20px | Medium | 500 | 0 | Card/panel headers |
| H2/20/Regular | 20px | Regular | 400 | 0 | Card/panel headers |

### Body / H3 Styles

| Style Name | Size | Weight | CSS Weight | Letter Spacing | Use For |
|------------|------|--------|------------|----------------|---------|
| H3/18/Bold | 18px | Medium | 500 | 0 | Emphasized body |
| H3/18/Semi Bold | 18px | Medium | 500 | 0 | Emphasized body |
| H3/18/Medium | 18px | Medium | 500 | 0 | Emphasized body |
| H3/18/Regular | 18px | Regular | 400 | 0 | Emphasized body |
| H3/16/Bold | 16px | Medium | 500 | 0 | Card titles, labels |
| H3/16/Semi Bold | 16px | Medium | 500 | 0 | Card titles, labels |
| H3/16/Medium | 16px | Medium | 500 | 0 | Card titles, labels |
| H3/16/Regular | 16px | Regular | 400 | 0 | Body text |
| H3/14/Bold | 14px | Medium | 500 | 0 | Table headers, emphasis |
| H3/14/Semi Bold | 14px | Medium | 500 | 0 | Table headers |
| H3/14/Medium | 14px | Medium | 500 | 0 | Button labels, nav items |
| H3/14/Regular | 14px | Regular | 400 | 0 | Standard body text |
| H3/12/Bold | 12px | Medium | 500 | 0 | Small bold labels |
| H3/12/Semi Bold | 12px | Medium | 500 | 0 | Badge text, small labels |
| H3/12/Medium | 12px | Medium | 500 | 0 | Captions, tags |
| H3/12/Regular | 12px | Regular | 400 | 0 | Helper text, footnotes |
| H3/10/Bold | 10px | Medium | 500 | 0 | Tiny labels (use sparingly) |
| H3/10/Semi Bold | 10px | Medium | 500 | 0 | Tiny labels |
| H3/10/Medium | 10px | Medium | 500 | 0 | Tiny labels |
| H3/10/Regular | 10px | Regular | 400 | 0 | Tiny labels |

### Caps (Uppercase) Styles

Caps styles use `text-transform: uppercase` and have a proportional letter-spacing
(Figma uses a `letterSpacing: 5` value which translates to 5% of font size).

| Style Name | Size | Weight | CSS Weight | Letter Spacing |
|------------|------|--------|------------|----------------|
| Caps/16/Medium | 16px | Medium | 500 | 0.8px |
| Caps/16/Regular | 16px | Regular | 400 | 0.8px |
| Caps/14/Medium | 14px | Medium | 500 | 0.7px |
| Caps/14/Regular | 14px | Regular | 400 | 0.7px |
| Caps/12/Medium | 12px | Medium | 500 | 0.6px |
| Caps/12/Regular | 12px | Regular | 400 | 0.6px |
| Caps/10/Medium | 10px | Medium | 500 | 0.5px |
| Caps/10/Regular | 10px | Regular | 400 | 0.5px |

---

## Color System

### CSS Custom Properties

Always use CSS custom properties. Never hardcode hex values.

```css
:root {
  /* ── Monochrome ── */
  --monochrome-black: #16181D;
  --monochrome-white: #FFFFFF;
  --monochrome-black-5: rgba(22, 24, 29, 0.05);
  --monochrome-white-5: rgba(255, 255, 255, 0.10);

  /* ── Grey Scale ── */
  --grey-50:  #F6F7F8;
  --grey-75:  #F3F4F7;
  --grey-100: #E9ECF1;
  --grey-150: #D0D6E1;
  --grey-200: #8A94A8;
  --grey-300: #6F7A90;
  --grey-400: #3A485F;

  /* ── Primary (Purple) ── */
  --primary-25:  #FDFDFF;
  --primary-50:  #FCFAFF;
  --primary-100: #F5F0FF;
  --primary-200: #D7C0FF;
  --primary-300: #8C5AE2;
  --primary-400: #5020A0;

  /* ── Secondary (Orange) ── */
  --secondary-50:  #FFF8F5;
  --secondary-100: #FEEEE7;
  --secondary-200: #FBCEB7;
  --secondary-300: #F47A3E;
  --secondary-400: #A93F0A;

  /* ── Status Dark ── */
  --status-success:  #009B53;
  --status-error:    #D72825;
  --status-warning:  #D9A50B;
  --status-info:     #145ECC;

  /* ── Status Light (backgrounds for status badges) ── */
  --status-success-light:  #F5FFFA;
  --status-error-light:    #FFF5F5;
  --status-warning-light:  #FFFCF5;
  --status-info-light:     #F4F8FE;

  /* ── Accent Dark ── */
  --accent-pink:         #E81E63;
  --accent-purple:       #9C27B0;
  --accent-persian-blue: #5800FF;
  --accent-blue:         #2196F3;
  --accent-cyan:         #109CAE;
  --accent-teal:         #009688;
  --accent-light-green:  #8BC34A;
  --accent-amber:        #EEB200;
  --accent-brown:        #795548;
  --accent-blue-grey:    #607D8B;

  /* ── Accent Light (backgrounds for accent badges/tags) ── */
  --accent-pink-light:         #FDE8EF;
  --accent-purple-light:       #F5E9F7;
  --accent-persian-blue-light: #EEE5FF;
  --accent-blue-light:         #E9F4FE;
  --accent-cyan-light:         #E5F8FB;
  --accent-teal-light:         #E5F4F3;
  --accent-light-green-light:  #F3F9ED;
  --accent-amber-light:        #FDF7E5;
  --accent-brown-light:        #F2EEED;
  --accent-blue-grey-light:    #EFF2F3;

  /* ── Chart Colors ── */
  --chart-1:  #80A4D5;
  --chart-2:  #BFD7F6;
  --chart-3:  #8DE3D4;
  --chart-4:  #BD9ECF;
  --chart-5:  #BBC892;
  --chart-6:  #EEA47B;
  --chart-7:  #F4B6C2;
  --chart-8:  #FAD6BF;
  --chart-9:  #C5C6E0;
  --chart-10: #D3A5BD;
  --chart-11: #DCE3BF;
  --chart-12: #F7EBAC;

  /* ── Gradients ── */
  --gradient-primary-dark: linear-gradient(186.07deg, #8C5AE2 30.4%, #4B4086 83.83%);
  --gradient-primary-light: linear-gradient(186.07deg, #F0E7FF 30.4%, #BFB4FA 83.83%);
  --gradient-ai: linear-gradient(135.2deg, #FF907F 2.48%, #FF57CD 51.83%, #68A7FF 94.27%);
  --gradient-ai-light: linear-gradient(135.2deg, #FFE9E5 2.48%, #FFE5F7 51.83%, #E5F0FF 94.27%);
}
```

### Color Usage Quick Reference

| Element | Token | Hex |
|---------|-------|-----|
| Page background (white) | `--monochrome-white` | #FFFFFF |
| Page background (grey) | `--grey-50` | #F6F7F8 |
| Primary headings, names | `--grey-400` | #3A485F |
| Secondary text, icons | `--grey-300` | #6F7A90 |
| Placeholder text | `--grey-200` | #8A94A8 |
| Card/section borders | `--grey-150` | #D0D6E1 |
| Subtle borders, disabled | `--grey-100` | #E9ECF1 |
| Interactive elements (buttons, links, checkboxes) | `--primary-300` | #8C5AE2 |
| Interactive hover | `--primary-400` | #5020A0 |
| Nav bar background | `--primary-400` | #5020A0 |
| Selected nav tab | `--primary-300` | #8C5AE2 |
| Grid row hover | `--primary-25` | #FDFDFF |
| Selected dropdown bg | `--primary-50` | #FCFAFF |
| Notifications, provider accents | `--secondary-300` | #F47A3E |

---

## Logo

The Foldhealth logo is a stylized cross/plus healthcare symbol (monogram) with
the wordmark "Foldhealth" (one word, lowercase 'h').

### Logo Variants

| Variant | Use Case | Description |
|---------|----------|-------------|
| **Original Color** | Default/marketing | Purple + dark-grey two-tone monogram with dark wordmark |
| **Primary Color** | On white backgrounds, branded UI | All-purple (#8C5AE2) monogram + wordmark |
| **Black** | Light backgrounds, print | All-black (#16181D) monogram + wordmark |
| **White** | Dark/purple backgrounds, nav bars | All-white (#FFFFFF) monogram + wordmark |

### Logo Layouts

Each variant has three layout options:

| Layout | Aspect Ratio | Dimensions (ref) | Use Case |
|--------|-------------|-------------------|----------|
| **Icon** (monogram only) | 1:1 | 150×150px | Favicons, app icons, compact sidebar |
| **Full Vertical** | ~2.3:1 (h) | 350×153px | Splash screens, marketing, centered layouts |
| **Full Horizontal** | ~5.4:1 (w) | 351×65px | Nav bars, headers, horizontal layouts |

### Logo Implementation Rules

- Always use SVG or image asset. Never recreate with CSS shapes.
- On dark backgrounds (nav bar, dark purple): use **White** variant.
- On white/light backgrounds: use **Primary Color** or **Black** variant.
- Maintain minimum clear space equal to the height of the monogram mark.
- Never stretch, recolor arbitrarily, or add effects.
