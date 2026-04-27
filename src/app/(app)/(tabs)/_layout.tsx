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
				<NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md='home' />
				<NativeTabs.Trigger.Label>Dashboard</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='workout-plans'>
				<NativeTabs.Trigger.Icon sf={{ default: 'list.clipboard', selected: 'list.clipboard.fill' }} md='assignment' />
				<NativeTabs.Trigger.Label>Plans</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='workouts'>
				<NativeTabs.Trigger.Icon sf={{ default: 'dumbbell', selected: 'dumbbell.fill' }} md='fitness_center' />
				<NativeTabs.Trigger.Label>Workouts</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='measurements'>
				<NativeTabs.Trigger.Icon sf={{ default: 'ruler', selected: 'ruler.fill' }} md='straighten' />
				<NativeTabs.Trigger.Label>Measurements</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='more'>
				<NativeTabs.Trigger.Icon sf='ellipsis' md='more_vert' />
				<NativeTabs.Trigger.Label>More</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
