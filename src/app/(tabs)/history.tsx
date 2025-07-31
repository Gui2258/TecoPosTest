import { BillEntry, readBillEntries } from '@/src/utils/utils';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function About() {
    // Corrección 1: Cambiar el tipo a BillEntry[] (array) en lugar de un solo objeto
    const [entries, setEntries] = useState<BillEntry[]>([]);
    // Corrección 2: Estado para manejar carga
    const [loading, setLoading] = useState(true);

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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Histórico de Billetes</Text>

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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    entry: {
        backgroundColor: 'white',
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
        color: '#666',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2ecc71',
    },
});
