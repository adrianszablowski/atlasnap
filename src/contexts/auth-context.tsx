import { supabase } from '@/lib/supabase';
import { queryKeys } from '@/shared/query-keys';
import { Maybe } from '@/types/types';
import { Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import Purchases from 'react-native-purchases';

type AuthState = {
	initialized: boolean;
	session: Maybe<Session>;
};

export const AuthContext = createContext<AuthState>({
	initialized: false,
	session: null,
});

export function AuthProvider({ children }: Readonly<PropsWithChildren>) {
	const [initialized, setInitialized] = useState(false);
	const [session, setSession] = useState<Maybe<Session>>(null);
	const queryClient = useQueryClient();
	const purchasesConfigured = useRef(false);
	const currentRevenueCatUserId = useRef<string | null>(null);

	useEffect(() => {
		const configurePurchasesIfNeeded = async (userId: string) => {
			const apiKey =
				Platform.OS === 'ios'
					? process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY
					: Platform.OS === 'android'
						? process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY
						: null;

			if (!apiKey) return;

			if (!purchasesConfigured.current) {
				Purchases.configure({
					apiKey,
					appUserID: userId,
				});

				purchasesConfigured.current = true;
				currentRevenueCatUserId.current = userId;
			} else if (currentRevenueCatUserId.current !== userId) {
				await Purchases.logIn(userId);
				currentRevenueCatUserId.current = userId;
			}

			await queryClient.invalidateQueries({ queryKey: queryKeys.subscription.all });
		};

		const initAuth = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			if (session?.user?.id) {
				try {
					await configurePurchasesIfNeeded(session.user.id);
				} catch (error) {
					console.error('RevenueCat init error:', error);
				}
			}

			setSession(session);
			setInitialized(true);
		};

		void initAuth();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (event, session) => {
			try {
				if (event === 'SIGNED_IN' && session?.user?.id) {
					await configurePurchasesIfNeeded(session.user.id);
				} else if (event === 'SIGNED_OUT') {
					queryClient.clear();
					currentRevenueCatUserId.current = null;
				}
			} catch (error) {
				console.error('RevenueCat auth change error:', error);
			}

			setSession(session);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [queryClient]);

	return (
		<AuthContext.Provider
			value={{
				initialized,
				session,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
