# Integración con Backend - Grupo Arze Landing Page

## 📋 Resumen

Esta documentación explica cómo se ha implementado la integración entre el frontend de la landing page y la API del backend, **sin modificar el código existente del frontend**.

## 🏗️ Arquitectura de la Integración

### Archivos Creados

1. **`client/src/lib/api.ts`** - Servicios para comunicarse con la API del backend
2. **`client/src/lib/propertyAdapter.ts`** - Adaptador para convertir datos del backend al formato del frontend
3. **`client/src/hooks/useProperties.ts`** - Hooks personalizados para React Query
4. **`client/src/lib/config.ts`** - Configuración centralizada

### Flujo de Datos

```
Backend API → api.ts → propertyAdapter.ts → useProperties.ts → Componentes Frontend
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la carpeta `client/` con:

```env
# URL base de la API del backend
VITE_API_BASE_URL=https://localhost:8000/v1

# Para desarrollo local:
# VITE_API_BASE_URL=http://localhost:8000/v1

# Para producción:
# VITE_API_BASE_URL=https://api.grupoarze.com/v1
```

## 📚 Servicios Disponibles

### API Services (`api.ts`)

```typescript
// Obtener propiedades con filtros
getProperties(filters?: PropertyFilters)

// Obtener propiedad específica
getPropertyById(id: string)

// Obtener propiedades destacadas
getFeaturedProperties(limit?: number)

// Buscar propiedades
searchProperties(searchFilters)

// Obtener estadísticas
getPropertyStats()

// Obtener tipos de propiedades
getPropertyTypes()
```

### Hooks Personalizados (`useProperties.ts`)

```typescript
// Hook principal para propiedades
useProperties(filters)

// Hook para propiedades destacadas
useFeaturedProperties(limit)

// Hook para propiedad específica
useProperty(id)

// Hook para búsqueda con filtros del frontend
useSearchProperties(frontendFilters, page, limit)

// Hook para estadísticas
usePropertyStats()

// Hook para tipos de propiedades
usePropertyTypes()
```

## 🔄 Adaptador de Datos

El `propertyAdapter.ts` convierte automáticamente:

### Del Backend al Frontend

```typescript
// Backend (API)
{
  id: "uuid-string",
  price: 8500000,
  currency: "MXN",
  type: "casa",
  constructionArea: 320,
  bedrooms: 4,
  bathrooms: 4.5,
  amenities: ["Jardín", "Terraza"]
}

// Frontend (Componentes)
{
  id: 123456,
  price: "$8,500,000",
  type: "Casa",
  area: "320 m²",
  bedrooms: "4 hab.",
  bathrooms: "4.5 baños",
  features: ["Jardín", "Terraza"]
}
```

### Mapeo de Tipos

| Backend | Frontend |
|---------|----------|
| `casa` | `Casa` |
| `departamento` | `Departamento` |
| `villa` → `casa` | `Villa` |
| `penthouse` → `departamento` | `Penthouse` |

## 🚀 Cómo Usar en los Componentes

### Ejemplo 1: Reemplazar datos estáticos

**Antes (datos estáticos):**
```typescript
import { properties } from "@/data/properties";

const PropertyMarketplace = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  // ...
}
```

**Después (datos del backend):**
```typescript
import { useSearchProperties } from "@/hooks/useProperties";

const PropertyMarketplace = () => {
  const { data, isLoading, error } = useSearchProperties(filters);
  const filteredProperties = data?.properties || [];
  // ...
}
```

### Ejemplo 2: Propiedades destacadas

```typescript
import { useFeaturedProperties } from "@/hooks/useProperties";

const HeroSection = () => {
  const { data: featuredProperties, isLoading } = useFeaturedProperties(6);
  
  if (isLoading) return <div>Cargando...</div>;
  
  return (
    <div>
      {featuredProperties?.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

### Ejemplo 3: Estadísticas

```typescript
import { usePropertyStats } from "@/hooks/useProperties";

const StatsSection = () => {
  const { data: stats } = usePropertyStats();
  
  return (
    <div>
      <p>Total de propiedades: {stats?.totalProperties}</p>
      <p>En venta: {stats?.propertiesForSale}</p>
      <p>En renta: {stats?.propertiesForRent}</p>
    </div>
  );
}
```

## 🔄 Migración Gradual

### Paso 1: Mantener compatibilidad
Los componentes actuales siguen funcionando con datos estáticos.

### Paso 2: Agregar datos del backend
Usar los hooks para obtener datos reales cuando estén disponibles.

### Paso 3: Fallback inteligente
```typescript
const PropertyMarketplace = () => {
  const { data: backendData, isLoading, error } = useSearchProperties(filters);
  const staticData = properties; // datos estáticos como fallback
  
  const filteredProperties = backendData?.properties || staticData;
  
  // El componente funciona igual, pero con datos reales
}
```

## 🛠️ Manejo de Errores

```typescript
const { data, isLoading, error } = useProperties();

if (error) {
  console.error('Error al cargar propiedades:', error);
  // Usar datos estáticos como fallback
  return <PropertyList properties={staticProperties} />;
}
```

## 📱 Funciones Adicionales

### WhatsApp Integration
```typescript
import { buildWhatsAppUrl } from "@/lib/config";

const whatsappUrl = buildWhatsAppUrl(
  property.contact?.whatsapp || "+52 55 1234 5678",
  property.title
);
```

### Cache y Performance
- **Propiedades**: Cache de 5 minutos
- **Propiedades destacadas**: Cache de 10 minutos
- **Estadísticas**: Cache de 30 minutos
- **Tipos**: Cache de 1 hora

## 🔍 Testing

### Verificar conexión con backend
```typescript
// En la consola del navegador
import { getProperties } from './src/lib/api';
getProperties().then(console.log);
```

### Verificar adaptador
```typescript
import { adaptBackendProperty } from './src/lib/propertyAdapter';
// Probar con datos del backend
```

## 🚨 Consideraciones Importantes

1. **CORS**: Asegúrate de que el backend tenga CORS configurado para tu dominio
2. **HTTPS**: En producción, usa HTTPS para ambos frontend y backend
3. **Rate Limiting**: El backend tiene rate limiting, úsalo responsablemente
4. **Fallbacks**: Siempre ten datos estáticos como respaldo
5. **Loading States**: Maneja estados de carga para mejor UX

## 📞 Soporte

Si tienes problemas con la integración:

1. Verifica que la URL de la API sea correcta
2. Revisa la consola del navegador para errores
3. Confirma que el backend esté funcionando
4. Verifica las variables de entorno

## 🎯 Próximos Pasos

1. **Implementar en componentes**: Reemplazar gradualmente datos estáticos
2. **Optimizar imágenes**: Usar las URLs de imágenes del backend
3. **Mejorar filtros**: Usar los tipos dinámicos del backend
4. **Analytics**: Agregar tracking de interacciones
5. **SEO**: Usar datos reales para meta tags 