# Fold Health Component Patterns

> Source of truth: Figma file `Fold-Pixel-1.0`.
> All specs extracted directly from Figma component definitions.
>
> **Reminder**: Inter font (400/500 only), Solar Icons, 0.5px borders,
> border-radius 4/8/12, avatars are rounded square by default.

---

## Table of Contents
1. Buttons
2. Action Buttons (Icon Buttons)
3. Link Buttons (Text Links)
4. Badges
5. Avatars
6. EHR Integration Icons

---

## 1. Buttons

### Variants

| Type | Background | Text Color | Border | Hover BG |
|------|-----------|------------|--------|----------|
| Primary | `--primary-300` (#8C5AE2) | #FFFFFF | none | `--primary-400` (#5020A0) |
| Secondary | transparent | `--primary-300` | 0.5px solid `--primary-300` | `--primary-50` |
| Tertiary | `--primary-100` (#F5F0FF) | `--primary-300` | 0.5px solid `--primary-200` | `--primary-200` (text:#FFF) |
| Alt | `--grey-50` (#F6F7F8) | `--grey-300` (#6F7A90) | 0.5px solid `--grey-150` | darkened grey |
| Ghost | transparent | `--primary-300` | none | `--monochrome-black-5` |
| Success | `--status-success` (#009B53) | #FFFFFF | none | darkened green |
| Error | `--status-error` (#D72825) | #FFFFFF | none | darkened red |
| Disable | `--grey-150` (#D0D6E1) | `--grey-200` (#8A94A8) | none | n/a |
| Loading | `--primary-300` | spinner (white) | none | n/a |

### Sizes

| Size | Padding | Font Size | Weight | Radius |
|------|---------|-----------|--------|--------|
| S | 6px 12px | 12px | 500 | 6px |
| L (default) | 8px 16px | 14px | 500 | 6px |
| XL (Mob) | 12px 24px | 18px | 500 | 8px |

### CSS (Primary, Size L)
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: var(--primary-300);
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.btn-primary:hover { background-color: var(--primary-400); }
.btn-primary:disabled {
  background-color: var(--grey-150);
  color: var(--grey-200);
  cursor: not-allowed;
}
```

---

## 2. Action Buttons (Icon Buttons)

Square icon-only buttons with optional notification badge, count, verified indicator, or dot.

### States
| State | Border | Icon Color | BG |
|-------|--------|------------|------|
| Active | 0.5px `--grey-150` | `--grey-300` | white |
| Active:hover | 0.5px `--grey-150` | `--grey-300` | `--grey-50` |
| Disable | 0.5px `--grey-100` | `--grey-150` | white |
| Error | 0.5px error-light | `--status-error` | error-light |

### Sizes
| Size | Dimensions | Icon | Radius |
|------|-----------|------|--------|
| S | 28×28px | 14px | 6px |
| L | 32×32px | 16px | 8px |
| XL | 40×40px | 20px | 8px |

### Notification Badge
Orange circle, top-right. BG: `--secondary-300`, text: #FFF, 10px, min-w: 16px, radius: 50%.

---

## 3. Link Buttons (Text Links)

Inline text with underline on hover. No background/border.

### Variants
| Type | Color |
|------|-------|
| Primary | `--primary-300` (#8C5AE2) |
| Secondary | `--secondary-300` (#F47A3E) |
| Secondary Alt | #FFFFFF |
| Dark Grey | `--grey-400` (#3A485F) |
| Placeholder | `--grey-200` (#8A94A8) |
| Success | `--status-success` (#009B53) |
| Info | `--status-info` (#145ECC) |
| Warning | `--status-warning` (#D9A50B) |
| Error | `--status-error` (#D72825) |

### Sizes
| Size | Font Size | Weight |
|------|-----------|--------|
| XS | 12px | 400 |
| S | 14px | 400 |
| L (Mob) | 18px | 400 |

---

## 4. Badges

Small labels for categories/statuses. Optional: leading icon, trailing icon, dropdown chevron.

### Variants
| Type | BG | Text | Border |
|------|----|------|--------|
| Grey | `--grey-50` | `--grey-300` | 0.5px rgba(111,122,144,0.1) |
| White | #FFF | `--grey-300` | 0.5px rgba(111,122,144,0.1) |
| Primary | `--primary-50` | `--primary-300` | 0.5px rgba(140,90,226,0.2) |
| Secondary | `--secondary-50` | `--secondary-300` | 0.5px rgba(244,122,62,0.2) |
| Success | success-light | `--status-success` | 0.5px rgba(0,155,83,0.2) |
| Warning | warning-light | `--status-warning` | 0.5px rgba(217,165,11,0.2) |
| Error | error-light | `--status-error` | 0.5px rgba(215,40,37,0.1) |
| Info | info-light | `--status-info` | 0.5px rgba(20,94,204,0.2) |
| Ghost | transparent | `--grey-300` | none |
| Disabled | `--grey-50` | `--grey-150` | none |

Hover: BG darkens one step, border becomes solid status color.

### Sizes
| Size | Height | Min-W | Padding | Font | Icon | Radius |
|------|--------|-------|---------|------|------|--------|
| XS | auto | 18px | 2px 4px | 12px | 10px | 4px |
| S | 22px | 22px | 2px 6px | 14px | 12px | 4px |
| L (Mob) | 30px | 30px | 0 6px | 16px | 18px | 6px |

---

## 5. Avatars

### 5a. With Initials

| Scheme | Initials | BG | Border |
|--------|----------|-----|--------|
| Patient (Purple) | `--primary-300` | `--primary-100` | 0.5px `--primary-200` |
| Provider (Orange) | `--secondary-300` | `--secondary-100` | 0.5px `--secondary-200` |
| Neutral (Grey) | `--grey-300` | `--grey-50` | 0.5px `--grey-150` |

### Sizes
| Size | Dim | Font | Weight | Radius (circle) | Radius (square) |
|------|-----|------|--------|-----------------|-----------------|
| XS | 20px | 8px | 500 | 50% | 4px |
| S | 24px | 10px | 500 | 50% | 6px |
| M | 32px | 12px | 500 | 50% | 8px |
| L | 40px | 14px | 500 | 50% | 8px |
| XL | 56px | 18px | 500 | 50% | 12px |
| 2XL | 72px | 24px | 500 | 50% | 16px |

### 5b. With Icon
Same sizing/colors as initials. Icon ~50-60% of avatar dimension.

### 5c. Avatar Groups
Overlapping stack. Overlap: ~25% of width (negative margin-left).
"+N" overflow count badge at end.

---

## 6. EHR Integration Icons

32×32px square with 8px radius. Unique per EHR system:
- **Athena Health**: Green bg, leaf icon
- **DrChrono**: Teal bg, styled mark
- **Fold Health**: Purple bg, Fold monogram
- **Epic**: White bg, interlocking circles
- **JUNO/Jane**: Lavender bg, "J" mark

Export as SVG assets from Figma for production use.

---

## 7. Notification Badge

Standalone count or notification indicator. Used on action buttons, tabs, nav items.

### Variants

| Variant | BG | Text Color | Border | Font Weight |
|---------|-----|-----------|--------|-------------|
| **Counts** | `--grey-50` (#F6F7F8) | `--grey-200` (#8A94A8) | 0.5px `--grey-100` (#E9ECF1) | 500 (Medium) |
| **Notification** | `--secondary-300` (#F47A3E) | #FFFFFF | none | 500 (Medium) |

### Sizes

| Size | Dimensions | Min Width | Padding | Font Size | Font Weight | Radius |
|------|-----------|-----------|---------|-----------|-------------|--------|
| S | 12×12px | 12px | 2px 3px | 8px | 500 | 4px |
| M | 16px wide | 16px | 2px 4px | 10px | 500 | 4px |
| L | 20×20px | 20px | 2px 4px | 14px | 500 | 4px |
| XL (Mob) | 24×24px | 24px | 4px | 16px | 500 | 4px |

---

## 8. Tabs

Two types: **Tabs** (pill-style) and **Underline** (bottom-border style).

### Tab Types

| Type | Default | Active | Hover |
|------|---------|--------|-------|
| **Tabs** | no bg, grey text | `--grey-50` bg + `--grey-150` border, `--grey-400` text | `--grey-50` bg, `--grey-300` text |
| **Underline** | no bg/border, grey text | 2-3px bottom border `--primary-300`, purple text (Medium weight) | no border, `--grey-400` text |

### Tab Sizes

| Size | Height | Padding | Font Size | Icon Size | Radius |
|------|--------|---------|-----------|-----------|--------|
| XS | 24/32px | 6px | 12px | 14px | 4px |
| S | 28/40px | 4px 6px | 14px | 16px | 4px |
| M | 28/40px | 4px 6px | 16px | 16px | 4px |
| L (Mob) | auto/56px | 8px | 20px | 24px | 8px |

### Tab Features
- **Count badge**: Notification badge inline (see Section 7)
- **Dropdown chevron**: 12-16px chevron indicator
- **Leading icon**: Optional icon before text
- **Notification dot**: 4px orange dot (`--secondary-300`)

### Tab Text Colors
- Default: `--grey-300` (#6F7A90), weight 400
- Active (Tabs type): `--grey-400` (#3A485F), weight 400
- Active (Underline type): `--primary-300` (#8C5AE2), weight 500
- Hover: `--grey-400` (#3A485F), weight 400

---

## 9. Filter

Dropdown-style filter button with label and optional selected value + count.

### States

| State | BG | Border | Text Color |
|-------|-----|--------|-----------|
| Default | transparent | 0.5px `--grey-150` | `--grey-300` |
| Hover | transparent | 0.5px `--grey-200` | `--grey-300` |
| Active (selected) | `--primary-50` | 0.5px `--primary-200` | `--primary-300` |
| Active:hover | `--primary-100` | 0.5px `--primary-300` | `--primary-300` |

### Structure
- Filter title (label) + chevron down
- When active: "Filter Title : Selected Value" + count badge (+N) + chevron
- Padding: 4px 8px, border-radius: 4px
- Font: 14px Regular for default, 14px Regular for active
- Count badge uses Primary badge style

---

## 10. Toggle (Segmented Control)

Pill-group toggle for switching between views. Container has grey background
with rounded individual items inside.

### Container
- Background: `--grey-50` (#F6F7F8)
- Padding: 2px
- Gap between items: 2px
- Border radius: 4px (S) / 6px (L)

### Toggle Items

| State | BG | Border | Text Color | Font Size | Shadow |
|-------|-----|--------|-----------|-----------|--------|
| Active | #FFFFFF | 0.5px #CED4DD | `--grey-400` (#344054) | 14/16px | dropdown shadow |
| Inactive | transparent | none | `--grey-200` (#8A94A8) | 14/16px | dropdown shadow |

### Sizes
| Size | Item Height | Item Padding | Font Size | Item Radius |
|------|------------|-------------|-----------|-------------|
| S | 28px | 4px 6px | 14px | 4px |
| L (Mob) | 32px | 4px 8px | 16px | 4px |

---

## 11. Breadcrumb

Hierarchical path navigation showing current location.

### Structure
- Items separated by " / " divider
- All items except last: `--grey-300` (#6F7A90), 14px Regular, clickable
- Last item (current): `--grey-400` (#3A485F), 14px **Medium** (500), not clickable
- Supports 1-5 levels deep

### CSS
```css
.breadcrumb { display: flex; align-items: center; gap: 4px; }
.breadcrumb-item { color: var(--grey-300); font-size: 14px; font-weight: 400; cursor: pointer; }
.breadcrumb-item:hover { text-decoration: underline; }
.breadcrumb-current { color: var(--grey-400); font-weight: 500; cursor: default; }
.breadcrumb-separator { color: var(--grey-300); font-size: 14px; }
```

---

## 12. Divider

Simple line separator. Types: horizontal, vertical, and with centered label.

### Variants
- **Horizontal**: Full-width 0.5px line, color `--grey-150` (#D0D6E1)
- **Horizontal with label**: Line broken by centered text ("Demo"), text color `--grey-300`, 12px
- **Vertical**: Full-height 0.5px line, color `--grey-150`

### CSS
```css
.divider { border: none; border-top: 0.5px solid var(--grey-150); width: 100%; }
.divider-vertical { border: none; border-left: 0.5px solid var(--grey-150); height: 100%; }
```

---

## 13. Alerts & Toasts

### 13a. Toast (Web & Mobile)

Full-width notification bar, typically at top of viewport.

| Variant | BG | Text Color |
|---------|-----|-----------|
| Success | `--status-success` (#009B53) | #FFFFFF |
| Error | `--status-error` (#D72825) | #FFFFFF |
| Warning | `--status-warning` (#D9A50B) | #FFFFFF |
| Info | `--status-info` (#145ECC) | #FFFFFF |

**Structure**: Centered message text + close (×) icon on right.
- Web: compact height, 14px text
- Mobile: taller, 16px text, more padding
- Border radius: 8px (web) / 8px (mobile)
- Font: Inter Regular, white text

### 13b. Alert Inline

Small inline alert within content areas.

| State | BG | Border | Icon Color | Action Link Color |
|-------|-----|--------|-----------|-------------------|
| Warning | `--status-error-light` (#FFF5F5) | 0.5px rgba(215,40,37,0.1) | `--status-error` | `--status-error` |
| Success | `--status-success-light` (#F5FFFA) | 0.5px rgba(0,155,83,0.2) | `--status-success` | `--status-success` |
| Info | `--status-info-light` (#F4F8FE) | 0.5px rgba(20,94,204,0.2) | `--status-info` | `--status-info` |

**Structure**: [Icon] + Message text + optional action link
- Padding: 4px 6px
- Border radius: 4px
- Message text: 12px Regular, `--grey-400` (#3A485F)
- Icon: 16px, status color
- Action link: 12px Regular, status color

---

## 14. Input Field (Web)

Text input with extensive configurable properties. Width: 300px default.

### Properties (all toggleable)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `state` | enum | Placeholder | Placeholder, Filled, Disable, Users, User, Error |
| `hover` | bool | false | Focus/hover state — adds focus ring |
| `title1` | bool | true | Show title label above input |
| `title` | string | "Title" | Label text |
| `mandatory` | bool | false | Shows 4px orange dot next to title |
| `showInfo` | bool | false | Shows 12px info icon next to title |
| `mainText` | string | "Enter Task Title" | Placeholder or value text |
| `leadingIcon1` | bool | false | Shows leading icon (e.g., User icon) |
| `showPriority` | bool | false | Shows priority icon |
| `trailingAction` | bool | false | Shows trailing action button (e.g., mic) |
| `trailingText1` | bool | false | Shows trailing text (e.g., "Days") |
| `trailingButton` | bool | false | Shows tertiary button inside input |
| `chevron1` | bool | false | Shows dropdown chevron |
| `characterLimit` | bool | false | Shows "25/150" character counter |
| `supportingText1` | bool | false | Shows helper text below input |
| `supportingText` | string | "This is supporting text" | Helper text content |

### States & Colors

| State | BG | Border | Text Color | Focus Ring |
|-------|-----|--------|-----------|------------|
| Placeholder | white | 0.5px `--grey-200` | `--grey-200` (placeholder) | — |
| Placeholder:hover | white | 0.5px `--primary-300` | `--grey-200` | 2px `--primary-100` |
| Filled | white | 0.5px `--grey-200` | `--grey-400` | — |
| Filled:hover | white | 0.5px `--primary-300` | `--grey-400` | 2px `--primary-100` |
| Error | white | 0.5px `--status-error` | `--grey-400` | — |
| Error:hover | white | 0.5px `--status-error` | `--grey-400` | 2px `--status-error-light` |
| Disable | `--grey-50` | 0.5px `--grey-150` | `--grey-150` | — |
| Users/User | white | 0.5px `--grey-200`/`--primary-300` | badge chips | — |

### Dimensions
- Height: 32px (input box only)
- Padding: 8px all sides
- Border radius: 4px
- Title font: 14px Regular `--grey-200`
- Input font: 14px Regular
- Supporting text: 12px Regular `--grey-200` (or `--status-error` for error)
- Character limit: 12px Regular `--grey-200`, right-aligned
- Trailing button: Tertiary style, 24px height, 12px Medium text

### Input Field (Mobile)
Same structure as Web but with larger touch targets:
- Input height: 44px (vs 32px web)
- Padding: 12px
- Font sizes scale up slightly
- Border radius: 6px

---

## 15. Text Area (Web & Mobile)

Multi-line text input. Same states as Input Field.

### Dimensions
- **Web**: Min height ~80px, padding 8px, border-radius 4px
- **Mobile**: Min height ~100px, padding 12px, border-radius 6px
- Resizable vertically
- Same state colors/borders as Input Field
- Same title, mandatory, supporting text, character limit properties

---

## 16. Checkbox & Radio Button

### Checkbox Sizes

| Size | Dimensions | Border Radius | Border Width |
|------|-----------|---------------|-------------|
| S | 12×12px | 2px | 1.5px |
| M | 16×16px | 4px | 1.5px |
| L | 20×20px | 4px | 1.5px |

### Checkbox States

| State | Border | BG | Check Color |
|-------|--------|-----|------------|
| Unchecked | `--grey-200` (#8A94A8) | transparent | — |
| Unchecked:hover | `--grey-300` | transparent | — |
| Checked | `--primary-300` (#8C5AE2) | `--primary-300` | white |
| Indeterminate | `--primary-300` | `--primary-300` | white (dash) |
| Disabled unchecked | `--grey-100` | transparent | — |
| Disabled checked | `--primary-200` | `--primary-200` | white |

### Radio Button Sizes

| Size | Dimensions | Inner Dot |
|------|-----------|-----------|
| S | 12×12px | 4px |
| M | 16×16px | 6px |
| L | 20×20px | 8px |

### Radio States

| State | Border | BG | Dot Color |
|-------|--------|-----|-----------|
| Unselected | `--grey-200` | transparent | — |
| Unselected:hover | `--grey-300` | transparent | — |
| Selected | `--primary-300` | transparent | `--primary-300` |
| Disabled unselected | `--grey-100` | transparent | — |
| Disabled selected | `--primary-200` | transparent | `--primary-200` |

Both are circular (radio: 50% radius, checkbox: small radius).

---

## 17. Dropdown Menu

### 17a. Base Menu Item

Individual row in a dropdown. Multiple variants:

| Variant | Content |
|---------|---------|
| Text only | "Option" label |
| With icon | Leading icon + "Option" |
| With checkbox | Checkbox + "Option" |
| With radio | Radio + "Option" |
| With avatar | Avatar + "Richard Wilson" + demographics |

**Menu Item States**:
| State | BG | Text Color |
|-------|-----|-----------|
| Default | transparent | `--grey-400` (#3A485F) |
| Hover | `--grey-50` (#F6F7F8) | `--grey-400` |
| Selected | `--primary-50` (#FCFAFF) | `--primary-300` |
| Disabled | transparent | `--grey-150` |

**Dimensions**: Height 32-40px, padding 8px 12px, font 14px Regular.

### 17b. Dropdown Groups

Menu items grouped under a section header:
- **Section header**: "Patients" in 12px Caps Medium `--grey-300`, uppercase, letter-spacing 0.6px
- Divider between groups: 0.5px `--grey-150`
- Max visible items: ~5-8 before scroll
- Fixed header with count badge

### 17c. Dropdown Menu Container

The full dropdown panel:
- Background: white
- Border: 0.5px `--grey-150`
- Border radius: 8px
- Shadow: `0 4px 12px rgba(0,0,0,0.08)`
- **Search bar** at top: Input with search icon, 14px, padding 8px 12px
- Scrollable content area below search
- Min width: 200px

---

## 18. Nav Menu (Sidebar)

Dark purple vertical navigation sidebar. Fixed left, full viewport height.

### Container
- Width: 64px (collapsed)
- Background: `--primary-400` (#5020A0) — note: from the Build Health Agent file, the nav uses a deep purple gradient/solid
- Height: 100vh
- Padding: 16px 0
- Display: flex, column, center-aligned

### Nav Items
- Layout: Icon (24px) centered above label text
- Label: 11px Medium, centered
- Default: `rgba(255,255,255,0.6)` for both icon and text
- Hover/Active: #FFFFFF text + `--primary-300` (#8C5AE2) background highlight
- Active item gets a rounded rectangle highlight behind it
- Item padding: 10-12px 8px
- Gap between icon and label: 4px

### Items (from Figma)
Home, Patients, Calendar, Tasks, Comms (with notification badge), Campaign, Analytics, Billing, Settings, Help

### Notification Badge on Nav
Orange badge (`--secondary-300`) overlapping the Comms icon, top-right position.

---

## 19. Switch (Toggle Switch)

A sliding toggle control. NOT the segmented toggle (Section 10) — this is a boolean on/off switch.

### Sizes

| Size | Track Width | Track Height | Knob Size | Label Font | Border Radius |
|------|------------|-------------|-----------|------------|---------------|
| S | 32px | ~19px | 16×16px | 12px | 4px |
| M | 40px | ~23px | 20×20px | 14px | 4px |
| L (Mob) | 48px | ~27px | 24×24px | 18px | 4px |

### States & Colors

| State | Track BG | Knob BG |
|-------|---------|---------|
| Default Off | `--grey-100` (#E9ECF1) | #FFFFFF |
| Default On | `--primary-300` (#8C5AE2) | #FFFFFF |
| Disabled Off | `--grey-50` (#F6F7F8) | #FFFFFF |
| Disabled On | `--primary-100` (#F5F0FF) | #FFFFFF |

### Properties
- `checked` (bool): On/off state
- `state`: Default / Disabled
- `text1` (bool): Show label text
- `text` (string): Label content
- Label color: `--grey-300` (#6F7A90), Regular weight

### CSS
```css
.switch-track {
  display: flex;
  align-items: center;
  min-width: 40px; /* M size */
  padding: 1.5px;
  border-radius: 4px;
  background: var(--grey-100);
  cursor: pointer;
  transition: background 0.2s;
}
.switch-track.checked { background: var(--primary-300); justify-content: flex-end; }
.switch-track.disabled { background: var(--grey-50); cursor: not-allowed; }
.switch-track.disabled.checked { background: var(--primary-100); }
.switch-knob {
  width: 20px; height: 20px;
  border-radius: 3px;
  background: #FFFFFF;
}
```

---

## 20. Dialog Box

Centered modal overlay for confirmations and actions.

### Variant 1: Single Action (Centered Layout)
- Icon at top: Shield/check icon, 32px, centered
- Title: 16px Medium, `--grey-400`, centered
- Description: 14px Regular, `--grey-300`, centered
- Buttons: Side by side — Cancel (Alt) + Confirm (Primary or Error)
- Width: ~320px, padding 24px, border-radius 12px
- Shadow: `0 8px 24px rgba(0,0,0,0.12)`

### Variant 2: Two Actions (Horizontal Header)
- Header: Icon + Title inline, with close (×) button right-aligned
- Title: 16px Medium, `--grey-400`
- Description: 14px Regular, `--grey-300`
- Close icon: top-right, 20px, `--grey-300`
- Footer: Cancel + Confirm buttons, right-aligned
- Border-top on footer: 0.5px `--grey-150`
- Width: ~420px

### Dialog Types
| Type | Icon Color | Confirm Button |
|------|-----------|---------------|
| Default | `--grey-300` | Primary (`--primary-300`) |
| Destructive | `--status-error` | Error (`--status-error`) |

### Overlay
- Background: `rgba(22, 24, 29, 0.4)` — uses `--monochrome-black` at 40% opacity
- Centered with flexbox

---

## 21. Popover

Like Dialog but with a content area for custom content (e.g., forms, selections).

- Same header structure as Dialog Variant 2: Icon + Title + Close button
- Content area: Grey background (`--grey-50`), padding 16px
- Footer: Cancel + Confirm buttons
- Width: ~420px
- Border-radius: 12px
- Shadow: same as Dialog

---

## 22. Tooltip

Small floating information label. Multiple positions.

### Positions
Top-Left, Top-Center, Top-Right, Bottom-Left, Bottom-Center, Bottom-Right,
Left-Top, Left-Bottom, Right-Top, Right-Bottom

### Structure
- Background: #FFFFFF
- Border: 0.5px `--grey-150`
- Border-radius: 8px
- Shadow: `0 4px 12px rgba(0,0,0,0.08)`
- Padding: 8px 12px
- **Title**: 13px Medium, `--grey-400`
- **Supporting text**: 12px Regular, `--grey-300`
- Arrow/caret: 8px triangle pointing toward trigger element
- Max width: ~200px

---

## 23. Progress Bar

Horizontal progress indicator showing completion percentage.

### Variants

| Variant | Color Logic |
|---------|------------|
| **Status** (color-coded) | 0-30%: `--status-error` (#D72825), 30-60%: `--status-warning` (#D9A50B), 60-100%: `--status-success` (#009B53) |
| **Success** (always green) | All percentages: `--status-success` (#009B53) |
| **Disabled** (grey) | All percentages: `--grey-150` (#D0D6E1) |

### Dimensions
- Track height: 4px
- Track background: `--grey-100` (#E9ECF1)
- Track border-radius: 2px
- Fill border-radius: 2px
- Label: percentage text, 12px Medium, right of bar
- Width: flexible (fills container)

### CSS
```css
.progress-track {
  height: 4px;
  background: var(--grey-100);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}
```

---

## 24. Calendar Slot (Appointment Card)

Small card placed within a calendar grid showing appointment details.

### Structure
- Background: `--primary-50` (#FCFAFF) or white
- Left border: 3px solid `--primary-300` (#8C5AE2)
- Border-radius: 4px
- Padding: 6px 8px
- Content:
  - **Patient name**: 13px Medium, `--grey-400`
  - **Time**: 12px Regular, `--grey-300` (e.g., "09:00 AM - 09:30 AM")
  - **Reason**: 12px Regular, `--grey-300`
  - **Status**: 12px Regular, `--grey-300` (e.g., "F/U • Scheduled")
- Icon: Provider icon (16px) inline with time

---

## 25. Date & Time Picker (Calendar)

Month calendar grid for date selection.

### Variant 1: Basic Calendar
- Header: Month/Year centered, prev/next chevron buttons
- Weekday headers: S M T W T F S — 14px Medium, `--grey-300`
- Day cells: 32×32px, centered text, 14px Regular
- **Today**: `--primary-300` bg, white text, circular
- **Other month days**: `--grey-200` text
- **Current month**: `--grey-400` text
- Hover: `--primary-50` bg
- Container: white bg, border 0.5px `--grey-150`, radius 12px, padding 16px

### Variant 2: Calendar with Availability Slots
- Same date grid as above
- Below each date: Small colored bars showing availability
  - Green bar: `--status-success` — available slots
  - Grey bar: `--grey-150` — booked/unavailable
- Bar height: 3px, width ~80% of cell, border-radius 1.5px

---

## 26. Pagination

Navigation control for multi-page data tables.

### Sizes

| Size | Description |
|------|------------|
| **L** | Previous/Next text buttons + page numbers + "10/Page" dropdown + "Go to Page" input |
| **M** | Arrow buttons + page numbers + "10/Page" dropdown + "Go to Page" input |
| **S** | Arrow buttons + page numbers only (no dropdown/input) |

### Page Number Buttons
- Size: 32×32px (L/M) or 28×28px (S)
- Default: `--grey-400` text, `--grey-150` border, white bg
- Active: `--primary-300` bg, white text, `--primary-300` border
- Font: 13px Regular
- Border-radius: 6px
- Gap between buttons: 4px

### Previous/Next
- L size: "← Previous" and "Next →" text buttons with arrows
- M/S size: Arrow-only buttons (← →)
- Color: `--grey-300`, hover: `--grey-400`

### Page Size Dropdown
- "10 / Page" with chevron, border 0.5px `--grey-150`, radius 6px
- Font: 13px Regular, `--grey-300`

### Go to Page
- "Go to Page" input field, border 0.5px `--grey-150`, radius 6px
- Font: 13px Regular, `--grey-300`
