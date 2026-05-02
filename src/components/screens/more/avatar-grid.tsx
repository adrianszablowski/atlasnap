import { useTheme } from '@/theme/use-theme';
import { Image } from 'expo-image';
import map from 'lodash/map';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

const COLUMNS = 4;
const GAP = 10;
const HORIZONTAL_PADDING = 32;

interface AvatarGridProps {
	avatars: number[];
	selectedIndex: number;
	onSelect: (index: number) => void;
}

export function AvatarGrid({ avatars, selectedIndex, onSelect }: Readonly<AvatarGridProps>) {
	const theme = useTheme();
	const { width } = useWindowDimensions();
	const itemSize = Math.floor((width - HORIZONTAL_PADDING - (COLUMNS - 1) * GAP) / COLUMNS);

	return (
		<View style={styles.grid}>
			{map(avatars, (source, index) => {
				const isSelected = index === selectedIndex;

				return (
					<Pressable
						key={index}
						onPress={() => onSelect(index)}
						style={({ pressed }) => ({ width: itemSize, height: itemSize, opacity: pressed ? 0.8 : 1 })}
					>
						<View
							style={[
								styles.imageContainer,
								{
									width: itemSize,
									height: itemSize,
									borderRadius: itemSize / 2,
									borderColor: isSelected ? theme.primary500 : 'transparent',
									backgroundColor: theme.background200,
								},
							]}
						>
							<Image source={source} style={{ width: itemSize, height: itemSize }} contentFit='cover' />
						</View>
						{isSelected && (
							<View
								style={[styles.selectedBadge, { backgroundColor: theme.primary500, borderColor: theme.background0 }]}
							>
								<Image source='sf:checkmark' style={styles.checkIcon} tintColor='#FFFFFF' />
							</View>
						)}
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: GAP,
	},
	imageContainer: {
		overflow: 'hidden',
		borderWidth: 3,
	},
	selectedBadge: {
		position: 'absolute',
		bottom: 1,
		right: 1,
		width: 22,
		height: 22,
		borderRadius: 11,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
	},
	checkIcon: {
		width: 10,
		height: 10,
	},
});
