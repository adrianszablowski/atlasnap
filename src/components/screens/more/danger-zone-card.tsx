import { useTheme } from '@/theme/use-theme';
import { Image } from 'expo-image';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

export function DangerZoneCard() {
	const theme = useTheme();

	const handleDeleteData = () => {
		Alert.alert(
			'Delete All Data',
			'This will permanently delete all your trips, photos, and memories. This action cannot be undone.\n\nNote: Your Atlasnap subscription will not be cancelled. To stop being billed, cancel your subscription separately in Settings → Subscriptions.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{ text: 'Delete Everything', style: 'destructive', onPress: () => {} },
			],
		);
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.sectionTitle, { color: theme.typography500 }]}>Danger Zone</Text>
			<View
				style={[
					styles.card,
					{
						backgroundColor: theme.secondary50,
						borderColor: theme.secondary200,
						shadowColor: theme.secondary500,
					},
				]}
			>
				<View style={styles.header}>
					<Image source='sf:exclamationmark.triangle.fill' style={styles.warningIcon} tintColor={theme.secondary500} />
					<View style={styles.headerText}>
						<Text style={[styles.title, { color: theme.secondary700 }]}>Delete All Data</Text>
						<Text style={[styles.subtitle, { color: theme.secondary500 }]}>Permanent and irreversible</Text>
					</View>
				</View>
				<Text style={[styles.description, { color: theme.secondary600 }]}>
					Removes all your trips, photos, and memories from Atlasnap. Once deleted, your data cannot be recovered.
				</Text>
				<View
					style={[styles.subscriptionNote, { backgroundColor: theme.secondary100, borderColor: theme.secondary200 }]}
				>
					<Image source='sf:creditcard.fill' style={styles.noteIcon} tintColor={theme.secondary400} />
					<Text style={[styles.noteText, { color: theme.secondary600 }]}>
						Deleting your data does not cancel your subscription. To stop being charged, cancel it separately in{' '}
						<Text style={{ fontWeight: '700' }}>Settings → Subscriptions</Text>.
					</Text>
				</View>
				<Pressable
					onPress={handleDeleteData}
					style={({ pressed }) => [
						styles.deleteButton,
						{
							backgroundColor: theme.secondary500,
							opacity: pressed ? 0.85 : 1,
						},
					]}
				>
					<Image source='sf:trash.fill' style={styles.trashIcon} tintColor='#FFFFFF' />
					<Text style={[styles.deleteLabel]}>Delete All Data</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	sectionTitle: {
		fontSize: 12,
		fontWeight: '600',
		letterSpacing: 0.5,
		textTransform: 'uppercase',
		paddingHorizontal: 4,
	},
	card: {
		borderRadius: 16,
		borderWidth: 1,
		padding: 18,
		gap: 14,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 2,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	warningIcon: {
		width: 28,
		height: 28,
		flexShrink: 0,
	},
	headerText: {
		gap: 2,
	},
	title: {
		fontSize: 17,
		fontWeight: '700',
	},
	subtitle: {
		fontSize: 13,
		fontWeight: '500',
	},
	description: {
		fontSize: 14,
		lineHeight: 20,
	},
	subscriptionNote: {
		flexDirection: 'row',
		gap: 10,
		padding: 12,
		borderRadius: 12,
		borderWidth: 1,
		alignItems: 'flex-start',
	},
	noteIcon: {
		width: 15,
		height: 15,
		marginTop: 1,
		flexShrink: 0,
	},
	noteText: {
		flex: 1,
		fontSize: 13,
		lineHeight: 18,
	},
	deleteButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		paddingVertical: 14,
		borderRadius: 12,
	},
	trashIcon: {
		width: 16,
		height: 16,
	},
	deleteLabel: {
		fontSize: 15,
		fontWeight: '700',
		color: '#FFFFFF',
	},
});
