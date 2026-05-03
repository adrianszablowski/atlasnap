import type { TimelineItemFormValues } from '@/schemas';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import { formatTimeForUser } from '@/utils/date-display';
import { getTimelineItemColor, getTimelineItemEmoji } from '@/utils/timeline';
import isNil from 'lodash/isNil';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface PlanItemRowProps {
	item: TimelineItemFormValues & { id: string };
	onRemove: () => void;
}

export function PlanItemRow({ item, onRemove: handleRemove }: Readonly<PlanItemRowProps>) {
	const theme = useTheme();
	const emoji = getTimelineItemEmoji(item.type);
	const color = getTimelineItemColor(item.type, theme);

	return (
		<View style={[styles.planItemRow, { borderBottomColor: theme.outline100 }]}>
			<View style={[styles.planItemType, { backgroundColor: hexToRgba(color, 0.12) }]}>
				<Text style={styles.planItemEmoji}>{emoji}</Text>
			</View>
			<View style={styles.planItemContent}>
				<Text style={[styles.planItemTitle, { color: theme.typography900 }]} numberOfLines={1}>
					{item.title}
				</Text>
				<View style={styles.planItemMeta}>
					{item.startsAt && (
						<Text style={[styles.planItemMetaText, { color: theme.typography500 }]}>
							{formatTimeForUser(item.startsAt)}
						</Text>
					)}
					{!isNil(item.costAmount) && item.costCurrency && (
						<Text style={[styles.planItemMetaText, { color: theme.primary600 }]}>
							{item.costAmount} {item.costCurrency}
						</Text>
					)}
					{item.locationLabel && (
						<Text style={[styles.planItemMetaText, { color: theme.typography400 }]} numberOfLines={1}>
							{item.locationLabel}
						</Text>
					)}
				</View>
			</View>
			<Pressable onPress={handleRemove} hitSlop={8} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
				<Text style={[styles.planItemRemove, { color: theme.outline400 }]}>✕</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	planItemRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		paddingVertical: 10,
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	planItemType: {
		width: 36,
		height: 36,
		borderRadius: 10,
		borderCurve: 'continuous',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	},
	planItemEmoji: { fontSize: 16 },
	planItemContent: { flex: 1, gap: 2 },
	planItemTitle: { fontSize: 14, fontWeight: '700' },
	planItemMeta: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
	planItemMetaText: { fontSize: 12, fontWeight: '500' },
	planItemRemove: { fontSize: 15, fontWeight: '600', paddingHorizontal: 4 },
});
