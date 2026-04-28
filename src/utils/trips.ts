import type { MockTrip, TripSection } from '@/types/trip';
import { parseISO } from 'date-fns';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import reduce from 'lodash/reduce';

export function groupTripsByYear(trips: MockTrip[]): TripSection[] {
	const grouped = groupBy(trips, (trip) => parseISO(trip.startDate).getFullYear().toString());
	const sections = map(Object.entries(grouped), ([year, data]) => ({ title: year, data }));

	return orderBy(sections, 'title', 'desc');
}

export function getMockStats(trips: MockTrip[]) {
	const countries = new Set(map(trips, 'country'));
	const totalPhotos = reduce(trips, (sum, t) => sum + t.photoCount, 0);

	return {
		tripCount: trips.length,
		countryCount: countries.size,
		photoCount: totalPhotos,
	};
}
