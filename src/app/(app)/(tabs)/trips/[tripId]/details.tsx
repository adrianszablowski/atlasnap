import { FriendAvatar } from '@/components/screens/trips/friend-avatar';
import { TripImage } from '@/components/screens/trips/trip-image';
import { TripsStatCard } from '@/components/screens/trips/trips-stat-card';
import { PaginationDots } from '@/components/ui/pagination-dots';
import { MOCK_TRIPS } from '@/constants/mock-trips';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import type { TripPhoto } from '@/types/trip';
import { formatDateRange, formatDurationDaysLabel, formatTimeAgo, getDurationDays } from '@/utils/date-range';
import { useLocalSearchParams, useRouter } from 'expo-router';
import filter from 'lodash/filter';
import find from 'lodash/find';
import map from 'lodash/map';
import { useState } from 'react';
import {
	FlatList,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
} from 'react-native';

const HERO_HEIGHT = 320;

export default function TripDetailsScreen() {
	const theme = useTheme();
	const router = useRouter();
	const { width: screenWidth } = useWindowDimensions();
	const { tripId } = useLocalSearchParams<{ tripId: string }>();
	const [activeSlide, setActiveSlide] = useState(0);

	const trip = find(MOCK_TRIPS, { id: tripId });

	if (!trip) return null;

	const slides: (TripPhoto | null)[] = trip.photos.length > 0 ? trip.photos : [null];
	const durationDays = getDurationDays(trip.startDate, trip.endDate);
	const displayParticipants = filter(trip.participants, { status: 'confirmed' });
	const participantCount = displayParticipants.length;

	function handleSlideChange(event: NativeSyntheticEvent<NativeScrollEvent>) {
		const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);

		setActiveSlide(index);
	}

	const handleEditTrip = () => {
		router.dismissAll();
		router.push(`/trips/${trip.id}/edit`);
	};

	const handleAddMoreMemories = () => {
		router.dismissAll();
		router.push('/trips/create');
	};

	return (
		<View style={[styles.root, { backgroundColor: theme.background100 }]}>
			<ScrollView showsVerticalScrollIndicator={false} bounces>
				<View style={[styles.heroContainer, { height: HERO_HEIGHT }]}>
					<FlatList<TripPhoto | null>
						data={slides}
						horizontal
						pagingEnabled
						keyExtractor={(item, index) => item?.id ?? `placeholder-${index}`}
						getItemLayout={(_, index) => ({ length: screenWidth, offset: screenWidth * index, index })}
						showsHorizontalScrollIndicator={false}
						onMomentumScrollEnd={handleSlideChange}
						renderItem={({ item }) => (
							<TripImage photoUrl={item?.url} style={{ width: screenWidth, height: HERO_HEIGHT }} />
						)}
					/>
					<PaginationDots count={slides.length} activeIndex={activeSlide} />
				</View>
				<View style={[styles.sheet, { backgroundColor: theme.background50, paddingBottom: 40 }]}>
					<View style={styles.identity}>
						<Text style={[styles.tripTitle, { color: theme.typography900 }]}>{trip.title}</Text>
						<Text style={[styles.location, { color: theme.typography500 }]}>
							{trip.flag} {trip.city}, {trip.country}
						</Text>
						<Text style={[styles.dateRow, { color: theme.typography400 }]}>
							{formatDateRange(trip.startDate, trip.endDate)} · {formatTimeAgo(trip.startDate)}
						</Text>
					</View>
					<View style={styles.statsRow}>
						<TripsStatCard emoji='📷' value={trip.photoCount} label='Photos' />
						<TripsStatCard emoji='✈️' value={durationDays} label={durationDays === 1 ? 'Day' : 'Days'} />
						{participantCount > 0 && (
							<TripsStatCard
								emoji='🧑‍🤝‍🧑'
								value={participantCount}
								label={participantCount === 1 ? 'Friend' : 'Friends'}
							/>
						)}
					</View>
					{participantCount > 0 && (
						<View style={styles.section}>
							<Text style={[styles.sectionLabel, { color: theme.typography500 }]}>WHO WAS THERE</Text>
							<View style={styles.companionsRow}>
								{map(displayParticipants, (participant) => (
									<FriendAvatar key={participant.id} friend={participant} size={48} />
								))}
							</View>
						</View>
					)}
					{trip.note ? (
						<View style={styles.section}>
							<Text style={[styles.sectionLabel, { color: theme.typography500 }]}>NOTE</Text>
							<View style={[styles.noteCard, { backgroundColor: theme.background100, borderColor: theme.cardBorder }]}>
								<Text style={[styles.noteText, { color: theme.typography700 }]}>{trip.note}</Text>
							</View>
						</View>
					) : (
						<View
							style={[
								styles.memoryQuote,
								{
									borderLeftColor: theme.primary500,
									backgroundColor: hexToRgba(theme.primary500, 0.08),
								},
							]}
						>
							<Text style={[styles.memoryQuoteText, { color: theme.typography700 }]}>
								{formatDurationDaysLabel(trip.startDate, trip.endDate)} in {trip.city}. {trip.photoCount} moments
								you&apos;ll always cherish.
							</Text>
						</View>
					)}
					<View style={styles.actions}>
						<Pressable
							style={({ pressed }) => [
								styles.primaryBtn,
								{ backgroundColor: theme.primary500, opacity: pressed ? 0.84 : 1 },
							]}
							onPress={handleAddMoreMemories}
						>
							<Text style={[styles.primaryBtnText, { color: theme.background0 }]}>Add More Memories</Text>
						</Pressable>
						<Pressable
							style={({ pressed }) => [
								styles.secondaryBtn,
								{ borderColor: theme.outline200, opacity: pressed ? 0.7 : 1 },
							]}
							onPress={handleEditTrip}
						>
							<Text style={[styles.secondaryBtnText, { color: theme.typography600 }]}>Edit Trip</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
			<Pressable
				onPress={() => router.back()}
				hitSlop={8}
				accessibilityLabel='Close'
				accessibilityRole='button'
				style={({ pressed }) => [
					styles.closeBtn,
					{ top: 20, backgroundColor: hexToRgba(theme.background0, 0.9), opacity: pressed ? 0.7 : 1 },
				]}
			>
				<Text style={[styles.closeBtnIcon, { color: theme.typography800 }]}>✕</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	heroContainer: {
		overflow: 'hidden',
	},
	sheet: {
		borderTopLeftRadius: 36,
		borderTopRightRadius: 36,
		marginTop: -36,
		paddingTop: 36,
	},
	identity: {
		paddingHorizontal: 24,
		gap: 6,
	},
	tripTitle: {
		fontSize: 32,
		fontWeight: '800',
		letterSpacing: -0.8,
		lineHeight: 38,
	},
	location: {
		fontSize: 15,
		fontWeight: '600',
	},
	dateRow: {
		fontSize: 13,
		fontWeight: '500',
	},
	statsRow: {
		flexDirection: 'row',
		paddingHorizontal: 20,
		gap: 10,
		marginTop: 28,
	},
	section: {
		paddingHorizontal: 24,
		marginTop: 28,
		gap: 14,
	},
	sectionLabel: {
		fontSize: 12,
		fontWeight: '800',
		letterSpacing: 2,
		textTransform: 'uppercase',
	},
	companionsRow: {
		flexDirection: 'row',
		gap: 10,
		flexWrap: 'wrap',
	},
	noteCard: {
		borderRadius: 16,
		borderWidth: 1,
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	noteText: {
		fontSize: 15,
		lineHeight: 24,
		fontWeight: '400',
	},
	memoryQuote: {
		marginHorizontal: 24,
		marginTop: 28,
		borderLeftWidth: 3,
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	memoryQuoteText: {
		fontSize: 15,
		fontStyle: 'italic',
		lineHeight: 24,
		fontWeight: '500',
	},
	actions: {
		paddingHorizontal: 20,
		marginTop: 28,
		gap: 12,
	},
	primaryBtn: {
		borderRadius: 18,
		paddingVertical: 17,
		alignItems: 'center',
	},
	primaryBtnText: {
		fontSize: 17,
		fontWeight: '700',
		letterSpacing: 0.1,
	},
	secondaryBtn: {
		borderRadius: 18,
		paddingVertical: 16,
		alignItems: 'center',
		borderWidth: 1,
	},
	secondaryBtnText: {
		fontSize: 16,
		fontWeight: '600',
	},
	closeBtn: {
		position: 'absolute',
		right: 16,
		width: 36,
		height: 36,
		borderRadius: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeBtnIcon: {
		fontSize: 15,
		fontWeight: '600',
	},
});
