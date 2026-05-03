import { getAvatarSource } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import type { Friend } from '@/types/types';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

interface FriendItemProps {
	friend: Friend;
}

export function FriendItem({ friend }: Readonly<FriendItemProps>) {
	const theme = useTheme();

	const tripsLabel =
		friend.shared_trips_count === 0
			? 'No shared trips yet'
			: friend.shared_trips_count === 1
				? '1 trip together'
				: `${friend.shared_trips_count} trips together`;

	const handlePress = () => {
		Alert.alert(friend.name, friend.friend_code, [
			{ text: 'View Trips Together', onPress: () => {} },
			{ text: 'Remove Friend', style: 'destructive', onPress: () => {} },
			{ text: 'Cancel', style: 'cancel' },
		]);
	};

	return (
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
			<Image
				source={getAvatarSource(friend.gender, friend.avatar_index)}
				style={[styles.avatar, { backgroundColor: theme.background200 }]}
				contentFit='cover'
			/>
			<View style={styles.info}>
				<Text style={[styles.name, { color: theme.typography900 }]} numberOfLines={1}>
					{friend.name}
				</Text>
				<Text style={[styles.trips, { color: friend.shared_trips_count > 0 ? theme.primary600 : theme.typography400 }]}>
					{tripsLabel}
				</Text>
			</View>
			<Image source='sf:ellipsis' style={styles.moreIcon} tintColor={theme.outline300} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 14,
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderRadius: 16,
		borderWidth: 1,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.06,
		shadowRadius: 10,
		elevation: 3,
	},
	avatar: {
		width: 46,
		height: 46,
		borderRadius: 23,
		flexShrink: 0,
	},
	info: {
		flex: 1,
		gap: 3,
	},
	name: {
		fontSize: 16,
		fontWeight: '700',
		letterSpacing: -0.2,
	},
	trips: {
		fontSize: 13,
		fontWeight: '500',
	},
	moreIcon: {
		width: 16,
		height: 16,
		flexShrink: 0,
	},
});
