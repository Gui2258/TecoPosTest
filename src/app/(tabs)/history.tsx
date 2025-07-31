import { useTheme } from '@/src/context/ThemeContext';
import { BillEntry, readBillEntries } from '@/src/utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
} from 'react-native';

export default function About() {
    const [entries, setEntries] = useState<BillEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();
    const rotation = useRef(new Animated.Value(0)).current;

    // Referencia a un arreglo de Animated.Values para animar cada fila
    const animations = useRef<
        {
            opacity: Animated.Value;
            translateY: Animated.Value;
        }[]
    >([]);

    // Inicializar valores animados cuando cambian las entradas
    useEffect(() => {
        animations.current = entries.map(() => ({
            opacity: new Animated.Value(0),
            translateY: new Animated.Value(-20),
        }));

        // Animar secuencialmente las filas
        const animationsSequence = entries.map((_, i) =>
            Animated.parallel([
                Animated.timing(animations.current[i].opacity, {
                    toValue: 1,
                    duration: 300,
                    delay: i * 100,
                    useNativeDriver: true,
                }),
                Animated.timing(animations.current[i].translateY, {
                    toValue: 0,
                    duration: 300,
                    delay: i * 100,
                    useNativeDriver: true,
                }),
            ])
        );

        Animated.stagger(100, animationsSequence).start();
    }, [entries]);

    const getBilies = async () => {
        setLoading(true);
        try {
            const entriesFromStorage = await readBillEntries();
            setEntries(entriesFromStorage);
        } catch (error) {
            console.error('Error leyendo entradas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBilies();
    }, []);

    // Función para formatear fechas
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const animateRotation = () => {
        // Reiniciamos el valor a 0 antes de animar para permitir múltiples clics
        rotation.setValue(0);

        Animated.timing(rotation, {
            toValue: 1, // de 0 a 1 (un ciclo completo)
            duration: 800, // duración en milisegundos
            useNativeDriver: true,
        }).start(() => {
            // Al terminar la animación, podemos hacer algo aquí si quieres
        });

        // Además, refrescamos datos:
        getBilies();
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: colors.background,
        },
        title: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 20,
            color: colors.textPrimary,
            textAlign: 'center',
        },
        entry: {
            backgroundColor: colors.surface,
            padding: 15,
            borderRadius: 8,
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            elevation: 2,
        },
        date: {
            fontSize: 16,
            color: colors.textPrimary,
        },
        amount: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.textPrimary,
        },
        button: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 30,
            marginTop: 30,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
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
        text: {
            fontSize: 18,
            color: colors.textPrimary,
            fontWeight: 'bold',
        },
    });

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Añadimos estilo animado para rotar:
    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };

    return (
        <>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={getBilies}
                    />
                }
            >
                <Text style={styles.title}>Histórico de Conteos</Text>

                {loading ? (
                    <Text>Cargando...</Text>
                ) : entries.length === 0 ? (
                    <Text>No hay registros</Text>
                ) : (
                    entries.map((entry, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.entry,
                                {
                                    opacity:
                                        animations.current[index]?.opacity || 1,
                                    transform: [
                                        {
                                            translateY:
                                                animations.current[index]
                                                    ?.translateY || 0,
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Text style={styles.date}>
                                {formatDate(entry.date)}
                            </Text>
                            <Text style={styles.amount}>
                                ${entry.total.toLocaleString('es-ES')}
                            </Text>
                        </Animated.View>
                    ))
                )}
            </ScrollView>
            <Pressable style={{ width: '100%' }} onPress={animateRotation}>
                <Animated.View style={[styles.button, animatedStyle]}>
                    <Ionicons
                        name="refresh"
                        size={24}
                        color={colors.background}
                    />
                </Animated.View>
            </Pressable>
        </>
    );
}
