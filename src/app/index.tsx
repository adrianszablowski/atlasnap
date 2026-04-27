import { useTheme } from '@/theme/use-theme';
import { Text, View } from 'react-native';

export default function Index() {
	const theme = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: theme.background0 }}>
			<Text>Here will be onboarding screen</Text>
		</View>
	);
}
