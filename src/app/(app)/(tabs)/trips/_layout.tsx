import { Stack } from 'expo-router';

export default function TripsLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='index' />
			<Stack.Screen name='create' />
			<Stack.Screen name='[tripId]/edit' />
			<Stack.Screen name='[tripId]/details' options={{ presentation: 'modal' }} />
		</Stack>
	);
}
