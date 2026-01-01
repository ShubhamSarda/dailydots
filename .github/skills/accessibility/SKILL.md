---
name: accessibility
description: Improve accessibility (a11y) in this codebase. Use when reviewing UI changes, building React components, editing forms/modals/menus, or fixing a11y issues (keyboard, focus, ARIA, semantics, color contrast, screen readers). Output actionable fixes and verify against checklist.
---

# Accessibility Skill Instructions

## Goal
Make UI changes accessible by default:
- Keyboard works for everything
- Focus is visible and managed correctly
- Semantics first (native HTML before ARIA)
- Screen readers get correct labels, roles, states
- Forms are usable and error messages are announced
- No “trap” experiences (modals, drawers, menus)

## When to use this skill
Use this skill if the user asks to:
- “make it accessible”, “fix a11y”, “WCAG”, “screen reader”, “keyboard navigation”
- build or refactor: forms, modals/dialogs, dropdowns/menus, tabs, accordions
- review PRs/components for accessibility regressions
- address audit issues (Lighthouse / axe / WAVE)

## Working rules (priority order)
1. Prefer native elements:
   - Use <button>, <a>, <input>, <label>, <dialog> (or well-built dialog)
2. If you must use ARIA:
   - Use the minimum required
   - Ensure ARIA attributes match behavior (aria-expanded, aria-controls, aria-selected)
3. Keyboard support is non-negotiable:
   - Tab order is logical
   - Enter/Space activates controls
   - Escape closes modals/menus (when expected)
4. Focus:
   - Visible focus ring
   - Manage focus on open/close for modals/drawers
   - Never remove outline without replacement
5. Names/labels:
   - Every interactive control must have an accessible name
   - Icon-only buttons need aria-label
   - Inputs must have <label> or aria-label/aria-labelledby
6. Announcements:
   - Form errors should be connected via aria-describedby
   - Use role="alert" for critical errors/status messages
7. Reduced motion:
   - Respect prefers-reduced-motion for animations

## Process (follow this)
1. Identify interactive elements and user flows.
2. Run the checklist in CHECKLIST.md and note failures.
3. Propose the smallest safe code changes.
4. Provide a short “How to test” section:
   - Keyboard steps
   - Screen reader sanity checks (name/role/value)
5. If relevant, suggest adding an automated test:
   - React Testing Library queries by role/label
   - Optional: axe-core integration

## Output format (always)
- Summary (2–4 bullets)
- Issues found (grouped: Keyboard, Focus, Semantics/ARIA, Forms, Visual)
- Proposed fixes (with code snippets or diffs)
- How to test (step-by-step)

## Repo conventions
- React + TypeScript: prefer strongly typed handlers and props.
- Keep components semantic and reusable.
- Don’t introduce heavy dependencies unless requested.
- If adding a util, place it close to where it’s used.

## Reference files in this skill
- CHECKLIST.md (use as your source of truth)
- examples/ for patterns (button, modal, form)
- snippets/aria-patterns.md for common ARIA usage
- templates/accessibility-review-template.md for PR reviews
