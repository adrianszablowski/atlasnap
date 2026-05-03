import { useTheme } from '@/theme/use-theme';
import type { TripFilter } from '@/types/types';
import isNil from 'lodash/isNil';
import map from 'lodash/map';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TripsFilterProps {
	selected: TripFilter;
	onChange: (filter: TripFilter) => void;
	plannedCount: number;
	savedCount: number;
}

const FILTER_OPTIONS: { key: TripFilter; label: string }[] = [
	{ key: 'all', label: 'All' },
	{ key: 'planned', label: 'Planning' },
	{ key: 'saved', label: 'Saved' },
];

export function TripsFilter({ selected, onChange, plannedCount, savedCount }: Readonly<TripsFilterProps>) {
	const theme = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.background200 }]}>
			{map(FILTER_OPTIONS, ({ key, label }) => {
				const isSelected = selected === key;
				const count = key === 'planned' ? plannedCount : key === 'saved' ? savedCount : null;

				return (
					<Pressable
						key={key}
						onPress={() => onChange(key)}
						style={[
							styles.option,
							isSelected && [
								styles.optionSelected,
								{ backgroundColor: theme.background0, shadowColor: theme.typography900 },
							],
						]}
					>
						<Text
							style={[
								styles.label,
								{
									color: isSelected ? theme.typography900 : theme.typography500,
									fontWeight: isSelected ? '700' : '500',
								},
							]}
						>
							{label}
						</Text>
						{!isNil(count) && count > 0 && (
							<View style={[styles.badge, { backgroundColor: isSelected ? theme.primary500 : theme.outline200 }]}>
								<Text style={[styles.badgeText, { color: isSelected ? theme.background0 : theme.outline600 }]}>
									{count}
								</Text>
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
		gap: 5,
		paddingVertical: 9,
		borderRadius: 10,
	},
	optionSelected: {
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 2,
	},
	label: {
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
