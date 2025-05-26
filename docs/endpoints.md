# API Pública de Propiedades - Grupo Arze

## Introducción

Esta documentación describe los endpoints públicos disponibles para consultar propiedades de Grupo Arze. Estos endpoints están diseñados para ser consumidos por la landing page y otras aplicaciones públicas que necesiten mostrar información de propiedades.

**Características:**
- ✅ No requiere autenticación
- ✅ Solo muestra propiedades activas y públicas
- ✅ Información de contacto genérica para proteger datos
- ✅ Filtros avanzados disponibles
- ✅ Paginación incluida
- ✅ Optimizado para landing pages

## Base URL

```
https://localhost:8000/v1
```

## Endpoints Disponibles

### 1. Listar Propiedades Públicas

Obtiene una lista paginada de propiedades activas y públicas.

```
GET /properties
```

**Parámetros de consulta opcionales:**

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| `page` | number | Número de página (por defecto: 1) | `?page=2` |
| `limit` | number | Propiedades por página (máx. 50, por defecto: 12) | `?limit=20` |
| `type` | string/array | Tipo de propiedad | `?type=casa` o `?type=casa,departamento` |
| `operation` | string/array | Tipo de operación | `?operation=venta` o `?operation=venta,renta` |
| `minPrice` | number | Precio mínimo | `?minPrice=1000000` |
| `maxPrice` | number | Precio máximo | `?maxPrice=5000000` |
| `city` | string | Ciudad | `?city=Ciudad de México` |
| `state` | string | Estado | `?state=CDMX` |
| `bedrooms` | number | Número mínimo de recámaras | `?bedrooms=3` |
| `bathrooms` | number | Número mínimo de baños | `?bathrooms=2` |
| `minConstructionArea` | number | Área mínima de construcción (m²) | `?minConstructionArea=100` |
| `minTerrainArea` | number | Área mínima de terreno (m²) | `?minTerrainArea=200` |
| `featured` | boolean | Solo propiedades destacadas | `?featured=true` |

**Ejemplos de uso:**

```bash
# Obtener todas las propiedades (primera página)
GET /properties

# Buscar casas en venta en CDMX
GET /properties?type=casa&operation=venta&state=CDMX

# Propiedades destacadas para landing page
GET /properties?featured=true&limit=6

# Casas con al menos 3 recámaras y precio entre 2M y 8M
GET /properties?type=casa&bedrooms=3&minPrice=2000000&maxPrice=8000000
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "title": "Casa residencial con jardín en Polanco",
        "description": "Hermosa casa de 3 niveles con acabados de lujo...",
        "price": 8500000,
        "currency": "MXN",
        "type": "casa",
        "operation": "venta",
        "address": "Calle Aristóteles 123, Polanco",
        "city": "Ciudad de México",
        "state": "CDMX",
        "constructionArea": 320,
        "terrainArea": 380,
        "avgPricePerM2Construction": 26562.50,
        "avgPricePerM2Terrain": 22368.42,
        "bedrooms": 4,
        "bathrooms": 4.5,
        "parking": 3,
        "amenities": ["Jardín", "Terraza", "Seguridad 24h", "Cuarto de servicio"],
        "images": ["https://example.com/images/casa1.jpg"],
        "createdAt": "2023-07-01T10:00:00.000Z",
        "updatedAt": "2023-07-01T10:00:00.000Z"
      }
      // Más propiedades...
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalProperties": 45,
      "propertiesPerPage": 12,
      "hasNextPage": true,
      "hasPrevPage": false,
      "nextPage": 2,
      "prevPage": null
    }
  }
}
```

### 2. Obtener Propiedad Específica

Obtiene los detalles completos de una propiedad específica.

```
GET /properties/:id
```

**Parámetros de ruta:**

- `id` (string, requerido): ID único de la propiedad

**Ejemplo:**

```bash
GET /properties/123e4567-e89b-12d3-a456-426614174000
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {
    "property": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Casa residencial con jardín en Polanco",
      "description": "Hermosa casa de 3 niveles con acabados de lujo, amplio jardín y terraza. Ubicada en una de las zonas más exclusivas de la ciudad.",
      "price": 8500000,
      "currency": "MXN",
      "type": "casa",
      "operation": "venta",
      "address": "Calle Aristóteles 123, Polanco",
      "city": "Ciudad de México",
      "state": "CDMX",
      "country": "México",
      "constructionArea": 320,
      "terrainArea": 380,
      "avgPricePerM2Construction": 26562.50,
      "avgPricePerM2Terrain": 22368.42,
      "bedrooms": 4,
      "bathrooms": 4.5,
      "parking": 3,
      "amenities": ["Jardín", "Terraza", "Seguridad 24h", "Cuarto de servicio", "Cocina equipada"],
      "images": ["https://example.com/images/casa1.jpg"],
      "createdAt": "2023-07-01T10:00:00.000Z",
      "updatedAt": "2023-07-01T10:00:00.000Z",
      "contact": {
        "phone": "+52 55 1234 5678",
        "email": "info@grupoarze.com",
        "whatsapp": "+52 55 1234 5678"
      }
    }
  }
}
```

### 3. Obtener Tipos de Propiedades

Obtiene la lista de tipos de propiedades disponibles.

```
GET /properties/types
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {
    "types": [
      { "value": "casa", "label": "Casa" },
      { "value": "departamento", "label": "Departamento" },
      { "value": "oficina", "label": "Oficina" },
      { "value": "terreno", "label": "Terreno" },
      { "value": "commercial_local", "label": "Local Comercial" },
      { "value": "warehouse", "label": "Bodega" },
      { "value": "other", "label": "Otro" }
    ]
  }
}
```

### 4. Obtener Estadísticas Públicas

Obtiene estadísticas generales de las propiedades disponibles.

```
GET /properties/stats
```

**Respuesta exitosa:**

```json
{
  "success": true,
  "data": {
    "stats": {
      "totalProperties": 45,
      "propertiesForSale": 32,
      "propertiesForRent": 13,
      "typeBreakdown": {
        "casa": 25,
        "departamento": 15,
        "oficina": 3,
        "terreno": 2
      }
    }
  }
}
```

## Respuestas de Error

Todas las respuestas de error siguen el mismo formato:

```json
{
  "success": false,
  "error": "Título del error",
  "message": "Descripción detallada del error"
}
```

### Códigos de Estado HTTP

- `200 OK`: Solicitud exitosa
- `400 Bad Request`: Parámetros inválidos
- `404 Not Found`: Propiedad no encontrada
- `500 Internal Server Error`: Error del servidor

### Ejemplos de Errores

**Propiedad no encontrada (404):**

```json
{
  "success": false,
  "error": "Propiedad no encontrada",
  "message": "La propiedad solicitada no existe"
}
```

**Parámetros inválidos (400):**

```json
{
  "success": false,
  "error": "ID requerido",
  "message": "Se debe proporcionar un ID de propiedad válido"
}
```

**Error del servidor (500):**

```json
{
  "success": false,
  "error": "Error del servidor",
  "message": "No se pudieron obtener las propiedades en este momento"
}
```

## Modelo de Datos

### Propiedad Pública

```typescript
interface PublicProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: 'MXN' | 'USD';
  type: 'casa' | 'departamento' | 'oficina' | 'terreno' | 'commercial_local' | 'warehouse' | 'other';
  operation: 'venta' | 'renta';
  address: string;
  city: string;
  state: string;
  country?: string;
  constructionArea?: number; // Área de construcción en m²
  terrainArea?: number; // Área de terreno en m²
  avgPricePerM2Construction?: number; // Precio promedio por m² de construcción
  avgPricePerM2Terrain?: number; // Precio promedio por m² de terreno
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  amenities: string[];
  images: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  contact?: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}
```

### Paginación

```typescript
interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProperties: number;
  propertiesPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}
```

## Consideraciones de Seguridad

- ✅ **No se expone información sensible**: Los endpoints públicos no muestran información de contacto específica de agentes o propietarios
- ✅ **Solo propiedades activas**: Solo se muestran propiedades marcadas como activas y públicas
- ✅ **Rate limiting**: Se recomienda implementar rate limiting para prevenir abuso
- ✅ **CORS configurado**: Los endpoints están configurados para permitir solicitudes desde dominios autorizados

## Uso Recomendado para Landing Page

### Página Principal
```javascript
// Obtener 6 propiedades destacadas para el carousel principal
GET /properties?featured=true&limit=6

// Obtener estadísticas para mostrar números impresionantes
GET /properties/stats
```

### Página de Búsqueda
```javascript
// Búsqueda con filtros completos
GET /properties?type=casa&operation=venta&city=CDMX&minPrice=2000000&page=1&limit=12

// Obtener tipos para el filtro de tipo de propiedad
GET /properties/types
```

### Página de Detalle
```javascript
// Obtener detalles completos de una propiedad
GET /properties/123e4567-e89b-12d3-a456-426614174000
```

### Optimizaciones

1. **Caché**: Se recomienda implementar caché del lado del cliente para las estadísticas y tipos de propiedades
2. **Imágenes**: Las URLs de imágenes incluyen versiones optimizadas para web
3. **SEO**: Los datos están estructurados para facilitar la indexación por motores de búsqueda
4. **Performance**: La paginación evita cargar demasiados datos de una vez

## Integración con WhatsApp

Los datos de contacto incluyen números de WhatsApp listos para usar con enlaces directos:

```javascript
const whatsappUrl = `https://wa.me/${property.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hola, me interesa la propiedad: ${property.title}`;
```