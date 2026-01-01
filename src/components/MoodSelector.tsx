import type { MoodType } from '../types/journal';

interface MoodSelectorProps {
  value: MoodType;
  onChange: (mood: MoodType) => void;
}

const MOODS: MoodType[] = [
  '😊 Happy',
  '😔 Sad',
  '😌 Calm',
  '😤 Frustrated',
  '😴 Tired',
  '🤩 Excited',
  '😰 Anxious',
  '😐 Neutral',
];

/**
 * MoodSelector component
 * Displays mood options as clickable buttons
 */
export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        How are you feeling today?
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => onChange(mood)}
            className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer ${
              value === mood
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}
