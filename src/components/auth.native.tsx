import GoogleIcon from '@/assets/icons/google-icon';
import { supabase } from '@/lib/supabase';
import { useTheme } from '@/theme/use-theme';
import {
	GoogleSignin,
	isCancelledResponse,
	isSuccessResponse,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

GoogleSignin.configure({
	webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

export function Auth() {
	const theme = useTheme();

	const handleAppleSignIn = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (!credential.identityToken) throw new Error('No identityToken.');

			const { error } = await supabase.auth.signInWithIdToken({
				provider: 'apple',
				token: credential.identityToken,
			});

			if (error) console.error(error);
		} catch (e: any) {
			if (e.code === 'ERR_REQUEST_CANCELED') return;
			console.error(e);
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const response = await GoogleSignin.signIn();

			if (isCancelledResponse(response)) return;
			if (!isSuccessResponse(response)) return;
			if (!response.data.idToken) throw new Error('No idToken.');

			const { error } = await supabase.auth.signInWithIdToken({
				provider: 'google',
				token: response.data.idToken,
			});

			if (error) console.error(error);
		} catch (e: any) {
			if (e.code === statusCodes.SIGN_IN_CANCELLED) return;
			if (e.code === statusCodes.IN_PROGRESS) return;
			console.error(e);
		}
	};

	return (
		<>
			<Pressable
				onPress={handleAppleSignIn}
				style={({ pressed }) => [styles.button, styles.appleButton, { opacity: pressed ? 0.75 : 1 }]}
			>
				<View style={styles.iconWrap}>
					<Image source='sf:apple.logo' style={styles.appleIcon} tintColor='white' />
				</View>
				<Text style={[styles.buttonLabel, styles.appleLabel]}>Continue with Apple</Text>
			</Pressable>
			<Pressable
				onPress={handleGoogleSignIn}
				style={({ pressed }) => [
					styles.button,
					styles.googleButton,
					{
						backgroundColor: theme.background0,
						borderColor: theme.cardBorder,
						opacity: pressed ? 0.75 : 1,
					},
				]}
			>
				<View style={styles.iconWrap}>
					<GoogleIcon size={18} />
				</View>
				<Text style={[styles.buttonLabel, { color: theme.typography800 }]}>Continue with Google</Text>
			</Pressable>
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		width: '100%',
		height: 56,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 16,
		borderCurve: 'continuous',
		paddingHorizontal: 20,
	},
	iconWrap: {
		width: 24,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonLabel: {
		flex: 1,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '600',
		letterSpacing: -0.2,
		marginRight: 24,
	},
	appleButton: {
		backgroundColor: '#000000',
	},
	appleLabel: {
		color: '#FFFFFF',
	},
	appleIcon: {
		width: 18,
		height: 18,
	},
	googleButton: {
		borderWidth: 1,
		boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
	},
});
