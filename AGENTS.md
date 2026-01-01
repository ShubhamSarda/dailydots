# AGENTS.md

This file defines how AI agents must operate inside this repository.
It does not redefine coding or design rules. It points to their sources.

## Source of truth (must follow)
AI agents MUST follow these instruction files:

1) `general.instructions.md`
   - Global rules that apply to all files and workflows

2) `copilot-instructions.md`
   - Architecture, folder structure, and Copilot-specific behavior

3) `typescript-react.instructions.md`
   - TypeScript and React coding standards (`**/*.ts`, `**/*.tsx`)

4) `design.instructions.md`
   - UI, styling, layout, and UX conventions

### Rule priority
If instructions conflict:
1) Match existing codebase patterns first
2) Follow the order listed above
3) Choose safety and clarity if still uncertain, and leave a short comment

## How agents should work in this repo
- Make small, scoped changes aligned with existing patterns
- Avoid repo-wide refactors unless explicitly requested
- Prefer extending existing code over introducing new abstractions
- Do not introduce new frameworks, libraries, or styling systems unless asked

## Commands (use package.json as the source of truth)
Common commands in this repository:
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Typecheck: `npm run typecheck` (if present)
- Tests: `npm test` / `npm run test` (if present)

Before claiming work is complete, ensure lint and typecheck pass (and tests if present).

## Security & safety (hard boundaries)
- Never hardcode secrets, tokens, API keys, or credentials
- Use environment variables for configuration
- Do not log sensitive data
- Do not weaken TypeScript strictness to bypass errors
- Do not bypass security mechanisms defined in the project (e.g., auth, RLS)

## What not to touch (unless explicitly requested)
- Build output (e.g., `dist/`)
- Lockfiles unless dependency changes are required
- Generated or vendor files
- Repo-wide formatting or architectural changes

## Expected output from agents
When proposing changes, include:
- What changed (files + intent)
- Why it changed
- How it was validated (commands run or checks expected)
- Any follow-ups or risks
