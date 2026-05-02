import { Stack } from 'expo-router';

export default function FriendsLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name='index' />
			<Stack.Screen
				name='add-friend'
				options={{
					headerShown: true,
					title: 'Add Friend',
					presentation: 'formSheet',
					sheetGrabberVisible: true,
					sheetAllowedDetents: [0.65, 1.0],
				}}
			/>
		</Stack>
	);
}
