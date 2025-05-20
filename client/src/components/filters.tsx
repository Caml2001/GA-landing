import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterOptions } from "@/lib/types";

interface FiltersProps {
  onApplyFilters: (filters: FilterOptions) => void;
}

const Filters: React.FC<FiltersProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    location: "",
    price: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="mb-12 bg-gray-100 rounded-xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary bg-white py-2 px-3"
          >
            <option value="">Todos los tipos</option>
            <option value="Casa">Casa</option>
            <option value="Departamento">Departamento</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Mansión">Mansión</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Ubicación
          </label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary bg-white py-2 px-3"
          >
            <option value="">Todas las ubicaciones</option>
            <option value="Ciudad de México">Ciudad de México</option>
            <option value="Monterrey">Monterrey</option>
            <option value="Guadalajara">Guadalajara</option>
            <option value="Cancún">Cancún</option>
            <option value="Los Cabos">Los Cabos</option>
            <option value="Valle de Bravo">Valle de Bravo</option>
            <option value="San Miguel">San Miguel de Allende</option>
            <option value="Puerto Vallarta">Puerto Vallarta</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <select
            id="price"
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary bg-white py-2 px-3"
          >
            <option value="">Todos los precios</option>
            <option value="$500,000 - $1,000,000">$500,000 - $1,000,000</option>
            <option value="$1,000,000 - $2,000,000">$1,000,000 - $2,000,000</option>
            <option value="$2,000,000 - $5,000,000">$2,000,000 - $5,000,000</option>
            <option value="$5,000,000+">$5,000,000+</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button 
          variant="secondary" 
          onClick={handleApplyFilters}
          className="px-8 py-2 rounded-md font-medium"
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
};

export default Filters;
