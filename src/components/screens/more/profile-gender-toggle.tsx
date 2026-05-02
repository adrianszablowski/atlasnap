import { useTheme } from '@/theme/use-theme';
import type { Gender } from '@/types/types';
import map from 'lodash/map';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ProfileGenderToggleProps {
	selected: Gender;
	onChange: (gender: Gender) => void;
}

const GENDER_OPTIONS: { gender: Gender; label: string; emoji: string }[] = [
	{ gender: 'male', label: 'Male', emoji: '👨' },
	{ gender: 'female', label: 'Female', emoji: '👩' },
];

export function ProfileGenderToggle({ selected, onChange }: Readonly<ProfileGenderToggleProps>) {
	const theme = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.background200 }]}>
			{map(GENDER_OPTIONS, ({ gender, label, emoji }) => {
				const isSelected = selected === gender;

				return (
					<Pressable
						key={gender}
						onPress={() => onChange(gender)}
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
						<Text style={styles.emoji}>{emoji}</Text>
						<Text
							style={[
								styles.optionLabel,
								{
									color: isSelected ? theme.typography900 : theme.typography500,
									fontWeight: isSelected ? '700' : '500',
								},
							]}
						>
							{label}
						</Text>
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
		gap: 7,
		paddingVertical: 10,
		borderRadius: 10,
	},
	optionSelected: {
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 6,
		elevation: 2,
	},
	emoji: {
		fontSize: 16,
	},
	optionLabel: {
		fontSize: 15,
	},
});
