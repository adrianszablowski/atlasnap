import { getAvatarSource } from '@/constants/mock-user-profile';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import type { FriendRequest } from '@/types/friend';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

interface FriendRequestItemProps {
	request: FriendRequest;
}

export function FriendRequestItem({ request }: Readonly<FriendRequestItemProps>) {
	const theme = useTheme();
	const [resolved, setResolved] = useState(false);

	const handleAccept = () => {
		setResolved(true);
	};

	const handleDecline = () => {
		Alert.alert('Decline Request', `Decline friend request from ${request.name}?`, [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Decline',
				style: 'destructive',
				onPress: () => setResolved(true),
			},
		]);
	};

	const handleCancel = () => {
		Alert.alert('Cancel Request', `Cancel the friend request you sent to ${request.name}?`, [
			{ text: 'Keep', style: 'cancel' },
			{
				text: 'Cancel Request',
				style: 'destructive',
				onPress: () => setResolved(true),
			},
		]);
	};

	if (resolved) return null;

	const isIncoming = request.direction === 'incoming';

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: theme.cardBackground,
					borderColor: theme.cardBorder,
					shadowColor: theme.typography900,
				},
			]}
		>
			<Image
				source={getAvatarSource(request.gender, request.avatarIndex)}
				style={[styles.avatar, { backgroundColor: theme.background200 }]}
				contentFit='cover'
			/>
			<View style={styles.info}>
				<Text style={[styles.name, { color: theme.typography900 }]} numberOfLines={1}>
					{request.name}
				</Text>
				<Text style={[styles.status, { color: isIncoming ? theme.primary600 : theme.typography400 }]}>
					{isIncoming ? 'Wants to connect' : 'Request sent'}
				</Text>
			</View>
			{isIncoming ? (
				<View style={styles.actions}>
					<Pressable
						onPress={handleAccept}
						style={({ pressed }) => [
							styles.acceptBtn,
							{ backgroundColor: theme.success500, opacity: pressed ? 0.85 : 1 },
						]}
					>
						<Image source='sf:checkmark' style={styles.actionIcon} tintColor={theme.background0} />
					</Pressable>
					<Pressable
						onPress={handleDecline}
						style={({ pressed }) => [
							styles.declineBtn,
							{
								backgroundColor: hexToRgba(theme.secondary500, 0.1),
								borderColor: hexToRgba(theme.secondary500, 0.25),
								opacity: pressed ? 0.8 : 1,
							},
						]}
					>
						<Image source='sf:xmark' style={styles.actionIcon} tintColor={theme.secondary600} />
					</Pressable>
				</View>
			) : (
				<Pressable
					onPress={handleCancel}
					style={({ pressed }) => [
						styles.cancelBtn,
						{
							backgroundColor: theme.background200,
							opacity: pressed ? 0.8 : 1,
						},
					]}
				>
					<Text style={[styles.cancelLabel, { color: theme.typography600 }]}>Cancel</Text>
				</Pressable>
			)}
		</View>
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
	status: {
		fontSize: 13,
		fontWeight: '500',
	},
	actions: {
		flexDirection: 'row',
		gap: 8,
		flexShrink: 0,
	},
	acceptBtn: {
		width: 38,
		height: 38,
		borderRadius: 19,
		alignItems: 'center',
		justifyContent: 'center',
	},
	declineBtn: {
		width: 38,
		height: 38,
		borderRadius: 19,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
	},
	actionIcon: {
		width: 16,
		height: 16,
	},
	cancelBtn: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 10,
		flexShrink: 0,
	},
	cancelLabel: {
		fontSize: 13,
		fontWeight: '600',
	},
});
