import { useTheme } from '@/theme/use-theme';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function PreviewTripScreen() {
	const theme = useTheme();
	const { tripId } = useLocalSearchParams();

	return (
		<View style={{ flex: 1, backgroundColor: theme.background100 }}>
			<Text>Preview Trip {tripId}</Text>
		</View>
	);
}
