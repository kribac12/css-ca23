export function formatDate(newDateString) {
  const date = new Date(newDateString);
  const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return date.toLocaleString(undefined, options);
}
