import { TripCard } from '@/components/screens/trips/trip-card';
import { TripsEmptyState } from '@/components/screens/trips/trips-empty-state';
import { TripsScreenHeader } from '@/components/screens/trips/trips-screen-header';
import { TripsYearHeader } from '@/components/screens/trips/trips-year-header';
import { getMockStats, groupTripsByYear, MOCK_TRIPS, type MockTrip } from '@/constants/mock-trips';
import { useTheme } from '@/theme/use-theme';
import { SectionList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sections = groupTripsByYear(MOCK_TRIPS);
const stats = getMockStats(MOCK_TRIPS);

export default function TripsScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={[styles.root, { backgroundColor: theme.background50 }]} edges={['top']}>
			<SectionList<MockTrip>
				sections={sections}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <TripCard trip={item} />}
				renderSectionHeader={({ section }) => <TripsYearHeader year={section.title} count={section.data.length} />}
				ListHeaderComponent={
					<TripsScreenHeader
						tripCount={stats.tripCount}
						countryCount={stats.countryCount}
						photoCount={stats.photoCount}
					/>
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
	divider: {
		height: 16,
	},
});
