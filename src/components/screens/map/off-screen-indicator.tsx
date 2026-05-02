import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface OffScreenIndicatorProps {
	x: number;
	y: number;
	angle: number;
	color: string;
}

const SIZE = 28;

export function OffScreenIndicator({ x, y, angle, color }: Readonly<OffScreenIndicatorProps>) {
	return (
		<Animated.View
			entering={FadeIn.duration(220)}
			exiting={FadeOut.duration(220)}
			style={{
				position: 'absolute',
				left: x - SIZE / 2,
				top: y - SIZE / 2,
				width: SIZE,
				height: SIZE,
				borderRadius: SIZE / 2,
				backgroundColor: color,
				alignItems: 'center',
				justifyContent: 'center',
				borderWidth: 2.5,
				borderColor: 'white',
				boxShadow: '0 2px 10px rgba(0,0,0,0.30)',
				transform: [{ rotate: `${angle}deg` }],
			}}
		>
			<View
				style={{
					width: 0,
					height: 0,
					marginLeft: 1,
					borderTopWidth: 4.5,
					borderBottomWidth: 4.5,
					borderLeftWidth: 8,
					borderTopColor: 'transparent',
					borderBottomColor: 'transparent',
					borderLeftColor: 'white',
				}}
			/>
		</Animated.View>
	);
}
