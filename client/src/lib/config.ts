// Configuración de la aplicación
export const config = {
  // URL base de la API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/v1',
  
  // Configuración de desarrollo
  isDevelopment: import.meta.env.DEV,
  
  // Configuración de producción
  isProduction: import.meta.env.PROD,
  
  // Configuración de timeouts
  apiTimeout: 10000, // 10 segundos
  
  // Configuración de cache
  cacheTime: {
    properties: 5 * 60 * 1000, // 5 minutos
    featuredProperties: 10 * 60 * 1000, // 10 minutos
    propertyDetail: 10 * 60 * 1000, // 10 minutos
    stats: 30 * 60 * 1000, // 30 minutos
    types: 60 * 60 * 1000, // 1 hora
  },
  
  // Configuración de paginación
  pagination: {
    defaultLimit: 12,
    maxLimit: 50,
  },
  
  // URLs de imágenes por defecto
  defaultImages: {
    property: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
    placeholder: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
  },
  
  // Configuración de WhatsApp
  whatsapp: {
    baseUrl: "https://wa.me/",
    defaultMessage: "Hola, me interesa obtener más información sobre esta propiedad:",
  },
  
  // Configuración de monedas
  currencies: {
    default: 'MXN',
    supported: ['MXN', 'USD'],
  },
  
  // Configuración de localización
  locale: 'es-MX',
} as const;

// Función helper para construir URLs de WhatsApp
export function buildWhatsAppUrl(phone: string, propertyTitle?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const message = propertyTitle 
    ? `${config.whatsapp.defaultMessage} ${propertyTitle}`
    : config.whatsapp.defaultMessage;
  
  return `${config.whatsapp.baseUrl}${cleanPhone}?text=${encodeURIComponent(message)}`;
}

// Función helper para validar si estamos en desarrollo
export function isDev(): boolean {
  return config.isDevelopment;
}

// Función helper para obtener la URL completa de la API
export function getApiUrl(endpoint: string): string {
  return `${config.apiBaseUrl}${endpoint}`;
} 