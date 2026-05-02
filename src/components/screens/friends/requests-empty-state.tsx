import { useTheme } from '@/theme/use-theme';
import { StyleSheet, Text, View } from 'react-native';

export function RequestsEmptyState() {
	const theme = useTheme();

	return (
		<View style={styles.container}>
			<View style={[styles.iconWrap, { backgroundColor: theme.background200 }]}>
				<Text style={styles.emoji}>📬</Text>
			</View>
			<View style={styles.copy}>
				<Text style={[styles.headline, { color: theme.typography800 }]}>No requests yet</Text>
				<Text style={[styles.body, { color: theme.typography400 }]}>
					Friend requests you send or receive will appear here.
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 48,
		paddingHorizontal: 32,
		gap: 20,
	},
	iconWrap: {
		width: 80,
		height: 80,
		borderRadius: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emoji: {
		fontSize: 40,
	},
	copy: {
		alignItems: 'center',
		gap: 8,
	},
	headline: {
		fontSize: 20,
		fontWeight: '700',
		letterSpacing: -0.3,
	},
	body: {
		fontSize: 15,
		lineHeight: 22,
		textAlign: 'center',
	},
});
