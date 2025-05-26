import { getProperties, getPropertyStats, getPropertyTypes } from "@/lib/api";
import { config } from "@/lib/config";

/**
 * Función para verificar la configuración actual
 */
export function checkConfig() {
  console.log('🔧 Configuración actual:');
  console.log('   API Base URL:', config.apiBaseUrl);
  console.log('   Environment:', config.isDevelopment ? 'Development' : 'Production');
  console.log('   Variables de entorno:');
  console.log('     VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('     DEV:', import.meta.env.DEV);
  
  // Probar conectividad básica
  console.log('🌐 Probando conectividad básica...');
  fetch(config.apiBaseUrl.replace('/v1', '/health'))
    .then(response => {
      console.log('✅ Servidor responde:', response.status);
    })
    .catch(error => {
      console.log('❌ Servidor no responde:', error.message);
    });
}

/**
 * Función para probar la conexión con el backend
 * Úsala en la consola del navegador para verificar que todo funciona
 */
export async function testBackendConnection() {
  console.log('🔍 Probando conexión con el backend...');
  console.log('📍 URL configurada:', config.apiBaseUrl);
  
  try {
    // Probar endpoint de propiedades
    console.log('📋 Probando /properties...');
    const propertiesResponse = await getProperties({ limit: 5 });
    
    if (propertiesResponse.success) {
      console.log('✅ Propiedades obtenidas:', propertiesResponse.data.properties.length);
      console.log('📊 Primera propiedad:', propertiesResponse.data.properties[0]);
    } else {
      console.error('❌ Error en propiedades:', propertiesResponse.message);
    }
    
    // Probar endpoint de estadísticas
    console.log('📈 Probando /properties/stats...');
    const statsResponse = await getPropertyStats();
    
    if (statsResponse.success) {
      console.log('✅ Estadísticas obtenidas:', statsResponse.data.stats);
    } else {
      console.error('❌ Error en estadísticas:', statsResponse.message);
    }
    
    // Probar endpoint de tipos
    console.log('🏷️ Probando /properties/types...');
    const typesResponse = await getPropertyTypes();
    
    if (typesResponse.success) {
      console.log('✅ Tipos obtenidos:', typesResponse.data.types);
    } else {
      console.error('❌ Error en tipos:', typesResponse.message);
    }
    
    console.log('🎉 Prueba de backend completada');
    return true;
    
  } catch (error) {
    console.error('💥 Error de conexión con el backend:', error);
    console.log('📝 Verifica:');
    console.log('   1. Que el backend esté ejecutándose');
    console.log('   2. Que la URL en .env sea correcta');
    console.log('   3. Que CORS esté configurado en el backend');
    return false;
  }
}

/**
 * Función para probar solo la obtención de propiedades
 */
export async function testProperties() {
  try {
    const response = await getProperties({ limit: 3 });
    console.log('Propiedades del backend:', response);
    return response;
  } catch (error) {
    console.error('Error al obtener propiedades:', error);
    return null;
  }
}

// Hacer las funciones disponibles globalmente en desarrollo
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  (window as any).checkConfig = checkConfig;
  (window as any).testBackend = testBackendConnection;
  (window as any).testProperties = testProperties;
  
  console.log('🛠️ Funciones de prueba disponibles:');
  console.log('   - checkConfig() - Verificar configuración actual');
  console.log('   - testBackend() - Prueba completa del backend');
  console.log('   - testProperties() - Prueba solo propiedades');
} 