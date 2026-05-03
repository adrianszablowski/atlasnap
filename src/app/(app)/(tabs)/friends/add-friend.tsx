import { MOCK_FOUND_USER } from '@/constants/mock-friends';
import { getAvatarSource } from '@/constants/mock-user-profile';
import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import type { FoundUser, SearchStatus } from '@/types/types';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import isNil from 'lodash/isNil';
import startsWith from 'lodash/startsWith';
import trim from 'lodash/trim';
import { useState } from 'react';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

export default function AddFriendScreen() {
	const theme = useTheme();
	const router = useRouter();
	const [code, setCode] = useState('');
	const [status, setStatus] = useState<SearchStatus>('idle');
	const [foundUser, setFoundUser] = useState<FoundUser | null>(null);

	const canSearch = trim(code).length >= 5;

	const handleSearch = () => {
		if (!canSearch) return;

		setStatus('loading');
		setFoundUser(null);

		setTimeout(() => {
			if (trim(code).replace(/\s/g, '').length >= 5) {
				setFoundUser(MOCK_FOUND_USER);
				setStatus('found');
			} else {
				setStatus('not_found');
			}
		}, 800);
	};

	const handleSendRequest = () => {
		setStatus('sent');
		setTimeout(() => router.back(), 1400);
	};

	const handleCancel = () => router.back();

	return (
		<>
			<Stack.Screen
				options={{
					headerLeft: () => (
						<Pressable onPress={handleCancel} style={{ paddingHorizontal: 4 }}>
							<Text style={{ color: theme.primary500, fontSize: 17 }}>Cancel</Text>
						</Pressable>
					),
				}}
			/>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
				<ScrollView
					contentInsetAdjustmentBehavior='automatic'
					keyboardShouldPersistTaps='handled'
					contentContainerStyle={[styles.container, { backgroundColor: theme.background50 }]}
					style={{ backgroundColor: theme.background50 }}
				>
					<View style={styles.inputSection}>
						<Text style={[styles.inputLabel, { color: theme.typography700 }]}>Enter friend code</Text>
						<View
							style={[
								styles.inputWrap,
								{
									backgroundColor: theme.background0,
									borderColor: code.length > 0 ? theme.primary400 : theme.outline200,
									shadowColor: theme.typography900,
								},
							]}
						>
							<Text style={[styles.hashPrefix, { color: theme.primary500 }]}>#</Text>
							<TextInput
								style={[styles.input, { color: theme.typography950 }]}
								placeholder='A7K9-P3M2'
								placeholderTextColor={theme.outline300}
								value={startsWith(code, '#') ? code.slice(1) : code}
								onChangeText={(text) => {
									setCode(text);
									if (status !== 'idle') setStatus('idle');
									setFoundUser(null);
								}}
								autoCapitalize='characters'
								autoCorrect={false}
								autoFocus
								returnKeyType='search'
								onSubmitEditing={handleSearch}
							/>
						</View>
						<Text style={[styles.formatHint, { color: theme.typography400 }]}>
							Friend codes look like #A7K9-P3M2. Ask your friend to share theirs with you.
						</Text>
					</View>
					<Pressable
						onPress={handleSearch}
						disabled={!canSearch || status === 'loading'}
						style={({ pressed }) => [
							styles.searchBtn,
							{
								backgroundColor: canSearch ? theme.primary500 : theme.background300,
								opacity: pressed ? 0.85 : 1,
							},
						]}
					>
						{status === 'loading' && isNil(foundUser) ? (
							<ActivityIndicator color={theme.background0} />
						) : (
							<Text style={[styles.searchBtnLabel, { color: canSearch ? theme.background0 : theme.typography400 }]}>
								Find Friend
							</Text>
						)}
					</Pressable>
					{status === 'not_found' && (
						<View
							style={[styles.notFoundCard, { backgroundColor: theme.secondary50, borderColor: theme.secondary100 }]}
						>
							<Image source='sf:person.fill.questionmark' style={styles.notFoundIcon} tintColor={theme.secondary600} />
							<Text style={[styles.notFoundText, { color: theme.secondary700 }]}>
								No one found with that code. Check the code and try again.
							</Text>
						</View>
					)}
					{(status === 'found' || status === 'sent') && foundUser && (
						<View
							style={[
								styles.resultCard,
								{
									backgroundColor: theme.background0,
									borderColor: status === 'sent' ? theme.success200 : theme.cardBorder,
									shadowColor: theme.typography900,
								},
							]}
						>
							<Image
								source={getAvatarSource(foundUser.gender, foundUser.avatar_index)}
								style={[styles.resultAvatar, { backgroundColor: theme.background200 }]}
								contentFit='cover'
							/>
							<View style={styles.resultInfo}>
								<Text style={[styles.resultName, { color: theme.typography950 }]}>{foundUser.name}</Text>
								<Text selectable style={[styles.resultCode, { color: theme.typography400 }]}>
									{foundUser.friend_code}
								</Text>
							</View>
							{status === 'sent' && (
								<View style={[styles.sentBadge, { backgroundColor: theme.success50, borderColor: theme.success200 }]}>
									<Image source='sf:checkmark.circle.fill' style={styles.sentIcon} tintColor={theme.success600} />
									<Text style={[styles.sentLabel, { color: theme.success700 }]}>Sent</Text>
								</View>
							)}
						</View>
					)}
					{status === 'found' && foundUser && (
						<Pressable
							onPress={handleSendRequest}
							style={({ pressed }) => [
								styles.sendBtn,
								{
									backgroundColor: hexToRgba(theme.success500, 0.12),
									borderColor: hexToRgba(theme.success500, 0.3),
									opacity: pressed ? 0.85 : 1,
								},
							]}
						>
							<Image source='sf:person.badge.plus' style={styles.sendIcon} tintColor={theme.success700} />
							<Text style={[styles.sendLabel, { color: theme.success700 }]}>Send Friend Request</Text>
						</Pressable>
					)}
					{status === 'sent' && (
						<Text style={[styles.sentHint, { color: theme.typography400 }]}>
							Request sent! You will be connected once they accept.
						</Text>
					)}
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		gap: 16,
		flexGrow: 1,
	},
	inputSection: {
		gap: 10,
	},
	inputLabel: {
		fontSize: 13,
		fontWeight: '600',
		letterSpacing: 0.1,
	},
	inputWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 14,
		borderWidth: 1.5,
		paddingHorizontal: 16,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 6,
		elevation: 2,
	},
	hashPrefix: {
		fontSize: 22,
		fontWeight: '800',
		marginRight: 2,
	},
	input: {
		flex: 1,
		fontSize: 22,
		fontWeight: '700',
		letterSpacing: 2,
		paddingVertical: 16,
		fontVariant: ['tabular-nums'],
	},
	formatHint: {
		fontSize: 13,
		lineHeight: 18,
	},
	searchBtn: {
		paddingVertical: 16,
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
	},
	searchBtnLabel: {
		fontSize: 16,
		fontWeight: '700',
	},
	notFoundCard: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		padding: 16,
		borderRadius: 14,
		borderWidth: 1,
	},
	notFoundIcon: {
		width: 24,
		height: 24,
		flexShrink: 0,
	},
	notFoundText: {
		flex: 1,
		fontSize: 14,
		lineHeight: 20,
		fontWeight: '500',
	},
	resultCard: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 14,
		padding: 16,
		borderRadius: 16,
		borderWidth: 1,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.07,
		shadowRadius: 12,
		elevation: 3,
	},
	resultAvatar: {
		width: 52,
		height: 52,
		borderRadius: 26,
		flexShrink: 0,
	},
	resultInfo: {
		flex: 1,
		gap: 3,
	},
	resultName: {
		fontSize: 18,
		fontWeight: '700',
		letterSpacing: -0.2,
	},
	resultCode: {
		fontSize: 13,
		fontVariant: ['tabular-nums'],
		letterSpacing: 1,
	},
	sentBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 10,
		borderWidth: 1,
		flexShrink: 0,
	},
	sentIcon: {
		width: 14,
		height: 14,
	},
	sentLabel: {
		fontSize: 13,
		fontWeight: '700',
	},
	sendBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 16,
		borderRadius: 16,
		borderWidth: 1,
	},
	sendIcon: {
		width: 18,
		height: 18,
	},
	sendLabel: {
		fontSize: 16,
		fontWeight: '700',
	},
	sentHint: {
		textAlign: 'center',
		fontSize: 14,
		lineHeight: 20,
	},
});
