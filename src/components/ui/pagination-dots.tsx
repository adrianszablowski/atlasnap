import { hexToRgba } from '@/theme/hex-to-rgba';
import { useTheme } from '@/theme/use-theme';
import { useEffect } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

export interface PaginationDotsProps {
	count: number;
	activeIndex: number;
	style?: StyleProp<ViewStyle>;
	activeColor?: string;
	inactiveColor?: string;
}

export function PaginationDots({
	count,
	activeIndex,
	style,
	activeColor: activeColorProp,
	inactiveColor: inactiveColorProp,
}: Readonly<PaginationDotsProps>) {
	const theme = useTheme();
	const activeColor = activeColorProp ?? theme.background0;
	const inactiveColor = inactiveColorProp ?? hexToRgba(theme.background0, 0.5);

	if (count <= 1) {
		return null;
	}

	return (
		<View style={[styles.container, style]}>
			{Array.from({ length: count }, (_, i) => (
				<PaginationDot key={i} active={i === activeIndex} activeColor={activeColor} inactiveColor={inactiveColor} />
			))}
		</View>
	);
}

interface PaginationDotProps {
	active: boolean;
	activeColor: string;
	inactiveColor: string;
}

function PaginationDot({ active, activeColor, inactiveColor }: Readonly<PaginationDotProps>) {
	const progress = useSharedValue(active ? 1 : 0);

	useEffect(() => {
		progress.value = withSpring(active ? 1 : 0, { damping: 18, stiffness: 260, mass: 0.35 });
	}, [active, progress]);

	const animatedStyle = useAnimatedStyle(() => ({
		width: interpolate(progress.value, [0, 1], [6, 18]),
		opacity: interpolate(progress.value, [0, 1], [0.5, 1]),
		backgroundColor: interpolateColor(progress.value, [0, 1], [inactiveColor, activeColor]),
	}));

	return <Animated.View style={[styles.dot, animatedStyle]} />;
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 52,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
	},
	dot: {
		height: 6,
		borderRadius: 3,
	},
});
