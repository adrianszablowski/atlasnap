import { useTheme } from '@/theme/use-theme';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInPage() {
	const theme = useTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background100 }}>
			<Text>Sign In</Text>
		</SafeAreaView>
	);
}
