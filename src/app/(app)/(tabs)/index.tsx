import { OffScreenIndicator } from '@/components/screens/map/off-screen-indicator';
import { TripMarker } from '@/components/screens/map/trip-marker';
import { MOCK_TRIPS } from '@/constants/mock-trips';
import { useTheme } from '@/theme/use-theme';
import { useRouter } from 'expo-router';
import map from 'lodash/map';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, type Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
const EDGE_PADDING = 20;
const INDICATOR_COLOR = '#2F80ED';

function computeMarkerScale(latitudeDelta: number): number {
	if (latitudeDelta <= MIN_DELTA) return MAX_SCALE;
	if (latitudeDelta >= MAX_DELTA) return MIN_SCALE;
	const t = (latitudeDelta - MIN_DELTA) / (MAX_DELTA - MIN_DELTA);
	return MAX_SCALE - t * (MAX_SCALE - MIN_SCALE);
}

function latToMercY(latDeg: number): number {
	const phi = (latDeg * Math.PI) / 180;
	return Math.log(Math.tan(Math.PI / 4 + phi / 2));
}

interface EdgePosition {
	x: number;
	y: number;
	angle: number;
}

function computeEdgePosition(
	tripLat: number,
	tripLng: number,
	region: Region,
	screenW: number,
	screenH: number,
	topInset: number,
	bottomInset: number,
): EdgePosition | null {
	const sx = ((tripLng - region.longitude) / region.longitudeDelta + 0.5) * screenW;
	const topMercY = latToMercY(region.latitude + region.latitudeDelta / 2);
	const botMercY = latToMercY(region.latitude - region.latitudeDelta / 2);
	const mercRange = topMercY - botMercY;
	const sy = mercRange > 0 ? ((topMercY - latToMercY(tripLat)) / mercRange) * screenH : screenH / 2;

	if (sx >= 0 && sx <= screenW && sy >= 0 && sy <= screenH) return null;
	const cx = screenW / 2;
	const cy = screenH / 2;
	const dx = sx - cx;
	const dy = sy - cy;
	if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return null;

	const minX = EDGE_PADDING;
	const maxX = screenW - EDGE_PADDING;
	const minY = topInset + EDGE_PADDING;
	const maxY = screenH - bottomInset - EDGE_PADDING;

	let t = Infinity;
	if (dx > 0) t = Math.min(t, (maxX - cx) / dx);
	else if (dx < 0) t = Math.min(t, (minX - cx) / dx);
	if (dy > 0) t = Math.min(t, (maxY - cy) / dy);
	else if (dy < 0) t = Math.min(t, (minY - cy) / dy);

	if (!isFinite(t) || t <= 0) return null;

	return {
		x: cx + dx * t,
		y: cy + dy * t,
		angle: Math.atan2(dy, dx) * (180 / Math.PI),
	};
}

export default function MapScreen() {
	const theme = useTheme();
	const router = useRouter();
	const { width: screenW, height: screenH } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const [region, setRegion] = useState<Region>(INITIAL_REGION);

	const markerScale = computeMarkerScale(region.latitudeDelta);

	return (
		<View style={{ flex: 1, backgroundColor: theme.background100 }}>
			<MapView
				style={{ width: '100%', height: '100%' }}
				provider={PROVIDER_GOOGLE}
				initialRegion={INITIAL_REGION}
				onRegionChange={setRegion}
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
			<View style={{ position: 'absolute', width: screenW, height: screenH }} pointerEvents='none'>
				{map(MOCK_TRIPS, (trip) => {
					const pos = computeEdgePosition(
						trip.latitude,
						trip.longitude,
						region,
						screenW,
						screenH,
						insets.top,
						insets.bottom,
					);

					if (!pos) return null;

					return <OffScreenIndicator key={trip.id} x={pos.x} y={pos.y} angle={pos.angle} color={INDICATOR_COLOR} />;
				})}
			</View>
		</View>
	);
}
