import { TripsStatCard } from '@/components/screens/trips/trips-stat-card';
import { IconButton } from '@/components/ui/icon-button';
import { PageHeader } from '@/components/ui/page-header';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

interface TripsScreenHeaderProps {
	tripCount: number;
	countryCount: number;
	photoCount: number;
}

export function TripsScreenHeader({ tripCount, countryCount, photoCount }: Readonly<TripsScreenHeaderProps>) {
	const router = useRouter();

	const description =
		tripCount === 0
			? 'Start building your personal travel atlas'
			: `${tripCount} ${tripCount === 1 ? 'adventure' : 'adventures'} · ${countryCount} ${countryCount === 1 ? 'country' : 'countries'}`;

	return (
		<PageHeader
			title='Trips'
			description={description}
			rightAction={
				<IconButton label='Add Trip' icon='plus' variant='prominent' onPress={() => router.push('/trips/create')} />
			}
		>
			{tripCount > 0 ? (
				<View style={styles.statsRow}>
					<TripsStatCard emoji='✈️' value={tripCount} label={tripCount === 1 ? 'Trip' : 'Trips'} />
					<TripsStatCard emoji='🌍' value={countryCount} label={countryCount === 1 ? 'Country' : 'Countries'} />
					<TripsStatCard emoji='📷' value={photoCount} label='Photos' />
				</View>
			) : null}
		</PageHeader>
	);
}

const styles = StyleSheet.create({
	statsRow: {
		flexDirection: 'row',
		gap: 10,
	},
});
