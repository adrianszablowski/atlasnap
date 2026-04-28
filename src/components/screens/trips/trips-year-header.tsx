import { useTheme } from '@/theme/use-theme';
import { StyleSheet, Text, View } from 'react-native';

export interface TripsYearHeaderProps {
	year: string;
	count: number;
}

export function TripsYearHeader({ year, count }: Readonly<TripsYearHeaderProps>) {
	const theme = useTheme();

	return (
		<View style={styles.root}>
			<Text style={[styles.year, { color: theme.typography700 }]}>{year}</Text>
			<View style={[styles.line, { backgroundColor: theme.background300 }]} />
			<View style={[styles.countPill, { backgroundColor: theme.background200, borderColor: theme.cardBorder }]}>
				<Text style={[styles.countText, { color: theme.typography500 }]}>
					{count} {count === 1 ? 'trip' : 'trips'}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		paddingVertical: 20,
	},
	year: {
		fontSize: 13,
		fontWeight: '800',
		letterSpacing: 2,
		textTransform: 'uppercase',
	},
	line: {
		flex: 1,
		height: StyleSheet.hairlineWidth,
		borderRadius: 1,
	},
	countPill: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		borderWidth: 1,
	},
	countText: {
		fontSize: 11,
		fontWeight: '600',
		letterSpacing: 0.2,
	},
});
