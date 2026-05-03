import { Auth } from '@/components/auth.native';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SIGN_IN_HERO_IMAGE = require('@/assets/images/fuji.jpg');

interface DestCardProps {
	flag: string;
	city: string;
	country: string;
	delay: number;
}

function DestCard({ flag, city, country, delay }: Readonly<DestCardProps>) {
	return (
		<Animated.View entering={FadeIn.delay(delay).springify().damping(14)} style={styles.destCard}>
			<Text style={styles.destFlag}>{flag}</Text>
			<View>
				<Text style={styles.destCity}>{city}</Text>
				<Text style={styles.destCountry}>{country}</Text>
			</View>
		</Animated.View>
	);
}

export default function SignInScreen() {
	const theme = useTheme();
	const insets = useSafeAreaInsets();

	const heroFadeGradient = `linear-gradient(to bottom, ${hexToRgba(theme.background100, 0)} 0%, ${hexToRgba(theme.background100, 0.3)} 40%, ${hexToRgba(theme.background100, 0.7)} 70%, ${theme.background100} 100%)`;

	return (
		<View style={[styles.root, { backgroundColor: theme.background100 }]}>
			<Animated.View entering={FadeIn.duration(700)} style={[styles.hero, { paddingTop: insets.top + 20 }]}>
				<View style={styles.heroImageWrap} pointerEvents='none'>
					<Image source={SIGN_IN_HERO_IMAGE} style={styles.heroImage} contentFit='cover' contentPosition='center' />
					<View style={[styles.heroImageScrim, { backgroundColor: hexToRgba(theme.typography950, 0.5) }]} />
				</View>
				<View style={styles.branding}>
					<View style={styles.brandIcon}>
						<Image source='sf:map.fill' style={styles.brandIconImg} tintColor='white' />
					</View>
					<Text style={styles.brandName}>Atlasnap</Text>
				</View>
				<View style={styles.heroContent}>
					<Animated.Text entering={FadeInUp.delay(150).duration(600)} style={styles.headline}>
						{'Your world,\nbeautifully\nmapped.'}
					</Animated.Text>
					<View style={styles.destRow}>
						<DestCard flag='🗼' city='Paris' country='France' delay={300} />
						<DestCard flag='🌊' city='Bali' country='Indonesia' delay={450} />
						<Animated.View entering={FadeIn.delay(600).springify().damping(14)} style={styles.moreCard}>
							<Text style={styles.moreText}>+195{'\n'}countries</Text>
						</Animated.View>
					</View>
					<Animated.View entering={FadeIn.delay(750)} style={styles.planeLine}>
						<Image source='sf:airplane.departure' style={styles.planeIcon} tintColor='rgba(255,255,255,0.5)' />
						<View style={styles.planeTrail} />
						<Image source='sf:mappin.circle.fill' style={styles.pinIcon} tintColor='rgba(255,255,255,0.5)' />
					</Animated.View>
				</View>
				<View
					style={[
						styles.heroFade,
						{
							experimental_backgroundImage: heroFadeGradient,
						} as object,
					]}
				/>
			</Animated.View>
			<View style={[styles.panel, { paddingBottom: Math.max(insets.bottom, 20) + 16 }]}>
				<Animated.View entering={FadeInUp.delay(200).duration(500)} style={styles.cta}>
					<Text style={[styles.ctaTitle, { color: theme.typography900 }]}>Start your journey</Text>
					<Text style={[styles.ctaBody, { color: theme.typography500 }]}>Sign in to save trips and explore</Text>
				</Animated.View>
				<Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.buttons}>
					<Auth />
				</Animated.View>
				<Animated.View entering={FadeInUp.delay(420).duration(500)} style={styles.legalRow}>
					<Text style={[styles.legalText, { color: theme.typography400 }]}>By continuing you agree to our </Text>
					<Pressable hitSlop={6}>
						<Text style={[styles.legalLink, { color: theme.typography600 }]}>Terms</Text>
					</Pressable>
					<Text style={[styles.legalText, { color: theme.typography400 }]}> and </Text>
					<Pressable hitSlop={6}>
						<Text style={[styles.legalLink, { color: theme.typography600 }]}>Privacy Policy</Text>
					</Pressable>
					<Text style={[styles.legalText, { color: theme.typography400 }]}>.</Text>
				</Animated.View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		flexDirection: 'column',
	},
	hero: {
		flex: 1,
		paddingHorizontal: 24,
		paddingBottom: 48,
		justifyContent: 'space-between',
		overflow: 'hidden',
	},
	heroImageWrap: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		overflow: 'hidden',
	},
	heroImage: {
		width: '100%',
		height: '100%',
	},
	heroImageScrim: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	},
	branding: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	brandIcon: {
		width: 32,
		height: 32,
		borderRadius: 10,
		borderCurve: 'continuous',
		backgroundColor: 'rgba(255,255,255,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
	},
	brandIconImg: {
		width: 16,
		height: 16,
	},
	brandName: {
		color: 'white',
		fontSize: 17,
		fontWeight: '700',
		letterSpacing: -0.3,
	},
	heroContent: {
		gap: 20,
	},
	headline: {
		color: 'white',
		fontSize: 44,
		fontWeight: '800',
		letterSpacing: -2,
		lineHeight: 48,
	},
	destRow: {
		flexDirection: 'row',
		gap: 8,
		flexWrap: 'wrap',
	},
	destCard: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: 'rgba(255,255,255,0.14)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.28)',
		borderRadius: 14,
		borderCurve: 'continuous',
		paddingHorizontal: 11,
		paddingVertical: 8,
	},
	destFlag: {
		fontSize: 18,
	},
	destCity: {
		color: 'white',
		fontSize: 13,
		fontWeight: '700',
		letterSpacing: -0.2,
	},
	destCountry: {
		color: 'rgba(255,255,255,0.65)',
		fontSize: 11,
		fontWeight: '500',
		marginTop: 1,
	},
	moreCard: {
		backgroundColor: 'rgba(255,255,255,0.1)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.2)',
		borderRadius: 14,
		borderCurve: 'continuous',
		paddingHorizontal: 11,
		paddingVertical: 8,
		justifyContent: 'center',
	},
	moreText: {
		color: 'rgba(255,255,255,0.75)',
		fontSize: 11,
		fontWeight: '700',
		letterSpacing: -0.1,
		textAlign: 'center',
	},
	planeLine: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	planeIcon: {
		width: 18,
		height: 18,
	},
	planeTrail: {
		flex: 1,
		height: 1,
		borderTopWidth: 1,
		borderColor: 'rgba(255,255,255,0.3)',
		borderStyle: 'dashed',
	},
	pinIcon: {
		width: 14,
		height: 14,
	},
	heroFade: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 80,
	},
	panel: {
		paddingHorizontal: 20,
		paddingTop: 8,
		gap: 20,
	},
	cta: {
		gap: 4,
	},
	ctaTitle: {
		fontSize: 26,
		fontWeight: '800',
		letterSpacing: -0.8,
	},
	ctaBody: {
		fontSize: 15,
		fontWeight: '500',
		letterSpacing: -0.1,
	},
	buttons: {
		gap: 10,
	},
	legalRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	legalText: {
		fontSize: 12,
		fontWeight: '500',
		lineHeight: 18,
	},
	legalLink: {
		fontSize: 12,
		fontWeight: '600',
		lineHeight: 18,
		textDecorationLine: 'underline',
	},
});
