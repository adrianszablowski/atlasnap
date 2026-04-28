import { Stack } from 'expo-router';

export default function TripsLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='index' />
			<Stack.Screen name='create' options={{ presentation: 'modal' }} />
			<Stack.Screen name='[tripId]/edit' options={{ presentation: 'modal' }} />
			<Stack.Screen name='[tripId]/details' options={{ presentation: 'modal' }} />
		</Stack>
	);
}
