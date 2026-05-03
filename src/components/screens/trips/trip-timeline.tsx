import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import type { TimelineItem } from '@/types/trip';
import { formatTimeForUser } from '@/utils/date-display';
import type { TimelineDayGroup } from '@/utils/timeline';
import {
	getTimelineItemColor,
	getTimelineItemEmoji,
	groupTimelineItemsByDay,
	isTimelineItemTypeEligibleForCostHint,
	sortTimelineItems,
} from '@/utils/timeline';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import { StyleSheet, Text, View } from 'react-native';

interface TripTimelineProps {
	items: TimelineItem[];
	tripStartDate?: string;
}

interface TimelineItemRowProps {
	item: TimelineItem;
	isLast: boolean;
}

function TimelineItemRow({ item, isLast }: Readonly<TimelineItemRowProps>) {
	const theme = useTheme();
	const color = getTimelineItemColor(item.type, theme);
	const emoji = getTimelineItemEmoji(item.type);
	const hasCostRow = !isNil(item.costAmount) && Boolean(item.costCurrency);
	const showCostHint = !hasCostRow && isTimelineItemTypeEligibleForCostHint(item.type);

	return (
		<View style={styles.row}>
			<View style={styles.leftCol}>
				<View style={[styles.dot, { backgroundColor: color, borderColor: theme.background0 }]} />
				{!isLast && <View style={[styles.connector, { backgroundColor: theme.background300 }]} />}
			</View>
			<View style={[styles.content, isLast && styles.contentLast]}>
				<View style={styles.titleRow}>
					{item.startsAt && (
						<Text style={[styles.time, { color: theme.typography500 }]}>{formatTimeForUser(item.startsAt)}</Text>
					)}
					<View style={[styles.typePill, { backgroundColor: hexToRgba(color, 0.12) }]}>
						<Text style={styles.typeEmoji}>{emoji}</Text>
					</View>
					<Text style={[styles.itemTitle, { color: theme.typography900 }]} numberOfLines={2}>
						{item.title}
					</Text>
				</View>
				{item.description && (
					<Text style={[styles.description, { color: theme.typography500 }]}>{item.description}</Text>
				)}
				{hasCostRow ? (
					<View style={styles.costRow}>
						<Text style={[styles.cost, { color: theme.primary600 }]}>
							{item.costAmount} {item.costCurrency}
						</Text>
						{item.splitType === 'split_equally' && (
							<Text style={[styles.splitLabel, { color: theme.outline500 }]}>· split equally</Text>
						)}
					</View>
				) : (
					showCostHint && <Text style={[styles.noCostHint, { color: theme.outline300 }]}>+ add cost</Text>
				)}
			</View>
		</View>
	);
}

function DayGroup({ group, isLastGroup }: Readonly<{ group: TimelineDayGroup; isLastGroup: boolean }>) {
	const theme = useTheme();

	return (
		<View style={[styles.dayGroup, !isLastGroup && styles.dayGroupGap]}>
			<View style={styles.dayHeader}>
				<View style={[styles.dayBadge, { backgroundColor: hexToRgba(theme.primary500, 0.12) }]}>
					<Text style={[styles.dayBadgeText, { color: theme.primary700 }]}>DAY {group.dayNumber}</Text>
				</View>
				<View style={[styles.dayDivider, { backgroundColor: theme.outline100 }]} />
				<Text style={[styles.dayDate, { color: theme.typography500 }]}>{group.dayLabel}</Text>
			</View>
			<View style={styles.dayItems}>
				{map(group.items, (item, index) => (
					<TimelineItemRow key={item.id} item={item} isLast={index === group.items.length - 1} />
				))}
			</View>
		</View>
	);
}

export function TripTimeline({ items, tripStartDate }: Readonly<TripTimelineProps>) {
	const theme = useTheme();

	if (!items.length) {
		return (
			<View style={[styles.emptyState, { backgroundColor: theme.background100, borderColor: theme.cardBorder }]}>
				<Text style={styles.emptyEmoji}>📋</Text>
				<Text style={[styles.emptyTitle, { color: theme.typography700 }]}>No items yet</Text>
				<Text style={[styles.emptyBody, { color: theme.typography400 }]}>
					Tap Add Timeline Item below to start building your plan.
				</Text>
			</View>
		);
	}

	if (tripStartDate) {
		const { groups, unscheduled } = groupTimelineItemsByDay(items, tripStartDate);

		return (
			<View style={styles.root}>
				{map(groups, (group, index) => (
					<DayGroup
						key={group.dateKey}
						group={group}
						isLastGroup={index === groups.length - 1 && unscheduled.length === 0}
					/>
				))}
				{unscheduled.length > 0 && (
					<View style={[styles.dayGroup, groups.length > 0 && styles.dayGroupGap]}>
						{groups.length > 0 && (
							<View style={styles.dayHeader}>
								<View style={[styles.dayBadge, { backgroundColor: hexToRgba(theme.outline400, 0.12) }]}>
									<Text style={[styles.dayBadgeText, { color: theme.typography500 }]}>TBD</Text>
								</View>
								<View style={[styles.dayDivider, { backgroundColor: theme.outline100 }]} />
								<Text style={[styles.dayDate, { color: theme.typography400 }]}>No date set</Text>
							</View>
						)}
						<View style={styles.dayItems}>
							{map(unscheduled, (item, index) => (
								<TimelineItemRow key={item.id} item={item} isLast={index === unscheduled.length - 1} />
							))}
						</View>
					</View>
				)}
			</View>
		);
	}

	const sorted = sortTimelineItems(items);

	return (
		<View style={styles.root}>
			{map(sorted, (item, index) => (
				<TimelineItemRow key={item.id} item={item} isLast={index === sorted.length - 1} />
			))}
		</View>
	);
}

const DOT_SIZE = 14;
const CONNECTOR_WIDTH = 2;
const LEFT_COL_WIDTH = 32;

const styles = StyleSheet.create({
	root: {
		gap: 0,
	},
	emptyState: {
		borderRadius: 16,
		borderWidth: 1,
		paddingVertical: 28,
		paddingHorizontal: 20,
		alignItems: 'center',
		gap: 8,
	},
	emptyEmoji: {
		fontSize: 28,
	},
	emptyTitle: {
		fontSize: 15,
		fontWeight: '700',
	},
	emptyBody: {
		fontSize: 13,
		fontWeight: '500',
		textAlign: 'center',
		lineHeight: 20,
	},
	dayGroup: {},
	dayGroupGap: {
		marginBottom: 20,
	},
	dayHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		marginBottom: 14,
	},
	dayBadge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		borderCurve: 'continuous',
		flexShrink: 0,
	},
	dayBadgeText: {
		fontSize: 11,
		fontWeight: '800',
		letterSpacing: 1,
	},
	dayDivider: {
		height: 1,
		flex: 0,
		width: 8,
	},
	dayDate: {
		fontSize: 13,
		fontWeight: '600',
	},
	dayItems: {
		paddingLeft: 4,
	},
	row: {
		flexDirection: 'row',
	},
	leftCol: {
		width: LEFT_COL_WIDTH,
		alignItems: 'center',
	},
	dot: {
		width: DOT_SIZE,
		height: DOT_SIZE,
		borderRadius: DOT_SIZE / 2,
		borderWidth: 2.5,
		marginTop: 3,
		flexShrink: 0,
	},
	connector: {
		width: CONNECTOR_WIDTH,
		flex: 1,
		marginTop: 4,
		borderRadius: CONNECTOR_WIDTH / 2,
	},
	content: {
		flex: 1,
		paddingBottom: 20,
		gap: 4,
	},
	contentLast: {
		paddingBottom: 4,
	},
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		flexWrap: 'wrap',
	},
	time: {
		fontSize: 13,
		fontWeight: '700',
		letterSpacing: 0.2,
		fontVariant: ['tabular-nums'],
	},
	typePill: {
		width: 24,
		height: 24,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	typeEmoji: {
		fontSize: 13,
	},
	itemTitle: {
		flex: 1,
		fontSize: 15,
		fontWeight: '700',
		lineHeight: 21,
	},
	description: {
		fontSize: 13,
		fontWeight: '500',
		lineHeight: 20,
		paddingLeft: 2,
	},
	costRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	cost: {
		fontSize: 13,
		fontWeight: '700',
		fontVariant: ['tabular-nums'],
	},
	splitLabel: {
		fontSize: 12,
		fontWeight: '500',
	},
	noCostHint: {
		fontSize: 12,
		fontWeight: '600',
		paddingLeft: 2,
	},
});
