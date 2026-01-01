---
applyTo: "**/*.{css,scss,less,js,jsx,ts,tsx,html}"
---
# design.instructions.md

You are designing a **Daily Journal** web app that should look and feel **very close to Notion**: calm, minimal, text-first, neutral colors, subtle borders, and great spacing.

## Design goals
- **Notion-like UI**: clean, quiet, content-focused
- **Fast + readable**: prioritize typography and whitespace over decoration
- **Consistent system**: reusable tokens (colors, spacing, radius) and components
- **Accessible**: keyboard-friendly, high contrast, clear focus states

## Hard constraints (must follow)
- **Do not use emojis anywhere** (UI labels, buttons, placeholders, empty states, etc.)
- **Do not use purple gradients** (or any gradients as “branding”)
- Avoid flashy visuals, heavy shadows, glassmorphism, neon colors, or skeuomorphic styles

## Visual language (Notion-inspired)
### Color palette
Use neutral grayscale with a single subtle accent.
- Background: near-white or very light gray
- Surfaces: white
- Text: near-black for primary, medium gray for secondary
- Borders/dividers: light gray, thin
- Accent: muted blue/gray (links, active states) only

### Typography
- Prefer system UI fonts (clean and consistent)
- Use a clear hierarchy:
  - Page title: larger, bold
  - Section titles: medium, semi-bold
  - Body: normal size, comfortable line height
- Keep line length readable (avoid super wide text blocks)

### Spacing & layout
- Use generous padding and whitespace (Notion feels “airy”)
- Consistent spacing scale (e.g., 4 / 8 / 12 / 16 / 24 / 32)
- Content column should be centered with a max width
- Use subtle separators instead of heavy boxes

### Borders & shadows
- Borders: thin + light gray
- Shadows: minimal or none; if used, extremely subtle
- Rounded corners: small to medium (Notion-like, not “bubble UI”)

## Core UI patterns to mimic Notion
### Navigation
- Left sidebar with:
  - App name
  - Navigation items (Home, My Journal, Add Entry, Settings)
- Sidebar items:
  - subtle hover background
  - clear active state (slightly darker background + left indicator or bold text)

### Top bar (optional)
- Simple page header with title + minimal actions
- Avoid large hero sections

### Buttons
- Default: light background, subtle border, neutral text
- Primary: muted accent background, no gradient
- Hover: slightly darker background
- Disabled: lower contrast, no shadow

### Inputs (Notion-like)
- Minimal styling, subtle border
- Clear focus ring (accessible)
- Placeholder text: neutral, not playful
- Textareas should feel like a writing surface (comfortable padding, good line height)

### Cards / panels
- Prefer flat surfaces with subtle borders
- Avoid “dashboard card” look with heavy shadows

### Empty states
- Calm and helpful
- Plain text + simple icon (no emoji), optional small illustration only if extremely subtle

## Journal entry experience
- Writing is the hero:
  - large comfortable editor area
  - minimal distractions
- Entry metadata (date, mood label, tags) should be small and secondary
- If mood is included, use **text labels** or simple shapes, not emoji

## Micro-interactions
- Fast hover feedback: background tint, underline links
- Smooth but subtle transitions (100–200ms)
- No animated gradients, no excessive motion

## Accessibility requirements
- All actions reachable by keyboard
- Visible focus states on interactive elements
- Good contrast for text and buttons
- Semantic HTML (buttons are buttons, links are links)
- Form labels are present (visible or properly associated)

## Do / Don’t
**Do**
- Use neutral colors and whitespace
- Keep UI minimal and consistent
- Use subtle borders and muted accents
- Make the editor feel calm and focused

**Don’t**
- Use emojis anywhere
- Use purple gradients or any gradient branding
- Use neon accents, heavy shadows, glass effects
- Over-decorate empty states or headings

## Implementation guidance
- Define design tokens (colors, spacing, radius, font sizes) and reuse them everywhere
- Build small reusable components:
  - SidebarItem, Button, Input, TextArea, PageHeader, Divider, Card/Panel
- Keep styling predictable: no one-off “special” styles unless necessary
