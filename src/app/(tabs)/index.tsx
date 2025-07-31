import { useTheme } from '@/src/context/ThemeContext';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
interface DenominationInput {
    value: number;
    quantity: string;
    total: number;
}
export default function HomeScreen() {
    const { colors } = useTheme();
    const [denominations, setDenominations] = useState<DenominationInput[]>([
        { value: 1000, quantity: '0', total: 0 },
        { value: 500, quantity: '0', total: 0 },
        { value: 200, quantity: '0', total: 0 },
        { value: 100, quantity: '0', total: 0 },
        { value: 50, quantity: '0', total: 0 },
        { value: 20, quantity: '0', total: 0 },
        { value: 10, quantity: '0', total: 0 },
        { value: 5, quantity: '0', total: 0 },
        { value: 2, quantity: '0', total: 0 },
        { value: 1, quantity: '0', total: 0 },
    ]);
    const handleQuantityChange = (text: string, index: number) => {
        const newDenominations = [...denominations];
        const quantity = text === '' ? '0' : text;
        newDenominations[index] = {
            ...newDenominations[index],
            quantity,
            total: newDenominations[index].value * parseInt(quantity || '0'),
        };
        setDenominations(newDenominations);
    };
    const totalSum = denominations.reduce((acc, curr) => acc + curr.total, 0);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 16,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
            paddingHorizontal: 8,
            paddingVertical: 4,
            backgroundColor: colors.surface,
            borderRadius: 8,
            elevation: 2,
        },
        denomination: {
            fontSize: 16,
            color: colors.textPrimary,
            width: 80,
        },
        input: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 4,
            padding: 8,
            width: 100,
            color: colors.textPrimary,
            textAlign: 'center',
        },
        total: {
            fontSize: 16,
            color: colors.textPrimary,
            width: 100,
            textAlign: 'right',
        },
        grandTotal: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.textPrimary,
            textAlign: 'right',
            marginTop: 16,
            padding: 16,
            backgroundColor: colors.surface,
            borderRadius: 8,
        },
    });
    return (
        <ScrollView style={styles.container}>
            {denominations.map((item, index) => (
                <View key={item.value} style={styles.row}>
                    <Text style={styles.denomination}>${item.value}</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={item.quantity}
                        onChangeText={(text) =>
                            handleQuantityChange(text, index)
                        }
                        placeholder="0"
                        placeholderTextColor={colors.textSecondary}
                    />
                    <Text style={styles.total}>${item.total}</Text>
                </View>
            ))}
            <Text style={styles.grandTotal}>Total: ${totalSum}</Text>
        </ScrollView>
    );
}
