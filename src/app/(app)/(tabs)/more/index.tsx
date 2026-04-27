import { useTheme } from '@/theme/use-theme';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoreScreen() {
	const theme = useTheme();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.background0 }} edges={['top']}>
			<Text>More Screen</Text>
		</SafeAreaView>
	);
}
