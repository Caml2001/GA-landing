import { useQuery } from "@tanstack/react-query";
import { 
  getProperties, 
  getPropertyById, 
  getFeaturedProperties, 
  searchProperties,
  getPropertyStats,
  getPropertyTypes,
  PropertyFilters 
} from "@/lib/api";
import { adaptBackendProperties, adaptBackendProperty, adaptFiltersToBackend } from "@/lib/propertyAdapter";
import { Property, FilterOptions } from "@/lib/types";

/**
 * Hook para obtener propiedades con filtros
 */
export function useProperties(filters: PropertyFilters = {}) {
  return useQuery({
    queryKey: ['properties', filters],
    queryFn: async () => {
      const response = await getProperties(filters);
      if (response.success) {
        return {
          properties: adaptBackendProperties(response.data.properties),
          pagination: response.data.pagination
        };
      }
      throw new Error(response.message || 'Error al obtener propiedades');
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook para obtener propiedades destacadas
 */
export function useFeaturedProperties(limit: number = 6) {
  return useQuery({
    queryKey: ['properties', 'featured', limit],
    queryFn: async () => {
      const response = await getFeaturedProperties(limit);
      if (response.success) {
        return adaptBackendProperties(response.data.properties);
      }
      throw new Error(response.message || 'Error al obtener propiedades destacadas');
    },
    staleTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook para obtener una propiedad específica por ID
 */
export function useProperty(id: string) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const response = await getPropertyById(id);
      if (response.success) {
        return adaptBackendProperty(response.data.property);
      }
      throw new Error(response.message || 'Error al obtener la propiedad');
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook para buscar propiedades con filtros del frontend
 */
export function useSearchProperties(frontendFilters: FilterOptions, page: number = 1, limit: number = 50) {
  return useQuery({
    queryKey: ['properties', 'search', frontendFilters, page, limit],
    queryFn: async () => {
      const backendFilters = adaptFiltersToBackend(frontendFilters);
      const response = await searchProperties({
        ...backendFilters,
        page,
        limit
      });
      if (response.success) {
        return {
          properties: adaptBackendProperties(response.data.properties),
          pagination: response.data.pagination
        };
      }
      throw new Error(response.message || 'Error al buscar propiedades');
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook para obtener estadísticas de propiedades
 */
export function usePropertyStats() {
  return useQuery({
    queryKey: ['properties', 'stats'],
    queryFn: async () => {
      const response = await getPropertyStats();
      if (response.success) {
        return response.data.stats;
      }
      throw new Error(response.message || 'Error al obtener estadísticas');
    },
    staleTime: 30 * 60 * 1000, // 30 minutos
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook para obtener tipos de propiedades
 */
export function usePropertyTypes() {
  return useQuery({
    queryKey: ['properties', 'types'],
    queryFn: async () => {
      const response = await getPropertyTypes();
      if (response.success) {
        return response.data.types;
      }
      throw new Error(response.message || 'Error al obtener tipos de propiedades');
    },
    staleTime: 60 * 60 * 1000, // 1 hora
    refetchOnWindowFocus: false,
  });
} 