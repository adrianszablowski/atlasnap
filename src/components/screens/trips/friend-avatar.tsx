import { getAvatarSource } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import type { TripParticipant } from '@/types/trip';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

interface FriendAvatarProps {
	friend: TripParticipant;
	size?: number;
	stackOffset?: number;
}

export function FriendAvatar({ friend, size = 30, stackOffset = 0 }: Readonly<FriendAvatarProps>) {
	const theme = useTheme();
	const avatarSource = getAvatarSource(friend.gender, friend.avatarIndex);

	return (
		<View
			style={[
				styles.avatar,
				{
					width: size,
					height: size,
					borderRadius: size / 2,
					borderColor: theme.background0,
					marginLeft: stackOffset,
					opacity: friend.status === 'pending' ? 0.55 : 1,
					backgroundColor: theme.background200,
				},
			]}
		>
			<Image source={avatarSource} style={{ width: size, height: size }} contentFit='cover' />
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		overflow: 'hidden',
		borderWidth: 2.5,
	},
});
