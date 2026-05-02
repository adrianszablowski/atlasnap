import { TripImage } from '@/components/screens/trips/trip-image';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import type { MockTrip } from '@/types/trip';
import { formatDateRange, formatDurationDaysLabel } from '@/utils/date-range';
import { Button, ContextMenu, Host } from '@expo/ui/swift-ui';
import { useRouter } from 'expo-router';
import filter from 'lodash/filter';
import head from 'lodash/head';
import map from 'lodash/map';
import slice from 'lodash/slice';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { FriendAvatar } from './friend-avatar';

interface TripCardProps {
	trip: MockTrip;
}

export function TripCard({ trip }: Readonly<TripCardProps>) {
	const theme = useTheme();
	const router = useRouter();

	const isPlanned = trip.status === 'planned';
	const durationLabel = formatDurationDaysLabel(trip.startDate, trip.endDate);
	const displayParticipants = filter(trip.participants, { status: 'confirmed' });
	const participantCount = displayParticipants.length;
	const timelineCount = trip.timelineItems?.length ?? 0;

	const participantsLabel =
		participantCount === 0
			? 'Solo adventure'
			: participantCount === 1
				? 'With 1 friend'
				: `With ${participantCount} friends`;

	const coverUrl = trip.coverPhoto?.url ?? head(trip.photos)?.url;

	const handleDeleteTrip = () => {
		Alert.alert('Delete Trip', 'Are you sure you want to delete this trip?', [
			{ text: 'Cancel', style: 'cancel' },
			{ text: 'Delete', style: 'destructive', onPress: () => {} },
		]);
	};

	return (
		<Host matchContents>
			<ContextMenu>
				<ContextMenu.Trigger>
					<Pressable
						onPress={() => router.push(`/trips/${trip.id}/details`)}
						style={({ pressed }) => [
							styles.card,
							{
								backgroundColor: theme.cardBackground,
								borderColor: isPlanned ? theme.primary200 : theme.cardBorder,
								shadowColor: theme.typography900,
								opacity: pressed ? 0.97 : 1,
							},
						]}
					>
						<View style={styles.cover}>
							<TripImage photoUrl={coverUrl} style={StyleSheet.absoluteFill} />
							{isPlanned && !coverUrl && (
								<View
									style={[
										StyleSheet.absoluteFill,
										styles.plannedCoverOverlay,
										{ backgroundColor: hexToRgba(theme.primary500, 0.08) },
									]}
								/>
							)}
							<View style={[styles.durationBadge, { backgroundColor: hexToRgba(theme.background0, 0.93) }]}>
								<Text style={[styles.durationText, { color: theme.typography800 }]}>{durationLabel}</Text>
							</View>
							{isPlanned ? (
								<View style={[styles.photoBadge, { backgroundColor: hexToRgba(theme.primary500, 0.88) }]}>
									<Text style={[styles.photoBadgeText, { color: theme.background0 }]}>
										{timelineCount > 0 ? `📋 ${timelineCount}` : '🗓️ Planning'}
									</Text>
								</View>
							) : (
								<View style={[styles.photoBadge, { backgroundColor: hexToRgba(theme.typography950, 0.34) }]}>
									<Text style={[styles.photoBadgeText, { color: theme.background0 }]}>📷 {trip.photoCount}</Text>
								</View>
							)}
							<View style={[styles.locationPill, { backgroundColor: hexToRgba(theme.background0, 0.95) }]}>
								<Text style={[styles.locationPillText, { color: theme.typography900 }]}>
									{trip.flag} {trip.city}, {trip.country}
								</Text>
							</View>
						</View>
						<View style={styles.body}>
							<View style={styles.titleRow}>
								<Text style={[styles.title, { color: theme.typography900 }]} numberOfLines={1}>
									{trip.title}
								</Text>
								<View
									style={[
										styles.statusBadge,
										{
											backgroundColor: isPlanned ? theme.primary50 : theme.success50,
											borderColor: isPlanned ? theme.primary200 : theme.success200,
										},
									]}
								>
									<Text style={[styles.statusText, { color: isPlanned ? theme.primary700 : theme.success700 }]}>
										{isPlanned ? '✈️ Planning' : '📍 Saved'}
									</Text>
								</View>
							</View>
							<Text style={[styles.date, { color: theme.typography400 }]}>
								{formatDateRange(trip.startDate, trip.endDate)}
							</Text>
							<View style={[styles.separator, { backgroundColor: theme.background200 }]} />
							<View style={styles.participantsRow}>
								{participantCount > 0 && (
									<View style={styles.avatarStack}>
										{map(slice(displayParticipants, 0, 3), (participant, index) => (
											<FriendAvatar
												key={participant.id}
												friend={participant}
												size={28}
												stackOffset={index === 0 ? 0 : -10}
											/>
										))}
										{participantCount > 3 && (
											<View
												style={[
													styles.overflowBadge,
													{ backgroundColor: theme.outline100, borderColor: theme.cardBackground, marginLeft: -10 },
												]}
											>
												<Text style={[styles.overflowText, { color: theme.outline700 }]}>+{participantCount - 3}</Text>
											</View>
										)}
									</View>
								)}
								<Text
									style={[
										styles.participantsLabel,
										{ color: participantCount > 0 ? theme.typography600 : theme.outline400 },
									]}
								>
									{participantsLabel}
								</Text>
							</View>
						</View>
					</Pressable>
				</ContextMenu.Trigger>
				<ContextMenu.Items>
					<Button label='Edit Trip' systemImage='pencil' onPress={() => router.push(`/trips/${trip.id}/edit`)} />
					<Button role='destructive' label='Delete Trip' systemImage='trash' onPress={handleDeleteTrip} />
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
		overflow: 'hidden',
	},
	plannedCoverOverlay: {
		zIndex: 1,
	},
	durationBadge: {
		position: 'absolute',
		top: 14,
		left: 14,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
		zIndex: 2,
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
		zIndex: 2,
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
		zIndex: 2,
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
	titleRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
	},
	title: {
		flex: 1,
		fontSize: 22,
		fontWeight: '800',
		letterSpacing: -0.5,
		lineHeight: 28,
	},
	statusBadge: {
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 8,
		borderWidth: 1,
		flexShrink: 0,
	},
	statusText: {
		fontSize: 11,
		fontWeight: '700',
		letterSpacing: 0.1,
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
	participantsRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	avatarStack: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	participantsLabel: {
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
