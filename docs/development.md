# Development Guide

This document provides a detailed overview of the Daily Dots project architecture, folder structure, and development workflow.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Folder Structure](#folder-structure)
- [Key Concepts](#key-concepts)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Strategy](#testing-strategy)

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm (comes with Node.js)
- A modern code editor (VS Code recommended)

### Initial Setup

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Development Commands

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Type check + build for production (runs tsc -b && vite build)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint on all source files
```

---

## Project Architecture

### Tech Stack Summary

- **Vite 7** - Fast build tool and dev server
- **React 19** - UI library
- **TypeScript 5.9** - Type safety and developer experience
- **React Router 7** - Routing and navigation
- **Tailwind CSS 4** - Utility-first styling
- **localStorage** - Client-side data persistence

### Design Principles

1. **Functional Components** - Only use React function components with hooks
2. **Context API for State** - Global state managed via React Context (`JournalProvider`)
3. **Service Layer Pattern** - All data operations in `src/services/`
4. **Type Safety** - Strict TypeScript with no `any` types
5. **Tailwind-First Styling** - Minimal custom CSS, utility classes preferred

---

## Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── Modal.tsx        # Confirmation modal
│   ├── MoodSelector.tsx # Mood picker UI
│   └── Navigation.tsx   # Top navigation bar
│
├── pages/               # Route-level pages
│   ├── Home.tsx         # Dashboard with stats and quick add
│   ├── MyJournals.tsx   # List of all journal entries
│   └── AddNewJournal.tsx # Create/edit journal form
│
├── hooks/               # Custom React hooks
│   ├── useJournalContext.tsx # Context provider + hook for journal state
│   └── useDocumentTitle.ts   # Set page title dynamically
│
├── services/            # Data layer
│   └── journalService.ts # localStorage CRUD operations
│
├── types/               # TypeScript type definitions
│   └── journal.ts       # JournalEntry, MoodType types
│
├── utils/               # Helper functions
│   └── dateUtils.ts     # Date formatting and calculations
│
├── App.tsx              # Root component with router setup
├── main.tsx             # App entry point
└── index.css            # Global styles + Tailwind directives
```

### File Naming Conventions

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts` or `useCamelCase.tsx`
- Services: `camelCase.ts`
- Types: `camelCase.ts`
- Utilities: `camelCase.ts`

---

## Key Concepts

### State Management

**JournalContext** (`src/hooks/useJournalContext.tsx`)

Global state provider that wraps the entire app. Manages journal entries and provides CRUD operations.

```tsx
const { entries, getEntryByDate, saveEntry, deleteEntry, isLoading } = useJournal();
```

**Provider Setup** (App.tsx):

```tsx
<JournalProvider>
  <Navigation />
  <Routes>...</Routes>
</JournalProvider>
```

### Data Layer

**journalService** (`src/services/journalService.ts`)

Encapsulates all localStorage operations. This abstraction makes it easy to swap localStorage for a backend API (e.g., Supabase) later.

Methods:
- `getAllEntries()` - Fetch all entries sorted by date
- `getEntryByDate(date)` - Fetch single entry
- `saveEntry(entry)` - Create or update entry
- `deleteEntry(date)` - Remove entry
- `getEntriesForMonth(year, month)` - Filter by month

**Important:** Components never call `localStorage` directly. Always go through `journalService`.

### Routing

**Routes** (`src/App.tsx`):

- `/` - Home (dashboard and quick add)
- `/journals` - MyJournals (list view)
- `/new` - AddNewJournal (create/edit form)
- `/new?date=YYYY-MM-DD` - Edit specific entry

### Styling

**Tailwind CSS 4** is the primary styling solution.

- No per-component CSS files
- Utility classes only
- Custom CSS limited to global base styles in `index.css`
- Focus states required for accessibility: `focus-visible:ring-2`

**Responsive Design:**

- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Flexible layouts with `flex` and `grid`

---

## Development Workflow

### Adding a New Feature

1. **Plan the change** - Identify which files need updates
2. **Update types** (if needed) - Add/modify types in `src/types/`
3. **Update service layer** (if needed) - Add methods to `journalService.ts`
4. **Update context** (if needed) - Expose new state or actions in `useJournalContext.tsx`
5. **Update UI** - Modify components or pages
6. **Test manually** - Run `npm run dev` and verify behavior
7. **Lint** - Run `npm run lint` before committing

### Example: Adding a New Mood Type

**Step 1:** Update `src/types/journal.ts`

```typescript
export type MoodType = 
  | '😊 Happy'
  | '😔 Sad'
  | '🤔 Thoughtful'  // New mood
  // ... rest
```

**Step 2:** Update `src/components/MoodSelector.tsx` to include the new option.

**Step 3:** Test in the UI.

### Hot Reloading

Vite provides instant hot module replacement (HMR). Changes to `.tsx` files update immediately without losing React state.

### Type Checking

TypeScript runs during development (editor checks) and during build:

```bash
npm run build  # Runs `tsc -b` before bundling
```

Fix all type errors before committing.

---

## Code Standards

### TypeScript Rules

- Use strict mode (`tsconfig.json` has `strict: true`)
- No `any` types unless absolutely necessary
- Prefer interfaces for object shapes
- Use type aliases for unions

### React Best Practices

- Always use functional components
- Use `useState`, `useEffect`, `useContext` hooks
- Keep components small and focused
- Avoid inline function definitions in JSX (use `useCallback` if needed)
- Always include `key` prop in lists

### Component Documentation

Every component and hook should have a TSDoc comment:

```tsx
/**
 * MoodSelector component
 * Displays mood options as large emoji buttons
 * 
 * @param value - Currently selected mood
 * @param onChange - Callback when mood is selected
 */
export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  // ...
}
```

### Naming Conventions

- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Private helpers: prefix with `_` (if needed)

---

## Testing Strategy

### Current State

No automated tests are currently in place. Manual testing is required for all changes.

### Future Testing

When adding tests, use:

- **React Testing Library** for component tests
- **Vitest** for unit tests
- **MSW** (Mock Service Worker) for mocking localStorage/future API calls

Example test structure:

```
src/
├── components/
│   ├── Modal.tsx
│   └── Modal.test.tsx
├── services/
│   ├── journalService.ts
│   └── journalService.test.ts
```

---

## Common Tasks

### Adding a New Page

1. Create `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in `src/components/Navigation.tsx`

### Adding a New Component

1. Create `src/components/NewComponent.tsx`
2. Export component as named export
3. Document with TSDoc comment
4. Use Tailwind classes for styling

### Debugging

Use React DevTools browser extension to inspect:
- Component tree
- Context values
- State updates

---

## Build Configuration

### Vite Config (`vite.config.ts`)

Standard React + TypeScript setup with the `@vitejs/plugin-react` plugin.

### TypeScript Config

- `tsconfig.json` - Base config
- `tsconfig.app.json` - App-specific settings
- `tsconfig.node.json` - Node scripts (Vite config)

### Tailwind Config (`tailwind.config.js`)

- Content paths: `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`
- Default theme (no custom colors or spacing yet)

---

## Troubleshooting

### Port Already in Use

If port 5173 is taken, Vite will try the next available port. Check the terminal output.

### Type Errors After npm install

```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### localStorage Not Persisting

Check browser settings. Incognito/Private mode may clear localStorage on exit.

---

## Next Steps

Ready to contribute? Check the [Contributing Guide](contributing.md) for PR workflow and code review process.
