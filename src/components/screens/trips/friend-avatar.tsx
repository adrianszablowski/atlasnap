import type { MockFriend } from '@/constants/mock-trips';
import { StyleSheet, Text, View } from 'react-native';

interface FriendAvatarProps {
	friend: MockFriend;
	size?: number;
	stackOffset?: number;
}

export function FriendAvatar({ friend, size = 30, stackOffset = 0 }: Readonly<FriendAvatarProps>) {
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
					marginLeft: stackOffset,
				},
			]}
		>
			<Text style={[styles.initials, { fontSize }]}>{friend.initials}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	avatar: {
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2.5,
		borderColor: '#FFFFFF',
	},
	initials: {
		color: '#FFFFFF',
		fontWeight: '700',
		letterSpacing: 0.2,
	},
});
