---
applyTo: "**/*.css,**/*.ts,**/*.tsx"
---
# CSS and Tailwind coding standards

## Purpose
These instructions define how AI assistants should write and modify styling
in this repository. Use Tailwind CSS as the primary styling approach unless
existing code clearly uses a different pattern.

---

## Tailwind First
- Prefer Tailwind utility classes over writing new CSS
- Use CSS only when:
  - Tailwind cannot express the styling cleanly
  - Defining reusable tokens via CSS variables
  - Complex selectors or animations are required
- Do not introduce a second styling system unless the repo already uses it

---

## Class Organization
- Keep class lists readable and consistent
- Group utilities in this order when possible:
  1. Layout & positioning
  2. Flex/Grid & alignment
  3. Spacing
  4. Sizing
  5. Typography
  6. Colors
  7. Borders, radius, shadows
  8. Effects
  9. Transitions & animations
  10. State variants (`hover:`, `focus:`, etc.)
- Prefer multi-line `className` formatting for long class lists

---

## Reuse & Abstractions
- If a class pattern repeats 3+ times, extract a reusable component
- Prefer small wrapper components over shared CSS files
- Use a class merge helper consistently (`clsx`, `tailwind-merge`, or `cn`)

---

## Responsive Design
- Mobile-first approach
- Use breakpoints consistently: `sm`, `md`, `lg`, `xl`, `2xl`
- Avoid excessive breakpoints on a single element

---

## Accessibility & States
- Always include visible focus styles for interactive elements
- Ensure sufficient color contrast
- Include disabled states where applicable
- Use semantic HTML and `aria-*` attributes when needed

---

## Custom CSS Rules
When writing CSS:
- Use CSS variables for theme tokens
- Keep selectors shallow
- Avoid `!important` unless fixing third-party conflicts
- Prefer Tailwind layers (`@layer base/components/utilities`) when relevant

---

## Animations & Motion
- Keep animations subtle and purposeful
- Respect reduced motion preferences using `motion-reduce:`

---

## File & Naming Conventions
- Use `kebab-case.css` for CSS files
- Keep global styles minimal and intentional

---

## When in doubt
- Prefer Tailwind utilities and small reusable components
- Match existing repository styling patterns
- Choose clarity and accessibility over visual cleverness
