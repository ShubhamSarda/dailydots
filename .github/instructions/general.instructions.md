---
applyTo: "**/*"
---
# General coding standards

## Purpose
These instructions define universal coding and collaboration standards
that apply to all files in this repository. They provide a shared baseline
for consistency, readability, and maintainability across the codebase.

---

## Code Quality Principles
- Prefer clarity over cleverness
- Write code as if it will be maintained by someone else
- Optimize for readability first, performance second
- Keep functions small and focused
- Avoid premature abstractions

---

## Naming Conventions
- Use descriptive, intention-revealing names
- Avoid single-letter variable names except for well-known cases (`i`, `j`)
- Functions should be named as verbs or verb phrases
- Variables should be nouns
- Avoid abbreviations unless they are widely understood

---

## File & Folder Structure
- Keep files small and focused on a single responsibility
- Avoid deeply nested folder structures
- Group files by feature rather than by type when possible
- Co-locate related files (components, styles, tests)

---

## Comments & Documentation
- Write comments only when necessary to explain *why*, not *what*
- Avoid obvious or redundant comments
- Update comments when behavior changes
- Prefer self-documenting code over comments

---

## Error Handling (General)
- Do not silently ignore errors
- Handle failures explicitly and predictably
- Fail fast when encountering invalid states
- Prefer explicit control flow over hidden side effects

---

## Imports & Dependencies
- Keep imports organized and minimal
- Remove unused imports
- Prefer local utilities over duplicating logic
- Do not introduce new dependencies without clear justification

---

## Formatting & Style
- Keep formatting consistent across files
- Avoid excessive line length
- Use whitespace intentionally to improve readability
- Follow the repository’s existing formatting tools and rules

---

## Refactoring & Changes
- Refactor in small, safe steps
- Avoid mixing refactors with feature changes
- Preserve existing behavior unless explicitly changing it
- Ensure related code is updated together

---

## Collaboration & Git Hygiene
- Make small, focused commits
- Write clear, descriptive commit messages
- Avoid committing commented-out code or debug logs
- Keep PRs focused and easy to review

---

## When in doubt
- Follow existing patterns in the codebase
- Choose the simplest solution that works
- Ask for clarity rather than making assumptions
- Add a short comment when making a non-obvious decision
