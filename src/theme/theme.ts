// src/theme/theme.ts
export const lightColors = {
    primary: '#0d5711ff', // Verde oscuro – confiable y relacionado al dinero
    gradiente1: '#388E3C', // Verde medio para gradientes suaves
    secondary: '#A1887F', // Marrón grisáceo – para balancear con tonos tierra
    background: '#F7F9F9', // Blanco muy suave, casi gris claro
    surface: '#FFFFFF', // Blanco puro para tarjetas y inputs
    accent: '#FFB300', // Amarillo dorado para botones y destacar elementos
    textPrimary: '#1B262C', // Azul muy oscuro para un buen contraste en texto
    textSecondary: '#5F6A6A', // Gris azulado para texto secundario
    success: '#4CAF50', // Verde estándar para éxito
    warning: '#FBC02D', // Amarillo oscuro para advertencias
    error: '#E53935', // Rojo para errores
    info: '#1976D2', // Azul para información
    border: '#B0BEC5', // Gris claro para bordes

    navBarBackground: '#658e4cff', // Verde claro para fondo de barra
    navBarText: '#FFFFFF', // Texto blanco para contraste en barra
    navBarIcon: '#1B262C',
    navBarIconActive: '#FFB300',

    quickActionRandom: ['#2E7D32', '#66BB6A'], // Verde gradiente
    quickActionIngredients: ['#FFB300', '#FFA000'], // Dorado gradiente
    quickActionCategories: ['#8D6E63', '#6D4C41'], // Marrones cálidos
    quickActionDaily: ['#43A047', '#388E3C'], // Verdes medios
    quickActionSearch: ['#81C784', '#66BB6A'], // Verde claro a medio
    quickActionFavorites: ['#FFCA28', '#FFC107'], // Amarillo dorado claro
};

export const darkColors = {
    primary: '#1b581eff', // Verde claro para modo oscuro
    secondary: '#BCAAA4', // Marrón claro para contraste suave
    gradiente1: '#388E3C', // Verde medio para gradientes
    background: '#121917', // Verde muy oscuro / casi negro
    surface: '#1E2E20', // Verde oscuro para superficies
    accent: '#FFC107', // Amarillo brillante para acentos
    textPrimary: '#E0F2F1', // Verde agua claro para texto
    textSecondary: '#A5D6A7', // Verde pálido para texto secundario
    success: '#4CAF50',
    warning: '#FBC02D',
    error: '#E53935',
    info: '#1976D2',
    border: '#897b5fff',

    navBarBackground: '#2c3422', // Fondo navbar oscuro
    navBarText: '#FFC107', // Texto navbar amarillo para contraste
    navBarIcon: '#A5D6A7',
    navBarIconActive: '#FFC107',

    quickActionRandom: ['#81C784', '#388E3C'],
    quickActionIngredients: ['#FFCA28', '#FFB300'],
    quickActionCategories: ['#BCAAA4', '#8D6E63'],
    quickActionDaily: ['#43A047', '#2E7D32'],
    quickActionSearch: ['#A5D6A7', '#81C784'],
    quickActionFavorites: ['#FFD54F', '#FFC107'],
};

// Espaciado, fuentes y tamaños comunes
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export const fontSizes = {
    title: 28,
    subtitle: 20,
    regular: 16,
    small: 14,
    tiny: 12,
};

export const themes = {
    light: lightColors,
    dark: darkColors,
};
