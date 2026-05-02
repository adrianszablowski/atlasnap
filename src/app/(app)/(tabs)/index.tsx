import { TripMarker } from '@/components/screens/map/trip-marker';
import { MOCK_TRIPS } from '@/constants/mock-trips';
import { useTheme } from '@/theme/use-theme';
import { useRouter } from 'expo-router';
import map from 'lodash/map';
import { useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, type Region } from 'react-native-maps';

const INITIAL_REGION: Region = {
	latitude: 35,
	longitude: 15,
	latitudeDelta: 60,
	longitudeDelta: 80,
};

const MIN_DELTA = 0.08;
const MAX_DELTA = 3.0;
const MIN_SCALE = 0.38;
const MAX_SCALE = 1.0;

function computeMarkerScale(latitudeDelta: number): number {
	if (latitudeDelta <= MIN_DELTA) return MAX_SCALE;
	if (latitudeDelta >= MAX_DELTA) return MIN_SCALE;

	const t = (latitudeDelta - MIN_DELTA) / (MAX_DELTA - MIN_DELTA);

	return MAX_SCALE - t * (MAX_SCALE - MIN_SCALE);
}

export default function MapScreen() {
	const theme = useTheme();
	const router = useRouter();
	const [latitudeDelta, setLatitudeDelta] = useState(INITIAL_REGION.latitudeDelta);

	const markerScale = computeMarkerScale(latitudeDelta);

	return (
		<View style={{ flex: 1, backgroundColor: theme.background100 }}>
			<MapView
				style={{ width: '100%', height: '100%' }}
				provider={PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
				onRegionChangeComplete={(region: Region) => setLatitudeDelta(region.latitudeDelta)}
			>
				{map(MOCK_TRIPS, (trip) => (
					<Marker
						key={trip.id}
						coordinate={{ latitude: trip.latitude, longitude: trip.longitude }}
						anchor={{ x: 0.5, y: 1 }}
						tracksViewChanges
						onPress={() => router.push(`/trips/${trip.id}/details`)}
					>
						<TripMarker trip={trip} scale={markerScale} />
					</Marker>
				))}
			</MapView>
		</View>
	);
}
