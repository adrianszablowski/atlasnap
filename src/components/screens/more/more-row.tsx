import { useTheme } from '@/theme/use-theme';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface MoreRowProps {
	icon: string;
	iconBackground: string;
	label: string;
	value?: string;
	valueSelectable?: boolean;
	showChevron?: boolean;
	onPress?: () => void;
	danger?: boolean;
	divider?: boolean;
}

export function MoreRow({
	icon,
	iconBackground,
	label,
	value,
	valueSelectable = false,
	showChevron = true,
	onPress,
	danger = false,
	divider = false,
}: Readonly<MoreRowProps>) {
	const theme = useTheme();

	return (
		<>
			<Pressable
				onPress={onPress}
				disabled={!onPress}
				style={({ pressed }) => [
					styles.row,
					{ backgroundColor: pressed && onPress ? theme.background100 : 'transparent' },
				]}
			>
				<View style={[styles.iconPill, { backgroundColor: iconBackground, borderCurve: 'continuous' }]}>
					<Image source={`sf:${icon}`} style={styles.icon} tintColor='#FFFFFF' />
				</View>
				<Text style={[styles.label, { color: danger ? theme.secondary600 : theme.typography900 }]} numberOfLines={1}>
					{label}
				</Text>
				<View style={styles.right}>
					{value ? (
						<Text selectable={valueSelectable} style={[styles.value, { color: theme.typography400 }]}>
							{value}
						</Text>
					) : null}
					{showChevron && onPress ? (
						<Image source='sf:chevron.right' style={styles.chevron} tintColor={theme.outline300} />
					) : null}
				</View>
			</Pressable>
			{divider ? <View style={[styles.divider, { backgroundColor: theme.background200 }]} /> : null}
		</>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 14,
		gap: 12,
	},
	iconPill: {
		width: 32,
		height: 32,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	},
	icon: {
		width: 16,
		height: 16,
	},
	label: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
	},
	right: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	value: {
		fontSize: 15,
		fontWeight: '400',
	},
	chevron: {
		width: 13,
		height: 13,
	},
	divider: {
		height: 1,
		marginLeft: 60,
	},
});
