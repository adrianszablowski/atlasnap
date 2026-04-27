import type { AtlasnapTheme } from '@/theme/light-theme';
import { createContext } from 'react';

export const AtlasnapThemeContext = createContext<AtlasnapTheme | undefined>(undefined);
