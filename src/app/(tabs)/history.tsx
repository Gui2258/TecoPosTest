import { useTheme } from '@/src/context/ThemeContext';
import { BillEntry, readBillEntries } from '@/src/utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import {
    Dimensions,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function About() {
    const [entries, setEntries] = useState<BillEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    const getBilies = async () => {
        try {
            const entries = await readBillEntries();
            // Corrección 3: Siempre recibimos un array (vacío si no hay datos)
            setEntries(entries);
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

    const { width } = Dimensions.get('screen');

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
            borderRadius: 20,
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
                        <View key={index} style={styles.entry}>
                            <Text style={styles.date}>
                                {formatDate(entry.date)}
                            </Text>
                            <Text style={styles.amount}>
                                ${entry.total.toLocaleString('es-ES')}
                            </Text>
                        </View>
                    ))
                )}
            </ScrollView>
            <Pressable style={{ width: '100%' }} onPress={getBilies}>
                <View style={styles.button}>
                    <Ionicons
                        name="refresh"
                        size={24}
                        color={colors.background}
                    />
                </View>
            </Pressable>
        </>
    );
}
