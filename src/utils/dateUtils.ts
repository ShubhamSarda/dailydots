/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Get today's date in ISO format (YYYY-MM-DD)
 * @returns ISO date string for today
 */
export function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Format ISO date string to readable format
 * @param dateStr - ISO date string (YYYY-MM-DD)
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  dateStr: string,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', options);
}

/**
 * Format ISO timestamp to readable date and time
 * @param isoString - ISO timestamp string
 * @returns Formatted date and time string
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
