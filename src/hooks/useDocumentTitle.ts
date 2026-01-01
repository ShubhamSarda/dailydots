import { useEffect } from 'react';

/**
 * Custom hook to set the document title dynamically
 * Updates the browser tab title when the component mounts
 * @param title - The page title (without the app name suffix)
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} - Daily Dots`;
  }, [title]);
}
