import { TripCard } from '@/components/screens/trips/trip-card';
import { TripsEmptyState } from '@/components/screens/trips/trips-empty-state';
import { TripsFilter } from '@/components/screens/trips/trips-filter';
import { TripsScreenHeader } from '@/components/screens/trips/trips-screen-header';
import { TripsYearHeader } from '@/components/screens/trips/trips-year-header';
import { MOCK_TRIPS } from '@/constants/mock-trips';
import { useTheme } from '@/theme/use-theme';
import type { MockTrip, TripFilter } from '@/types/types';
import { filterTripsByStatus, getMockStats, groupTripsByYear } from '@/utils/trips';
import { useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const allStats = getMockStats(MOCK_TRIPS);

export default function TripsScreen() {
	const theme = useTheme();
	const [activeFilter, setActiveFilter] = useState<TripFilter>('all');

	const filteredTrips = filterTripsByStatus(MOCK_TRIPS, activeFilter);
	const sections = groupTripsByYear(filteredTrips);

	return (
		<SafeAreaView style={[styles.root, { backgroundColor: theme.background50 }]} edges={['top']}>
			<SectionList<MockTrip>
				sections={sections}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <TripCard trip={item} />}
				renderSectionHeader={({ section }) => <TripsYearHeader year={section.title} count={section.data.length} />}
				ListHeaderComponent={
					<>
						<TripsScreenHeader
							savedCount={allStats.savedCount}
							plannedCount={allStats.plannedCount}
							countryCount={allStats.countryCount}
							photoCount={allStats.photoCount}
						/>
						{allStats.tripCount > 0 && (
							<View style={styles.filterWrap}>
								<TripsFilter
									selected={activeFilter}
									onChange={setActiveFilter}
									plannedCount={allStats.plannedCount}
									savedCount={allStats.savedCount}
								/>
							</View>
						)}
					</>
				}
				ListEmptyComponent={<TripsEmptyState />}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
				contentContainerStyle={[styles.list, sections.length === 0 && styles.listEmpty]}
				showsVerticalScrollIndicator={false}
				stickySectionHeadersEnabled={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	list: {
		paddingHorizontal: 16,
		paddingBottom: 48,
	},
	listEmpty: {
		flex: 1,
	},
	filterWrap: {
		paddingBottom: 8,
	},
	divider: {
		height: 16,
	},
});
