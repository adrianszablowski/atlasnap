import { useTheme } from '@/theme/use-theme';
import type { FriendsTab } from '@/types/friend';
import map from 'lodash/map';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface FriendSegmentControlProps {
	selected: FriendsTab;
	onChange: (tab: FriendsTab) => void;
	requestCount: number;
}

export function FriendSegmentControl({ selected, onChange, requestCount }: Readonly<FriendSegmentControlProps>) {
	const theme = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.background200 }]}>
			{map(['friends', 'requests'] as FriendsTab[], (tab) => {
				const isSelected = selected === tab;

				return (
					<Pressable
						key={tab}
						onPress={() => onChange(tab)}
						style={[
							styles.option,
							isSelected && [
								styles.optionSelected,
								{
									backgroundColor: theme.background0,
									shadowColor: theme.typography900,
								},
							],
						]}
					>
						<Text
							style={[
								styles.optionLabel,
								{
									color: isSelected ? theme.typography900 : theme.typography500,
									fontWeight: isSelected ? '700' : '500',
								},
							]}
						>
							{tab === 'friends' ? 'Friends' : 'Requests'}
						</Text>
						{tab === 'requests' && requestCount > 0 && (
							<View style={[styles.badge, { backgroundColor: theme.secondary500 }]}>
								<Text style={[styles.badgeText, { color: theme.background0 }]}>{requestCount}</Text>
							</View>
						)}
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderRadius: 12,
		padding: 3,
	},
	option: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 6,
		paddingVertical: 9,
		borderRadius: 10,
	},
	optionSelected: {
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 2,
	},
	optionLabel: {
		fontSize: 14,
	},
	badge: {
		minWidth: 18,
		height: 18,
		borderRadius: 9,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 5,
	},
	badgeText: {
		fontSize: 11,
		fontWeight: '700',
	},
});
