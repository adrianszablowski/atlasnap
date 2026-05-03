import { FriendItem } from '@/components/screens/friends/friend-item';
import { FriendRequestItem } from '@/components/screens/friends/friend-request-item';
import { FriendsEmptyState } from '@/components/screens/friends/friends-empty-state';
import { FriendsScreenHeader } from '@/components/screens/friends/friends-screen-header';
import { RequestsEmptyState } from '@/components/screens/friends/requests-empty-state';
import { MOCK_MY_FRIEND_CODE, mockFriendRequests, mockFriends } from '@/constants/mock-friends';
import { useTheme } from '@/theme/use-theme';
import type { Friend, FriendRequest, FriendsTab } from '@/types/types';
import filter from 'lodash/filter';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const incomingRequests = filter(mockFriendRequests, { direction: 'incoming' });

type ListItem = Friend | FriendRequest;

export default function FriendsScreen() {
	const theme = useTheme();
	const [selectedTab, setSelectedTab] = useState<FriendsTab>('friends');

	const data: ListItem[] = selectedTab === 'friends' ? mockFriends : mockFriendRequests;

	return (
		<SafeAreaView style={[styles.root, { backgroundColor: theme.background50 }]} edges={['top']}>
			<FlatList<ListItem>
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) =>
					selectedTab === 'friends' ? (
						<FriendItem friend={item as Friend} />
					) : (
						<FriendRequestItem request={item as FriendRequest} />
					)
				}
				ListHeaderComponent={
					<FriendsScreenHeader
						friendCount={mockFriends.length}
						friendCode={MOCK_MY_FRIEND_CODE}
						selectedTab={selectedTab}
						onTabChange={setSelectedTab}
						requestCount={incomingRequests.length}
					/>
				}
				ListEmptyComponent={selectedTab === 'friends' ? <FriendsEmptyState /> : <RequestsEmptyState />}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
				contentContainerStyle={[styles.list, data.length === 0 && styles.listEmpty]}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior='automatic'
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	list: {
		paddingHorizontal: 16,
		paddingBottom: 48,
	},
	listEmpty: {
		flex: 1,
	},
	divider: {
		height: 16,
	},
});
