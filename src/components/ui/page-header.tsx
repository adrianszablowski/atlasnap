import { useTheme } from '@/theme/use-theme';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PageHeaderProps {
	title: string;
	description?: string;
	rightAction?: ReactNode;
	children?: ReactNode;
}

export function PageHeader({ title, description, rightAction, children }: Readonly<PageHeaderProps>) {
	const theme = useTheme();

	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<View style={styles.textBlock}>
					<Text style={[styles.title, { color: theme.typography900 }]}>{title}</Text>
					{description ? <Text style={[styles.description, { color: theme.typography500 }]}>{description}</Text> : null}
				</View>
				{rightAction ? rightAction : null}
			</View>
			{children ? children : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 14,
		paddingBottom: 24,
		gap: 22,
	},
	topRow: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		gap: 12,
	},
	textBlock: {
		flex: 1,
		gap: 5,
	},
	title: {
		fontSize: 38,
		fontWeight: '800',
		letterSpacing: -1,
		lineHeight: 42,
	},
	description: {
		fontSize: 15,
		fontWeight: '500',
		lineHeight: 22,
	},
});
