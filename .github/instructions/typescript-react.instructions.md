---
applyTo: "**/*.ts,**/*.tsx"
---
# Project coding standards for TypeScript and React

## Purpose
These instructions define how AI assistants should write and modify
TypeScript and React code in this repository. Follow these rules strictly
unless existing code clearly follows a different pattern.

---

## TypeScript Guidelines
- Use TypeScript for all new code
- Assume `strict: true` is enabled in `tsconfig.json`
- Do not use `any`; prefer `unknown` and narrow with type guards
- Avoid non-null assertions (`!`) and unsafe type assertions (`as`)
- Prefer `type` for unions, primitives, and function signatures
- Use `interface` for object shapes intended to be extended or implemented
- Always type function parameters and return values for exported functions
- Prefer immutable data (`const`, `readonly`, immutable updates)
- Use optional chaining (`?.`) and nullish coalescing (`??`) where appropriate
- Prefer discriminated unions over multiple boolean flags
- Use `import type` for type-only imports when applicable

---

## Error Handling & Safety
- Throw `Error` objects, not strings
- Treat caught errors as `unknown` and narrow safely
- Do not silently swallow errors
- Prefer typed error results (discriminated unions or Result-style patterns)

---

## React Guidelines
- Use functional components and React hooks exclusively
- Follow the Rules of Hooks (no conditional or dynamic hook calls)
- Prefer explicit prop typing; avoid implicit `any`
- Use `React.FC` only when the component accepts `children`
- Keep components small, focused, and single-responsibility
- Prefer composition over large conditional render blocks
- Avoid unnecessary re-renders; memoize only when justified
- Match the repository’s existing styling approach

---

## State & Data Flow
- Prefer derived state over duplicated state
- Avoid deeply nested state objects
- Use controlled components for forms
- Lift state only when necessary to avoid prop drilling

---

## Formatting & Readability
- Prefer early returns over deeply nested conditionals
- Keep files and components short and readable
- Use clear, descriptive variable and function names
- Follow existing repository conventions before introducing new abstractions

---

## When in doubt
- Follow existing codebase patterns
- Choose clarity and type safety over cleverness
- Add a short comment when deviating from these guidelines
