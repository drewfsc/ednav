import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLastSixMonthsLabel() {
  const today = new Date();
  const months = [];
  let startYear = today.getFullYear(); // Year of first month in the range
  let endYear = startYear; // Year of last month in the range

  for (let i = 6; i > 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthName = date.toLocaleString('default', { month: 'long' });

    months.push(monthName);

    if (i === 6) startYear = date.getFullYear(); // Earliest month in range
    if (i === 1) endYear = date.getFullYear(); // Latest month in range
  }

  return startYear !== endYear
      ? `${months[0]} ${startYear} - ${months[5]} ${endYear}` // Cross-year range
      : `${months[0]} - ${months[5]} ${startYear}`; // Same-year range
}
