import { queryKeys } from '@/shared/query-keys';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import entries from 'lodash/entries';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import size from 'lodash/size';
import some from 'lodash/some';
import values from 'lodash/values';
import { useCallback, useEffect, useMemo } from 'react';
import Purchases, { CustomerInfo } from 'react-native-purchases';

export function useSubscription() {
	const queryClient = useQueryClient();

	const { data: customerInfo, isLoading } = useQuery({
		queryKey: queryKeys.subscription.all,
		queryFn: async () => await Purchases.getCustomerInfo(),
	});

	useEffect(() => {
		const callback = (info: CustomerInfo) => {
			queryClient.setQueryData(queryKeys.subscription.all, info);
		};

		Purchases.addCustomerInfoUpdateListener(callback);

		return () => {
			Purchases.removeCustomerInfoUpdateListener(callback);
		};
	}, [queryClient]);

	const hasActiveSubscription = size(entries(customerInfo?.entitlements.active ?? {})) > 0;

	const isInGracePeriod = useMemo(() => {
		if (!customerInfo) return false;

		const activeEntitlements = values(customerInfo.entitlements.active);

		return some(activeEntitlements, (entitlement) => {
			const billingIssueTime = (entitlement as any).billingIssueDetectedAtMillis;

			return !isNull(billingIssueTime) && !isUndefined(billingIssueTime);
		});
	}, [customerInfo]);

	const refetchSubscription = useCallback(() => {
		queryClient.refetchQueries({ queryKey: queryKeys.subscription.all });
	}, [queryClient]);

	return {
		customerInfo,
		isLoading,
		hasActiveSubscription,
		isInGracePeriod,
		refetchSubscription,
	};
}
