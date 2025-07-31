import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <StatusBar
                style="inverted"
                hidden={false} // Mostrar status bar pero ocultar navigation bar
            />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}
