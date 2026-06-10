# Project Guidelines — Fold Health Milestones

## React Component Standards

Always use proper, reusable React components. Every piece of UI must be a named, importable component — never inline repeated JSX.

### Rules
- **Extract everything**: tables, rows, dropdowns, dialogs, drawers, badges, chips, tooltips, menus — all components
- **No duplication**: if the same markup appears more than once, it's a component
- **Single responsibility**: each component does one thing and does it well
- **Props-driven**: components are stateless where possible; state lives in the nearest orchestrator and flows down via props
- **Named exports from `components/`**: all shared components live in `components/` and are imported by name
- **No magic numbers / inline one-offs**: colours, spacing, and sizes use the Fold Health CSS variables (`--primary-300`, `--neutral-150`, etc.) or constants from `components/constants.js`

### File layout
```
components/
  constants.js      ← shared data, config, ACTION_TYPES, FILTER_DEFS …
  icons.jsx         ← custom SVG icon components
  shared.jsx        ← primitive atoms: Checkbox, Avatar, Badge, Chip …
  <Feature>.jsx     ← one file per feature-level component
AllPatients.jsx     ← orchestrator only: state + logic, renders components
```

### Design quality bar
- Match the Fold Health design system exactly: Inter font, CSS variable colours, 0.5 px borders, `border-radius: 4–8 px`
- Hover / active / selected states on every interactive element
- Smooth transitions (`transition: 0.15s`) on background/colour changes
- Sticky headers, thin scrollbars (`.thin-scroll`), proper overflow handling
- Responsive where possible; never break the layout at < 1 200 px
