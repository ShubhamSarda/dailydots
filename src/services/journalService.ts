import type { JournalEntry } from '../types/journal';

/**
 * localStorage key for journal entries
 */
const STORAGE_KEY = 'dailydots_journal_entries';

/**
 * Journal data service layer
 * Handles all localStorage operations for journal entries
 * Can be easily swapped to Supabase or other backend later
 */
export const journalService = {
  /**
   * Get all journal entries from localStorage
   * @returns Array of journal entries sorted by date (newest first)
   */
  getAllEntries(): JournalEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const entries: JournalEntry[] = JSON.parse(data);
      return entries.sort((a, b) => b.date.localeCompare(a.date));
    } catch (error) {
      console.error('Error loading journal entries:', error);
      return [];
    }
  },

  /**
   * Get a single journal entry by date
   * @param date - ISO date string (YYYY-MM-DD)
   * @returns Journal entry or null if not found
   */
  getEntryByDate(date: string): JournalEntry | null {
    const entries = this.getAllEntries();
    return entries.find(entry => entry.date === date) || null;
  },

  /**
   * Create or update a journal entry
   * Only one entry allowed per date
   * @param entry - Journal entry to save
   * @returns Saved journal entry
   */
  saveEntry(entry: Omit<JournalEntry, 'createdAt' | 'updatedAt'>): JournalEntry {
    try {
      const entries = this.getAllEntries();
      const existingIndex = entries.findIndex(e => e.date === entry.date);
      
      const now = new Date().toISOString();
      const savedEntry: JournalEntry = {
        ...entry,
        createdAt: existingIndex >= 0 ? entries[existingIndex].createdAt : now,
        updatedAt: now,
      };

      if (existingIndex >= 0) {
        entries[existingIndex] = savedEntry;
      } else {
        entries.push(savedEntry);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return savedEntry;
    } catch (error) {
      console.error('Error saving journal entry:', error);
      throw new Error('Failed to save journal entry');
    }
  },

  /**
   * Delete a journal entry by date
   * @param date - ISO date string (YYYY-MM-DD)
   * @returns True if deleted, false if not found
   */
  deleteEntry(date: string): boolean {
    try {
      const entries = this.getAllEntries();
      const filteredEntries = entries.filter(entry => entry.date !== date);
      
      if (filteredEntries.length === entries.length) {
        return false; // Entry not found
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
      return true;
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      throw new Error('Failed to delete journal entry');
    }
  },

  /**
   * Get entries for a specific month
   * @param year - Year number
   * @param month - Month number (1-12)
   * @returns Array of entries for that month
   */
  getEntriesForMonth(year: number, month: number): JournalEntry[] {
    const entries = this.getAllEntries();
    const monthStr = month.toString().padStart(2, '0');
    const prefix = `${year}-${monthStr}`;
    
    return entries.filter(entry => entry.date.startsWith(prefix));
  },
};
