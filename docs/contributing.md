# Contributing Guide

Thank you for your interest in contributing to Daily Dots! This guide will help you set up your development environment and understand the contribution workflow.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Git
- Code editor (VS Code recommended)

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork locally:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/dailydots.git
   cd dailydots
   ```

3. **Add upstream remote:**

   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/dailydots.git
   ```

4. **Install dependencies:**

   ```bash
   npm install
   ```

5. **Start development server:**

   ```bash
   npm run dev
   ```

---

## Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/update-description` - Documentation updates

### Making Changes

1. **Create a new branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following code standards (see below)

3. **Test your changes locally:**

   ```bash
   npm run dev      # Manual testing
   npm run lint     # Check for linting errors
   npm run build    # Ensure build succeeds
   ```

4. **Commit your changes:**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Use conventional commit messages (see [Commit Message Format](#commit-message-format))

5. **Push to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

---

## Code Standards

### General Principles

Follow the instructions in these files:

- `.github/instructions/general.instructions.md` - Universal coding standards
- `.github/instructions/typescript-react.instructions.md` - React + TypeScript rules
- `.github/instructions/css-tailwind.instructions.md` - Styling guidelines
- `.github/instructions/design.instructions.md` - UI/UX conventions
- `.github/copilot-instructions.md` - Project-specific architecture rules

Key principles:

- **Clarity over cleverness**
- **Functional components only** (no class components)
- **TypeScript strict mode** (no `any` types)
- **Tailwind CSS** for all styling (no custom CSS files per component)
- **Service layer pattern** (all data operations in `src/services/`)

### Code Formatting

Run ESLint before committing:

```bash
npm run lint
```

If you use VS Code, install these extensions:

- ESLint
- Tailwind CSS IntelliSense
- Prettier (if configured in the project)

### TypeScript Requirements

- Use strict mode (already enabled in `tsconfig.json`)
- Avoid `any` types - use `unknown` or specific types
- Document complex types with TSDoc comments
- Prefer interfaces for object shapes
- Use type aliases for unions

### Component Guidelines

**Every component must include:**

1. **TSDoc comment** explaining purpose
2. **Props interface** (if component accepts props)
3. **Descriptive names** - use intention-revealing names
4. **Focus states** - always include `focus-visible:ring` styles for accessibility

**Example:**

```tsx
/**
 * FeatureCard component
 * Displays a feature description with icon
 * 
 * @param title - Feature title
 * @param description - Feature description text
 * @param icon - React element for icon
 */
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
```

### File Organization

When adding new files:

- Components → `src/components/`
- Pages → `src/pages/`
- Hooks → `src/hooks/`
- Services → `src/services/`
- Types → `src/types/`
- Utils → `src/utils/`

Do not create deeply nested folders. Keep the structure flat and simple.

### Styling Rules

- **Use Tailwind utility classes** for all styling
- **No per-component CSS files** (e.g., no `Button.css`)
- **Minimal custom CSS** - only in `src/index.css` for global base styles
- **Responsive by default** - use `sm:`, `md:`, `lg:` breakpoints
- **Accessible focus states** - always include `focus-visible:` styles

---

## Pull Request Process

### Before Submitting

- [ ] Code follows project standards
- [ ] All linting checks pass (`npm run lint`)
- [ ] Build succeeds without errors (`npm run build`)
- [ ] Changes have been manually tested
- [ ] Commit messages follow conventional commit format
- [ ] PR description clearly explains what and why

### PR Title Format

Use conventional commit format:

- `feat: add mood filtering to MyJournals page`
- `fix: resolve date picker timezone issue`
- `docs: update README with new features`
- `refactor: simplify journalService error handling`
- `style: improve mobile spacing on Home page`
- `chore: update dependencies`

### PR Description Template

```markdown
## Description
Brief summary of what changed and why.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactor
- [ ] Performance improvement

## Related Issue
Closes #123 (if applicable)

## Testing
How did you test this change?

## Screenshots
(If applicable, add screenshots of UI changes)

## Checklist
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Manually tested
- [ ] Documentation updated (if needed)
```

### Review Process

1. A maintainer will review your PR
2. Address any requested changes
3. Once approved, your PR will be merged

### Code Review Guidelines

Reviewers will check for:

- Adherence to code standards
- Correct TypeScript usage
- Proper error handling
- Accessibility (focus states, semantic HTML)
- Consistency with existing patterns
- Clear commit messages

---

## Commit Message Format

Use **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, whitespace)
- `refactor` - Code changes that neither fix bugs nor add features
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks (dependencies, config)

### Examples

```bash
feat: add search functionality to MyJournals page

fix: correct date formatting in journal entries

docs: update development.md with testing section

refactor: simplify useJournalContext hook

style: improve button hover states
```

---

## Issue Guidelines

### Reporting Bugs

When reporting a bug, include:

1. **Description** - What happened?
2. **Expected behavior** - What should have happened?
3. **Steps to reproduce** - How can we recreate the issue?
4. **Environment** - Browser, OS, Node version
5. **Screenshots** (if applicable)

**Example:**

```markdown
## Bug Description
Mood selector doesn't update when clicking a mood option.

## Expected Behavior
Clicking a mood should highlight it and update the form state.

## Steps to Reproduce
1. Go to /new
2. Click on any mood option
3. Notice nothing happens

## Environment
- Browser: Chrome 120
- OS: Windows 11
- Node: 18.17.0
```

### Suggesting Features

When suggesting a feature, include:

1. **Problem** - What problem does this solve?
2. **Proposed solution** - How should it work?
3. **Alternatives considered** (optional)
4. **Additional context** (optional)

---

## Getting Help

If you have questions:

- Check existing documentation ([README.md](../README.md), [development.md](development.md))
- Search existing issues on GitHub
- Open a new issue with the `question` label

---

## Recognition

Contributors will be recognized in:

- GitHub contributor list
- Release notes (for significant contributions)

Thank you for contributing to Daily Dots!
