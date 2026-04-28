import { format, isSameMonth, isSameYear, parseISO } from 'date-fns';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import reduce from 'lodash/reduce';

export interface MockFriend {
	id: string;
	initials: string;
	color: string;
}

export interface MockTrip {
	id: string;
	title: string;
	city: string;
	country: string;
	flag: string;
	startDate: string;
	endDate?: string;
	photoCount: number;
	friends: MockFriend[];
	coverColor: string;
	coverEmoji: string;
}

export function formatTripDateRange(startDate: string, endDate?: string): string {
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

export const MOCK_TRIPS: MockTrip[] = [
	{
		id: '1',
		title: 'Roman Holiday',
		city: 'Rome',
		country: 'Italy',
		flag: '🇮🇹',
		startDate: '2025-03-15',
		endDate: '2025-03-22',
		photoCount: 47,
		friends: [
			{ id: 'f1', initials: 'AK', color: '#2F80ED' },
			{ id: 'f2', initials: 'MC', color: '#FF6B5A' },
		],
		coverColor: '#C4725A',
		coverEmoji: '🏛️',
	},
	{
		id: '2',
		title: 'Lisbon in Bloom',
		city: 'Lisbon',
		country: 'Portugal',
		flag: '🇵🇹',
		startDate: '2025-05-01',
		endDate: '2025-05-07',
		photoCount: 31,
		friends: [{ id: 'f3', initials: 'JW', color: '#35C759' }],
		coverColor: '#C9943A',
		coverEmoji: '🌊',
	},
	{
		id: '3',
		title: 'Tokyo Nights',
		city: 'Tokyo',
		country: 'Japan',
		flag: '🇯🇵',
		startDate: '2024-10-10',
		endDate: '2024-10-20',
		photoCount: 89,
		friends: [
			{ id: 'f1', initials: 'AK', color: '#2F80ED' },
			{ id: 'f4', initials: 'SL', color: '#9B6DDB' },
			{ id: 'f5', initials: 'OP', color: '#F2A93B' },
		],
		coverColor: '#3B6EA8',
		coverEmoji: '⛩️',
	},
	{
		id: '4',
		title: 'Barcelona Weekend',
		city: 'Barcelona',
		country: 'Spain',
		flag: '🇪🇸',
		startDate: '2025-01-10',
		endDate: '2025-01-12',
		photoCount: 23,
		friends: [],
		coverColor: '#B8672C',
		coverEmoji: '🏖️',
	},
	{
		id: '5',
		title: 'NYC Winter',
		city: 'New York',
		country: 'United States',
		flag: '🇺🇸',
		startDate: '2024-12-20',
		endDate: '2024-12-27',
		photoCount: 62,
		friends: [
			{ id: 'f2', initials: 'MC', color: '#FF6B5A' },
			{ id: 'f3', initials: 'JW', color: '#35C759' },
		],
		coverColor: '#4A78A4',
		coverEmoji: '🗽',
	},
];

export interface TripSection {
	title: string;
	data: MockTrip[];
}

export function groupTripsByYear(trips: MockTrip[]): TripSection[] {
	const grouped = groupBy(trips, (trip) => parseISO(trip.startDate).getFullYear().toString());
	const sections = map(Object.entries(grouped), ([year, data]) => ({ title: year, data }));
	return orderBy(sections, 'title', 'desc');
}

export function getMockStats(trips: MockTrip[]) {
	const countries = new Set(map(trips, 'country'));
	const totalPhotos = reduce(trips, (sum, t) => sum + t.photoCount, 0);
	const allFriendIds = new Set(flatMap(trips, 'friends.id'));
	return {
		tripCount: trips.length,
		countryCount: countries.size,
		photoCount: totalPhotos,
		friendCount: allFriendIds.size,
	};
}
