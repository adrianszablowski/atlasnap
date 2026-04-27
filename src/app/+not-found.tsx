import { useTheme } from '@/theme/use-theme';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background0 }}>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
				<Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.typography900 }}>Not Found</Text>
				<Text style={{ marginBottom: 16, textAlign: 'center', fontSize: 16, color: theme.typography500 }}>
					The page you are looking for does not exist.
				</Text>
				<Link href='/(app)/(tabs)' asChild>
					<Pressable>
						<Text>Go Home</Text>
					</Pressable>
				</Link>
			</View>
		</SafeAreaView>
	);
}
