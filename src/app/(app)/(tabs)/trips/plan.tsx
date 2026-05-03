import { PlanTripForm } from '@/components/screens/trips/plan-trip-form';
import type { PlanTripFormValues } from '@/schemas';
import { planTripSchema } from '@/schemas';
import { useTheme } from '@/theme/use-theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PlanTripScreen() {
	const theme = useTheme();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<PlanTripFormValues>({
		resolver: zodResolver(planTripSchema),
		defaultValues: {
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
		console.log('New plan:', data);
	};

	return (
		<View style={[styles.root, { backgroundColor: theme.background50 }]}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: 'Plan a Trip',
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
							<Text style={{ color: theme.primary500, fontSize: 16, fontWeight: '700' }}>Save</Text>
						</Pressable>
					),
				}}
			/>
			<PlanTripForm control={control} errors={errors} />
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1, paddingBottom: 48 },
});
