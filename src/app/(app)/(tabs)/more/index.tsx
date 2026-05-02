import { DangerZoneCard } from '@/components/screens/more/danger-zone-card';
import { MoreRow } from '@/components/screens/more/more-row';
import { MoreSection } from '@/components/screens/more/more-section';
import { ProfileBanner } from '@/components/screens/more/profile-banner';
import { PageHeader } from '@/components/ui/page-header';
import { MOCK_USER_PROFILE } from '@/constants/mock-user-profile';
import { useTheme } from '@/theme/use-theme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoreScreen() {
	const theme = useTheme();
	const router = useRouter();

	return (
		<SafeAreaView style={[styles.root, { backgroundColor: theme.background50 }]} edges={['top']}>
			<ScrollView
				contentInsetAdjustmentBehavior='automatic'
				contentContainerStyle={styles.content}
				showsVerticalScrollIndicator={false}
			>
				<View>
					<PageHeader title='More' description='Your profile and preferences' />
					<ProfileBanner profile={MOCK_USER_PROFILE} onPress={() => router.push('/more/profile')} />
				</View>
				<MoreSection title='App'>
					<MoreRow
						icon='bell.badge.fill'
						iconBackground='#7B5EA7'
						label='Notifications'
						onPress={() => Alert.alert('Notifications', 'Coming soon')}
						divider
					/>
					<MoreRow
						icon='hand.raised.fill'
						iconBackground={theme.primary600}
						label='Privacy'
						onPress={() => Alert.alert('Privacy', 'Coming soon')}
					/>
				</MoreSection>
				<View style={styles.aboutGroup}>
					<MoreSection title='About'>
						<MoreRow
							icon='star.fill'
							iconBackground={theme.tertiary500}
							label='Rate Atlasnap'
							onPress={() => Alert.alert('Rate Atlasnap', 'Opens App Store')}
							divider
						/>
						<MoreRow
							icon='doc.text.fill'
							iconBackground={theme.typography400}
							label='Terms of Service'
							onPress={() => Alert.alert('Terms of Service', 'Coming soon')}
							divider
						/>
						<MoreRow
							icon='lock.shield.fill'
							iconBackground={theme.success600}
							label='Privacy Policy'
							onPress={() => Alert.alert('Privacy Policy', 'Coming soon')}
							divider
						/>
						<MoreRow
							icon='info.circle.fill'
							iconBackground={theme.outline400}
							label='Version'
							value='1.0.0'
							showChevron={false}
						/>
					</MoreSection>
					<View
						style={[styles.attributionCard, { backgroundColor: theme.background100, borderColor: theme.background300 }]}
					>
						<Image source='sf:paintbrush.pointed.fill' style={styles.attributionIcon} tintColor={theme.typography400} />
						<View style={styles.attributionText}>
							<Text style={[styles.attributionTitle, { color: theme.typography600 }]}>Avatar Artwork</Text>
							<Text style={[styles.attributionBody, { color: theme.typography400 }]}>
								Avatar Illustration System by Micah Lanier, used via DiceBear — CC BY 4.0. DiceBear code licensed under
								MIT.
							</Text>
						</View>
					</View>
				</View>
				<DangerZoneCard />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	content: {
		paddingHorizontal: 16,
		paddingBottom: 48,
		gap: 24,
	},
	aboutGroup: {
		gap: 10,
	},
	attributionCard: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 10,
		paddingHorizontal: 14,
		paddingVertical: 12,
		borderRadius: 12,
		borderWidth: 1,
	},
	attributionIcon: {
		width: 14,
		height: 14,
		marginTop: 2,
		flexShrink: 0,
	},
	attributionText: {
		flex: 1,
		gap: 2,
	},
	attributionTitle: {
		fontSize: 12,
		fontWeight: '600',
	},
	attributionBody: {
		fontSize: 12,
		lineHeight: 17,
	},
});
