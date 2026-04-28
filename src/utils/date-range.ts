import { differenceInDays, format, formatDistanceToNow, isSameMonth, isSameYear, parseISO } from 'date-fns';

/** Formats an ISO date span for display (e.g. `Jan 3–5, 2026` or cross-month ranges). */
export function formatDateRange(startDate: string, endDate?: string): string {
	const start = parseISO(startDate);

	if (!endDate) return format(start, 'MMM d, yyyy');

	const end = parseISO(endDate);

	if (isSameMonth(start, end) && isSameYear(start, end)) {
		return `${format(start, 'MMM d')}–${format(end, 'd, yyyy')}`;
	}

	if (isSameYear(start, end)) {
		return `${format(start, 'MMM d')} – ${format(end, 'MMM d, yyyy')}`;
	}

	return `${format(start, 'MMM d, yyyy')} – ${format(end, 'MMM d, yyyy')}`;
}

/** Inclusive calendar-day count between two ISO dates; single day when `endDate` is omitted. */
export function getDurationDays(startDate: string, endDate?: string): number {
	if (!endDate) return 1;

	return differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
}

/** Human-readable day count, e.g. `1 day` / `5 days`. */
export function formatDurationDaysLabel(startDate: string, endDate?: string): string {
	const days = getDurationDays(startDate, endDate);

	return `${days} ${days === 1 ? 'day' : 'days'}`;
}

/** Relative time from an ISO date (e.g. `3 days ago`). */
export function formatTimeAgo(date: string): string {
	return formatDistanceToNow(parseISO(date), { addSuffix: true });
}
