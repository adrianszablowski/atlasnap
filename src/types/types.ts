export type Maybe<T> = T | null | undefined;

export interface Response<T> {
	success: boolean;
	message: string;
	data?: T;
	errorReason?: AuthErrorReason;
}

export type AuthErrorReason = 'email_taken' | 'weak_password';

// export type UserData = Maybe<Tables<'users'> & { email: string }>; // TODO: Uncomment this when the database is ready
export type UserData = [];
