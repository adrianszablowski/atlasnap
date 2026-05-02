import { getUserPreferences, getUserTimeZone, type TimeFormatPreferences } from '@/helpers/tz';
import { formatInTimeZone } from 'date-fns-tz';
import { enUS, pl, type Locale } from 'date-fns/locale';
import map from 'lodash/map';
import padStart from 'lodash/padStart';
import split from 'lodash/split';

const DATE_FNS_LOCALES: Record<string, Locale> = {
	en: enUS,
	pl,
};

function getDateFnsLocale(): Locale {
	const { locale } = getUserPreferences();
	return DATE_FNS_LOCALES[locale] ?? enUS;
}

/** Formats a time value respecting the user's 12/24h preference and timezone. */
export function formatTimeForUser(date: Date | string, userPreferences?: TimeFormatPreferences): string {
	const prefs = userPreferences || getUserPreferences();
	const pattern = prefs.uses24HourClock ? 'HH:mm' : 'h:mm a';

	return formatInTimeZone(date, prefs.timeZone, pattern, { locale: getDateFnsLocale() });
}

/** Formats a date in the user's timezone. */
export function formatDateForUser(date: Date | string, format: 'short' | 'long' | 'iso' | 'day' = 'short'): string {
	const tz = getUserTimeZone();

	switch (format) {
		case 'iso':
			return formatInTimeZone(date, tz, 'yyyy-MM-dd');
		case 'long':
			return formatInTimeZone(date, tz, 'MMMM d, yyyy', { locale: getDateFnsLocale() });
		case 'short':
			return formatInTimeZone(date, tz, 'MMM d', { locale: getDateFnsLocale() });
		case 'day':
			return formatInTimeZone(date, tz, 'd', { locale: getDateFnsLocale() });
		default:
			return formatInTimeZone(date, tz, 'MMM d', { locale: getDateFnsLocale() });
	}
}

/** Formats a full date + time respecting the user's clock preference and timezone. */
export function formatDateTimeForUser(date: Date | string, format: 'short' | 'long' | 'full' = 'short'): string {
	const prefs = getUserPreferences();

	switch (format) {
		case 'full': {
			const pattern = prefs.uses24HourClock ? "MMMM d, yyyy 'at' HH:mm" : "MMMM d, yyyy 'at' h:mm a";
			return formatInTimeZone(date, prefs.timeZone, pattern, { locale: getDateFnsLocale() });
		}
		case 'long': {
			const pattern = prefs.uses24HourClock ? 'MMM d, HH:mm' : 'MMM d, h:mm a';
			return formatInTimeZone(date, prefs.timeZone, pattern, { locale: getDateFnsLocale() });
		}
		case 'short':
		default: {
			const pattern = prefs.uses24HourClock ? 'MMM d, HH:mm' : 'MMM d, h:mm a';
			return formatInTimeZone(date, prefs.timeZone, pattern, { locale: getDateFnsLocale() });
		}
	}
}

/** Combines a Date and a "HH:mm" time string into a single Date. */
export function combineDateAndTime(date: Date, timeString: string): Date {
	const [hour, minute] = map(split(timeString, ':'), Number);
	const dateTime = new Date(date);
	dateTime.setHours(hour, minute, 0, 0);
	return dateTime;
}

/** Serialises a Date to a "HH:mm" string. */
export function timeToString(date: Date): string {
	return `${padStart(date.getHours().toString(), 2, '0')}:${padStart(date.getMinutes().toString(), 2, '0')}`;
}
