import type { TimelineItem, TimelineItemType } from '@/types/trip';
import { differenceInCalendarDays, format, parseISO, startOfDay } from 'date-fns';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import includes from 'lodash/includes';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import sortBy from 'lodash/sortBy';

export const TIMELINE_ITEM_TYPES_ELIGIBLE_FOR_COST_HINT: readonly TimelineItemType[] = [
	'transport',
	'stay',
	'food',
	'other',
];

export function isTimelineItemTypeEligibleForCostHint(type: TimelineItemType): boolean {
	return includes(TIMELINE_ITEM_TYPES_ELIGIBLE_FOR_COST_HINT, type);
}

export function sortTimelineItems(items: TimelineItem[]): TimelineItem[] {
	const timed = sortBy(
		filter(items, (item) => !!item.startsAt),
		'startsAt',
	);

	const untimed = filter(items, (item) => !item.startsAt);

	return [...timed, ...untimed];
}

export function getTimelineItemEmoji(type: TimelineItemType): string {
	const emojis: Record<TimelineItemType, string> = {
		transport: '✈️',
		stay: '🏨',
		activity: '🎯',
		food: '🍽️',
		note: '📝',
		other: '📌',
	};

	return emojis[type] ?? '📌';
}

export function getTimelineItemColor(
	type: TimelineItemType,
	theme: {
		primary500: string;
		tertiary500: string;
		success500: string;
		secondary500: string;
		outline400: string;
		info500: string;
	},
): string {
	const colors: Record<TimelineItemType, string> = {
		transport: theme.primary500,
		stay: theme.tertiary500,
		activity: theme.success500,
		food: theme.secondary500,
		note: theme.outline400,
		other: theme.info500,
	};

	return colors[type] ?? theme.outline400;
}

export interface CurrencyCostSummary {
	currency: string;
	total: number;
	perPerson: number | null;
}

export interface TimelineDayGroup {
	dayNumber: number;
	dateKey: string;
	dayLabel: string;
	items: TimelineItem[];
}

export function groupTimelineItemsByDay(
	items: TimelineItem[],
	tripStartDate: string,
): { groups: TimelineDayGroup[]; unscheduled: TimelineItem[] } {
	const tripStart = startOfDay(parseISO(tripStartDate));
	const scheduled = filter(items, (item) => !!item.startsAt);
	const unscheduled = filter(items, (item) => !item.startsAt);

	const byDate = groupBy(scheduled, (item) => format(startOfDay(parseISO(item.startsAt!)), 'yyyy-MM-dd'));

	const groups: TimelineDayGroup[] = map(Object.entries(byDate), ([dateKey, dayItems]) => {
		const dayDate = parseISO(dateKey);
		const dayNumber = differenceInCalendarDays(dayDate, tripStart) + 1;

		return {
			dayNumber,
			dateKey,
			dayLabel: format(dayDate, 'EEE, MMM d'),
			items: sortBy(dayItems, 'startsAt'),
		};
	});

	return { groups: sortBy(groups, 'dayNumber'), unscheduled };
}

export function calculateTripCosts(items: TimelineItem[], participantCount: number): CurrencyCostSummary[] {
	const costItems: TimelineItem[] = filter(items, (item) => item.costAmount != null && !!item.costCurrency);

	if (!costItems.length) return [];

	const byCurrency = groupBy(costItems, 'costCurrency');

	return map<[string, TimelineItem[]], CurrencyCostSummary>(Object.entries(byCurrency), ([currency, currencyItems]) => {
		const total = reduce(currencyItems, (sum: number, item: TimelineItem) => sum + (item.costAmount ?? 0), 0);
		const splitItems: TimelineItem[] = filter(currencyItems, { splitType: 'split_equally' });
		const splitTotal = reduce(splitItems, (sum: number, item: TimelineItem) => sum + (item.costAmount ?? 0), 0);
		const perPerson = participantCount > 0 && splitTotal > 0 ? Math.round(splitTotal / participantCount) : null;

		return { currency, total, perPerson };
	});
}
