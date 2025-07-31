// src/theme/theme.ts

export const lightColors = {
    primary: '#5a3f17', // Oro clásico
    gradiente1: '#6a4a19ff',
    secondary: '#8B4513', // Marrón rojizo
    background: '#FAFAFA', // Blanco humo
    surface: '#FFFFFF', // Blanco puro
    accent: '#228B22', // Verde bosque
    textPrimary: '#1A1A1A', // Negro carbón para texto
    textSecondary: '#555555', // Gris oscuro para texto
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    border: '#2196F3',

    // Colores para barras de navegación
    navBarBackground: '#c6b78a', // Fondo barra navegación clara
    navBarText: '#1A1A1A', // Texto / iconos barra navegación clara
    navBarIcon: '#5a3f17',
    navBarIconActive: 'white',

    // Colores para Quick Actions - Paleta dorada/oro
    quickActionRandom: ['#5a3f17', '#8B4513'], // Oro oscuro a marrón rojizo
    quickActionIngredients: ['#DAA520', '#B8860B'], // Oro dorado a oro oscuro
    quickActionCategories: ['#CD853F', '#A0522D'], // Oro arena a marrón siena
    quickActionDaily: ['#6a4a19', '#5a3f17'], // Gradiente oro verdoso
    quickActionSearch: ['#D2691E', '#8B4513'], // Chocolate a marrón rojizo
    quickActionFavorites: ['#F4A460', '#CD853F'], // Oro claro a oro arena
};

export const darkColors = {
    primary: '#E8B86D', // Dorado cálido
    secondary: '#C77DFF', // Púrpura vibrante
    gradiente1: '#a66b14ff',
    background: '#1A1A1A', // Negro carbón
    surface: '#2D2D2D', // Gris oscuro
    accent: '#00F5FF', // Cian brillante
    textPrimary: '#FFFFFF', // Blanco puro para texto
    textSecondary: '#B8B8B8', // Gris claro para texto
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
    border: '#2196F3',

    // Colores para barras de navegación
    navBarBackground: '#25292e', // Fondo barra navegación oscura
    navBarText: '#E8B86D', // Texto / iconos barra navegación oscura (color dorado de acento)
    navBarIcon: '#FFF',
    navBarIconActive: '#E8B86D',

    // Colores para Quick Actions - Paleta dorada para tema oscuro
    quickActionRandom: ['#E8B86D', '#F4D03F'], // Dorado cálido a dorado brillante
    quickActionIngredients: ['#FFD700', '#FFA500'], // Oro puro a naranja dorado
    quickActionCategories: ['#DEB887', '#D2691E'], // Oro pálido a chocolate
    quickActionDaily: ['#a66b14', '#5a3f17'], // Gradiente oro oscuro a cálido
    quickActionSearch: ['#F0E68C', '#DAA520'], // Caqui dorado a oro dorado
    quickActionFavorites: ['#FFCC99', '#CD853F'], // Melocotón dorado a oro arena
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
