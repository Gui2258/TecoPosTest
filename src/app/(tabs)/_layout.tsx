import ThemeToggleButton from '@/src/components/ToggleThemeButton';
import { useTheme } from '@/src/context/ThemeContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';
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
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Conunt',
                    headerTitle: 'Conunt',

                    headerTitleStyle: {
                        // fontFamily: fonts.EduQLDRegular,
                    },
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5
                            name={focused ? 'money-bill-alt' : 'money-bill'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'Histórico',
                    headerTitle: 'Histórico',

                    headerTitleStyle: {
                        // fontFamily: fonts.EduQLDRegular,
                    },
                    tabBarIcon: ({ color, focused }) => (
                        <Octicons name="history" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
