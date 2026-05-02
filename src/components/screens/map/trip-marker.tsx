import { getAvatarSource } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import type { MockTrip, TripParticipant } from '@/types/trip';
import { Image } from 'expo-image';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { Text, View } from 'react-native';

interface TripMarkerProps {
	trip: MockTrip;
	scale: number;
}

const BASE_CARD_W = 68;
const BASE_CARD_H = 54;
const BASE_STACK_W = 92;
const BASE_STACK_H = 70;
const BASE_AVATAR_SIZE = 40;
const BASE_PADDING = 6;
const BASE_GAP = 5;
const BASE_BORDER_RADIUS = 16;
const BASE_TAIL_H = 9;
const BASE_TAIL_SIDE = 6;
const MAX_AVATARS = 4;

const PHOTO_CONFIGS: readonly { bTx: number; bTy: number; rotation: string }[] = [
	{ bTx: -10, bTy: 3, rotation: '-9deg' },
	{ bTx: 9, bTy: 1, rotation: '8deg' },
	{ bTx: -1, bTy: -3, rotation: '-1.5deg' },
];

export function TripMarker({ trip, scale }: Readonly<TripMarkerProps>) {
	const theme = useTheme();

	const cardW = BASE_CARD_W * scale;
	const cardH = BASE_CARD_H * scale;
	const stackW = BASE_STACK_W * scale;
	const stackH = BASE_STACK_H * scale;
	const avatarSize = BASE_AVATAR_SIZE * scale;
	const padding = BASE_PADDING * scale;
	const gap = BASE_GAP * scale;
	const borderRadius = BASE_BORDER_RADIUS * scale;
	const tailH = BASE_TAIL_H * scale;
	const tailSide = BASE_TAIL_SIDE * scale;
	const cardLeft = (stackW - cardW) / 2;
	const cardTop = (stackH - cardH) / 2;
	const photoLen = Math.max(trip.photos.length, 1);

	const confirmed = filter(trip.participants, (p: TripParticipant) => p.status === 'confirmed');
	const avatarsToShow = confirmed.slice(0, MAX_AVATARS);
	const extraCount = confirmed.length - MAX_AVATARS;

	return (
		<View style={{ alignItems: 'center', paddingBottom: tailH }}>
			<View
				style={{
					backgroundColor: theme.background0,
					borderRadius,
					padding,
					gap,
					alignItems: 'center',
					boxShadow: '0 6px 24px rgba(0,0,0,0.20)',
				}}
			>
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
								borderRadius: 8 * scale,
								borderWidth: 2.5 * scale,
								borderColor: theme.background0,
								overflow: 'hidden',
								backgroundColor: theme.background200,
								zIndex: i,
								transform: [
									{ translateX: config.bTx * scale },
									{ translateY: config.bTy * scale },
									{ rotate: config.rotation },
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
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
						{map(avatarsToShow, (p: TripParticipant, i: number) => (
							<View
								key={p.id}
								style={{
									width: avatarSize,
									height: avatarSize,
									borderRadius: avatarSize / 2,
									borderWidth: 2 * scale,
									borderColor: theme.background0,
									overflow: 'hidden',
									backgroundColor: theme.background200,
									marginLeft: i === 0 ? 0 : -6 * scale,
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
									borderColor: theme.background0,
									backgroundColor: theme.primary500,
									marginLeft: -6 * scale,
									alignItems: 'center',
									justifyContent: 'center',
									zIndex: 0,
								}}
							>
								<Text style={{ color: theme.background0, fontSize: 7 * scale, fontWeight: '700' }}>+{extraCount}</Text>
							</View>
						)}
					</View>
				)}
			</View>
			<View
				style={{
					width: 0,
					height: 0,
					borderLeftWidth: tailSide,
					borderRightWidth: tailSide,
					borderTopWidth: tailH,
					borderLeftColor: 'transparent',
					borderRightColor: 'transparent',
					borderTopColor: theme.background0,
				}}
			/>
		</View>
	);
}
