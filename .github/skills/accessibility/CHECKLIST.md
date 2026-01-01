# Accessibility Checklist (Quick)

## A) Semantics (HTML first)
- [ ] Clickable things are <button> or <a>, not <div>/<span>
- [ ] Headings follow order (h1 → h2 → h3…)
- [ ] Lists use <ul>/<ol>/<li> when appropriate
- [ ] Tables use <table> only for tabular data (with <th> where needed)

## B) Keyboard
- [ ] All interactive elements reachable by Tab
- [ ] Tab order is logical (matches visual/layout order)
- [ ] Enter/Space activates buttons and menu items
- [ ] Escape closes dialogs/menus (when open)
- [ ] No keyboard traps (you can always Tab away or close)

## C) Focus
- [ ] Visible focus indicator on interactive elements
- [ ] Focus moves into modal/dialog on open
- [ ] Focus returns to trigger on close
- [ ] Background content is not focusable when modal open

## D) Names, labels, instructions
- [ ] Every control has an accessible name (label text, aria-label, or aria-labelledby)
- [ ] Icon-only buttons have aria-label
- [ ] Form inputs have <label htmlFor="..."> or equivalent
- [ ] Help text / error text connected with aria-describedby

## E) ARIA (only when needed)
- [ ] No ARIA on elements that already have correct semantics
- [ ] aria-expanded reflects actual open/closed state
- [ ] aria-controls points to a real element id
- [ ] role is correct (dialog, menu, tablist, etc.)
- [ ] aria-modal used correctly (if implementing modal)

## F) Announcements / status
- [ ] Error summaries use role="alert" (or aria-live assertive when appropriate)
- [ ] Non-blocking status uses aria-live="polite"
- [ ] Loading states communicated (e.g., aria-busy)

## G) Visual accessibility
- [ ] Text contrast is acceptable (avoid low-contrast grays)
- [ ] Don’t rely only on color to convey meaning (use icon/text)
- [ ] Hover-only info also available via focus

## H) Reduced motion
- [ ] Animations respect prefers-reduced-motion
- [ ] No essential info depends on animation

## I) Testing steps (minimum)
- [ ] Keyboard-only: navigate, activate, close, submit forms
- [ ] Screen reader sanity: control has correct name/role/value
- [ ] Zoom to 200%: layout still works, no hidden content
