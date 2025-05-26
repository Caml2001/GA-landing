import React, { useState, useEffect } from "react";
import PropertyCard from "@/components/property-card";
import PropertyCardSkeleton from "@/components/property-card-skeleton";
import FiltersEnhanced from "@/components/filters-enhanced";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// Removido import de datos estáticos - solo usamos backend
import { Property, FilterOptions } from "@/lib/types";
import { useSearchProperties } from "@/hooks/useProperties";

interface PropertyMarketplaceProps {
  onPropertyClick: (property: Property) => void;
}

const PropertyMarketplaceEnhanced: React.FC<PropertyMarketplaceProps> = ({ 
  onPropertyClick 
}) => {
  const [visibleProperties, setVisibleProperties] = useState(6);
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    location: "",
    price: "",
  });

  // 🆕 Intentar obtener datos del backend
  const { 
    data: backendData, 
    isLoading, 
    error 
  } = useSearchProperties(filters, 1, 50);

  // 🆕 Solo usar datos del backend, NO datos estáticos
  const allProperties = backendData?.properties || [];
  const isUsingBackend = !!backendData && !error;

  // Determinar qué propiedades mostrar
  const filteredProperties = allProperties.slice(0, visibleProperties);

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setVisibleProperties(6); // Reset visible properties
  };

  const loadMoreProperties = () => {
    setVisibleProperties(prev => Math.min(prev + 3, allProperties.length));
  };

  // 🆕 Log para debugging (solo en desarrollo)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      if (isUsingBackend) {
        console.log(`✅ Usando datos del backend: ${allProperties.length} propiedades`);
      } else if (error) {
        console.warn('⚠️ Backend no disponible, usando datos estáticos:', error.message);
      } else {
        console.log('📊 Usando datos estáticos');
      }
    }
  }, [isUsingBackend, allProperties.length, error]);

  // 🎨 DISEÑO ORIGINAL MANTENIDO EXACTAMENTE IGUAL
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

        <FiltersEnhanced onApplyFilters={applyFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading || (!backendData && !error) ? (
            // Mostrar skeletons mientras carga
            Array.from({ length: 6 }).map((_, index) => (
              <PropertyCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : filteredProperties.length > 0 ? (
            // Mostrar propiedades del backend
            filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onClick={() => onPropertyClick(property)} 
              />
            ))
          ) : (
            // Mensaje cuando no hay propiedades
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">
                {error ? 'Error al cargar propiedades. Verifique su conexión.' : 'No hay propiedades disponibles.'}
              </p>
            </div>
          )}
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

        {/* Indicador de resultados */}
        {allProperties.length > 0 && (
          <div className="text-center mt-8 text-gray-600">
            <p>
              Mostrando {Math.min(visibleProperties, allProperties.length)} de {allProperties.length} propiedades
              {isUsingBackend && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Datos actualizados
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyMarketplaceEnhanced; 