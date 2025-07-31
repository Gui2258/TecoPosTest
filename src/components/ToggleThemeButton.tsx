// src/components/ThemeToggleButton.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Tu hook de tema personalizado

export default function ThemeToggleButton() {
    const { currentThemeName, toggleTheme, colors } = useTheme();

    return (
        <TouchableOpacity
            onPress={toggleTheme}
            style={{ paddingHorizontal: 12, marginHorizontal: 10 }}
            accessibilityLabel="Cambiar tema claro/oscuro"
        >
            {currentThemeName === 'light' ? (
                <MaterialCommunityIcons
                    name="weather-night"
                    size={24}
                    color={colors.titleText}
                />
            ) : (
                <MaterialCommunityIcons
                    name="white-balance-sunny"
                    size={24}
                    color="#FFD700"
                />
            )}
        </TouchableOpacity>
    );
}
