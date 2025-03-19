/**
 * Ensures that a value is a string, even if it's an array.
 * If the value is an array, returns the first element if available, or an empty string.
 * 
 * @param value - The value to ensure is a string
 * @returns A string
 */
export function ensureString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : '';
  }
  return value || '';
}
