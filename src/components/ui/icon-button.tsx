import { useTheme } from '@/theme/use-theme';
import { SfSystemImageIcon } from '@/types/types';
import { Button, Host } from '@expo/ui/swift-ui';
import { buttonStyle, controlSize, labelStyle, tint } from '@expo/ui/swift-ui/modifiers';
import { isLiquidGlassAvailable } from 'expo-glass-effect';

export interface IconButtonProps {
	onPress: () => void;
	label: string;
	icon: SfSystemImageIcon;
	variant?: 'glass' | 'prominent';
}

export function IconButton({ onPress: handlePress, label, icon, variant = 'glass' }: Readonly<IconButtonProps>) {
	const theme = useTheme();
	const hasGlass = isLiquidGlassAvailable();
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
