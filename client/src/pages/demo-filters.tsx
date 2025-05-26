import React, { useState } from "react";
import FiltersEnhanced from "@/components/filters-enhanced";
import PropertyMarketplaceEnhanced from "@/components/property-marketplace-enhanced";
import { Property } from "@/lib/types";

const DemoFilters: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    console.log("Propiedad seleccionada:", property);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Demo - Filtros Mejorados
          </h1>
          <p className="text-gray-600 mt-2">
            Prueba los nuevos filtros inspirados en las mejores plataformas inmobiliarias
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Información sobre las mejoras */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            🎉 Nuevas funcionalidades de filtros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h3 className="font-medium mb-2">✨ Filtros básicos mejorados:</h3>
              <ul className="space-y-1">
                <li>• Búsqueda por ubicación con ícono</li>
                <li>• Selector de Venta/Renta</li>
                <li>• Tipos de inmueble con checkboxes</li>
                <li>• Rangos de precio actualizados</li>
                <li>• Filtros de recámaras y baños</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">🔧 Filtros avanzados:</h3>
              <ul className="space-y-1">
                <li>• Rango de área (m²)</li>
                <li>• Amenidades con checkboxes</li>
                <li>• Filtros activos visibles</li>
                <li>• Botones limpiar y aplicar</li>
                <li>• Diseño responsive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Marketplace con filtros mejorados */}
        <PropertyMarketplaceEnhanced onPropertyClick={handlePropertyClick} />

        {/* Modal simple para mostrar propiedad seleccionada */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{selectedProperty.title}</h3>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-2 text-sm">
                <p><strong>Ubicación:</strong> {selectedProperty.location}</p>
                <p><strong>Precio:</strong> {selectedProperty.price}</p>
                <p><strong>Tipo:</strong> {selectedProperty.type}</p>
                <p><strong>Área:</strong> {selectedProperty.area}</p>
                <p><strong>Recámaras:</strong> {selectedProperty.bedrooms}</p>
                <p><strong>Baños:</strong> {selectedProperty.bathrooms}</p>
              </div>
              <button
                onClick={() => setSelectedProperty(null)}
                className="w-full mt-4 bg-secondary text-white py-2 rounded-lg hover:bg-secondary-dark"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoFilters; 