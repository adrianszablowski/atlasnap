import type { TripFormValues } from '@/components/screens/trips/schemas';
import { createTripSchema } from '@/components/screens/trips/schemas';
import { TripForm } from '@/components/screens/trips/trip-form';
import { useTheme } from '@/theme/use-theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function CreateTripScreen() {
	const theme = useTheme();
	const router = useRouter();

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<TripFormValues>({
		resolver: zodResolver(createTripSchema),
		defaultValues: {
			title: '',
			city: '',
			country: '',
			flag: '',
			startDate: new Date(),
			endDate: undefined,
			note: '',
			photos: [],
		},
	});

	const photos = watch('photos') ?? [];

	function onSubmit(data: TripFormValues) {
		console.log('New trip:', data);
	}

	return (
		<View style={[styles.root, { backgroundColor: theme.background50 }]}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: 'New Trip',
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
			<TripForm control={control} errors={errors} photos={photos} />
		</View>
	);
}

const styles = StyleSheet.create({
	root: { flex: 1 },
});
