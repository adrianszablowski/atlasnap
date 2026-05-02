import { getAvatarSource } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import type { UserProfile } from '@/types/types';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileBannerProps {
	profile: UserProfile;
	onPress: () => void;
}

export function ProfileBanner({ profile, onPress }: Readonly<ProfileBannerProps>) {
	const theme = useTheme();
	const avatarSource = getAvatarSource(profile.gender, profile.avatarIndex);

	return (
		<Pressable
			onPress={onPress}
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
			<View style={[styles.avatarWrapper, { backgroundColor: theme.background200 }]}>
				<Image source={avatarSource} style={styles.avatar} contentFit='cover' />
			</View>
			<View style={styles.info}>
				<Text style={[styles.name, { color: theme.typography900 }]} numberOfLines={1}>
					{profile.name}
				</Text>
				<Text style={[styles.userCode, { color: theme.typography400 }]}>{profile.userCode}</Text>
				<View style={[styles.editPill, { backgroundColor: theme.primary50, borderColor: theme.primary200 }]}>
					<Image source='sf:pencil' style={styles.editIcon} tintColor={theme.primary600} />
					<Text style={[styles.editLabel, { color: theme.primary600 }]}>Edit Profile</Text>
				</View>
			</View>
			<Image source='sf:chevron.right' style={styles.chevron} tintColor={theme.outline300} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
		paddingHorizontal: 18,
		paddingVertical: 18,
		borderRadius: 20,
		borderWidth: 1,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.08,
		shadowRadius: 16,
		elevation: 4,
	},
	avatarWrapper: {
		width: 66,
		height: 66,
		borderRadius: 33,
		overflow: 'hidden',
		flexShrink: 0,
	},
	avatar: {
		width: 66,
		height: 66,
	},
	info: {
		flex: 1,
		gap: 3,
	},
	name: {
		fontSize: 18,
		fontWeight: '800',
		letterSpacing: -0.3,
	},
	userCode: {
		fontSize: 13,
		fontWeight: '500',
		fontVariant: ['tabular-nums'],
	},
	editPill: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		gap: 5,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 8,
		borderWidth: 1,
		marginTop: 6,
	},
	editIcon: {
		width: 11,
		height: 11,
	},
	editLabel: {
		fontSize: 12,
		fontWeight: '600',
	},
	chevron: {
		width: 13,
		height: 13,
		flexShrink: 0,
	},
});
