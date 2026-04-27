import { themeTokens } from '@/theme/tokens';

export const lightTheme = {
	mode: 'light' as const,
	...themeTokens,
} as const;

export type AtlasnapTheme = Readonly<typeof lightTheme>;
