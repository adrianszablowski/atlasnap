import { AtlasnapThemeProvider } from '@/theme/theme-provider';
import { useTheme } from '@/theme/use-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			refetchOnMount: false,
			retry: 2,
		},
	},
});

configureReanimatedLogger({
	level: ReanimatedLogLevel.error,
	strict: true,
});

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

SplashScreen.preventAutoHideAsync();

function ThemedStack() {
	const theme = useTheme();

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				contentStyle: { backgroundColor: theme.background100 },
			}}
		>
			<Stack.Screen name='index' />
			<Stack.Screen name='(auth)' />
			<Stack.Screen name='(app)' />
			<Stack.Screen name='+not-found' />
		</Stack>
	);
}

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<AtlasnapThemeProvider>
				<ThemedStack />
			</AtlasnapThemeProvider>
		</QueryClientProvider>
	);
}
