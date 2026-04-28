import { useTheme } from '@/theme/use-theme';
import { Host, Divider as SwiftUIDivider } from '@expo/ui/swift-ui';
import { StyleSheet, View } from 'react-native';

export interface DividerProps {
	dashed?: boolean;
}

export function Divider({ dashed = false }: Readonly<DividerProps>) {
	const theme = useTheme();

	if (!dashed) {
		return (
			<View style={styles.root}>
				<Host matchContents>
					<SwiftUIDivider />
				</Host>
			</View>
		);
	}

	return (
		<View style={styles.root}>
			<View style={[styles.dashed, { borderColor: theme.outline200 }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		height: 14,
		flex: 1,
		justifyContent: 'center',
	},
	dashed: {
		width: '100%',
		height: 0,
		borderBottomWidth: 1,
		borderStyle: 'dashed',
	},
});
