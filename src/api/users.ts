import { supabase } from '@/lib/supabase';
import { Response, UserData } from '@/types/types';

export async function getCurrentUser(): Promise<Response<UserData>> {
	try {
		const { data, error: authError } = await supabase.auth.getUser();

		if (authError || !data.user) {
			return {
				success: false,
				message: 'Please sign in to continue',
			};
		}

		if (!data.user) {
			return {
				success: false,
				message: 'Account not found. Try signing in again',
			};
		}

		const { data: userData, error: dbError } = await supabase.from('users').select('*').eq('id', data.user.id).single();

		if (dbError) {
			if (dbError.code === 'PGRST116') {
				return {
					success: false,
					message: "Let's finish setting up your profile",
				};
			}

			return {
				success: false,
				message: 'Something went wrong loading your profile',
			};
		}

		return {
			success: true,
			message: 'Profile loaded successfully',
			data: userData,
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: 'Something went wrong. Please try again',
		};
	}
}

export async function deleteUserPermanently(userId: string): Promise<Response<void>> {
	try {
		const { data: result, error: rpcError } = await supabase.rpc('delete_user_permanently', {
			target_user_id: userId,
		});

		if (rpcError) {
			return {
				success: false,
				message: 'Account deletion failed. Please try again',
			};
		}

		const deletionResult = result as {
			success: boolean;
			code: string;
		};

		if (!deletionResult.success) {
			const codeMessages: Record<string, string> = {
				UNAUTHORIZED: 'You can only delete your own account',
				USER_NOT_FOUND: 'Account not found. Try signing in again',
				SUBSCRIPTION_ACTIVE: 'Cannot delete account with an active subscription. Please cancel your subscription first',
				DELETION_FAILED: 'Account deletion failed. Please try again',
			};

			return {
				success: false,
				message: codeMessages[deletionResult.code] || 'Account deletion failed. Please try again',
			};
		}

		return {
			success: true,
			message: 'Account deleted',
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: 'Something went wrong. Please try again',
		};
	}
}
