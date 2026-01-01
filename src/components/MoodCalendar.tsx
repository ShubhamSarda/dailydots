import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { JournalEntry, MoodType } from '../types/journal';

interface MoodCalendarProps {
  entries: JournalEntry[];
}

/**
 * Map mood types to color classes
 * Uses neutral, accessible colors aligned with Notion-like design
 */
const MOOD_COLORS: Record<MoodType, { bg: string; border: string; text: string; label: string }> = {
  '😊 Happy': { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-700', label: 'Happy' },
  '😔 Sad': { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-700', label: 'Sad' },
  '😌 Calm': { bg: 'bg-teal-50', border: 'border-teal-300', text: 'text-teal-700', label: 'Calm' },
  '😤 Frustrated': { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', label: 'Frustrated' },
  '😴 Tired': { bg: 'bg-slate-50', border: 'border-slate-300', text: 'text-slate-700', label: 'Tired' },
  '🤩 Excited': { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-700', label: 'Excited' },
  '😰 Anxious': { bg: 'bg-purple-50', border: 'border-purple-300', text: 'text-purple-700', label: 'Anxious' },
  '😐 Neutral': { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', label: 'Neutral' },
};

/**
 * MoodCalendar component
 * Displays a monthly calendar view with mood-coded dates
 * Follows Notion-like minimal design with accessible colors
 */
export function MoodCalendar({ entries }: MoodCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  // Create a map of date -> entry for quick lookup
  const entryMap = new Map<string, JournalEntry>(
    entries.map(entry => [entry.date, entry])
  );

  /**
   * Get calendar grid for current month
   * Returns array of date objects including padding days
   */
  const getCalendarDays = (): Array<{ date: Date; isCurrentMonth: boolean; dateString: string }> => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: Array<{ date: Date; isCurrentMonth: boolean; dateString: string }> = [];

    // Add padding days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date,
        isCurrentMonth: false,
        dateString: date.toISOString().split('T')[0],
      });
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        date,
        isCurrentMonth: true,
        dateString: date.toISOString().split('T')[0],
      });
    }

    // Add padding days from next month to complete the grid
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays !== 7) {
      for (let day = 1; day <= remainingDays; day++) {
        const date = new Date(year, month + 1, day);
        days.push({
          date,
          isCurrentMonth: false,
          dateString: date.toISOString().split('T')[0],
        });
      }
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (dateString: string) => {
    const entry = entryMap.get(dateString);
    if (entry) {
      navigate(`/new?date=${dateString}`);
    }
  };

  const calendarDays = getCalendarDays();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /**
   * Get CSS classes for a calendar day cell
   */
  const getDayClassName = (
    isCurrentMonth: boolean,
    hasEntry: boolean,
    moodColors: typeof MOOD_COLORS[MoodType] | null,
    isToday: boolean
  ): string => {
    const baseClasses = 'aspect-square p-1 text-sm rounded-lg border transition-all';
    
    // Text color based on month
    const textColor = !isCurrentMonth ? 'text-gray-300' : 'text-gray-700';
    
    // Entry styling
    const entryClasses = hasEntry && moodColors
      ? `${moodColors.bg} ${moodColors.border} ${moodColors.text} hover:opacity-80 cursor-pointer`
      : 'border-transparent bg-white hover:bg-gray-50';
    
    // Today indicator
    const todayBorder = isToday && !hasEntry ? 'border-blue-500 font-semibold' : '';
    const todayRing = isToday && hasEntry ? 'ring-2 ring-blue-400 ring-offset-1' : '';
    
    // Focus styles
    const focusStyles = hasEntry ? 'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' : '';
    
    return `${baseClasses} ${textColor} ${entryClasses} ${todayBorder} ${todayRing} ${focusStyles}`.trim();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Mood Calendar</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePreviousMonth}
            aria-label="Previous month"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[140px] text-center">
            {monthName}
          </span>
          <button
            onClick={handleNextMonth}
            aria-label="Next month"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(({ date, isCurrentMonth, dateString }) => {
          const entry = entryMap.get(dateString);
          const hasEntry = !!entry;
          const moodColors = entry ? MOOD_COLORS[entry.mood] : null;
          const isToday = dateString === new Date().toISOString().split('T')[0];

          return (
            <button
              key={dateString}
              onClick={() => hasEntry && handleDateClick(dateString)}
              disabled={!hasEntry}
              className={getDayClassName(isCurrentMonth, hasEntry, moodColors, isToday)}
              aria-label={`${date.getDate()} ${entry ? `- ${moodColors?.label} mood` : ''}`}
            >
              <div className="flex items-center justify-center h-full font-medium">
                {date.getDate()}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs font-medium text-gray-600 mb-3">Mood Legend</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(MOOD_COLORS).map(([mood, colors]) => (
            <div key={mood} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm border ${colors.bg} ${colors.border}`} />
              <span className="text-xs text-gray-600">{colors.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
