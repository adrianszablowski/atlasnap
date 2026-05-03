import { useTheme } from '@/theme/use-theme';
import type { TimelineItem } from '@/types/types';
import { calculateTripCosts } from '@/utils/timeline';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import { StyleSheet, Text, View } from 'react-native';

interface TripCostSummaryProps {
	items: TimelineItem[];
	participantCount: number;
}

export function TripCostSummary({ items, participantCount }: Readonly<TripCostSummaryProps>) {
	const theme = useTheme();
	const costs = calculateTripCosts(items, participantCount);

	if (!costs.length) return null;

	return (
		<View style={[styles.card, { backgroundColor: theme.primary50, borderColor: theme.primary100 }]}>
			<View style={styles.headerRow}>
				<Text style={styles.headerEmoji}>💰</Text>
				<Text style={[styles.headerLabel, { color: theme.primary700 }]}>Cost Estimate</Text>
			</View>
			<View style={[styles.divider, { backgroundColor: theme.primary100 }]} />
			{map(costs, ({ currency, total, perPerson }) => (
				<View key={currency} style={styles.currencyRow}>
					<View style={styles.currencyBlock}>
						<Text style={[styles.totalAmount, { color: theme.typography900 }]}>
							{total} {currency}
						</Text>
						<Text style={[styles.totalLabel, { color: theme.typography500 }]}>total</Text>
					</View>
					{!isNil(perPerson) && (
						<View style={[styles.perPersonBadge, { backgroundColor: theme.primary100 }]}>
							<Text style={[styles.perPersonAmount, { color: theme.primary700 }]}>
								{perPerson} {currency}
							</Text>
							<Text style={[styles.perPersonLabel, { color: theme.primary500 }]}>
								/ person{participantCount > 0 ? ` · ${participantCount}` : ''}
							</Text>
						</View>
					)}
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 16,
		borderWidth: 1,
		overflow: 'hidden',
		gap: 0,
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	headerEmoji: {
		fontSize: 16,
	},
	headerLabel: {
		fontSize: 13,
		fontWeight: '800',
		letterSpacing: 1,
		textTransform: 'uppercase',
	},
	divider: {
		height: 1,
	},
	currencyRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 14,
		gap: 12,
	},
	currencyBlock: {
		gap: 2,
	},
	totalAmount: {
		fontSize: 20,
		fontWeight: '800',
		letterSpacing: -0.4,
		fontVariant: ['tabular-nums'],
	},
	totalLabel: {
		fontSize: 12,
		fontWeight: '500',
	},
	perPersonBadge: {
		borderRadius: 12,
		paddingHorizontal: 12,
		paddingVertical: 8,
		alignItems: 'flex-end',
		gap: 2,
	},
	perPersonAmount: {
		fontSize: 16,
		fontWeight: '700',
		fontVariant: ['tabular-nums'],
	},
	perPersonLabel: {
		fontSize: 12,
		fontWeight: '500',
	},
});
