import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { useSearchProperties } from "@/hooks/useProperties";
import PropertyDetail from "@/components/property-detail";
import { Property } from "@/lib/types";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractPropertyIdFromUrl } from "@/lib/utils";

const PropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Usar el hook existente para buscar propiedades
  const { data: propertiesData, isLoading, isError } = useSearchProperties({
    type: "",
    location: "",
    price: ""
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      return;
    }

    if (isError || !propertiesData?.properties) {
      setError("Error al cargar la propiedad");
      setLoading(false);
      return;
    }

    // Buscar la propiedad por ID
    const foundProperty = propertiesData.properties.find(
      (prop) => prop.id.toString() === id
    );

    if (foundProperty) {
      setProperty(foundProperty);
      setError(null);
    } else {
      setError("Propiedad no encontrada");
    }
    
    setLoading(false);
  }, [id, propertiesData, isLoading, isError]);

  // IDs específicos que deben redirigir a dhasa.com.mx
  const DHASA_PROPERTY_IDS = [
    'f6001b1b-e6bc-4459-b816-4aa92cbaca36',
    '15869b7e-9ff1-43a7-b1ab-9b0e35e3d2b2'
  ];

  const handleClose = () => {
    // Si la propiedad actual está en la lista de IDs de DHASA, redirigir a dhasa.com.mx
    if (property && DHASA_PROPERTY_IDS.includes(property.id.toString())) {
      window.location.href = 'https://dhasa.com.mx/';
    } else {
      setLocation("/");
    }
  };

  const handleGoHome = () => {
    setLocation("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error || "Propiedad no encontrada"}
          </h1>
          <p className="text-gray-600 mb-6">
            La propiedad que buscas no existe o ha sido removida.
          </p>
          <Button onClick={handleGoHome} className="bg-secondary text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <PropertyDetail
      property={property}
      isOpen={true}
      onClose={handleClose}
    />
  );
};

export default PropertyPage; 