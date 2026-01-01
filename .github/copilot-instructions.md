# GitHub Copilot Instructions

Project: Daily Journal + Mood Tracker
Tech Stack: Vite + React + TypeScript + Supabase + Tailwind CSS

## Overall Objective

Generate clean, scalable, readable code that supports a Daily Journal + Mood Tracker application. Follow modern React and TypeScript best practices and prioritize maintainability.

---

## Core Coding Principles

1. Use functional components only with React Hooks.
2. Use React Context API + custom hooks for application state (journal entries, mood data, user session).
3. Store Supabase calls inside /src/services/ and avoid calling Supabase directly from components.
4. All files must use TypeScript (.tsx, .ts).
5. Follow strict ESLint + Prettier standards.
6. Maintain feature balance between journal and mood tracking.

---

## Folder Structure Style

Use this structure and add new files in matching locations:

```
src/
  components/
  pages/
  hooks/
  services/
  utils/
  styles/
```

Notes:

* Keep shared UI components in /src/components.
* Keep route level pages in /src/pages.
* Keep context providers and shared state hooks in /src/hooks.
* Keep all Supabase interaction in /src/services.

---

## Tailwind CSS Rules

* Use Tailwind CSS as the primary styling solution.
* Prefer Tailwind utility classes over custom CSS.
* Keep custom CSS minimal and limited to:

  * small global base rules in src/styles/globals.css (optional)
  * third party overrides only when unavoidable
* Do not create per-component CSS files.
* Do not use inline style objects unless you must set a dynamic value that Tailwind cannot express.

### Class style guidance

* Prefer readable class groupings:

  * layout: flex, grid, gap, spacing
  * typography: text sizes, weights, tracking
  * color and borders
  * interaction: hover, focus-visible, active
  * responsive: sm:, md:, lg:
* Always include accessible focus styles (focus-visible:ring or equivalent).
* Use semantic sizing and spacing (avoid overly tight values).
* Keep the UI clean and modern. No animation heavy styles by default.

### Tailwind config expectations

When scaffolding, ensure the project includes:

* tailwind.config.ts or tailwind.config.js with correct content paths
* postcss.config.js
* Tailwind directives in the global stylesheet:

  * @tailwind base;
  * @tailwind components;
  * @tailwind utilities;

---

## Naming Conventions

Use:

* camelCase for variables, functions, files
* PascalCase for components and hooks
* Clear and descriptive names
* Example: JournalEntryForm.tsx, useJournalContext.ts

---

## UI/UX Guidelines

* Produce balanced styling: clean layout, responsive spacing, accessible color contrast.
* Focus on readability and a calm journaling experience.
* Prefer semantic HTML: main, header, section, article.
* Ensure mobile responsiveness (sm, md, lg breakpoints).
* Do not generate overly complex animations.

---

## Comments & Documentation

* Every component and custom hook should include TSDoc style documentation explaining props, logic, and return values.
* Add inline comments to clarify complex logic.
* Avoid obvious comments.

---

## Data + Supabase Logic

* Never place Supabase logic inside components.
* All queries live inside /src/services.
* Services must:

  * return typed responses
  * throw typed errors on failure
* Keep async functions predictable and consistent.

Example structure:

```
src/services/
  journalService.ts
  moodService.ts
  authService.ts
```

---

## Component Rules

* Prefer composition over prop drilling.
* Break large pages into smaller UI components.
* Use custom hooks for shared logic (useJournal, useMood, useAuth).
* Keep components strongly typed and reusable.
* Keep presentational components free of business logic when possible.

---

## State Management

Use:

* Context Provider pattern
* Custom hooks
* Minimal local state inside components

Example:

```
src/hooks/
  useJournalContext.ts
  useMoodContext.ts
  useAuthContext.ts
```

---

## Testing Guidance

* Prefer React Testing Library for component tests.
* Prioritize logic tests for services and hooks.
* Place tests in **tests** folders or alongside files based on repository convention.
* Mock Supabase client calls in service tests.

---

## Performance Expectations

* Avoid unnecessary network calls.
* Memoize expensive computations when needed.
* Keep rerenders minimal (useMemo, useCallback, React.memo only when justified).
* Prefer pagination or lazy loading for long journal lists.

---

## Output Format Expectations

When generating code, Copilot should:

1. Suggest complete solutions.
2. Use current project architecture.
3. Maintain strict typing.
4. Avoid creating unused helpers or blank files.
5. Use Tailwind classes consistently for styling.

---

## Prioritization Guidance

For all future suggestions:

* Treat journal entry storage and mood tracking as equally important parts of the product.
* Prioritize clarity over cleverness.
* Value readability over brevity.

---

## Do Not

* Do not use class components.
* Do not generate inline Supabase code in UI files.
* Do not override folder structure.
* Do not create per-component CSS files.
* Do not generate animation heavy UI.
* Do not break naming standards.

---

## Goal

Help build a clean, scalable, production ready Daily Journal + Mood Tracker built with Vite, React, Supabase, TypeScript, and Tailwind CSS with maintainable code, predictable structure, and smooth developer experience.
