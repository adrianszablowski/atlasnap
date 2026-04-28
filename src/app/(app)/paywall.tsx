import { queryKeys } from '@/shared/query-keys';
import { useTheme } from '@/theme/use-theme';
import { useQueryClient } from '@tanstack/react-query';
import { View } from 'react-native';
import RevenueCatUI from 'react-native-purchases-ui';

export default function PaywallScreen() {
	const queryClient = useQueryClient();
	const theme = useTheme();

	const handleSubscriptionComplete = async () => {
		await queryClient.invalidateQueries({ queryKey: queryKeys.subscription.all });
	};

	return (
		<View style={{ flex: 1, backgroundColor: theme.background100 }}>
			<RevenueCatUI.Paywall
				onPurchaseCompleted={handleSubscriptionComplete}
				onRestoreCompleted={handleSubscriptionComplete}
			/>
		</View>
	);
}
