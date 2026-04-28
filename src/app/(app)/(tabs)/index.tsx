import { useTheme } from '@/theme/use-theme';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen() {
	const theme = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: theme.background100 }}>
			<MapView style={{ width: '100%', height: '100%' }} provider={PROVIDER_GOOGLE} />
		</View>
	);
}
