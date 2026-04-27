import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS, Platform } from 'react-native';

const isIos = Platform.OS === 'ios';

const liquidGlass = isIos && isLiquidGlassAvailable();

const labelSelectedStyle = isIos ? { color: DynamicColorIOS({ light: '#000000', dark: '#ffffff' }) } : undefined;

const iconColor = isIos && liquidGlass ? DynamicColorIOS({ light: '#000000', dark: '#ffffff' }) : '#9a9ea5';

const tintColor = isIos ? DynamicColorIOS({ light: '#000000', dark: '#ffffff' }) : '#EDEFF2';

export default function TabsLayout() {
	return (
		<NativeTabs labelStyle={labelSelectedStyle} iconColor={iconColor} tintColor={tintColor}>
			<NativeTabs.Trigger name='index'>
				<NativeTabs.Trigger.Icon sf={{ default: 'map', selected: 'map.fill' }} md='map' />
				<NativeTabs.Trigger.Label>Atlas</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='trips'>
				<NativeTabs.Trigger.Icon sf={{ default: 'suitcase', selected: 'suitcase.fill' }} md='luggage' />
				<NativeTabs.Trigger.Label>Trips</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='friends'>
				<NativeTabs.Trigger.Icon sf={{ default: 'person.2', selected: 'person.2.fill' }} md='people' />
				<NativeTabs.Trigger.Label>Friends</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='more'>
				<NativeTabs.Trigger.Icon sf='ellipsis' md='more_vert' />
				<NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
