import { Button } from '@/src/components/button';
import { useTheme } from '@/src/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import React, { useCallback, useMemo, useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
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
        { value: 1, quantity: '0', total: 0 },
    ]);
    const handleQuantityChange = useCallback((text: string, index: number) => {
        const numericText = text.replace(/[^0-9]/g, '');

        setDenominations((prev) => {
            const newDenominations = [...prev];
            newDenominations[index] = {
                ...newDenominations[index],
                quantity: numericText,
                total:
                    newDenominations[index].value *
                    (numericText ? parseInt(numericText, 10) : 0),
            };
            return newDenominations;
        });
    }, []);
    const totalSum = useMemo(
        () => denominations.reduce((acc, curr) => acc + curr.total, 0),
        [denominations]
    );
    const { width } = Dimensions.get('screen');
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            //padding: 16,
        },
        scrollContent: {
            backgroundColor: colors.background,
            padding: 16,
            flexGrow: 1,
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
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
        },

        text: {
            color: colors.background,
            fontSize: 20,
            justifyContent: 'center',
            textAlign: 'center',
        },
    });

    const clearData = () => {
        const newDenominations = denominations.map((item) => ({
            ...item,
            quantity: '0',
            total: 0,
        }));
        setDenominations(newDenominations);
    };

    const saveCount = () => {
        const now = new Date();
        console.log(now.toLocaleString());
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'position'}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
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
                            selectTextOnFocus={true}
                        />
                        <Text style={styles.total}>${item.total}</Text>
                    </View>
                ))}
                <Text style={styles.grandTotal}>Total: ${totalSum}</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={clearData}
                        childIcon={
                            <Feather name="trash-2" size={30} color="white" />
                        }
                    />
                    <Button
                        onPress={saveCount}
                        childIcon={
                            <Fontisto name="favorite" size={30} color="white" />
                        }
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
