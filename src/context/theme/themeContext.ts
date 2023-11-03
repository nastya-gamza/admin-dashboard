import { createContext } from 'react';

export type Theme = 'light'|'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);