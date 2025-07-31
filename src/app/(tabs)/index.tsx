import { Button } from '@/src/components/button';
import { useTheme } from '@/src/context/ThemeContext';
import { createBillEntry } from '@/src/utils/utils';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Alert,
    Animated,
    KeyboardAvoidingView,
    Platform,
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

    // Estado para denominaciones
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

    // Arreglo de Animated.Values para cada fila (opacidad y desplazamiento Y)
    const animations = useRef(
        denominations.map(() => ({
            opacity: new Animated.Value(0),
            translateY: new Animated.Value(-20),
        }))
    ).current;

    // Al montar el componente, animamos todas las filas secuencialmente
    useEffect(() => {
        const animationsSequence = denominations.map((_, i) =>
            Animated.parallel([
                Animated.timing(animations[i].opacity, {
                    toValue: 1,
                    duration: 300,
                    delay: i * 100,
                    useNativeDriver: true,
                }),
                Animated.timing(animations[i].translateY, {
                    toValue: 0,
                    duration: 300,
                    delay: i * 100,
                    useNativeDriver: true,
                }),
            ])
        );
        Animated.stagger(100, animationsSequence).start();
    }, [animations, denominations]);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 16,
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

    const handleSave = () => {
        if (totalSum === 0) {
            Alert.alert('Success', 'Debe introducir datos para guardar!');
            return;
        }

        createBillEntry(totalSum);
        Alert.alert('Success', 'Cuanta guardada satisfactoriamnete!');
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { flex: 1 }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
            >
                {denominations.map((item, index) => (
                    <Animated.View
                        key={item.value}
                        style={[
                            styles.row,
                            {
                                opacity: animations[index].opacity,
                                transform: [
                                    {
                                        translateY:
                                            animations[index].translateY,
                                    },
                                ],
                            },
                        ]}
                    >
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
                            selectTextOnFocus={true} // selecciona todo el texto al enfocar
                        />
                        <Text style={styles.total}>${item.total}</Text>
                    </Animated.View>
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
                        onPress={handleSave}
                        childIcon={
                            <Fontisto name="favorite" size={30} color="white" />
                        }
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
