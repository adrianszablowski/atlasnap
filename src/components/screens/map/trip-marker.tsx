import { getAvatarSource } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import type { MockTrip, TripParticipant } from '@/types/trip';
import { Image } from 'expo-image';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface TripMarkerProps {
	trip: MockTrip;
	scale: number;
}

const BASE_CARD_W = 72;
const BASE_CARD_H = 58;
const BASE_STACK_W = 122;
const BASE_STACK_H = 92;
const BASE_AVATAR_SIZE = 46;
const MAX_AVATARS = 4;

interface PhotoConfig {
	bTx: number;
	bTy: number;
	rotation: string;
	cardScale: number;
	shadowY: number;
	shadowBlur: number;
	shadowAlpha: number;
}

const PHOTO_CONFIGS: readonly PhotoConfig[] = [
	{ bTx: -18, bTy: 6, rotation: '-14deg', cardScale: 0.86, shadowY: 3, shadowBlur: 8, shadowAlpha: 0.1 },
	{ bTx: 14, bTy: 3, rotation: '10deg', cardScale: 0.93, shadowY: 5, shadowBlur: 12, shadowAlpha: 0.16 },
	{ bTx: -2, bTy: -4, rotation: '-2deg', cardScale: 1.0, shadowY: 8, shadowBlur: 22, shadowAlpha: 0.25 },
];

export function TripMarker({ trip, scale }: Readonly<TripMarkerProps>) {
	const theme = useTheme();

	const cardW = BASE_CARD_W * scale;
	const cardH = BASE_CARD_H * scale;
	const stackW = BASE_STACK_W * scale;
	const stackH = BASE_STACK_H * scale;
	const avatarSize = BASE_AVATAR_SIZE * scale;
	const cardLeft = (stackW - cardW) / 2;
	const cardTop = (stackH - cardH) / 2;
	const photoLen = Math.max(trip.photos.length, 1);

	const confirmed = filter(trip.participants, (p: TripParticipant) => p.status === 'confirmed');
	const avatarsToShow = confirmed.slice(0, MAX_AVATARS);
	const extraCount = confirmed.length - MAX_AVATARS;

	return (
		<Animated.View entering={FadeIn.duration(250)} style={{ alignItems: 'center', gap: 8 * scale }}>
			<View style={{ width: stackW, height: stackH }}>
				{map(PHOTO_CONFIGS, (config, i) => (
					<View
						key={i}
						style={{
							position: 'absolute',
							left: cardLeft,
							top: cardTop,
							width: cardW,
							height: cardH,
							borderRadius: 12 * scale,
							borderWidth: 2.5 * scale,
							borderColor: 'rgba(255,255,255,0.95)',
							overflow: 'hidden',
							backgroundColor: theme.background200,
							zIndex: i,
							boxShadow: `0 ${config.shadowY * scale}px ${config.shadowBlur * scale}px rgba(0,0,0,${config.shadowAlpha})`,
							transform: [
								{ translateX: config.bTx * scale },
								{ translateY: config.bTy * scale },
								{ rotate: config.rotation },
								{ scale: config.cardScale },
							],
						}}
					>
						<Image
							source={{ uri: trip.photos[i % photoLen]?.url }}
							style={{ width: cardW, height: cardH }}
							contentFit='cover'
						/>
					</View>
				))}
			</View>
			{avatarsToShow.length > 0 && (
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(255,255,255,0.88)',
						borderRadius: 100,
						paddingHorizontal: 5 * scale,
						paddingVertical: 3 * scale,
						boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
					}}
				>
					{map(avatarsToShow, (p: TripParticipant, i: number) => (
						<View
							key={p.id}
							style={{
								width: avatarSize,
								height: avatarSize,
								borderRadius: avatarSize / 2,
								borderWidth: 2 * scale,
								borderColor: 'white',
								overflow: 'hidden',
								backgroundColor: theme.background200,
								marginLeft: i === 0 ? 0 : -8 * scale,
								zIndex: MAX_AVATARS - i,
							}}
						>
							<Image
								source={getAvatarSource(p.gender, p.avatarIndex)}
								style={{ width: avatarSize, height: avatarSize }}
								contentFit='cover'
							/>
						</View>
					))}
					{extraCount > 0 && (
						<View
							style={{
								width: avatarSize,
								height: avatarSize,
								borderRadius: avatarSize / 2,
								borderWidth: 2 * scale,
								borderColor: 'white',
								backgroundColor: theme.primary500,
								marginLeft: -8 * scale,
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 0,
							}}
						>
							<Text style={{ color: 'white', fontSize: 9 * scale, fontWeight: '700' }}>+{extraCount}</Text>
						</View>
					)}
				</View>
			)}
		</Animated.View>
	);
}
