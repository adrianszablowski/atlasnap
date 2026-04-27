import { useTheme } from '@/theme/use-theme';
import { Text, View } from 'react-native';

export default function Index() {
	const theme = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: theme.background0 }}>
			<Text>Edit src/app/index.tsx to edit this screen.</Text>
		</View>
	);
}
