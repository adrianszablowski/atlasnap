import { queryKeys } from '@/shared/query-keys';
import { Maybe, UserData } from '@/types/types';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react';

interface UserContextType {
	userData: UserData;
	isLoading: boolean;
	error: Maybe<string>;
	isAuthenticated: boolean;
	prefetch: () => Promise<void>;
}

export const UserContext = createContext<Maybe<UserContextType>>(undefined);

export function UserProvider({
	children,
	user,
	error = null,
	isLoading = false,
}: Readonly<{
	children: ReactNode;
	user: Maybe<UserData>;
	error?: Maybe<string>;
	isLoading?: boolean;
}>) {
	const queryClient = useQueryClient();
	const isAuthenticated = !!user;

	const prefetch = async () => {
		await queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
	};

	const value: UserContextType = {
		userData: user ?? null,
		isLoading,
		error,
		isAuthenticated,
		prefetch,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
