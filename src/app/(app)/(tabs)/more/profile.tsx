import { useTheme } from '@/theme/use-theme';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background0 }} edges={['top']}>
			<Text>Profile Screen</Text>
		</SafeAreaView>
	);
}
