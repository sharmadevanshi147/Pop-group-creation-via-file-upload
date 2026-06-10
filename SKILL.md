---
name: FoldDesignSystem
description: >
  The authoritative design system for Fold Health (Fold Pixel v1.0), sourced
  directly from Figma. Use this skill whenever building, prototyping, or
  modifying any Fold Health UI — including React components, pages, dashboards,
  screens, layouts, or forms. Trigger when the user mentions "Fold",
  "Foldhealth", "Fold Health", "our design system", "our components",
  "care gap", "HCC", "patient dashboard", "provider web", "prototype",
  "worklist", "drawer", or references any Fold Health product (Grow, Care,
  Sidecar, Unity). Also trigger when the user asks to build any healthcare UI
  prototype or asks for a component/page that should follow Fold brand
  guidelines. Contains exact specs for 26+ components and 8 page templates
  pulled from the Figma source of truth. Always prefer this skill over
  guessing at design values.
---

# Fold Health Design System (Fold Pixel v1.0)

Single source of truth for building Fold Health interfaces. Every value is
extracted directly from Figma — not approximated. Consult these references
before writing any Fold UI code.

## Core Design Principles

1. **Font**: Inter only. Weights: Regular (400) and Medium (500). No Bold, SemiBold, or other weights.
2. **Icons**: Solar Icons (solar-icons.vercel.app) — outline style, 24×24px default.
3. **Border Radius**: 8px standard. 4px for small components (checkboxes, input fields, small badges). 12px for large containers (dialogs, calendars, cards, modals).
4. **Border Stroke**: 0.5px always. Never 1px unless explicitly noted.
5. **Avatars**: Rounded square by default (radii scale with size: XS=4, S=6, M=8, L=8, XL=12, 2XL=16). Circle is available but not default.

## Framework

React (JSX) with inline styles or CSS custom properties.
Import Inter from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

## Reference Files

Read the relevant file(s) before writing code:

| File | Contents | Read when... |
|------|----------|-------------|
| `references/design-tokens.md` | Colors, typography, spacing, radii, shadows | Always — every prototype needs these |
| `references/icons.md` | Solar Icon library, categories, mappings | Using any icons in the UI |
| `references/components.md` | 26 component specs with all properties | Building any UI component |
| `references/page-templates.md` | 8 page layouts and screen structures | Building a complete page or screen |

## Workflow

1. **Read `references/design-tokens.md`** — set up CSS variables and font imports
2. **Read the relevant component/page reference** — match specs exactly
3. **Build the React component** — use CSS custom properties for all colors
4. **Self-review** — verify against reference files before delivering

## Quality Checklist

Before delivering any output, verify:

- [ ] All colors use CSS custom properties from design-tokens.md
- [ ] Font family is Inter, weights are only 400 (Regular) or 500 (Medium)
- [ ] No text smaller than 12px
- [ ] Border radius follows the 4/8/12 rule (small/standard/large)
- [ ] All borders are 0.5px, not 1px
- [ ] Avatars use rounded square shape by default
- [ ] Icons use Solar Icons outline style
- [ ] Hover/active/disabled states are implemented per spec
- [ ] No colors exist outside the defined palette
