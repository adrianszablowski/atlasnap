import { TripsStatCard } from '@/components/screens/trips/trips-stat-card';
import { IconButton } from '@/components/ui/icon-button';
import { PageHeader } from '@/components/ui/page-header';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

interface TripsScreenHeaderProps {
	savedCount: number;
	plannedCount: number;
	countryCount: number;
	photoCount: number;
}

export function TripsScreenHeader({
	savedCount,
	plannedCount,
	countryCount,
	photoCount,
}: Readonly<TripsScreenHeaderProps>) {
	const router = useRouter();

	const totalCount = savedCount + plannedCount;

	const description =
		totalCount === 0
			? 'Start building your personal travel atlas'
			: plannedCount > 0
				? `${savedCount} saved · ${plannedCount} upcoming · ${countryCount} ${countryCount === 1 ? 'country' : 'countries'}`
				: `${totalCount} ${totalCount === 1 ? 'adventure' : 'adventures'} · ${countryCount} ${countryCount === 1 ? 'country' : 'countries'}`;

	return (
		<PageHeader
			title='Trips'
			description={description}
			rightAction={
				<IconButton label='Add Trip' icon='plus' variant='prominent' onPress={() => router.push('/trips/create')} />
			}
		>
			{totalCount > 0 && (
				<View style={styles.statsRow}>
					{plannedCount > 0 ? (
						<>
							<TripsStatCard emoji='📍' value={savedCount} label={savedCount === 1 ? 'Saved' : 'Saved'} />
							<TripsStatCard emoji='✈️' value={plannedCount} label={plannedCount === 1 ? 'Planned' : 'Planned'} />
							<TripsStatCard emoji='🌍' value={countryCount} label={countryCount === 1 ? 'Country' : 'Countries'} />
						</>
					) : (
						<>
							<TripsStatCard emoji='✈️' value={savedCount} label={savedCount === 1 ? 'Trip' : 'Trips'} />
							<TripsStatCard emoji='🌍' value={countryCount} label={countryCount === 1 ? 'Country' : 'Countries'} />
							<TripsStatCard emoji='📷' value={photoCount} label='Photos' />
						</>
					)}
				</View>
			)}
		</PageHeader>
	);
}

const styles = StyleSheet.create({
	statsRow: {
		flexDirection: 'row',
		gap: 10,
	},
});
