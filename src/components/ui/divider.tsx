import { useTheme } from '@/theme/use-theme';
import { Host, Divider as SwiftUIIODivider } from '@expo/ui/swift-ui';
import { Platform, StyleSheet, View } from 'react-native';

export interface DividerProps {
	dashed?: boolean;
}

export function Divider({ dashed = false }: Readonly<DividerProps>) {
	const theme = useTheme();

	if (Platform.OS === 'ios' && !dashed) {
		return (
			<View style={styles.root}>
				<Host matchContents>
					<SwiftUIIODivider />
				</Host>
			</View>
		);
	}

	return (
		<View style={styles.root}>
			{dashed ? (
				<View
					style={[
						styles.lineDashed,
						{
							borderColor: theme.outline200,
						},
					]}
				/>
			) : (
				<View style={[styles.lineSolid, { backgroundColor: theme.outline200 }]} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		height: 14,
		flex: 1,
		justifyContent: 'center',
	},
	lineSolid: {
		width: '100%',
		height: StyleSheet.hairlineWidth,
	},
	lineDashed: {
		width: '100%',
		height: 0,
		borderBottomWidth: 1,
		borderStyle: 'dashed',
	},
});
