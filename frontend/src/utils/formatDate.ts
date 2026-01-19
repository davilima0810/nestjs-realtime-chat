export function formatMessageDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday =
    date.toDateString() === now.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (isToday) {
    return `Hoje ${hours}:${minutes}`;
  }

  if (isYesterday) {
    return `Ontem ${hours}:${minutes}`;
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}
