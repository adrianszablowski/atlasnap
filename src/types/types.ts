import { Button } from '@expo/ui/swift-ui';
import type { ComponentProps } from 'react';

export type Maybe<T> = T | null | undefined;

export interface Response<T> {
	success: boolean;
	message: string;
	data?: T;
	errorReason?: AuthErrorReason;
}

export type SfSystemImageIcon = NonNullable<ComponentProps<typeof Button>['systemImage']>;

export type AuthErrorReason = 'email_taken' | 'weak_password';
export type Gender = 'male' | 'female';
export type AvatarPool = 'pool_a' | 'pool_b';

// export type UserData = Maybe<Tables<'users'> & { email: string }>; // TODO: Uncomment this when the database is ready
export type UserData = [];

// for mocked data only after the database is ready remove and replace with the database type
export interface UserProfile {
	id: string;
	name: string;
	userCode: string;
	gender: Gender;
	avatarIndex: number;
}
