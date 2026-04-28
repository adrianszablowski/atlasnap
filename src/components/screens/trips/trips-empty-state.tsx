import { useTheme } from '@/theme/use-theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function TripsEmptyState() {
	const theme = useTheme();
	const router = useRouter();
	const floatBadgeSurface = [
		styles.floatBadge,
		{ backgroundColor: theme.background0, shadowColor: theme.typography900 },
	];

	return (
		<View style={styles.container}>
			<View style={styles.globeWrap}>
				<View style={[styles.globeOuter, { backgroundColor: theme.primary50 }]}>
					<View style={[styles.globeInner, { backgroundColor: theme.primary100 }]}>
						<Text style={styles.globeEmoji}>🌍</Text>
					</View>
				</View>
				<View style={[...floatBadgeSurface, styles.floatTopRight]}>
					<Text style={styles.floatEmoji}>✈️</Text>
				</View>
				<View style={[...floatBadgeSurface, styles.floatBottomLeft]}>
					<Text style={styles.floatEmoji}>📍</Text>
				</View>
				<View style={[...floatBadgeSurface, styles.floatBottomRight]}>
					<Text style={styles.floatEmoji}>📷</Text>
				</View>
			</View>
			<View style={styles.copyBlock}>
				<Text style={[styles.headline, { color: theme.typography900 }]}>
					Every journey deserves{'\n'}to be remembered.
				</Text>
				<Text style={[styles.body, { color: theme.typography500 }]}>
					Add your first trip and watch your personal Atlas come to life — one memory at a time.
				</Text>
			</View>
			<Pressable
				onPress={() => router.push('/trips/create')}
				style={({ pressed }) => [styles.cta, { backgroundColor: theme.primary500, opacity: pressed ? 0.84 : 1 }]}
			>
				<Text style={[styles.ctaText, { color: theme.background0 }]}>Begin Your Atlas</Text>
			</Pressable>
			<Text style={[styles.hint, { color: theme.outline400 }]}>Search a place · Add photos · Save the memory</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 40,
		paddingBottom: 24,
		gap: 28,
	},
	globeWrap: {
		width: 160,
		height: 160,
		alignItems: 'center',
		justifyContent: 'center',
	},
	globeOuter: {
		width: 140,
		height: 140,
		borderRadius: 70,
		alignItems: 'center',
		justifyContent: 'center',
	},
	globeInner: {
		width: 104,
		height: 104,
		borderRadius: 52,
		alignItems: 'center',
		justifyContent: 'center',
	},
	globeEmoji: {
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
	copyBlock: {
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
		fontWeight: '400',
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
