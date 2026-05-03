import trim from 'lodash/trim';
import { z } from 'zod';

const photoSchema = z.object({ id: z.string(), url: z.string() });

export const timelineItemTypeSchema = z.enum(['transport', 'stay', 'activity', 'food', 'note', 'other']);

export const TIMELINE_ITEM_CURRENCIES = ['PLN', 'EUR', 'USD', 'GBP'] as const;

export const timelineItemCurrencySchema = z.enum(TIMELINE_ITEM_CURRENCIES);

export const timelineItemFormSchema = z.object({
	type: timelineItemTypeSchema,
	title: z.string().min(1, 'Add a title'),
	startsAt: z.date().optional(),
	endsAt: z.date().optional(),
	locationLabel: z.string().optional(),
	description: z.string().optional(),
	costAmount: z.number().positive().optional(),
	costCurrency: z.string().optional(),
	splitType: z.enum(['split_equally', 'informational']).optional(),
});

export type TimelineItemFormValues = z.infer<typeof timelineItemFormSchema>;

export const timelineItemModalFormSchema = z
	.object({
		type: timelineItemTypeSchema,
		title: z.string().min(1, 'Add a title'),
		hasWhen: z.boolean(),
		startsDate: z.date(),
		startsTime: z.date(),
		locationLabel: z.string().optional(),
		description: z.string().optional(),
		hasCost: z.boolean(),
		costAmountInput: z.string(),
		costCurrency: timelineItemCurrencySchema,
		splitType: z.enum(['split_equally', 'informational']),
	})
	.superRefine((data, ctx) => {
		if (!data.hasCost) return;

		const trimmed = trim(data.costAmountInput);

		if (!trimmed) {
			ctx.addIssue({
				code: 'custom',
				message: 'Enter an amount',
				path: ['costAmountInput'],
			});

			return;
		}

		const amount = Number.parseFloat(trimmed.replace(',', '.'));

		if (Number.isNaN(amount) || amount <= 0) {
			ctx.addIssue({
				code: 'custom',
				message: 'Enter a valid amount',
				path: ['costAmountInput'],
			});
		}
	});

export type TimelineItemModalFormValues = z.infer<typeof timelineItemModalFormSchema>;

export function timelineItemModalFormToItem(values: TimelineItemModalFormValues): TimelineItemFormValues {
	let startsAt: Date | undefined;

	if (values.hasWhen) {
		const combined = new Date(values.startsDate);
		combined.setHours(values.startsTime.getHours(), values.startsTime.getMinutes(), 0, 0);
		startsAt = combined;
	}

	const trimmedCost = trim(values.costAmountInput);
	const amount = values.hasCost ? Number.parseFloat(trimmedCost.replace(',', '.')) : Number.NaN;
	const validCost = values.hasCost && !Number.isNaN(amount) && amount > 0;

	const loc = values.locationLabel ? trim(values.locationLabel) : '';
	const desc = values.description ? trim(values.description) : '';

	return {
		type: values.type,
		title: trim(values.title),
		startsAt,
		locationLabel: loc ? loc : undefined,
		description: desc ? desc : undefined,
		costAmount: validCost ? amount : undefined,
		costCurrency: validCost ? values.costCurrency : undefined,
		splitType: validCost ? values.splitType : undefined,
	};
}

const memoryBaseFields = {
	title: z.string().min(1, 'Give your trip a name'),
	city: z.string().min(1, 'Where did you go?'),
	country: z.string().min(1, 'Which country?'),
	flag: z.string().optional(),
	startDate: z.date(),
	endDate: z.date().optional(),
	note: z.string().optional(),
	photos: z.array(photoSchema).max(10).optional(),
	participantIds: z.array(z.string()).optional(),
};

export const createTripSchema = z.object(memoryBaseFields);

export const editTripSchema = z.object({
	...memoryBaseFields,
	title: z.string().min(1, 'Trip name cannot be empty'),
	city: z.string().min(1, 'City cannot be empty'),
	country: z.string().min(1, 'Country cannot be empty'),
});

export type TripFormValues = z.infer<typeof createTripSchema>;

// --- Planned trip schemas (no photos) ---

const planBaseFields = {
	title: z.string().min(1, 'Give your trip a name'),
	city: z.string().min(1, 'Where are you going?'),
	country: z.string().min(1, 'Which country?'),
	flag: z.string().optional(),
	startDate: z.date(),
	endDate: z.date().optional(),
	note: z.string().optional(),
	participantIds: z.array(z.string()).optional(),
	timelineItems: z.array(timelineItemFormSchema).optional(),
};

export const planTripSchema = z.object(planBaseFields);

export const planTripEditSchema = z.object({
	...planBaseFields,
	title: z.string().min(1, 'Trip name cannot be empty'),
	city: z.string().min(1, 'City cannot be empty'),
	country: z.string().min(1, 'Country cannot be empty'),
});

export type PlanTripFormValues = z.infer<typeof planTripSchema>;
