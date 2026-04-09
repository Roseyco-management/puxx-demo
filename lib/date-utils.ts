/**
 * Date utility functions to replace date-fns
 */

export function format(date: Date, formatStr: string): string {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  // Format: 'dd MMM yyyy' -> '12 Dec 2024'
  if (formatStr === 'dd MMM yyyy') {
    return `${String(day).padStart(2, '0')} ${months[month]} ${year}`;
  }

  // Format: 'MMMM dd, yyyy' -> 'December 12, 2024'
  if (formatStr === 'MMMM dd, yyyy') {
    return `${fullMonths[month]} ${String(day).padStart(2, '0')}, ${year}`;
  }

  // Format: 'MMM dd, yyyy h:mm a' -> 'Dec 12, 2024 3:45 PM'
  if (formatStr === 'MMM dd, yyyy h:mm a') {
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    return `${months[month]} ${String(day).padStart(2, '0')}, ${year} ${hour12}:${String(minutes).padStart(2, '0')} ${ampm}`;
  }

  // Default fallback
  return d.toLocaleDateString();
}

export function formatDistanceToNow(date: Date, options?: { addSuffix?: boolean }): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let result = '';

  if (years > 0) {
    result = `${years} year${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
    result = `${months} month${months > 1 ? 's' : ''}`;
  } else if (days > 0) {
    result = `${days} day${days > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    result = `${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (minutes > 0) {
    result = `${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    result = 'just now';
  }

  if (options?.addSuffix && result !== 'just now') {
    return `${result} ago`;
  }

  return result;
}
