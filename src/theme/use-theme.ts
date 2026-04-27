import type { AtlasnapTheme } from '@/theme/light-theme';
import { AtlasnapThemeContext } from '@/theme/theme-context';
import { useContext } from 'react';

export function useTheme(): AtlasnapTheme {
	const context = useContext(AtlasnapThemeContext);

	if (context === undefined) {
		throw new Error('useTheme must be used within AtlasnapThemeProvider');
	}

	return context;
}
