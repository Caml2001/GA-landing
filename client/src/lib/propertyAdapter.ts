import { Property } from "./types";
import { BackendProperty } from "./api";

/**
 * Convierte una propiedad del backend al formato esperado por el frontend
 */
export function adaptBackendProperty(backendProperty: BackendProperty): Property {
  // Mapear tipos del backend a tipos del frontend
  const typeMapping: Record<string, string> = {
    'casa': 'Casa',
    'departamento': 'Departamento',
    'oficina': 'Oficina',
    'terreno': 'Terreno',
    'commercial_local': 'Local Comercial',
    'warehouse': 'Bodega',
    'other': 'Otro'
  };

  // Formatear precio
  const formatPrice = (price: number, currency: string): string => {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(price);
  };

  // Formatear precio por metro cuadrado
  const formatPricePerMeter = (currency?: string, pricePerM2?: number): string => {
    if (!pricePerM2) return 'N/A';
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(pricePerM2);
  };

  // Formatear área
  const formatArea = (area?: number): string => {
    if (!area) return 'N/A';
    return `${area} m²`;
  };

  // Formatear habitaciones y baños
  const formatRooms = (type: 'hab' | 'baños', count?: number): string => {
    if (!count) return 'N/A';
    return `${count} ${type}.`;
  };

  // Formatear año
  const formatYear = (dateString: string): string => {
    const year = new Date(dateString).getFullYear();
    return year.toString();
  };

  // Determinar estado (por ahora todos serán "Disponible" ya que la API solo devuelve activos)
  const status = "Disponible";

  // Usar la primera imagen o una imagen por defecto
  const image = backendProperty.images[0] || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80";

  // Construir ubicación completa
  const location = `${backendProperty.city}, ${backendProperty.state}`;

  return {
    id: parseInt(backendProperty.id.replace(/\D/g, '').slice(0, 10)) || Math.floor(Math.random() * 1000000), // Convertir UUID a número
    title: backendProperty.title,
    location: location,
    price: formatPrice(backendProperty.price, backendProperty.currency),
    pricePerMeter: formatPricePerMeter(backendProperty.currency, backendProperty.avgPricePerM2Construction),
    status: status,
    type: typeMapping[backendProperty.type] || 'Otro',
    image: image,
    area: formatArea(backendProperty.constructionArea || backendProperty.terrainArea),
    bedrooms: formatRooms('hab', backendProperty.bedrooms),
    bathrooms: formatRooms('baños', backendProperty.bathrooms),
    year: formatYear(backendProperty.createdAt),
    description: backendProperty.description,
    descriptionExtended: undefined, // El backend no tiene descripción extendida separada
    features: backendProperty.amenities,
    // Campos adicionales del backend
    constructionArea: backendProperty.constructionArea ? formatArea(backendProperty.constructionArea) : undefined,
    terrainArea: backendProperty.terrainArea ? formatArea(backendProperty.terrainArea) : undefined,
    pricePerMeterTerrain: formatPricePerMeter(backendProperty.currency, backendProperty.avgPricePerM2Terrain),
    operation: backendProperty.operation === 'venta' ? 'Venta' : 'Renta',
    parking: backendProperty.parking,
    currency: backendProperty.currency,
    rawPrice: backendProperty.price
  };
}

/**
 * Convierte un array de propiedades del backend al formato del frontend
 */
export function adaptBackendProperties(backendProperties: BackendProperty[]): Property[] {
  return backendProperties.map(adaptBackendProperty);
}

/**
 * Convierte los filtros del frontend al formato esperado por el backend
 */
export function adaptFiltersToBackend(frontendFilters: {
  type: string;
  location: string;
  price: string;
}): {
  type?: string;
  location?: string;
  priceRange?: string;
} {
  const backendFilters: any = {};

  // Mapear tipos del frontend al backend
  const typeMapping: Record<string, string> = {
    'Casa': 'casa',
    'Departamento': 'departamento',
    'Villa': 'casa', // Villa se mapea a casa
    'Penthouse': 'departamento', // Penthouse se mapea a departamento
    'Mansión': 'casa', // Mansión se mapea a casa
    'Oficina': 'oficina',
    'Terreno': 'terreno',
    'Local Comercial': 'commercial_local',
    'Bodega': 'warehouse'
  };

  if (frontendFilters.type && frontendFilters.type !== '') {
    backendFilters.type = typeMapping[frontendFilters.type] || frontendFilters.type.toLowerCase();
  }

  if (frontendFilters.location && frontendFilters.location !== '') {
    backendFilters.location = frontendFilters.location;
  }

  if (frontendFilters.price && frontendFilters.price !== '') {
    backendFilters.priceRange = frontendFilters.price;
  }

  return backendFilters;
} 