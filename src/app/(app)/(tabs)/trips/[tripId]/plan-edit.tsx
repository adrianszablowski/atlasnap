import { PlanTripForm } from '@/components/screens/trips/plan-trip-form';
import { MOCK_TRIPS } from '@/constants/mock-trips';
import type { PlanTripFormValues } from '@/schemas';
import { planTripEditSchema } from '@/schemas';
import { useTheme } from '@/theme/use-theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import find from 'lodash/find';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function EditPlanScreen() {
	const theme = useTheme();
	const router = useRouter();
	const { tripId } = useLocalSearchParams<{ tripId: string }>();

	const trip = find(MOCK_TRIPS, { id: tripId });

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<PlanTripFormValues>({
		resolver: zodResolver(planTripEditSchema),
		defaultValues: trip
			? {
					title: trip.title,
					city: trip.city,
					country: trip.country,
					flag: trip.flag,
					startDate: new Date(trip.startDate),
					endDate: trip.endDate ? new Date(trip.endDate) : undefined,
					note: trip.note ?? '',
					participantIds: [],
					timelineItems: [],
				}
			: {
					title: '',
					city: '',
					country: '',
					flag: '',
					startDate: new Date(),
					endDate: undefined,
					note: '',
					participantIds: [],
					timelineItems: [],
				},
	});

	const onSubmit = (data: PlanTripFormValues) => {
		console.log('Update plan:', tripId, data);
	};

	return (
		<View style={[styles.root, { backgroundColor: theme.background50 }]}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: 'Edit Plan',
					headerBackVisible: false,
					headerShadowVisible: false,
					headerStyle: { backgroundColor: theme.background50 },
					headerTitleStyle: { color: theme.typography900, fontSize: 17, fontWeight: '700' },
					headerLeft: () => (
						<Pressable
							onPress={() => router.back()}
							hitSlop={8}
							style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
						>
							<Text style={{ color: theme.typography600, fontSize: 16, fontWeight: '500' }}>Cancel</Text>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={handleSubmit(onSubmit)}
							hitSlop={8}
							style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
						>
							<Text style={{ color: theme.primary500, fontSize: 16, fontWeight: '700' }}>Save Changes</Text>
						</Pressable>
					),
				}}
			/>
			<PlanTripForm control={control} errors={errors} formKey={tripId} />
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, paddingBottom: 48 },
});
