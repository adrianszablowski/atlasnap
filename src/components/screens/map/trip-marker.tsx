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

function AvatarRow({
	participants,
	scale,
	extraBg,
}: Readonly<{ participants: TripParticipant[]; scale: number; extraBg: string }>) {
	const avatarSize = BASE_AVATAR_SIZE * scale;
	const toShow = participants.slice(0, MAX_AVATARS);
	const extraCount = participants.length - MAX_AVATARS;

	if (!toShow.length) return null;

	return (
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
			{map(toShow, (p, i) => (
				<View
					key={p.id}
					style={{
						width: avatarSize,
						height: avatarSize,
						borderRadius: avatarSize / 2,
						borderWidth: 2 * scale,
						borderColor: 'white',
						overflow: 'hidden',
						backgroundColor: '#e8e8e8',
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
						backgroundColor: extraBg,
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
	);
}

function SavedTripMarker({ trip, scale }: Readonly<TripMarkerProps>) {
	const theme = useTheme();

	const cardW = BASE_CARD_W * scale;
	const cardH = BASE_CARD_H * scale;
	const stackW = BASE_STACK_W * scale;
	const stackH = BASE_STACK_H * scale;
	const cardLeft = (stackW - cardW) / 2;
	const cardTop = (stackH - cardH) / 2;
	const photoLen = Math.max(trip.photos.length, 1);

	const confirmed = filter(trip.participants, (p: TripParticipant) => p.status === 'confirmed');

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
			{confirmed.length > 0 && <AvatarRow participants={confirmed} scale={scale} extraBg={theme.primary500} />}
		</Animated.View>
	);
}

function PlannedTripMarker({ trip, scale }: Readonly<TripMarkerProps>) {
	const theme = useTheme();
	const confirmed = filter(trip.participants, (p: TripParticipant) => p.status === 'confirmed');

	return (
		<Animated.View entering={FadeIn.duration(300)} style={{ alignItems: 'center' }}>
			<View
				style={{
					backgroundColor: theme.primary500,
					borderRadius: 14 * scale,
					borderCurve: 'continuous',
					paddingHorizontal: 12 * scale,
					paddingTop: 9 * scale,
					paddingBottom: 8 * scale,
					alignItems: 'center',
					gap: 3 * scale,
					minWidth: 68 * scale,
					boxShadow: `0 4px 18px rgba(14,90,230,0.38), 0 1px 4px rgba(0,0,0,0.12)`,
				}}
			>
				<Text style={{ fontSize: 20 * scale, lineHeight: 24 * scale }}>{trip.flag}</Text>
				<Text
					style={{
						color: 'white',
						fontSize: 11 * scale,
						fontWeight: '800',
						letterSpacing: -0.2,
						lineHeight: 14 * scale,
					}}
					numberOfLines={1}
				>
					{trip.city}
				</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: 2 * scale,
						backgroundColor: 'rgba(255,255,255,0.22)',
						paddingHorizontal: 5 * scale,
						paddingVertical: 2 * scale,
						borderRadius: 6 * scale,
					}}
				>
					<Text style={{ fontSize: 7 * scale }}>✈️</Text>
					<Text
						style={{
							color: 'rgba(255,255,255,0.95)',
							fontSize: 8 * scale,
							fontWeight: '700',
							lineHeight: 10 * scale,
							letterSpacing: 0.2,
						}}
					>
						Planning
					</Text>
				</View>
				{confirmed.length > 0 && (
					<View style={{ marginTop: 2 * scale }}>
						<AvatarRow participants={confirmed} scale={scale * 0.72} extraBg='rgba(255,255,255,0.3)' />
					</View>
				)}
			</View>
			<View
				style={{
					width: 0,
					height: 0,
					borderLeftWidth: 7 * scale,
					borderRightWidth: 7 * scale,
					borderTopWidth: 9 * scale,
					borderLeftColor: 'transparent',
					borderRightColor: 'transparent',
					borderTopColor: theme.primary500,
					marginTop: -0.5,
				}}
			/>
		</Animated.View>
	);
}

export function TripMarker({ trip, scale }: Readonly<TripMarkerProps>) {
	if (trip.status === 'planned') {
		return <PlannedTripMarker trip={trip} scale={scale} />;
	}

	return <SavedTripMarker trip={trip} scale={scale} />;
}
