import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface IbuttonProps {
    onPress: () => void;
    childIcon?: React.ReactNode;
}

export const Button: React.FunctionComponent<IbuttonProps> = ({
    onPress,
    childIcon,
}) => {
    const { colors } = useTheme();
    const { width } = Dimensions.get('screen');
    const styles = StyleSheet.create({
        button: {
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 12,
            marginBottom: 20,
            width: width * 0.2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderWidth: 1,
            borderColor: colors.primary,
        },
    });

    return (
        <>
            <Pressable onPress={onPress}>
                <View style={styles.button}>{childIcon}</View>
            </Pressable>
        </>
    );
};
