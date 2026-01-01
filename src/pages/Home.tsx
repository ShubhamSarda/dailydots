import { useNavigate } from 'react-router-dom';
import { useJournal } from '../hooks/useJournalContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useState } from 'react';
import { MoodSelector } from '../components/MoodSelector';
import type { MoodType, JournalEntry } from '../types/journal';

/**
 * Home page
 * Shows summary and quick add form
 */
export function Home() {
  useDocumentTitle('Home');
  
  const { entries, getEntryByDate, saveEntry } = useJournal();
  const navigate = useNavigate();

  const todayDate = getTodayDate();
  const todayEntry = getEntryByDate(todayDate);

  const [showQuickAdd, setShowQuickAdd] = useState(!todayEntry);
  const [mood, setMood] = useState<MoodType>('😊 Happy');
  const [content, setContent] = useState('');

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    saveEntry({ date: todayDate, mood, content });
    setShowQuickAdd(false);
    setContent('');
  };

  const recentEntries = entries.slice(0, 5);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Welcome to Daily Dots
        </h1>
        <p className="text-gray-600">
          Your personal space to reflect and track your daily journey
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Total Entries</p>
          <p className="text-3xl font-bold text-gray-900">{entries.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">This Month</p>
          <p className="text-3xl font-bold text-gray-900">
            {getEntriesThisMonth(entries)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-gray-900">
            {calculateStreak(entries)} days
          </p>
        </div>
      </div>

      {/* Today's Entry */}
      {todayEntry ? (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Today's Entry
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{todayEntry.mood.split(' ')[0]}</span>
            <span className="text-lg text-gray-700">{todayEntry.mood}</span>
          </div>
          <p className="text-gray-700 whitespace-pre-wrap mb-4">
            {todayEntry.content}
          </p>
          <button
            onClick={() => navigate(`/new?date=${todayDate}`)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded cursor-pointer"
          >
            Edit today's entry →
          </button>
        </section>
      ) : showQuickAdd ? (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Add - Today's Entry
          </h2>
          <form onSubmit={handleQuickAdd} className="space-y-4">
            <MoodSelector value={mood} onChange={setMood} />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              placeholder="How was your day?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors resize-none"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors cursor-pointer"
              >
                Save Entry
              </button>
              <button
                type="button"
                onClick={() => setShowQuickAdd(false)}
                className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center mb-8">
          <p className="text-gray-600 mb-4">
            You haven't written an entry for today yet
          </p>
          <button
            onClick={() => setShowQuickAdd(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors cursor-pointer"
          >
            Add Today's Entry
          </button>
        </section>
      )}

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Entries
            </h2>
            <button
              onClick={() => navigate('/journals')}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded cursor-pointer"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <article
                key={entry.date}
                onClick={() => navigate(`/new?date=${entry.date}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{entry.mood.split(' ')[0]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(entry.date)}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {entry.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getEntriesThisMonth(entries: JournalEntry[]): number {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return entries.filter(entry => {
    const entryDate = new Date(entry.date + 'T00:00:00');
    return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
  }).length;
}

function calculateStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0;

  const sortedDates = entries.map(e => e.date).sort().reverse();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let streak = 0;
  let checkDate = new Date(today);

  for (const dateStr of sortedDates) {
    const expectedDateStr = checkDate.toISOString().split('T')[0];
    
    if (dateStr === expectedDateStr) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
