import { useTheme } from '@/theme/use-theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function FriendsEmptyState() {
	const theme = useTheme();
	const router = useRouter();

	const floatBadgeSurface = [
		styles.floatBadge,
		{ backgroundColor: theme.background0, shadowColor: theme.typography900 },
	];

	return (
		<View style={styles.container}>
			<View style={styles.illustrationWrap}>
				<View style={[styles.circleOuter, { backgroundColor: theme.primary50 }]}>
					<View style={[styles.circleInner, { backgroundColor: theme.primary100 }]}>
						<Text style={styles.mainEmoji}>🧭</Text>
					</View>
				</View>
				<View style={[...floatBadgeSurface, styles.floatTopRight]}>
					<Text style={styles.floatEmoji}>✈️</Text>
				</View>
				<View style={[...floatBadgeSurface, styles.floatBottomLeft]}>
					<Text style={styles.floatEmoji}>👋</Text>
				</View>
				<View style={[...floatBadgeSurface, styles.floatBottomRight]}>
					<Text style={styles.floatEmoji}>📍</Text>
				</View>
			</View>
			<View style={styles.copy}>
				<Text style={[styles.headline, { color: theme.typography900 }]}>Travel is better{'\n'}with good company.</Text>
				<Text style={[styles.body, { color: theme.typography500 }]}>
					Add friends using their unique code and explore trips together on Atlas.
				</Text>
			</View>
			<Pressable
				onPress={() => router.push('/friends/add-friend')}
				style={({ pressed }) => [styles.cta, { backgroundColor: theme.primary500, opacity: pressed ? 0.84 : 1 }]}
			>
				<Text style={[styles.ctaText, { color: theme.background0 }]}>Add Your First Friend</Text>
			</Pressable>
			<Text style={[styles.hint, { color: theme.outline400 }]}>Enter a friend code · Connect · Explore together</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 32,
		paddingBottom: 24,
		paddingHorizontal: 32,
		gap: 28,
	},
	illustrationWrap: {
		width: 160,
		height: 160,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circleOuter: {
		width: 140,
		height: 140,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circleInner: {
		width: 104,
		height: 104,
		borderRadius: 52,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mainEmoji: {
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
	floatBottomRight: {
		bottom: 0,
		right: 8,
	},
	floatEmoji: {
		fontSize: 20,
	},
	copy: {
		alignItems: 'center',
		gap: 12,
	},
	headline: {
		fontSize: 26,
		fontWeight: '700',
		letterSpacing: -0.5,
		textAlign: 'center',
		lineHeight: 34,
	},
	body: {
		fontSize: 16,
		lineHeight: 26,
		textAlign: 'center',
	},
	cta: {
		paddingHorizontal: 32,
		paddingVertical: 17,
		borderRadius: 18,
	},
	ctaText: {
		fontSize: 17,
		fontWeight: '700',
		letterSpacing: 0.1,
	},
	hint: {
		fontSize: 13,
		fontWeight: '500',
		letterSpacing: 0.2,
	},
});
