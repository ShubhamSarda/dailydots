import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { JournalEntry } from '../types/journal';
import { journalService } from '../services/journalService';

/**
 * Journal context value shape
 */
interface JournalContextValue {
  entries: JournalEntry[];
  isLoading: boolean;
  refreshEntries: () => void;
  getEntryByDate: (date: string) => JournalEntry | null;
  saveEntry: (entry: Omit<JournalEntry, 'createdAt' | 'updatedAt'>) => JournalEntry;
  deleteEntry: (date: string) => boolean;
}

const JournalContext = createContext<JournalContextValue | undefined>(undefined);

/**
 * JournalProvider manages all journal entry state
 * Provides centralized access to journal data throughout the app
 */
export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Load all entries from service
   */
  const refreshEntries = useCallback(() => {
    setIsLoading(true);
    const loadedEntries = journalService.getAllEntries();
    setEntries(loadedEntries);
    setIsLoading(false);
  }, []);

  /**
   * Get entry by date
   */
  const getEntryByDate = useCallback(
    (date: string) => {
      return entries.find(entry => entry.date === date) || null;
    },
    [entries]
  );

  /**
   * Save entry and refresh state
   */
  const saveEntry = useCallback(
    (entry: Omit<JournalEntry, 'createdAt' | 'updatedAt'>) => {
      const savedEntry = journalService.saveEntry(entry);
      refreshEntries();
      return savedEntry;
    },
    [refreshEntries]
  );

  /**
   * Delete entry and refresh state
   */
  const deleteEntry = useCallback(
    (date: string) => {
      const result = journalService.deleteEntry(date);
      if (result) {
        refreshEntries();
      }
      return result;
    },
    [refreshEntries]
  );

  // Load entries on mount
  useEffect(() => {
    refreshEntries();
  }, [refreshEntries]);

  const value: JournalContextValue = {
    entries,
    isLoading,
    refreshEntries,
    getEntryByDate,
    saveEntry,
    deleteEntry,
  };

  return (
    <JournalContext.Provider value={value}>
      {children}
    </JournalContext.Provider>
  );
}

/**
 * Hook to access journal context
 * @throws Error if used outside JournalProvider
 */
export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within JournalProvider');
  }
  return context;
}
