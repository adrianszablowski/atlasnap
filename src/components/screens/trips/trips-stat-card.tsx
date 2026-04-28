import { useTheme } from '@/theme/use-theme';
import { StyleSheet, Text, View } from 'react-native';

export interface TripsStatCardProps {
	emoji: string;
	value: number;
	label: string;
}

export function TripsStatCard({ emoji, value, label }: Readonly<TripsStatCardProps>) {
	const theme = useTheme();

	return (
		<View
			style={[
				styles.root,
				{ backgroundColor: theme.cardBackground, borderColor: theme.cardBorder, shadowColor: theme.typography900 },
			]}
		>
			<Text style={styles.emoji}>{emoji}</Text>
			<Text style={[styles.value, { color: theme.typography900 }]}>{value}</Text>
			<Text style={[styles.label, { color: theme.typography500 }]}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 16,
		borderRadius: 18,
		borderWidth: 1,
		gap: 4,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.06,
		shadowRadius: 10,
		elevation: 3,
	},
	emoji: {
		fontSize: 24,
		marginBottom: 2,
	},
	value: {
		fontSize: 26,
		fontWeight: '800',
		letterSpacing: -0.5,
	},
	label: {
		fontSize: 11,
		fontWeight: '600',
		letterSpacing: 0.5,
		textTransform: 'uppercase',
	},
});
