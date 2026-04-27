import { lightTheme, type AtlasnapTheme } from '@/theme/light-theme';
import { AtlasnapThemeContext } from '@/theme/theme-context';
import type { ReactNode } from 'react';

interface AtlasnapThemeProviderProps {
	children: ReactNode;
	theme?: AtlasnapTheme;
}

export function AtlasnapThemeProvider({ children, theme = lightTheme }: Readonly<AtlasnapThemeProviderProps>) {
	return <AtlasnapThemeContext.Provider value={theme}>{children}</AtlasnapThemeContext.Provider>;
}
