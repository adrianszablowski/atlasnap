import { useTheme } from '@/theme/use-theme';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function EditTripScreen() {
	const theme = useTheme();
	const { tripId } = useLocalSearchParams();

	return (
		<View style={{ flex: 1, backgroundColor: theme.background0 }}>
			<Text>Edit Trip {tripId}</Text>
		</View>
	);
}
