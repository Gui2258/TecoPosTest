// utils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@bill_count_entries';

interface BillEntry {
    total: number;
    date: string; // Formato ISO 8601 (ej: "2024-07-31T12:34:56.789Z")
}

// Crear nueva entrada
export const createBillEntry = async (total: number): Promise<void> => {
    try {
        const newEntry: BillEntry = {
            total,
            date: new Date().toISOString(),
        };

        const existingEntries = await readBillEntries();
        const updatedEntries = [...existingEntries, newEntry];

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
        console.error('Error saving bill entry:', error);
        throw new Error('Failed to save bill entry');
    }
};

// Leer todas las entradas
export const readBillEntries = async (): Promise<BillEntry[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue ? JSON.parse(jsonValue) : [];
    } catch (error) {
        console.error('Error reading bill entries:', error);
        throw new Error('Failed to read bill entries');
    }
};

// Actualizar entrada específica
export const updateBillEntry = async (
    index: number,
    newTotal: number
): Promise<void> => {
    try {
        const entries = await readBillEntries();

        if (index < 0 || index >= entries.length) {
            throw new Error('Invalid index');
        }

        entries[index] = {
            total: newTotal,
            date: new Date().toISOString(), // Actualizar fecha
        };

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
        console.error('Error updating bill entry:', error);
        throw new Error('Failed to update bill entry');
    }
};

// Eliminar entrada específica
export const deleteBillEntry = async (index: number): Promise<void> => {
    try {
        const entries = await readBillEntries();

        if (index < 0 || index >= entries.length) {
            throw new Error('Invalid index');
        }

        const updatedEntries = entries.filter((_, i) => i !== index);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    } catch (error) {
        console.error('Error deleting bill entry:', error);
        throw new Error('Failed to delete bill entry');
    }
};

// Obtener suma total acumulada
export const getGrandTotal = async (): Promise<number> => {
    const entries = await readBillEntries();
    return entries.reduce((sum, entry) => sum + entry.total, 0);
};
