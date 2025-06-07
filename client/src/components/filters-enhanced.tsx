import React, { useState } from "react";
import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/lib/types";

interface FiltersEnhancedProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

interface ExtendedFilterOptions extends FilterOptions {
  searchTerm: string;
  bedrooms: string;
  bathrooms: string;
  minArea: string;
  maxArea: string;
  amenities: string[];
  listingType: string; // "Venta" o "Renta"
}

const FiltersEnhanced: React.FC<FiltersEnhancedProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<ExtendedFilterOptions>({
    searchTerm: "",
    type: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
    amenities: [],
    listingType: "Venta"
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showPropertyTypes, setShowPropertyTypes] = useState(false);

  // Opciones para los filtros
  const propertyTypes = [
    { id: "departamento", label: "Departamento" },
    { id: "casa", label: "Casa" },
    { id: "terreno", label: "Terreno / Lote" },
    { id: "casa-condominio", label: "Casa en condominio" },
    { id: "local-comercial", label: "Local comercial" },
    { id: "oficina", label: "Oficina" },
    { id: "villa", label: "Villa" },
    { id: "penthouse", label: "Penthouse" }
  ];

  const locations = [
    "Ciudad de México",
    "Monterrey",
    "Guadalajara",
    "Cancún",
    "Los Cabos",
    "Valle de Bravo",
    "San Miguel de Allende",
    "Puerto Vallarta",
    "Mérida",
    "Playa del Carmen"
  ];

  const priceRanges = [
    "$500,000 - $1,000,000",
    "$1,000,000 - $2,000,000", 
    "$2,000,000 - $5,000,000",
    "$5,000,000 - $10,000,000",
    "$10,000,000+"
  ];

  const bedroomOptions = ["1", "2", "3", "4", "5+"];
  const bathroomOptions = ["1", "1.5", "2", "2.5", "3", "3.5", "4+"];

  const amenitiesList = [
    "Piscina", "Jardín", "Terraza", "Balcón", "Estacionamiento",
    "Seguridad 24/7", "Gimnasio", "Elevador", "Aire acondicionado",
    "Calefacción", "Chimenea", "Vista al mar", "Amueblado"
  ];

  const handleInputChange = (field: keyof ExtendedFilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const handlePropertyTypeChange = (typeId: string) => {
    const selectedType = propertyTypes.find(t => t.id === typeId);
    setFilters(prev => ({
      ...prev,
      type: selectedType ? selectedType.label : ""
    }));
    setShowPropertyTypes(false);
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleApplyFilters = () => {
    const basicFilters: FilterOptions = {
      searchTerm: filters.searchTerm,
      type: filters.type,
      location: filters.location,
      price: filters.price
    };
    onApplyFilters(basicFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: ExtendedFilterOptions = {
      searchTerm: "",
      type: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      minArea: "",
      maxArea: "",
      amenities: [],
      listingType: "Venta"
    };
    setFilters(clearedFilters);
    onApplyFilters({
      searchTerm: "",
      type: "",
      location: "",
      price: ""
    });
  };

  return (
    <div className="mb-8 md:mb-12">
      {/* Filtros principales */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
        
        {/* MÓVIL: Layout optimizado para pantallas pequeñas */}
        <div className="block md:hidden space-y-4">
          {/* Barra de búsqueda - Ancho completo en móvil */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="¿Dónde buscas?"
              value={filters.searchTerm}
              onChange={handleSearchTermChange}
              className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-base"
            />
          </div>

          {/* Fila de filtros principales - 2 columnas en móvil */}
          <div className="grid grid-cols-2 gap-3">
            {/* Tipo de operación */}
            <div className="relative">
              <select
                value={filters.listingType}
                onChange={(e) => handleInputChange('listingType', e.target.value)}
                className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white text-base"
              >
                <option value="Venta">Venta</option>
                <option value="Renta">Renta</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Tipo de propiedad */}
            <div className="relative">
              <select
                value={filters.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white text-base"
              >
                <option value="">Tipo</option>
                {propertyTypes.map((type) => (
                  <option key={type.id} value={type.label}>{type.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>

          {/* Segunda fila - Precio y Recámaras */}
          <div className="grid grid-cols-2 gap-3">
            {/* Precio */}
            <div className="relative">
              <select
                value={filters.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white text-base"
              >
                <option value="">Precio</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Recámaras */}
            <div className="relative">
              <select
                value={filters.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                className="w-full px-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white text-base"
              >
                <option value="">Recámaras</option>
                {bedroomOptions.map((option) => (
                  <option key={option} value={option}>{option} rec.</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>

          {/* Botones de acción - Móvil */}
          <div className="flex gap-2">
            <Button
              variant="outlined"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex-1 flex items-center justify-center gap-2 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-base"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Más
            </Button>

            <Button
              onClick={handleClearFilters}
              variant="outlined"
              className="px-6 py-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-base"
            >
              Limpiar
            </Button>

            <Button
              onClick={handleApplyFilters}
              className="flex-1 py-4 bg-secondary text-white rounded-lg hover:bg-secondary-dark text-base font-medium"
            >
              Buscar
            </Button>
          </div>
        </div>

        {/* DESKTOP: Layout original para pantallas grandes */}
        <div className="hidden md:block">
          {/* Primera fila - Búsqueda y filtros básicos */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
            {/* Barra de búsqueda por ubicación */}
            <div className="lg:col-span-2 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, ubicación, características..."
                  value={filters.searchTerm}
                  onChange={handleSearchTermChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>

            {/* Tipo de operación */}
            <div className="relative">
              <select
                value={filters.listingType}
                onChange={(e) => handleInputChange('listingType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white"
              >
                <option value="Venta">Venta</option>
                <option value="Renta">Renta</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Tipo de propiedad */}
            <div className="relative">
              <button
                onClick={() => setShowPropertyTypes(!showPropertyTypes)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-white text-left flex items-center justify-between"
              >
                <span className={filters.type ? "text-gray-900" : "text-gray-500"}>
                  {filters.type || "Tipo de inmueble"}
                </span>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${showPropertyTypes ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown de tipos de propiedad */}
              {showPropertyTypes && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Tipo de inmueble</h3>
                    <div className="space-y-2">
                      {propertyTypes.map((type) => (
                        <label key={type.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            checked={filters.type === type.label}
                            onChange={() => handlePropertyTypeChange(type.id)}
                            className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                          />
                          <span className="text-gray-700">{type.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between mt-4 pt-3 border-t">
                      <button
                        onClick={() => {
                          setFilters(prev => ({ ...prev, type: "" }));
                          setShowPropertyTypes(false);
                        }}
                        className="text-secondary hover:text-secondary-dark font-medium"
                      >
                        Limpiar
                      </button>
                      <button
                        onClick={() => setShowPropertyTypes(false)}
                        className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark"
                      >
                        Ver resultados
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Precio */}
            <div className="relative">
              <select
                value={filters.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white"
              >
                <option value="">Precio</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>
          </div>

          {/* Segunda fila - Recámaras, Baños y Más filtros */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Recámaras */}
            <div className="relative">
              <select
                value={filters.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white"
              >
                <option value="">Recámaras</option>
                {bedroomOptions.map((option) => (
                  <option key={option} value={option}>{option} recámara{option !== "1" ? "s" : ""}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Baños */}
            <div className="relative">
              <select
                value={filters.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white"
              >
                <option value="">Baños</option>
                {bathroomOptions.map((option) => (
                  <option key={option} value={option}>{option} baño{option !== "1" ? "s" : ""}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Más filtros */}
            <div className="lg:col-span-3 flex gap-3">
              <Button
                variant="outlined"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-5 w-5" />
                Más filtros
              </Button>

              <Button
                onClick={handleClearFilters}
                variant="outlined"
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Limpiar
              </Button>

              <Button
                onClick={handleApplyFilters}
                className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark"
              >
                Buscar propiedades
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros avanzados - Responsive */}
        {showAdvancedFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Baños - Solo en móvil (en desktop ya está arriba) */}
              <div className="block md:hidden">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baños
                </label>
                <select
                  value={filters.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Seleccionar</option>
                  {bathroomOptions.map((option) => (
                    <option key={option} value={option}>{option} baño{option !== "1" ? "s" : ""}</option>
                  ))}
                </select>
              </div>

              {/* Área */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área (m²)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={filters.minArea}
                    onChange={(e) => handleInputChange('minArea', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-base"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={filters.maxArea}
                    onChange={(e) => handleInputChange('maxArea', e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent text-base"
                  />
                </div>
              </div>

              {/* Amenidades */}
              <div className="md:col-span-2 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenidades
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {amenitiesList.slice(0, 6).map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filtros activos - Responsive */}
      {(filters.type || filters.location || filters.price || filters.bedrooms || filters.bathrooms || filters.amenities.length > 0) && (
        <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
          {filters.type && (
            <span className="inline-flex items-center gap-1 px-3 py-2 bg-secondary/10 text-secondary rounded-full text-sm">
              {filters.type}
              <button onClick={() => handleInputChange('type', '')} className="hover:bg-secondary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.location && (
            <span className="inline-flex items-center gap-1 px-3 py-2 bg-secondary/10 text-secondary rounded-full text-sm">
              {filters.location}
              <button onClick={() => handleInputChange('location', '')} className="hover:bg-secondary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.price && (
            <span className="inline-flex items-center gap-1 px-3 py-2 bg-secondary/10 text-secondary rounded-full text-sm">
              {filters.price}
              <button onClick={() => handleInputChange('price', '')} className="hover:bg-secondary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.bedrooms && (
            <span className="inline-flex items-center gap-1 px-3 py-2 bg-secondary/10 text-secondary rounded-full text-sm">
              {filters.bedrooms} rec.
              <button onClick={() => handleInputChange('bedrooms', '')} className="hover:bg-secondary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.bathrooms && (
            <span className="inline-flex items-center gap-1 px-3 py-2 bg-secondary/10 text-secondary rounded-full text-sm">
              {filters.bathrooms} baño{filters.bathrooms !== "1" ? "s" : ""}
              <button onClick={() => handleInputChange('bathrooms', '')} className="hover:bg-secondary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.amenities.map((amenity) => (
            <span key={amenity} className="inline-flex items-center gap-1 px-3 py-2 bg-secondary/10 text-secondary rounded-full text-sm">
              {amenity}
              <button onClick={() => handleAmenityToggle(amenity)} className="hover:bg-secondary/20 rounded-full p-0.5">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FiltersEnhanced; 