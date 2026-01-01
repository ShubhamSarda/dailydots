# Daily Dots

A clean and minimal daily journal and mood tracker built with React, TypeScript, and Tailwind CSS. Track your daily thoughts, emotions, and build a journaling habit.

## Overview

Daily Dots helps you:
- Write one journal entry per day
- Track your mood alongside your thoughts
- View past entries and measure your journaling streak
- Keep your data private (stored locally in your browser)

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **localStorage** - Data persistence (frontend-only, no backend required)

## Quickstart

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dailydots

# Install dependencies
npm install
```

### Run Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Type check
npm run build

# Preview production build
npm run preview
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Type check and build for production |
| `npm run lint` | Run ESLint on all source files |
| `npm run preview` | Preview production build locally |

## Features

### Core Functionality

- **Daily Journaling** - One entry per calendar day
- **Mood Tracking** - Choose from 8 mood options (😊 Happy, 😔 Sad, 😌 Calm, etc.)
- **Journal History** - Browse all past entries
- **Entry Management** - Edit or delete existing entries
- **Statistics Dashboard** - View total entries, monthly count, and current streak

### User Experience

- Responsive design (mobile, tablet, desktop)
- Accessible navigation and focus states
- Clean, minimal UI focused on writing
- Fast and lightweight (no backend dependencies)

## Project Structure

```
src/
├── components/       # Reusable UI components (Modal, Navigation, MoodSelector)
├── pages/            # Route-level pages (Home, MyJournals, AddNewJournal)
├── hooks/            # Custom React hooks (context providers, utilities)
├── services/         # Data layer (journalService for localStorage)
├── types/            # TypeScript type definitions
└── utils/            # Helper functions (date utilities)
```

## Data Storage

Currently, all journal entries are stored in **localStorage** in your browser. No backend or database is required. Data persists across sessions but is device-specific and browser-specific.

**Key:** `dailydots_journal_entries`

**Structure:**
```json
[
  {
    "date": "2026-01-02",
    "mood": "😊 Happy",
    "content": "Today was a great day...",
    "createdAt": "2026-01-02T10:30:00.000Z",
    "updatedAt": "2026-01-02T10:30:00.000Z"
  }
]
```

### Future Backend Integration

The project is architected to support backend integration (e.g., Supabase) by swapping out `journalService.ts`. The Context API and component layer remain unchanged.

## Environment Variables

This project does not currently use environment variables. If you add a backend (e.g., Supabase), create a `.env.local` file:

```bash
# Example for future Supabase integration
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Documentation

- [Development Guide](docs/development.md) - Detailed setup and architecture overview
- [Contributing](docs/contributing.md) - How to contribute to the project

## Browser Support

Modern browsers with ES2020+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Note: Data is stored in localStorage, which is supported by all modern browsers.

## License

This project is open source and available under the MIT License.

## Roadmap

Potential future features:
- Supabase integration for cloud sync
- Search and filtering
- Mood analytics and insights
- Export journal as PDF or markdown
- Dark mode

---

Built with ❤️ using Vite + React + TypeScript + Tailwind CSS
