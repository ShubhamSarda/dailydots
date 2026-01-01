import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useJournal } from '../hooks/useJournalContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { MoodSelector } from '../components/MoodSelector';
import type { MoodType } from '../types/journal';

/**
 * AddNewJournal page
 * Create new entry or update existing entry for a date
 */
export function AddNewJournal() {
  useDocumentTitle('Add Journal');
  
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  const navigate = useNavigate();
  const { getEntryByDate, saveEntry } = useJournal();

  const [date, setDate] = useState(dateParam || getTodayDate());
  const [mood, setMood] = useState<MoodType>('😊 Happy');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load existing entry if editing
  useEffect(() => {
    const existing = getEntryByDate(date);
    if (existing) {
      setMood(existing.mood);
      setContent(existing.content);
      setIsEditing(true);
    } else {
      setMood('😊 Happy');
      setContent('');
      setIsEditing(false);
    }
  }, [date, getEntryByDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    saveEntry({
      date,
      mood,
      content,
    });

    navigate('/journals');
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          {isEditing ? 'Edit Journal Entry' : 'Add New Journal Entry'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={getTodayDate()}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors"
            />
            {isEditing && (
              <p className="mt-2 text-sm text-amber-600">
                An entry already exists for this date. Saving will update it.
              </p>
            )}
          </div>

          <MoodSelector value={mood} onChange={setMood} />

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Journal Entry
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              placeholder="Write about your day..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors cursor-pointer"
            >
              {isEditing ? 'Update Entry' : 'Save Entry'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}
