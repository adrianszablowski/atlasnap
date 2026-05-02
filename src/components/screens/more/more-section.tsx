import { useTheme } from '@/theme/use-theme';
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MoreSectionProps {
	title: string;
	children: ReactNode;
}

export function MoreSection({ title, children }: Readonly<MoreSectionProps>) {
	const theme = useTheme();

	return (
		<View style={styles.container}>
			<Text style={[styles.title, { color: theme.typography500 }]}>{title}</Text>
			<View
				style={[
					styles.card,
					{
						backgroundColor: theme.cardBackground,
						borderColor: theme.cardBorder,
						shadowColor: theme.typography900,
					},
				]}
			>
				{children}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	title: {
		fontSize: 12,
		fontWeight: '600',
		letterSpacing: 0.5,
		textTransform: 'uppercase',
		paddingHorizontal: 4,
	},
	card: {
		borderRadius: 16,
		borderWidth: 1,
		overflow: 'hidden',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 8,
		elevation: 2,
	},
});
