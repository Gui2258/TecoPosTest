import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import {
    darkColors,
    fontSizes,
    lightColors,
    spacing,
    themes,
} from '../theme/theme';

type ThemeColors = typeof lightColors | typeof darkColors; // This will give you exact IntelliSense for color properties

interface ThemeContextType {
    colors: ThemeColors;
    spacing: typeof spacing;
    fontSizes: typeof fontSizes;
    currentThemeName: ColorSchemeName;
    toggleTheme: () => Promise<void>;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const deviceColorScheme = useColorScheme();
    const [currentTheme, setCurrentTheme] = useState<ColorSchemeName>(
        deviceColorScheme || 'light'
    );

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    }, []);

    useEffect(() => {
        const loadTheme = async (): Promise<void> => {
            try {
                const storedTheme = (await AsyncStorage.getItem(
                    'userTheme'
                )) as ColorSchemeName;
                if (
                    storedTheme &&
                    (storedTheme === 'light' || storedTheme === 'dark')
                ) {
                    setCurrentTheme(storedTheme);
                } else {
                    // If no saved theme, use system theme
                    setCurrentTheme(deviceColorScheme || 'light');
                }
            } catch (error) {
                console.error('Failed to load theme from storage', error);
                setCurrentTheme(deviceColorScheme || 'light'); // Fallback
            }
        };
        loadTheme();
    }, [deviceColorScheme]);

    const toggleTheme = async (): Promise<void> => {
        const newTheme: ColorSchemeName =
            currentTheme === 'light' ? 'dark' : 'light';
        setCurrentTheme(newTheme);
        try {
            if (newTheme) {
                await AsyncStorage.setItem('userTheme', newTheme);
            }
        } catch (error) {
            console.error('Failed to save theme to storage', error);
        }
    };

    const theme: ThemeContextType = {
        colors: themes[currentTheme || 'light'],
        spacing,
        fontSizes,
        currentThemeName: currentTheme,
        toggleTheme,
    };

    // Espera a que las fuentes estén cargadas antes de renderizar la app

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

// Custom hook with proper error handling
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Export types for use in other components
export type { ThemeColors, ThemeContextType };
