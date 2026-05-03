import { mockFriends } from '@/constants/mock-friends';
import { getAvatarSource } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import { Image } from 'expo-image';
import includes from 'lodash/includes';
import map from 'lodash/map';
import without from 'lodash/without';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TripFriendsSelectorProps {
	selectedIds: string[];
	onChange: (ids: string[]) => void;
}

export function TripFriendsSelector({ selectedIds, onChange }: Readonly<TripFriendsSelectorProps>) {
	const theme = useTheme();

	function toggleFriend(id: string) {
		const updated = includes(selectedIds, id) ? without(selectedIds, id) : [...selectedIds, id];
		onChange(updated);
	}

	if (!mockFriends.length) {
		return (
			<View style={styles.emptyState}>
				<Text style={[styles.emptyText, { color: theme.typography400 }]}>
					Add friends first to include them in your trip.
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.list}>
			{map(mockFriends, (friend, index) => {
				const isLast = index === mockFriends.length - 1;
				const selected = includes(selectedIds, friend.id);
				const avatarSource = getAvatarSource(friend.gender, friend.avatarIndex);

				return (
					<Pressable
						key={friend.id}
						onPress={() => toggleFriend(friend.id)}
						style={({ pressed }) => [
							styles.row,
							!isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.outline100 },
							{ opacity: pressed ? 0.7 : 1 },
						]}
					>
						<View style={[styles.avatar, { backgroundColor: theme.background200 }]}>
							<Image source={avatarSource} style={styles.avatarImage} contentFit='cover' />
						</View>
						<Text style={[styles.name, { color: theme.typography900 }]}>{friend.name}</Text>
						<View
							style={[
								styles.checkCircle,
								{ borderColor: selected ? theme.primary500 : theme.outline200 },
								selected && { backgroundColor: theme.primary500 },
							]}
						>
							{selected && <Text style={[styles.checkmark, { color: theme.background0 }]}>✓</Text>}
						</View>
					</Pressable>
				);
			})}
		</View>
	);
}

const AVATAR_SIZE = 36;
const CHECK_SIZE = 22;

const styles = StyleSheet.create({
	list: { marginTop: 8 },
	emptyState: { paddingVertical: 16 },
	emptyText: { fontSize: 13, fontWeight: '500', lineHeight: 20 },
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		gap: 12,
	},
	avatar: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE / 2,
		overflow: 'hidden',
		flexShrink: 0,
	},
	avatarImage: {
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
	},
	name: {
		flex: 1,
		fontSize: 15,
		fontWeight: '600',
	},
	checkCircle: {
		width: CHECK_SIZE,
		height: CHECK_SIZE,
		borderRadius: CHECK_SIZE / 2,
		borderWidth: 2,
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	},
	checkmark: {
		fontSize: 12,
		fontWeight: '700',
	},
});
