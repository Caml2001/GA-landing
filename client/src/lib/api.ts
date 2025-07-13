import { config, getApiUrl } from './config';

// Configuración base de la API
const API_BASE_URL = config.apiBaseUrl;

// Tipos para la API del backend
export interface BackendProperty {
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
  constructionArea?: number;
  terrainArea?: number;
  avgPricePerM2Construction?: number;
  avgPricePerM2Terrain?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  amenities: string[];
  images: string[];
  virtualTourUrl?: string;
  createdAt: string;
  updatedAt: string;
  contact?: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface PropertiesResponse {
  properties: BackendProperty[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProperties: number;
    propertiesPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export interface PropertyFilters {
  page?: number;
  limit?: number;
  type?: string | string[];
  operation?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  state?: string;
  bedrooms?: number;
  bathrooms?: number;
  minConstructionArea?: number;
  minTerrainArea?: number;
  featured?: boolean;
}

export interface PropertyStats {
  totalProperties: number;
  propertiesForSale: number;
  propertiesForRent: number;
  typeBreakdown: Record<string, number>;
}

export interface PropertyType {
  value: string;
  label: string;
}

// Función helper para construir query strings
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });
  
  return searchParams.toString();
}

// Función helper para hacer requests a la API
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const fullUrl = `${API_BASE_URL}${endpoint}`;
  
  try {
    console.log(`🌐 API Request: ${fullUrl}`);
    
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    console.log(`📡 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API Error: ${response.status} - ${errorText}`);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ API Success:`, data);
    return data;
  } catch (error) {
    console.error(`💥 API request failed for ${fullUrl}:`, error);
    
    // Información adicional para debugging
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('🚨 Posibles causas:');
      console.error('   1. El backend no está ejecutándose');
      console.error('   2. CORS no está configurado correctamente');
      console.error('   3. La URL es incorrecta:', fullUrl);
    }
    
    throw error;
  }
}

// Servicios de la API

/**
 * Obtiene una lista paginada de propiedades con filtros opcionales
 */
export async function getProperties(filters: PropertyFilters = {}): Promise<ApiResponse<PropertiesResponse>> {
  const queryString = buildQueryString(filters);
  const endpoint = `/properties${queryString ? `?${queryString}` : ''}`;
  return apiRequest<PropertiesResponse>(endpoint);
}

/**
 * Obtiene los detalles de una propiedad específica
 */
export async function getPropertyById(id: string): Promise<ApiResponse<{ property: BackendProperty }>> {
  return apiRequest<{ property: BackendProperty }>(`/properties/${id}`);
}

/**
 * Obtiene la lista de tipos de propiedades disponibles
 */
export async function getPropertyTypes(): Promise<ApiResponse<{ types: PropertyType[] }>> {
  return apiRequest<{ types: PropertyType[] }>('/properties/types');
}

/**
 * Obtiene estadísticas generales de las propiedades
 */
export async function getPropertyStats(): Promise<ApiResponse<{ stats: PropertyStats }>> {
  return apiRequest<{ stats: PropertyStats }>('/properties/stats');
}

/**
 * Obtiene propiedades destacadas para la landing page
 */
export async function getFeaturedProperties(limit: number = 6): Promise<ApiResponse<PropertiesResponse>> {
  return getProperties({ featured: true, limit });
}

/**
 * Busca propiedades con filtros específicos
 */
export async function searchProperties(searchFilters: {
  type?: string;
  location?: string;
  priceRange?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<PropertiesResponse>> {
  const filters: PropertyFilters = {
    page: searchFilters.page || 1,
    limit: searchFilters.limit || 12,
  };

  // Mapear tipo
  if (searchFilters.type) {
    filters.type = searchFilters.type.toLowerCase();
  }

  // Mapear ubicación (buscar en city o state)
  if (searchFilters.location) {
    filters.city = searchFilters.location;
  }

  // Mapear rango de precios
  if (searchFilters.priceRange) {
    const priceMapping: Record<string, { min?: number; max?: number }> = {
      '$500,000 - $1,000,000': { min: 500000, max: 1000000 },
      '$1,000,000 - $2,000,000': { min: 1000000, max: 2000000 },
      '$2,000,000 - $5,000,000': { min: 2000000, max: 5000000 },
      '$5,000,000+': { min: 5000000 },
    };

    const priceRange = priceMapping[searchFilters.priceRange];
    if (priceRange) {
      if (priceRange.min) filters.minPrice = priceRange.min;
      if (priceRange.max) filters.maxPrice = priceRange.max;
    }
  }

  // Nota: El backend actual no soporta búsqueda por texto libre
  // El searchTerm se manejará en el cliente después de obtener los datos
  const response = await getProperties(filters);
  
  // Si hay un término de búsqueda, filtrar localmente
  if (response.success && searchFilters.searchTerm && searchFilters.searchTerm.trim() !== '') {
    const searchTerm = searchFilters.searchTerm.toLowerCase().trim();
    const filteredProperties = response.data.properties.filter(property => {
      return (
        property.title.toLowerCase().includes(searchTerm) ||
        property.description.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm) ||
        property.city.toLowerCase().includes(searchTerm) ||
        property.state.toLowerCase().includes(searchTerm) ||
        property.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm))
      );
    });

    // Actualizar la paginación para reflejar los resultados filtrados
    const totalProperties = filteredProperties.length;
    const start = ((searchFilters.page || 1) - 1) * (searchFilters.limit || 12);
    const end = start + (searchFilters.limit || 12);
    const paginatedProperties = filteredProperties.slice(start, end);

    return {
      success: true,
      data: {
        properties: paginatedProperties,
        pagination: {
          currentPage: searchFilters.page || 1,
          totalPages: Math.ceil(totalProperties / (searchFilters.limit || 12)),
          totalProperties: totalProperties,
          propertiesPerPage: searchFilters.limit || 12,
          hasNextPage: end < totalProperties,
          hasPrevPage: (searchFilters.page || 1) > 1,
          nextPage: end < totalProperties ? (searchFilters.page || 1) + 1 : null,
          prevPage: (searchFilters.page || 1) > 1 ? (searchFilters.page || 1) - 1 : null,
        }
      }
    };
  }

  return response;
} 