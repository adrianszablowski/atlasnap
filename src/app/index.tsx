import { useTheme } from '@/theme/use-theme';
import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
	const theme = useTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background100 }}>
			<Text>Here will be onboarding screen</Text>
			<Link href='/trips' asChild>
				<Pressable>
					<Text>Trips</Text>
				</Pressable>
			</Link>
			<Link href='/sign-in' asChild>
				<Pressable>
					<Text>Sign In</Text>
				</Pressable>
			</Link>
		</SafeAreaView>
	);
}
