import { useTheme } from '@/theme/use-theme';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditTripScreen() {
	const theme = useTheme();
	const { tripId } = useLocalSearchParams();

	return (
		<SafeAreaView style={[styles.root, { backgroundColor: theme.background100 }]} edges={['top']}>
			<Text>Edit Trip {tripId}</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});
