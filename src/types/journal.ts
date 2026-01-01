/**
 * Mood options for journal entries
 */
export type MoodType = 
  | '😊 Happy'
  | '😔 Sad'
  | '😌 Calm'
  | '😤 Frustrated'
  | '😴 Tired'
  | '🤩 Excited'
  | '😰 Anxious'
  | '😐 Neutral';

/**
 * Journal entry structure
 * One entry per calendar day
 */
export interface JournalEntry {
  /** ISO date string (YYYY-MM-DD) - used as unique identifier */
  date: string;
  /** Selected mood for the day */
  mood: MoodType;
  /** Journal text content */
  content: string;
  /** Timestamp when created */
  createdAt: string;
  /** Timestamp of last update */
  updatedAt: string;
}
