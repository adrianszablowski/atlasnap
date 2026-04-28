import type { TripParticipant } from '@/types/trip';
import { useTheme } from '@/theme/use-theme';
import { StyleSheet, Text, View } from 'react-native';

interface FriendAvatarProps {
	friend: TripParticipant;
	size?: number;
	stackOffset?: number;
}

export function FriendAvatar({ friend, size = 30, stackOffset = 0 }: Readonly<FriendAvatarProps>) {
	const theme = useTheme();
	const fontSize = Math.round(size * 0.34);

	return (
		<View
			style={[
				styles.avatar,
				{
					width: size,
					height: size,
					borderRadius: size / 2,
					backgroundColor: friend.color,
					borderColor: theme.background0,
					marginLeft: stackOffset,
					opacity: friend.status === 'pending' ? 0.55 : 1,
				},
			]}
		>
			<Text style={[styles.initials, { fontSize, color: theme.background0 }]}>{friend.initials}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2.5,
	},
	initials: {
		fontWeight: '700',
		letterSpacing: 0.2,
	},
});
