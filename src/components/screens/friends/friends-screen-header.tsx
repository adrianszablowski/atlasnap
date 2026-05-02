import { FriendCodeCard } from '@/components/screens/friends/friend-code-card';
import { FriendSegmentControl } from '@/components/screens/friends/friend-segment-control';
import { IconButton } from '@/components/ui/icon-button';
import { PageHeader } from '@/components/ui/page-header';
import type { FriendsTab } from '@/types/friend';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

interface FriendsScreenHeaderProps {
	friendCount: number;
	friendCode: string;
	selectedTab: FriendsTab;
	onTabChange: (tab: FriendsTab) => void;
	requestCount: number;
}

export function FriendsScreenHeader({
	friendCount,
	friendCode,
	selectedTab,
	onTabChange,
	requestCount,
}: Readonly<FriendsScreenHeaderProps>) {
	const router = useRouter();

	const description =
		friendCount === 0
			? 'Add friends to share your trips'
			: `${friendCount} ${friendCount === 1 ? 'travel companion' : 'travel companions'}`;

	return (
		<PageHeader
			title='Friends'
			description={description}
			rightAction={
				<IconButton
					label='Add Friend'
					icon='person.badge.plus'
					variant='prominent'
					onPress={() => router.push('/friends/add-friend')}
				/>
			}
		>
			<View style={styles.content}>
				<FriendCodeCard code={friendCode} />
				<FriendSegmentControl selected={selectedTab} onChange={onTabChange} requestCount={requestCount} />
			</View>
		</PageHeader>
	);
}

const styles = StyleSheet.create({
	content: {
		gap: 12,
	},
});
