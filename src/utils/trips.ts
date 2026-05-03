import type { MockTrip, TripFilter, TripSection } from '@/types/types';
import { parseISO } from 'date-fns';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import reduce from 'lodash/reduce';

export function groupTripsByYear(trips: MockTrip[]): TripSection[] {
	const grouped = groupBy(trips, (trip) => parseISO(trip.startDate).getFullYear().toString());
	const sections = map(Object.entries(grouped), ([year, data]) => ({ title: year, data }));

	return orderBy(sections, 'title', 'desc');
}

export function filterTripsByStatus(trips: MockTrip[], statusFilter: TripFilter): MockTrip[] {
	if (statusFilter === 'all') return trips;

	return filter(trips, { status: statusFilter });
}

export function getMockStats(trips: MockTrip[]) {
	const countries = new Set(map(trips, 'country'));
	const totalPhotos = reduce(trips, (sum, t) => sum + t.photoCount, 0);
	const savedTrips = filter(trips, { status: 'saved' });
	const plannedTrips = filter(trips, { status: 'planned' });

	return {
		tripCount: trips.length,
		savedCount: savedTrips.length,
		plannedCount: plannedTrips.length,
		countryCount: countries.size,
		photoCount: totalPhotos,
	};
}
