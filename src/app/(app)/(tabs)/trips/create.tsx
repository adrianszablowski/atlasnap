import { useTheme } from '@/theme/use-theme';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateTripScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={[styles.root, { backgroundColor: theme.background100 }]} edges={['top']}>
			<Text>Create Trip</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
});
