/**
 * Formats the date string into a simpler format
 * @param {string} dateString - original string.
 * @returns {string} date - new date string.
 */

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return date.toLocaleString(undefined, options);
}
