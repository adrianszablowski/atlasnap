import { useTheme } from '@/theme/use-theme';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

interface TripImageProps {
	photoUrl?: string;
	style?: StyleProp<ViewStyle>;
}

export function TripImage({ photoUrl, style }: Readonly<TripImageProps>) {
	const theme = useTheme();

	return (
		<View style={[styles.container, { backgroundColor: theme.background200 }, style]}>
			{!photoUrl && (
				<View style={styles.placeholder}>
					<View style={[styles.iconWrap, { backgroundColor: theme.background300 }]}>
						<Text style={styles.icon}>📷</Text>
					</View>
				</View>
			)}
			{photoUrl && <Image source={{ uri: photoUrl }} style={styles.fill} resizeMode='cover' />}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
	},
	placeholder: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconWrap: {
		width: 64,
		height: 64,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		fontSize: 28,
	},
	fill: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
