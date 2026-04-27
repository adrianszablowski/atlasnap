import { getCurrentUser } from '@/api/users';
import { UserProvider } from '@/contexts/user-context';
import { queryKeys } from '@/shared/query-keys';
import { useTheme } from '@/theme/use-theme';
import { useQuery } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';

export default function AppLayout() {
	const theme = useTheme();
	// const { hasActiveSubscription, isLoading: subscriptionLoading } = useSubscription(); // TODO: Uncomment this when the subscription is ready

	const { data: user, isLoading: userLoading } = useQuery({
		queryKey: queryKeys.user.all,
		queryFn: async () => {
			const { success, message, data: userData } = await getCurrentUser();

			if (!success) {
				throw new Error(message);
			}

			return userData;
		},
		staleTime: 5 * 60 * 1000,
	});

	if (userLoading) {
		return null;
	}

	if (!user) {
		return <Redirect href='/sign-in' />;
	}

	// const isOnPaywall = includes(pathname, '/paywall');

	return (
		<UserProvider user={user} isLoading={userLoading}>
			<Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background0 } }}>
				<Stack.Screen name='paywall' />
				<Stack.Screen name='(tabs)' />
			</Stack>
		</UserProvider>
	);
}
