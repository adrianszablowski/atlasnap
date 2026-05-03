import { AvatarGrid } from '@/components/screens/more/avatar-grid';
import { MoreRow } from '@/components/screens/more/more-row';
import { MoreSection } from '@/components/screens/more/more-section';
import { ProfileGenderToggle } from '@/components/screens/more/profile-gender-toggle';
import { FEMALE_AVATARS, MALE_AVATARS, MOCK_USER_PROFILE, getAvatarSource } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import type { Gender } from '@/types/types';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
	const theme = useTheme();
	const router = useRouter();
	const [selectedGender, setSelectedGender] = useState<Gender>(MOCK_USER_PROFILE.gender);
	const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(MOCK_USER_PROFILE.avatarIndex);

	const avatars = selectedGender === 'male' ? MALE_AVATARS : FEMALE_AVATARS;
	const avatarSource = getAvatarSource(selectedGender, selectedAvatarIndex);

	const handleGenderChange = (gender: Gender) => {
		setSelectedGender(gender);
		setSelectedAvatarIndex(0);
	};

	const handleCopyUserCode = async () => {
		await Clipboard.setStringAsync(MOCK_USER_PROFILE.userCode);

		Alert.alert('Copied', 'Your friend code has been copied to clipboard.');
	};

	return (
		<View style={[styles.root, { backgroundColor: theme.background50 }]}>
			<Stack.Screen
				options={{
					headerShown: true,
					title: 'Profile',
					headerBackVisible: false,
					headerShadowVisible: false,
					headerStyle: { backgroundColor: theme.background50 },
					headerTitleStyle: { color: theme.typography900, fontSize: 17, fontWeight: '700' },
					headerLeft: () => (
						<Pressable
							onPress={() => router.back()}
							hitSlop={8}
							style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
						>
							<Text style={{ color: theme.typography600, fontSize: 16, fontWeight: '500' }}>Back</Text>
						</Pressable>
					),
					headerRight: () => (
						<Pressable
							onPress={() => Alert.alert('Saved', 'Your profile has been updated.')}
							hitSlop={8}
							style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
						>
							<Text style={{ color: theme.primary500, fontSize: 16, fontWeight: '700' }}>Save</Text>
						</Pressable>
					),
				}}
			/>
			<ScrollView
				contentInsetAdjustmentBehavior='automatic'
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.avatarSection}>
					<View
						style={[
							styles.avatarContainer,
							{
								backgroundColor: theme.background200,
								borderColor: theme.cardBorder,
							},
						]}
					>
						<Image source={avatarSource} style={styles.avatar} contentFit='cover' />
					</View>
					<Text style={[styles.name, { color: theme.typography900 }]}>{MOCK_USER_PROFILE.name}</Text>
					<Pressable
						onPress={handleCopyUserCode}
						hitSlop={8}
						style={({ pressed }) => [styles.userCodeRow, { opacity: pressed ? 0.6 : 1 }]}
					>
						<Text selectable style={[styles.userCode, { color: theme.typography400 }]}>
							{MOCK_USER_PROFILE.userCode}
						</Text>
						<Image source='sf:doc.on.doc' style={styles.copyIcon} tintColor={theme.typography300} />
					</Pressable>
				</View>
				<View style={styles.avatarPickerSection}>
					<View style={styles.pickerHeaderRow}>
						<Image source='sf:person.crop.circle.fill' style={styles.pickerIcon} tintColor={theme.typography400} />
						<Text style={[styles.pickerLabel, { color: theme.typography500 }]}>Choose Avatar</Text>
					</View>
					<ProfileGenderToggle selected={selectedGender} onChange={handleGenderChange} />
					<AvatarGrid avatars={avatars} selectedIndex={selectedAvatarIndex} onSelect={setSelectedAvatarIndex} />
					<Text style={[styles.pickerHint, { color: theme.typography400 }]}>
						Your avatar is linked to your selected gender. You can change it any time.
					</Text>
					<View
						style={[styles.attributionCard, { backgroundColor: theme.background100, borderColor: theme.background300 }]}
					>
						<Image source='sf:paintbrush.pointed.fill' style={styles.attributionIcon} tintColor={theme.typography400} />
						<Text style={[styles.attributionText, { color: theme.typography400 }]}>
							Avatar Illustration System by Micah Lanier, used via DiceBear — CC BY 4.0. DiceBear code licensed under
							MIT.
						</Text>
					</View>
				</View>
				<MoreSection title='Personal Details'>
					<MoreRow
						icon='person.fill'
						iconBackground={theme.primary500}
						label='Name'
						value={MOCK_USER_PROFILE.name}
						onPress={() => Alert.alert('Edit Name', 'Name editing coming soon.')}
						divider
					/>
					<MoreRow
						icon='number'
						iconBackground={theme.typography500}
						label='Friend Code'
						value={MOCK_USER_PROFILE.userCode}
						valueSelectable
						showChevron={false}
						onPress={handleCopyUserCode}
					/>
				</MoreSection>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	content: {
		paddingHorizontal: 16,
		paddingBottom: 48,
		gap: 28,
	},
	avatarSection: {
		alignItems: 'center',
		paddingTop: 24,
		gap: 6,
	},
	avatarContainer: {
		width: 110,
		height: 110,
		borderRadius: 55,
		overflow: 'hidden',
		borderWidth: 3,
		boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
		marginBottom: 4,
	},
	avatar: {
		width: 110,
		height: 110,
	},
	name: {
		fontSize: 22,
		fontWeight: '800',
		letterSpacing: -0.5,
	},
	userCodeRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	userCode: {
		fontSize: 14,
		fontWeight: '500',
		fontVariant: ['tabular-nums'],
	},
	copyIcon: {
		width: 13,
		height: 13,
	},
	avatarPickerSection: {
		gap: 12,
	},
	pickerHeaderRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 4,
	},
	pickerIcon: {
		width: 15,
		height: 15,
	},
	pickerLabel: {
		fontSize: 12,
		fontWeight: '600',
		letterSpacing: 0.5,
		textTransform: 'uppercase',
	},
	pickerHint: {
		fontSize: 13,
		lineHeight: 18,
		paddingHorizontal: 4,
	},
	attributionCard: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderRadius: 10,
		borderWidth: 1,
	},
	attributionIcon: {
		width: 13,
		height: 13,
		marginTop: 2,
		flexShrink: 0,
	},
	attributionText: {
		flex: 1,
		fontSize: 12,
		lineHeight: 16,
	},
});
