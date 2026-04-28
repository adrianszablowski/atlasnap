import { useTheme } from '@/theme/use-theme';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={[styles.root, { backgroundColor: theme.background50 }]}>
			<View style={styles.container}>
				<View style={styles.illustrationWrap}>
					<View style={[styles.illustrationOuter, { backgroundColor: theme.secondary50 }]}>
						<View style={[styles.illustrationInner, { backgroundColor: theme.secondary100 }]}>
							<Text style={styles.emoji}>🧭</Text>
						</View>
					</View>
					<View
						style={[
							styles.floatBadge,
							styles.floatTopRight,
							{ backgroundColor: theme.background0, shadowColor: theme.typography900 },
						]}
					>
						<Text style={styles.floatEmoji}>❓</Text>
					</View>
					<View
						style={[
							styles.floatBadge,
							styles.floatBottomLeft,
							{ backgroundColor: theme.background0, shadowColor: theme.typography900 },
						]}
					>
						<Text style={styles.floatEmoji}>🗺️</Text>
					</View>
				</View>
				<View style={styles.copyBlock}>
					<Text style={[styles.title, { color: theme.typography900 }]}>Lost on the map?</Text>
					<Text style={[styles.subtitle, { color: theme.typography500 }]}>
						This page doesn&apos;t exist. Let&apos;s get you back to your Atlas.
					</Text>
				</View>
				<Link href='/(app)/(tabs)' asChild>
					<Pressable
						style={({ pressed }) => [styles.button, { backgroundColor: theme.primary500, opacity: pressed ? 0.84 : 1 }]}
					>
						<Text style={[styles.buttonText, { color: theme.typography900 }]}>Back to Atlas</Text>
					</Pressable>
				</Link>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 32,
		gap: 32,
	},
	illustrationWrap: {
		width: 160,
		height: 160,
		alignItems: 'center',
		justifyContent: 'center',
	},
	illustrationOuter: {
		width: 140,
		height: 140,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
	},
	illustrationInner: {
		width: 104,
		height: 104,
		borderRadius: 52,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emoji: {
		fontSize: 56,
	},
	floatBadge: {
		position: 'absolute',
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	floatTopRight: {
		top: 4,
		right: 0,
	},
	floatBottomLeft: {
		bottom: 4,
		left: 0,
	},
	floatEmoji: {
		fontSize: 20,
	},
	copyBlock: {
		alignItems: 'center',
		gap: 12,
	},
	title: {
		fontSize: 28,
		fontWeight: '800',
		letterSpacing: -0.6,
		textAlign: 'center',
	},
	subtitle: {
		fontSize: 16,
		lineHeight: 26,
		textAlign: 'center',
		fontWeight: '400',
	},
	button: {
		paddingHorizontal: 32,
		paddingVertical: 17,
		borderRadius: 18,
	},
	buttonText: {
		fontSize: 17,
		fontWeight: '700',
		letterSpacing: 0.1,
	},
});
