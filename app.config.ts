import { ConfigContext, ExpoConfig } from 'expo/config';

const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
	if (IS_DEV) return 'com.adrianszablowski.atlasnap.dev';

	if (IS_PREVIEW) return 'com.adrianszablowski.atlasnap.preview';

	return 'com.adrianszablowski.atlasnap';
};

const getAppName = () => {
	if (IS_DEV) return 'Atlasnap (dev)';

	if (IS_PREVIEW) return 'Atlasnap (preview)';

	return 'Atlasnap';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: getAppName(),
	slug: 'atlasnap',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/images/ios-light.png',
	scheme: 'atlasnap',
	userInterfaceStyle: 'automatic',
	owner: 'adrianszablowski',
	ios: {
		supportsTablet: false,
		icon: {
			light: './assets/images/ios-light.png',
			dark: './assets/images/ios-dark.png',
			tinted: './assets/images/ios-tinted.png',
		},
		bundleIdentifier: getUniqueIdentifier(),
		appStoreUrl: 'https://apps.apple.com/app/apple-store/id6755207595',
		infoPlist: {
			ITSAppUsesNonExemptEncryption: false,
		},
		usesAppleSignIn: true,
	},
	android: {
		adaptiveIcon: {
			backgroundColor: '#E6F4FE',
			foregroundImage: './assets/images/android-icon-foreground.png',
			backgroundImage: './assets/images/android-icon-background.png',
			monochromeImage: './assets/images/android-icon-monochrome.png',
		},
		package: getUniqueIdentifier(),
		predictiveBackGestureEnabled: false,
		blockedPermissions: [
			'android.permission.RECORD_AUDIO',
			'android.permission.ACCESS_COARSE_LOCATION',
			'android.permission.ACCESS_FINE_LOCATION',
		],
	},
	web: {
		bundler: 'metro',
		output: 'static',
		favicon: './assets/images/favicon.ico',
	},
	plugins: [
		'expo-router',
		'expo-image',
		[
			'expo-splash-screen',
			{
				backgroundColor: '#181818',
				android: {
					image: './assets/images/splash-icon.png',
					imageWidth: 76,
				},
				image: './assets/images/splash-icon-light.png',
				dark: {
					image: './assets/images/splash-icon-dark.png',
					backgroundColor: '#181818',
				},
				imageWidth: 200,
				resizeMode: 'contain',
			},
		],
		[
			'expo-font',
			{
				fonts: ['./assets/fonts/SpaceMono-Regular.ttf'],
			},
		],
		[
			'expo-navigation-bar',
			{
				visibility: 'hidden',
			},
		],
		[
			'@react-native-google-signin/google-signin',
			{
				iosUrlScheme: 'com.googleusercontent.apps.50224193861-ogn763ngotngb1tkvieskc5md33d0uli',
			},
		],
		[
			'expo-build-properties',
			{
				android: {
					enableProguardInReleaseBuilds: true,
					extraProguardRules: '-keep class com.facebook.** { *; }',
				},
			},
		],
	],
	updates: {
		url: 'https://u.expo.dev/id',
	},
	runtimeVersion: {
		policy: 'appVersion',
	},
	experiments: {
		typedRoutes: true,
		reactCompiler: true,
	},
	extra: {
		router: {},
		eas: {
			projectId: '',
		},
	},
});
