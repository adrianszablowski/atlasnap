import { formatTripDateRange, type MockTrip } from '@/constants/mock-trips';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import { Button, ContextMenu, Host } from '@expo/ui/swift-ui';
import { differenceInDays, parseISO } from 'date-fns';
import { useRouter } from 'expo-router';
import map from 'lodash/map';
import slice from 'lodash/slice';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { FriendAvatar } from './friend-avatar';

interface TripCardProps {
	trip: MockTrip;
}

function getDurationLabel(startDate: string, endDate?: string): string {
	if (!endDate) return '1 day';
	const days = differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
	return `${days} ${days === 1 ? 'day' : 'days'}`;
}

export function TripCard({ trip }: Readonly<TripCardProps>) {
	const theme = useTheme();
	const router = useRouter();
	const durationLabel = getDurationLabel(trip.startDate, trip.endDate);
	const friendCount = trip.friends.length;

	const friendsLabel =
		friendCount === 0 ? 'Solo adventure' : friendCount === 1 ? 'With 1 friend' : `With ${friendCount} friends`;

	function handlePress() {
		router.push(`/trips/${trip.id}/details`);
	}

	function handleEdit() {
		router.push(`/trips/${trip.id}/edit`);
	}

	const cardContent = (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => [
				styles.card,
				{
					backgroundColor: theme.cardBackground,
					borderColor: theme.cardBorder,
					shadowColor: theme.typography900,
					opacity: pressed ? 0.97 : 1,
				},
			]}
		>
			<View style={[styles.cover, { backgroundColor: trip.coverColor }]}>
				<View style={[styles.emojiGlow, { backgroundColor: hexToRgba(theme.background0, 0.1) }]} />
				<Text style={styles.coverEmoji}>{trip.coverEmoji}</Text>

				<View style={[styles.durationBadge, { backgroundColor: hexToRgba(theme.background0, 0.93) }]}>
					<Text style={[styles.durationText, { color: theme.typography800 }]}>{durationLabel}</Text>
				</View>

				<View style={[styles.photoBadge, { backgroundColor: hexToRgba(theme.typography950, 0.34) }]}>
					<Text style={[styles.photoBadgeText, { color: theme.background0 }]}>📷 {trip.photoCount}</Text>
				</View>

				<View style={[styles.locationPill, { backgroundColor: hexToRgba(theme.background0, 0.95) }]}>
					<Text style={[styles.locationPillText, { color: theme.typography900 }]}>
						{trip.flag} {trip.city}, {trip.country}
					</Text>
				</View>
			</View>

			<View style={styles.body}>
				<Text style={[styles.title, { color: theme.typography900 }]} numberOfLines={1}>
					{trip.title}
				</Text>
				<Text style={[styles.date, { color: theme.typography400 }]}>
					{formatTripDateRange(trip.startDate, trip.endDate)}
				</Text>
				<View style={[styles.separator, { backgroundColor: theme.background200 }]} />
				<View style={styles.friendsRow}>
					{friendCount > 0 && (
						<View style={styles.avatarStack}>
							{map(slice(trip.friends, 0, 3), (friend, index) => (
								<FriendAvatar key={friend.id} friend={friend} size={28} stackOffset={index === 0 ? 0 : -10} />
							))}
							{friendCount > 3 && (
								<View
									style={[
										styles.overflowBadge,
										{ backgroundColor: theme.outline100, borderColor: theme.cardBackground, marginLeft: -10 },
									]}
								>
									<Text style={[styles.overflowText, { color: theme.outline700 }]}>+{friendCount - 3}</Text>
								</View>
							)}
						</View>
					)}
					<Text style={[styles.friendsLabel, { color: friendCount > 0 ? theme.typography600 : theme.outline400 }]}>
						{friendsLabel}
					</Text>
				</View>
			</View>
		</Pressable>
	);

	if (Platform.OS !== 'ios') return cardContent;

	return (
		<Host matchContents>
			<ContextMenu>
				<ContextMenu.Trigger>{cardContent}</ContextMenu.Trigger>
				<ContextMenu.Items>
					<Button label='Edit Trip' systemImage='pencil' onPress={handleEdit} />
					<Button role='destructive' label='Delete Trip' systemImage='trash' onPress={() => {}} />
				</ContextMenu.Items>
			</ContextMenu>
		</Host>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 24,
		overflow: 'hidden',
		borderWidth: 1,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.12,
		shadowRadius: 28,
		elevation: 6,
	},
	cover: {
		height: 200,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emojiGlow: {
		position: 'absolute',
		width: 128,
		height: 128,
		borderRadius: 64,
	},
	coverEmoji: {
		fontSize: 88,
	},
	durationBadge: {
		position: 'absolute',
		top: 14,
		left: 14,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	},
	durationText: {
		fontSize: 12,
		fontWeight: '700',
	},
	photoBadge: {
		position: 'absolute',
		top: 14,
		right: 14,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	},
	photoBadgeText: {
		fontSize: 12,
		fontWeight: '600',
	},
	locationPill: {
		position: 'absolute',
		bottom: 14,
		left: 14,
		paddingHorizontal: 12,
		paddingVertical: 7,
		borderRadius: 20,
	},
	locationPillText: {
		fontSize: 13,
		fontWeight: '700',
	},
	body: {
		paddingHorizontal: 18,
		paddingTop: 16,
		paddingBottom: 20,
		gap: 4,
	},
	title: {
		fontSize: 22,
		fontWeight: '800',
		letterSpacing: -0.5,
		lineHeight: 28,
	},
	date: {
		fontSize: 13,
		fontWeight: '500',
	},
	separator: {
		height: 1,
		borderRadius: 1,
		marginVertical: 10,
	},
	friendsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	avatarStack: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	friendsLabel: {
		fontSize: 13,
		fontWeight: '500',
	},
	overflowBadge: {
		width: 28,
		height: 28,
		borderRadius: 14,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2.5,
	},
	overflowText: {
		fontSize: 9,
		fontWeight: '700',
	},
});
