# Daily Dots - Daily Journal & Mood Tracker

A clean, modern daily journal web app built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- **One Entry Per Day**: Create or edit a single journal entry for each calendar day
- **Mood Tracking**: Select from 8 different moods (Happy, Sad, Calm, Frustrated, Tired, Excited, Anxious, Neutral)
- **Three Main Pages**:
  - **Home**: Dashboard with stats, today's entry quick add, and recent entries
  - **My Journals**: Browse all entries, edit or delete
  - **Add Entry**: Create new entries or update existing ones by date

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **localStorage** - Data persistence (easily swappable to Supabase later)

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navigation.tsx
│   └── MoodSelector.tsx
├── pages/            # Route-level pages
│   ├── Home.tsx
│   ├── MyJournals.tsx
│   └── AddNewJournal.tsx
├── hooks/            # Custom React hooks
│   └── useJournalContext.tsx
├── services/         # Data service layer
│   └── journalService.ts
├── types/            # TypeScript type definitions
│   └── journal.ts
├── App.tsx           # Main app component with routing
├── main.tsx          # App entry point
└── index.css         # Tailwind directives
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Data Persistence

Currently uses **localStorage** via a service layer abstraction. All data operations go through `src/services/journalService.ts`, making it easy to swap to a backend like Supabase by only modifying the service file.

### Storage Structure

```typescript
interface JournalEntry {
  date: string;           // ISO date (YYYY-MM-DD)
  mood: MoodType;         // Selected mood
  content: string;        // Journal text
  createdAt: string;      // Creation timestamp
  updatedAt: string;      // Last update timestamp
}
```

## Design Philosophy

- **Clean & Minimal**: Focus on writing, not distractions
- **Responsive**: Works on mobile, tablet, and desktop
- **Accessible**: Proper focus states, semantic HTML, ARIA labels
- **Type-Safe**: Full TypeScript coverage
- **Maintainable**: Clear separation of concerns, well-documented code

## Future Enhancements

- [ ] Migrate to Supabase for backend storage
- [ ] User authentication
- [ ] Search and filtering
- [ ] Export entries (PDF, Markdown)
- [ ] Mood analytics and trends
- [ ] Dark mode
- [ ] Rich text editor

## License

MIT
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
