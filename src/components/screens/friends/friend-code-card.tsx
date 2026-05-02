import { useTheme } from '@/theme/use-theme';
import { Image } from 'expo-image';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';

interface FriendCodeCardProps {
	code: string;
}

export function FriendCodeCard({ code }: Readonly<FriendCodeCardProps>) {
	const theme = useTheme();

	const handleShare = () => {
		Share.share({
			message: `Add me on Atlasnap! My friend code is ${code}`,
		});
	};

	return (
		<View
			style={[
				styles.card,
				{
					backgroundColor: theme.primary50,
					borderColor: theme.primary100,
					shadowColor: theme.primary500,
				},
			]}
		>
			<View style={styles.inner}>
				<View style={styles.labelRow}>
					<Image source='sf:person.2.circle.fill' style={styles.labelIcon} tintColor={theme.primary600} />
					<Text style={[styles.label, { color: theme.primary700 }]}>Your Friend Code</Text>
				</View>
				<Text selectable style={[styles.code, { color: theme.typography950 }]}>
					{code}
				</Text>
				<Text style={[styles.hint, { color: theme.typography400 }]}>
					Share your code so friends can find and add you
				</Text>
				<Pressable
					onPress={handleShare}
					style={({ pressed }) => [styles.shareBtn, { backgroundColor: theme.primary500, opacity: pressed ? 0.85 : 1 }]}
				>
					<Image source='sf:square.and.arrow.up' style={styles.shareIcon} tintColor={theme.background0} />
					<Text style={[styles.shareBtnLabel, { color: theme.background0 }]}>Share Code</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 20,
		borderWidth: 1,
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.12,
		shadowRadius: 16,
		elevation: 4,
	},
	inner: {
		padding: 20,
		gap: 8,
	},
	labelRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	labelIcon: {
		width: 18,
		height: 18,
	},
	label: {
		fontSize: 13,
		fontWeight: '600',
		letterSpacing: 0.1,
	},
	code: {
		fontSize: 30,
		fontWeight: '800',
		letterSpacing: 3,
		fontVariant: ['tabular-nums'],
		marginVertical: 4,
	},
	hint: {
		fontSize: 13,
		lineHeight: 18,
	},
	shareBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 12,
		borderRadius: 14,
		marginTop: 8,
	},
	shareIcon: {
		width: 16,
		height: 16,
	},
	shareBtnLabel: {
		fontSize: 15,
		fontWeight: '700',
	},
});
