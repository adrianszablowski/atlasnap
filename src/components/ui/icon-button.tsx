import { useTheme } from '@/theme/use-theme';
import { SfSystemImageIcon } from '@/types/types';
import { Button, Host } from '@expo/ui/swift-ui';
import { buttonStyle, controlSize, labelStyle, tint } from '@expo/ui/swift-ui/modifiers';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';

const isIos = Platform.OS === 'ios';

export interface IconButtonProps {
	onPress: () => void;
	label: string;
	icon: SfSystemImageIcon;
	fallbackIcon?: string;
	variant?: 'glass' | 'prominent';
}

export function IconButton({
	onPress: handlePress,
	label,
	icon,
	fallbackIcon = '+',
	variant = 'glass',
}: Readonly<IconButtonProps>) {
	const theme = useTheme();
	const hasGlass = isIos && isLiquidGlassAvailable();

	if (!isIos) {
		return (
			<Pressable
				accessibilityLabel={label}
				accessibilityRole='button'
				hitSlop={8}
				onPress={handlePress}
				style={({ pressed }) => [
					styles.fallbackRoot,
					{ backgroundColor: theme.primary500, opacity: pressed ? 0.82 : 1 },
				]}
			>
				<Text style={[styles.fallbackIcon, { color: theme.background0 }]}>{fallbackIcon}</Text>
			</Pressable>
		);
	}

	const isProminent = variant === 'prominent';

	return (
		<Host matchContents>
			<Button
				label={label}
				systemImage={icon}
				onPress={handlePress}
				modifiers={[
					buttonStyle(isProminent ? 'borderedProminent' : hasGlass ? 'glass' : 'bordered'),
					controlSize('large'),
					labelStyle('iconOnly'),
					...(!isProminent && hasGlass ? [] : [tint(theme.primary500)]),
				]}
			/>
		</Host>
	);
}

const styles = StyleSheet.create({
	fallbackRoot: {
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fallbackIcon: {
		fontSize: 28,
		fontWeight: '300',
		lineHeight: 32,
	},
});
