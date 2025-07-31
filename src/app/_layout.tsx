import * as NavigationBar from 'expo-navigation-bar';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
    useEffect(() => {
        const setupImmersiveMode = async () => {
            if (Platform.OS === 'android') {
                try {
                    // Configurar modo inmersivo completo
                    await NavigationBar.setVisibilityAsync('hidden');
                } catch (error) {
                    console.warn('Error configurando modo inmersivo:', error);
                }
            }
        };

        setupImmersiveMode();

        // Re-aplicar configuración cuando la app vuelve al foco
        const interval = setInterval(() => {
            if (Platform.OS === 'android') {
                NavigationBar.setVisibilityAsync('hidden').catch(console.warn);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
        <ThemeProvider>
            {/*  <StatusBar
                style="inverted"
                hidden={false} // Mostrar status bar pero ocultar navigation bar
            /> */}
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
            </Stack>
        </ThemeProvider>
    );
}
