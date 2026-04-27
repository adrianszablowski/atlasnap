import { useTheme } from '@/theme/use-theme';
import { Text, View } from 'react-native';

export default function CreateTripScreen() {
	const theme = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: theme.background0 }}>
			<Text>Create Trip</Text>
		</View>
	);
}
