import { z } from 'zod';

const photoSchema = z.object({ id: z.string(), url: z.string() });

const baseFields = {
	title: z.string().min(1, 'Give your trip a name'),
	city: z.string().min(1, 'Where did you go?'),
	country: z.string().min(1, 'Which country?'),
	flag: z.string().optional(),
	startDate: z.date(),
	endDate: z.date().optional(),
	note: z.string().optional(),
	photos: z.array(photoSchema).max(10).optional(),
};

export const createTripSchema = z.object(baseFields);

export const editTripSchema = z.object({
	...baseFields,
	title: z.string().min(1, 'Trip name cannot be empty'),
	city: z.string().min(1, 'City cannot be empty'),
	country: z.string().min(1, 'Country cannot be empty'),
});

export type TripFormValues = z.infer<typeof createTripSchema>;
