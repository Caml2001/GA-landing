import React, { useState } from "react";
import PropertyCard from "@/components/property-card";
import Filters from "@/components/filters";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { properties } from "@/data/properties";
import { Property, FilterOptions } from "@/lib/types";

interface PropertyMarketplaceProps {
  onPropertyClick: (property: Property) => void;
}

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

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    let filtered = [...properties];
    
    if (newFilters.type) {
      filtered = filtered.filter(property => property.type === newFilters.type);
    }
    
    if (newFilters.location) {
      filtered = filtered.filter(property => property.location.includes(newFilters.location));
    }
    
    if (newFilters.price) {
      const priceRange = newFilters.price.split(" - ");
      if (priceRange.length === 2) {
        const minPrice = parseFloat(priceRange[0].replace(/[^\d.]/g, ''));
        const maxPrice = parseFloat(priceRange[1].replace(/[^\d.]/g, ''));
        filtered = filtered.filter(property => {
          const propertyPrice = parseFloat(property.price.replace(/[^\d.]/g, ''));
          return propertyPrice >= minPrice && propertyPrice <= maxPrice;
        });
      } else if (newFilters.price.includes("+")) {
        const minPrice = parseFloat(newFilters.price.replace(/[^\d.]/g, ''));
        filtered = filtered.filter(property => {
          const propertyPrice = parseFloat(property.price.replace(/[^\d.]/g, ''));
          return propertyPrice >= minPrice;
        });
      }
    }
    
    setFilteredProperties(filtered);
  };

  const loadMoreProperties = () => {
    setVisibleProperties(prev => Math.min(prev + 3, filteredProperties.length));
  };

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

        <Filters onApplyFilters={applyFilters} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.slice(0, visibleProperties).map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => onPropertyClick(property)} 
            />
          ))}
        </div>

        {visibleProperties < filteredProperties.length && (
          <div className="flex justify-center mt-12">
            <Button 
              variant="outlined" 
              size="lg" 
              onClick={loadMoreProperties}
              className="font-medium"
            >
              Cargar más propiedades
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {filteredProperties.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No se encontraron propiedades con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyMarketplace;
