# Ejemplo de Implementación - PropertyMarketplace

## 🎯 Objetivo

Mostrar cómo integrar la API del backend en el componente `PropertyMarketplace` existente **sin modificar el código original**.

## 📝 Código Original (Mantenido)

```typescript
// client/src/components/property-marketplace.tsx (SIN CAMBIOS)
import React, { useState } from "react";
import PropertyCard from "@/components/property-card";
import Filters from "@/components/filters";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { properties } from "@/data/properties"; // ← Datos estáticos
import { Property, FilterOptions } from "@/lib/types";

const PropertyMarketplace: React.FC<PropertyMarketplaceProps> = ({ 
  onPropertyClick 
}) => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [visibleProperties, setVisibleProperties] = useState(6);
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    location: "",
    price: "",
  });

  // ... resto del código original
};
```

## 🔄 Nueva Versión con Backend (Opcional)

Crea un nuevo archivo o versión que use la API:

```typescript
// client/src/components/property-marketplace-backend.tsx (NUEVO ARCHIVO)
import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/property-card";
import Filters from "@/components/filters";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { properties } from "@/data/properties"; // ← Fallback
import { Property, FilterOptions } from "@/lib/types";
import { useSearchProperties } from "@/hooks/useProperties";

interface PropertyMarketplaceProps {
  onPropertyClick: (property: Property) => void;
}

const PropertyMarketplaceBackend: React.FC<PropertyMarketplaceProps> = ({ 
  onPropertyClick 
}) => {
  const [visibleProperties, setVisibleProperties] = useState(6);
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    location: "",
    price: "",
  });

  // 🆕 Usar hook para obtener datos del backend
  const { 
    data: backendData, 
    isLoading, 
    error 
  } = useSearchProperties(filters, 1, 50); // Obtener más propiedades

  // 🆕 Combinar datos del backend con fallback estático
  const allProperties = backendData?.properties || properties;
  const filteredProperties = allProperties.slice(0, visibleProperties);

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setVisibleProperties(6); // Reset visible properties
  };

  const loadMoreProperties = () => {
    setVisibleProperties(prev => Math.min(prev + 3, allProperties.length));
  };

  // 🆕 Mostrar estado de carga
  if (isLoading && allProperties.length === 0) {
    return (
      <section id="properties" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando propiedades...</p>
          </div>
        </div>
      </section>
    );
  }

  // 🆕 Mostrar error con fallback
  if (error) {
    console.warn('Error al cargar propiedades del backend, usando datos estáticos:', error);
  }

  return (
    <section id="properties" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-center">
          Nuestras propiedades
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore nuestra exclusiva colección de propiedades seleccionadas por su excelencia arquitectónica, 
          ubicaciones privilegiadas y acabados impecables.
        </p>

        {/* 🆕 Indicador de fuente de datos */}
        {!error && backendData && (
          <div className="text-center mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Datos actualizados del servidor
            </span>
          </div>
        )}

        <Filters onApplyFilters={applyFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => onPropertyClick(property)} 
            />
          ))}
        </div>

        {visibleProperties < allProperties.length && (
          <div className="flex justify-center mt-12">
            <Button 
              variant="outlined" 
              size="lg" 
              onClick={loadMoreProperties}
              className="font-medium"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Cargar más propiedades'}
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {filteredProperties.length === 0 && !isLoading && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No se encontraron propiedades con los filtros seleccionados.</p>
          </div>
        )}

        {/* 🆕 Información adicional del backend */}
        {backendData?.pagination && (
          <div className="text-center mt-8 text-sm text-gray-500">
            Mostrando {filteredProperties.length} de {backendData.pagination.totalProperties} propiedades
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyMarketplaceBackend;
```

## 🔄 Integración Gradual

### Opción 1: Reemplazo Directo

En `client/src/pages/home.tsx`, cambiar la importación:

```typescript
// Antes
import PropertyMarketplace from "@/components/property-marketplace";

// Después
import PropertyMarketplace from "@/components/property-marketplace-backend";
```

### Opción 2: Feature Flag

```typescript
// client/src/pages/home.tsx
import PropertyMarketplace from "@/components/property-marketplace";
import PropertyMarketplaceBackend from "@/components/property-marketplace-backend";
import { config } from "@/lib/config";

const Home: React.FC = () => {
  // ... resto del código

  // Usar backend si está disponible
  const useBackend = !config.isDevelopment; // o cualquier lógica
  const MarketplaceComponent = useBackend ? PropertyMarketplaceBackend : PropertyMarketplace;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isHeaderSolid={isHeaderSolid} />
      <HeroSection />
      <MarketplaceComponent onPropertyClick={handlePropertyClick} />
      <Footer />
      {/* ... resto del código */}
    </div>
  );
};
```

### Opción 3: Híbrido con Fallback Automático

```typescript
// client/src/components/property-marketplace-hybrid.tsx
import React, { useState } from "react";
import { useSearchProperties } from "@/hooks/useProperties";
import { properties } from "@/data/properties";
import { Property, FilterOptions } from "@/lib/types";

const PropertyMarketplaceHybrid: React.FC<PropertyMarketplaceProps> = ({ 
  onPropertyClick 
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    location: "",
    price: "",
  });

  // Intentar obtener datos del backend
  const { data: backendData, isLoading, error } = useSearchProperties(filters);
  
  // Usar datos del backend si están disponibles, sino usar estáticos
  const dataSource = backendData?.properties || properties;
  const isUsingBackend = !!backendData && !error;

  // Aplicar filtros localmente si no hay backend
  const [filteredProperties, setFilteredProperties] = useState(dataSource);

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    if (!isUsingBackend) {
      // Aplicar filtros localmente para datos estáticos
      let filtered = [...properties];
      
      if (newFilters.type) {
        filtered = filtered.filter(property => property.type === newFilters.type);
      }
      
      if (newFilters.location) {
        filtered = filtered.filter(property => property.location.includes(newFilters.location));
      }
      
      // ... resto de la lógica de filtros
      
      setFilteredProperties(filtered);
    }
  };

  // El resto del componente es igual...
  return (
    <section id="properties" className="py-16 md:py-24 bg-white">
      {/* Indicador de fuente de datos */}
      <div className="text-center mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          isUsingBackend 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {isUsingBackend ? '✓ Datos del servidor' : '⚠ Datos de ejemplo'}
        </span>
      </div>
      
      {/* Resto del componente igual al original */}
    </section>
  );
};
```

## 🧪 Testing de la Integración

### 1. Verificar Conexión

```typescript
// En la consola del navegador
import { getProperties } from './src/lib/api';

// Probar conexión
getProperties({ limit: 5 })
  .then(response => {
    console.log('✅ Backend conectado:', response);
  })
  .catch(error => {
    console.log('❌ Backend no disponible:', error);
  });
```

### 2. Verificar Adaptador

```typescript
import { adaptBackendProperty } from './src/lib/propertyAdapter';

// Datos de ejemplo del backend
const backendProperty = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Casa en Polanco",
  price: 8500000,
  currency: "MXN",
  type: "casa",
  // ... resto de propiedades
};

const frontendProperty = adaptBackendProperty(backendProperty);
console.log('Propiedad adaptada:', frontendProperty);
```

## 📊 Monitoreo

### Logs de Desarrollo

```typescript
// Agregar logs para monitorear el comportamiento
const PropertyMarketplace = () => {
  const { data, isLoading, error } = useSearchProperties(filters);
  
  useEffect(() => {
    if (data) {
      console.log(`✅ Cargadas ${data.properties.length} propiedades del backend`);
    }
    if (error) {
      console.warn('⚠ Error del backend, usando datos estáticos:', error);
    }
  }, [data, error]);

  // ... resto del componente
};
```

### Métricas de Performance

```typescript
// Medir tiempo de carga
const startTime = performance.now();

const { data, isLoading } = useSearchProperties(filters);

useEffect(() => {
  if (data && !isLoading) {
    const loadTime = performance.now() - startTime;
    console.log(`⏱ Propiedades cargadas en ${loadTime.toFixed(2)}ms`);
  }
}, [data, isLoading]);
```

## 🎯 Beneficios de esta Implementación

1. **Sin Breaking Changes**: El código original sigue funcionando
2. **Fallback Automático**: Si el backend falla, usa datos estáticos
3. **Migración Gradual**: Puedes cambiar componente por componente
4. **Testing Fácil**: Puedes probar ambas versiones
5. **Rollback Rápido**: Fácil volver a la versión anterior
6. **Performance**: Cache inteligente y optimizaciones
7. **UX Mejorada**: Estados de carga y error manejados

## 🚀 Próximos Pasos

1. **Implementar en HeroSection**: Para propiedades destacadas
2. **Mejorar Filters**: Usar tipos dinámicos del backend
3. **Agregar Paginación**: Usar la paginación real del backend
4. **Optimizar Imágenes**: Lazy loading y optimización
5. **Analytics**: Tracking de interacciones con propiedades reales 