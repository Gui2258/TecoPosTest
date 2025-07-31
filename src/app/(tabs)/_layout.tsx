import ThemeToggleButton from '@/src/components/ToggleThemeButton';
import { useTheme } from '@/src/context/ThemeContext';
import { Tabs } from 'expo-router';

export default function RootLayout() {
    const { colors } = useTheme();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.navBarIconActive,
                tabBarInactiveTintColor: colors.navBarIcon,
                headerStyle: {
                    backgroundColor: colors.navBarBackground,
                },

                headerShadowVisible: false,
                headerTintColor: colors.textPrimary,

                tabBarStyle: {
                    backgroundColor: colors.navBarBackground,
                    height: '8%',
                    paddingTop: 10,

                    // Asegurar que la tab bar esté en la parte inferior
                    /*  position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0, */
                },
                headerRight: () => <ThemeToggleButton />,
            }}
        ></Tabs>
    );
}
