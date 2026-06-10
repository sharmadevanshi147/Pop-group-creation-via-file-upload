# Fold Health Page Templates

> Source of truth: Figma files `Fold-Pixel-1.0` and `Build-Health-Agent-Wizard`.
> Layout patterns and screen structures extracted from production designs.

---

## Table of Contents
1. Worklist (Full Page with Table)
2. Drawer Pattern (Shared)
3. Task Drawer
4. Appointment Drawer
5. Email Composer Drawer
6. Chat Initiation Drawer
7. Send Form Drawer
8. Patient Education Drawer

---

## 1. Worklist (Full Page with Data Table)

The primary worklist is the core screen in Fold Health — a filterable, sortable
data table with sidebar navigation.

### Layout Structure
```
[Browser Chrome]
├── [Top Bar] ─────────────────────────────────────────
│   Logo  |  Breadcrumb  |  Search  |  Ask Unity  |  Create New  |  Schedule
├── [Main Layout] ─────────────────────────────────────
│   [Nav 64px]  [Sub-Nav 200px]  [Content Area flex-1]
│      │              │                │
│   Icon+Label    Worklists:         ├── Tab Bar (Underline tabs)
│   Home          ├ My Lists         ├── Filter Row + Search + Import/Export
│   Population*   │  Day Optimizer   ├── Column Headers (sortable, uppercase)
│   Calendar      │  Review HRA      ├── Data Rows (48px height, hover)
│   Tasks         │  IP Visits       │   ├── Avatar + Name + Demographics
│   Messages      │  High Risk       │   ├── Acuity Badge (High/Med/Low)
│   Calls         │  High Cost       │   ├── Outreach Window Badge
│   Leads         ├ Shared Lists     │   ├── Status Badge
│   Campaign      │  SNP/AWV/TOC*    │   ├── Date columns
│   Analytics     ├ Patients         │   └── Action icons row
│   Settings      └ Population Grps  └── Pagination (centered, Size M)
│   Help
```

### Key Specs
- **Top bar**: White bg, h-48px, border-bottom 0.5px `--grey-150`, padding 0 24px
- **Search**: Input with search icon + "Ask Unity" AI button (gradient bg)
- **Action buttons**: "Create New" (Primary), "Schedule" (Alt)
- **Sub-nav active**: `--primary-50` bg, `--primary-300` text, 3px left border
- **Sub-nav count**: Grey notification badge right-aligned
- **Table headers**: Uppercase 12px Medium `--grey-300`
- **Table rows**: 48px, hover `--primary-25`, border-bottom `--grey-150`
- **Acuity badges**: High=Error, Medium=Warning, Low=Success

---

## 2. Drawer Pattern (Shared Layout)

All drawers slide in from the right as overlay panels. They share structure:

```
┌──────────────────────────────────────┐
│  Title (20px Medium)  [Action] [×] │
│──────────────────────────────────────│
│  [Scrollable Content]                │
│  Form fields / details / previews    │
│                                      │
└──────────────────────────────────────┘
```

### Shared Specs
- Width: 480-640px, Height: 100vh, Fixed right
- Background: White, Shadow: `-8px 0 24px rgba(0,0,0,0.08)`
- Border-left: 0.5px `--grey-150`
- Header: 16px 20px padding, border-bottom 0.5px `--grey-150`
- Title: 20px Medium `--grey-400`
- Action button: Primary (e.g., "Schedule", "Send", "Start Chat")
- Close: 20px × icon `--grey-300`
- Content padding: 20px, Field gap: 16px

---

## 3. Task Drawer

Multiple states: New Task (empty/filled), Task Details (read-only), with Activity.

### Form Fields
- Title (text input, full width)
- Description (text area)
- Priority (dropdown with icon), Status (dropdown)
- Assignee (user search with avatar badges)
- Due date (date picker), Related Patient (search)
- Tags (multi-select), Subtasks (checklist), Automations

### Details View
- Task title + status badge header
- Key-value metadata pairs
- Activity feed: Avatar + action text + old→new values + timestamp

---

## 4. Appointment Drawer

Three states: Empty form, Filled form, Appointment Details.

### Form (3 sections)
**Top**: Radio (Individual | Group | Block) + Patient search + Reason
**Middle**: Type + Mode (side-by-side dropdowns), Primary/Secondary User,
Location dropdown
**Date & Time**: Timezone badge + Date picker + Duration input
**Time Slots**: Grid of badge-style buttons, grouped by "MORNING"/"AFTERNOON"
**Bottom**: Automations section

### Details View
- Patient header (avatar + name + demographics + profile link)
- Key-value pairs for all appointment data
- Status dropdown (editable)
- Tabs: Activity | Automations
- Activity feed with change tracking (old→new with arrows)

---

## 5. Email Composer Drawer

### Structure
1. **From**: Dropdown (email address)
2. **To**: Tag input (mandatory) + Cc/Bcc links
3. **Subject**: Text input (mandatory)
4. **Email Template**: Checkbox toggle
5. **AI Action**: Purple gradient "Compose with UnityAI" / "Reply with UnityAI"
   - Secondary: "+ Generate Email" / "+ Suggest responses" link
6. **PHI Warning**: Inline alert (Warning)
7. **Message body**: Large text area
8. **Toolbar**: Attachments/templates (empty), Rich text toolbar (filled)
9. **Email Signature**: Bold name, credentials, practice, contact links

---

## 6. Chat Initiation Drawer

Simple form: Type dropdown → Patient search (mandatory) → Group Name (mandatory)
→ Subject → Internal Users (multi-tag) → Family Members (search)

---

## 7. Send Form Drawer

1. Template dropdown + Form List (multi-tag)
2. Large template preview area (grey bg container)
   - Shows rendered form with merge variables: `{Patient Name}`, `{Dr. Name}`
   - Header illustration + body + contact info + footer with social links

---

## 8. Patient Education Drawer

1. Member Education dropdown (mandatory)
2. Member Title input (mandatory)
3. Priority + Send Via dropdowns
4. **TEMPLATE INFO** section header (uppercase, 12px)
   - Subject line (editable) + "↻ Refresh" + "✎ Edit in Fold ↗" links
5. Template preview (same pattern as Send Form)

---

## Layout Principles

### Spacing
- Header to first field: 20px
- Between fields: 16px
- Label to input: 4px
- Labels: 14px Regular `--grey-200`, mandatory: orange dot or red asterisk
- Section headers: Uppercase 12px Medium `--grey-300`, letter-spacing 0.6px

### Form Patterns
- Text inputs: 32px, 14px text, 4px radius
- Dropdowns: Input + chevron
- Multi-tag: Input with badge chips
- Date pickers: Input + calendar icon
- Radio groups: Inline horizontal, 16px gap
- Time slot grids: Badge buttons, 4-5 per row

### Action Placement
- Primary action: Header top-right
- Close: × right of primary action
- Cancel: Alt button left of primary (if present)

### Activity Feed
```
[Avatar 24px] User Name action-verb Target
              Old Value → New Value
              timestamp (12px grey-300)
```
- Vertical 0.5px `--grey-150` connector between entries
