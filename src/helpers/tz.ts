import { formatISO } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';
import * as Localization from 'expo-localization';
import head from 'lodash/head';

export interface TimeFormatPreferences {
	uses24HourClock: boolean;
	timeZone: string;
	locale: string;
}

let cachedPreferences: TimeFormatPreferences | null = null;

function getCurrentLocale(): string {
	try {
		const locales = Localization.getLocales();
		return head(locales)?.languageCode ?? 'en';
	} catch {
		return 'en';
	}
}

export function getUserPreferences(): TimeFormatPreferences {
	try {
		const calendars = Localization.getCalendars();
		const primaryCalendar = head(calendars);

		const timezoneAndClock = cachedPreferences ?? {
			uses24HourClock: primaryCalendar?.uses24hourClock ?? false,
			timeZone: primaryCalendar?.timeZone ?? 'UTC',
		};

		cachedPreferences = {
			...timezoneAndClock,
			locale: getCurrentLocale(),
		};

		return cachedPreferences;
	} catch (error) {
		console.error('Error getting user preferences:', error);

		return {
			uses24HourClock: false,
			timeZone: 'UTC',
			locale: getCurrentLocale(),
		};
	}
}

export function refreshUserPreferences(): void {
	cachedPreferences = null;
}

export function toDbUtcIsoFromLocalDate(localDate: Date, creatorTimeZone: string): string {
	const asUtc = fromZonedTime(localDate, creatorTimeZone);
	return formatISO(asUtc);
}

export function getUserTimeZone(): string {
	try {
		const cals = Localization.getCalendars?.();
		const tz = head(cals)?.timeZone;

		if (tz) return tz;
	} catch {
		/* ignore */
	}

	const intlTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
	return intlTz || 'UTC';
}
