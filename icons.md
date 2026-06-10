# Fold Health Icon Library

> Source of truth: Figma file `Fold-Pixel-1.0` (node 7829:2038 and related).
> All icons are 24×24px outline style unless noted. Use `stroke: currentColor`
> and `fill: none` for standard icons. Color inherits from parent via `currentColor`.

---

## Icon Defaults

```css
.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

When placing icons in the UI:
- Default icon color: `var(--grey-300)` (#6F7A90) for secondary/decorative icons
- Active/interactive icon color: `var(--primary-300)` (#8C5AE2)
- On dark backgrounds (nav bar): `#FFFFFF` or `rgba(255, 255, 255, 0.6)` for inactive

---

## Icon Library — Lucide React

The Fold icon set is a custom library built on outline-style icons. For prototyping
in React, use **Solar Icons (solar-icons.vercel.app)** as the closest match. The naming conventions below
map Fold icon names to their Solar Icons (solar-icons.vercel.app) equivalents.

When no direct match exists, the closest alternative is noted. For production,
the exact SVG from Figma should be exported and used.

---

## Icon Categories & Names

### Notification & Alerts (5 icons)
Notification Active, Notification Remove, Bell, Bell Bing, Bell Off

### Charts (12 icons)
Chart Square, Chart Square 2, Course Up, Course Down, Pie Chart, Line Chart Up,
Line Chart Down, Chart, Ranking, Widget, Widget Add, Gauge

### Documents & Files (42 icons)
File Favourite, File Send, File Left, File Download, File Right, Code File,
File Process Draft, Cloud File, File unProcess Draft, File Smile, Replace File,
File Corrupted, PDF, File Text, Doc, File Add, File Check, File, File Remove,
Document Medicine, Documents, Notes, Document Text, Document Add, Article,
Document Summarize, ZIP File, Document Evidence, Transcript, Clipboard Check,
Clipboard, Clipboard List, Med Statement, Clipboard Text, Clipboard Heart,
Clipboard Remove, Clipboard Add, Table New, Notebook, Document, Book

### User Management (17 icons)
User Sync, User Unknown, User Hands, User Hand Up, User Circle, User Id, User,
Users Group Rounded, Contacts, User Check, User Plus, User Cross, User Minus,
User Block, User Speak, User Heart, User Switch

### Tech (37 icons)
Smartphone, Laptop Minimalistic, Smartphone X, Tablet, Smartphone Check, Monitor,
Feed, CPU, Bluetooth Square, Server, Server Path, Point On Map, Global, Map Arrow,
Routing, GPS, WinRar, Battery Charge, Bug, Screencast 2, Mouse, Fingerprint, Plug,
QR Code, Incognito, Translation, Translation 2, Scanner, USB, Traffic Economy,
Target, Power, Battery Full, Battery Half, Battery Low, Printer, No Signal

### Interface (27 icons)
Cursor, Bolt, Share, Share Circle, Home Visit, Home, Tuning 2, Tuning, Magnifier,
Magnifier Zoom In, Magnifier Zoom Out, Triage, Settings, Close, Add, Minus, Column,
Eye, Eye Closed, Menu Dots, Filter & Sorting, Priority (None/Medium/Low/High),
Gmail, Outlook, Color Picker, Images

### Communication — Phone Calls (27 icons)
Transfer Call, Incoming Call, Call Dropped, Call Optout, Call Chat, Call Medicine,
Call Missed, Call Type, Add Call, Phone Change, End Call, Call Emergency, Phone,
Phone Calling, Call Cancel, Outgoing Call, Call PCP, Unblock Number, AI Call,
Default Number, Call Waiting, Support, Audio, Call Transcript, Desk Phone,
Desk Phone 2, Dial Pad

### Communication — Chat & SMS (34 icons)
Chat Clock, Chat Round, Schedule Chat, Chat Round Add, Chat Round Check, Chat Group,
Chat Out of Office, Chat in Business Hours, Chat Internal, Chat Round Call,
Chat Round Unread, Incoming SMS, Outgoing Chat, Chat AI, Incoming Chat,
Chat Square Call, Chat Square Check, Chat Unread, Chat Square, Chat AI (alt),
Chat Square Add, Message Type, Message Failed, Conversation, SMS Opt Out,
SMS Opt In, Outgoing SMS, Automated SMS, Inbox, Inbox Unread, Inbox Out,
Inbox In, Inbox Archive, Autoreply

### Communication — Email & eFAX (18 icons)
Mail Opened, Email Template, Manual Mail, Automated Mail, Outgoing Mail,
Incoming Mail, SMS, Mail, Mail Unread, Email Type, Email Failed,
Default Email Template, Opt In Email, Opt Out Email, Fax, Outgoing Fax,
Incoming Fax, Out of Office Fax, In Business Hours Fax

### Clinical & Medical (33 icons)
Sleeping, Stethoscope, Pulse, Medical Kit, Health, Care Gaps, Microscope, Pill,
Med Refill, Test Tube, Syringe, Jar of Pills, Allergy, Allergy (alt), Barriers,
Scissors, Scalpel, Drop, Imaging, Lab, Gender, Men, Women, Diagnosis, Hospital,
Office, Medical Staff, Briefcase, Hand Heart, Hand Stars, Hand Pills, Hand Time,
Hand Money

### Health Vitals & Measurements (21 icons)
Blood Pressure, Height, Weigher, Temperature, Heart Pulse, Head Circumference,
Respiratory Rate, BMI, Flame, Waist Circumference, Oxygen Saturation, Stretching,
Bicycling, Treadmill, Running, Walking, Dumbbell, Meditation, Diet, Rate, Radar, Goals

### Arrows & Navigation (69 icons)
Arrow Down/Up/Left/Right, Arrow Left Down/Right Up/Right Down/Left Up,
Double Alt Arrow (Down/Up/Left/Right), Square Double Alt Arrow (Down/Up/Left/Right),
Square Alt Arrow (Down/Up/Left/Right), Square Arrow (Down/Up/Left/Right),
Square Arrow (Left Down/Right Down/Left Up/Right Up), Archive variants (7),
Arrow To Top (Left/Right), Maximize/Minimize Square, Send/Receive Square,
Upload/Download (Square and regular), Square Bottom (Up/Down), Square Top (Down/Up),
Screen Share, Undo Left/Right Round, Forward/Reply (1 and 2), Scale, Reorder,
Arrow To Down (Left/Right), Logout, Login, Expand/Collapse (horizontal + vertical),
Angle (Down/Up/Left/Right)

### Actions & Controls (16 icons)
Pen, Pen AI, Pen Disabled, Plane, Filter, Copy, Select, Uncheck, Deselect,
Pinned, Pin, Pin List, Unpin, Drag Handle 2, Drag Handle, Trash Bin 2

### Finances (15 icons)
Card Send, Card Receive, Card Search, Wallet 2, Dollar Minimalistic,
Verified Check, Sale, Tag Horizontal, Ticker Star, Bill List, Generate Bill,
Bill Cross, Bill Check, Card, Card Transfer

### AI Icons (6 standard + animation frames)
Stars, AI Synopsis, Bot, Magic Stick 3, View Summary, Prompt

**AI Icon Animation**: 5-frame animation sequence (16×16px each). Available in
both dark mode (gradient fill) and light mode variants. Use for AI processing
indicators with CSS animation cycling through frames.

### Status & Feedback (11 icons)
Danger Triangle, Danger Circle, Check Round, Close Circle, Traffic, Pending,
Forbidden Circle, Milestone, Loader, Pending (alt), Check Read

### Emoji (22 icons)
Sticker Smile Circle, Sleeping Square, Confounded Square, Facemask Square,
Smile Circle, Expressionless Circle, Sad Circle, Allergy, Sleeping Circle,
Smile Square, Expressionless Square, Sad Square, Face Scan Square,
Emoji Funny Square, Sticker Smile Square, Sticker Smile Circle 2, Cake,
Confetti, Sunset, Sun, Moon Sleep, Sun Fog, Sunrise

### Time & Calendar (29 icons)
Calendar Add, Calendar X, Calendar Checked, Calendar Reschedule,
Appointment Reminder, Calendar Link, Calendar Filter, Calendar View,
Calendar Mark, Calendar Date, Calendar Minimalistic, Calendar Search,
Calendar Next Day, Clock Circle, History, Pending, Alarm, Alarm Sleep,
Alarm Play, Alarm Add, Alarm Remove, Alarm Turn Off, Stopwatch,
Cancel Schedule, Add Time, Block Time, Watch Circle, Watch Square, Hourglass

### Tasks & Workflow (9 icons)
Tasks, Add Tasks, Task Pool, Task Type, Checklist, Kanban, Subtask,
Add Subtask, Subtask (alt)

### Text & Formatting (31 icons)
List Arrow Up Minimalistic, List Check Minimalistic, List Cross,
List Arrow Down, List Arrow Down Minimalistic, Bulleted List 2,
List Cross Minimalistic, Playlist, Text Color, Playlist Minimalistic,
Playlist 2, Playlist Minimalistic 2/3, List Heart, List Heart Minimalistic,
List Down Minimalistic, Sort By Alphabet, List Down, Sort By Time,
List Left/Right Minimalistic, List Up, List Up Minimalistic, List Check,
List Arrow Up, Sort From Top/Bottom, Hamburger Menu, Reorder, List, Sort,
Bulleted List, Any/Few/All Checked, List Collapse

### Design & Editing Tools (46 icons)
Pen Tool, Text Selection, Text Italic, Paragraph Spacing, Text, Text Cross,
Text Field, Text Underline, Text Bold, Macro, Align Vertical Spacing,
Crop Minimalistic, Palette 2, Layers, Three Squares, Filters, Ruler, Pipette,
Align Left/Right/Bottom/Top, Flip Horizontal/Vertical,
Align Vertical/Horizontal Center, Align Horizontal Spacing,
Mirror Left/Right, Text Right/Left/Center/Justified, Padding (L/R/B/T),
Numbers, Button, Password, Accordion, Brackets, Structure, Backspace,
Command, Enter Value, Programming, Sidebar Minimalistic, Sidebar Collapse,
Sidecar Invalid, Collapse, Expand, Minimize, Maximize, Sorting, Eraser,
Slider Vertical/Horizontal, Posts Carousel Vertical/Horizontal

### Media & Entertainment (31 icons)
Gallery (+ Remove/Download/Send/Check/Add/Edit/Set), Play (2 variants),
Rewind Back/Forward, Volume (+ Small/Loud/Muted/Cross), Camera,
Clapperboard Play, PIP, Soundwave, Pause, Microphone, Microphone Off,
Record, Stop, Shuffle, Videocamera (+ Record/Add), Skip Next/Previous,
Library, Subtitles, Music Note, Record Minimalistic, Record Square

### Security & Privacy (12 icons)
Shield Minimalistic, Shield Star, Shield Check, Shield Minus, Shield Plus,
Shield Cross, Shield User, Lock Keyhole Minimalistic, Lock Keyhole Minimalistic Unlocked,
Lock Keyhole, Lock Keyhole Unlocked, Siren Rounded

### Social & Engagement (21 icons)
Like, Dislike, No Consent, Yes Consent, Medal Star, Medal Star Circle,
Medal Star Square, Medal Ribbons Star, Medal Ribbon Star, Medal Ribbon,
Heart, Star Shine, Star, Crown Line, Hand Shake, Gift, Cup, Magic Stick,
Star Circle, Star Angle, Mention Square, Star Fall Minimalistic

### Storage & Cloud (25 icons)
Folder Security, Folder Open, Folder, Folder 2, Folder With Files,
Folder Check, Folder Error, Remove Folder, Add Folder, Folder Favourite (Star),
Folder Favourite (Bookmark), Move To Folder, Folder Path Connect, Folder Cloud,
Cloud Plus, Cloud Minus, Cloud Cross, Cloud Check, Cloud Bolt,
Cloud Download, Cloud Upload, Cloud Bolt Minimalistic, Cloud, Cloud Sync, Database

### Country Flags (~200 flags)
Flag components at 37.5×24px. Available as a Flag Pack component with a
`property1` prop for country name (lowercase, e.g., `"unitedstates"`, `"india"`).

---

## Chevrons

Compact directional indicators. Default size: **16×16px** (not 24px like standard icons).
Color: `var(--grey-300)` (#6F7A90).

| Direction | Component Name |
|-----------|---------------|
| Right | `New Chevron/Right` |
| Left | `New Chevron/Left` |
| Up | `New Chevron/Up` |
| Down | `New Chevron/Down` |

The inner arrow shape sits within a 4×8px area, centered in the 16×16 frame.

---

## Loader / Spinner

Animated loading indicator. Size: **16×16px**. Four animation frames representing
rotation states (Loader 1–4). Implement with CSS `@keyframes` rotation.

### Primary Spinner (for light backgrounds)
- Color: `var(--grey-300)` (#6F7A90) — a partial arc outline
- Use on: white or light grey backgrounds, secondary buttons

### White Spinner (for primary buttons)
- Color: `#FFFFFF` — a partial arc outline
- Background context: `var(--primary-300)` (#8C5AE2) button
- Use on: primary buttons in loading state

### CSS Implementation
```css
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-right-color: currentColor;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Primary variant */
.spinner-primary { color: var(--grey-300); }

/* White variant (on primary buttons) */
.spinner-white { color: #FFFFFF; }
```

---

## Unity Logo (AI Workflows)

Used for AI-powered features within Fold Health. Rendered with the AI gradient.

### Variants

| Variant | Dimensions | Use Case |
|---------|-----------|----------|
| **Only Logo** | 24×24px | Inline with text, icon buttons |
| **With Text** | 64×24px | Headers, feature labels |

### Styling
The Unity logo uses the AI gradient:
```css
background: var(--gradient-ai);
/* linear-gradient(135.2deg, #FF907F 2.48%, #FF57CD 51.83%, #68A7FF 94.27%) */
```

Use as an SVG with the gradient applied, or as an image asset exported from Figma.

---

## Prototyping Guide: Using Icons in React

For prototypes, use **Solar Icons** (`solar-icon-set/react`) as the icon library:

```jsx
// Install: npm install solar-icon-set
// Or use inline SVGs matching Solar outline style

// Standard icon (24px, grey, outline)
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
  stroke="var(--grey-300)" strokeWidth="1.5"
  strokeLinecap="round" strokeLinejoin="round">
  <!-- Solar icon path here -->
</svg>
```

### Common Solar Icon Mappings

| Fold Icon | Lucide Equivalent |
|-----------|-------------------|
| Bell | `Bell` |
| Bell Off | `BellOff` |
| File Text | `FileText` |
| File Add | `FilePlus` |
| File Check | `FileCheck` |
| User | `User` |
| User Plus | `UserPlus` |
| User Check | `UserCheck` |
| Users Group | `Users` |
| Settings | `Settings` |
| Close | `X` |
| Add | `Plus` |
| Minus | `Minus` |
| Search / Magnifier | `Search` |
| Eye | `Eye` |
| Eye Closed | `EyeOff` |
| Pen / Edit | `Pencil` |
| Trash | `Trash2` |
| Copy | `Copy` |
| Filter | `Filter` |
| Calendar | `Calendar` |
| Clock | `Clock` |
| Phone | `Phone` |
| Mail | `Mail` |
| Chat | `MessageCircle` |
| Home | `Home` |
| Download | `Download` |
| Upload | `Upload` |
| Check Round | `CheckCircle` |
| Danger Triangle | `AlertTriangle` |
| Danger Circle | `AlertCircle` |
| Heart | `Heart` |
| Star | `Star` |
| Pin | `Pin` |
| Share | `Share2` |
| Stethoscope | `Stethoscope` |
| Pill | `Pill` |
| Syringe | `Syringe` |
| Hospital | `Building2` |
| Clipboard | `Clipboard` |
| Folder | `Folder` |
| Cloud | `Cloud` |
| Lock | `Lock` |
| Unlock | `Unlock` |
| Shield | `Shield` |
| ChevronDown | `ChevronDown` |
| ChevronUp | `ChevronUp` |
| ChevronLeft | `ChevronLeft` |
| ChevronRight | `ChevronRight` |
| Loader | `Loader2` (with spin animation) |
| Menu Dots | `MoreVertical` |
| Hamburger Menu | `Menu` |
