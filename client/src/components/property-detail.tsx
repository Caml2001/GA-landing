import React from "react";
import { Button } from "@/components/ui/button";
import { X, Image, Heart, Share, Check, Phone, MessageSquare } from "lucide-react";
import { Property } from "@/lib/types";

interface PropertyDetailProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  property, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  const modalClass = isOpen ? "flex" : "hidden";

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-80 z-50 ${modalClass} justify-center items-center p-4 md:p-0`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-screen overflow-auto slide-up">
        <div className="relative">
          <img
            src={property.image}
            alt={property.title}
            className="object-cover w-full h-72 md:h-96"
          />
          <button
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
            onClick={onClose}
            aria-label="Close detail"
          >
            <X className="h-6 w-6 text-gray-800" />
          </button>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none">
              <Image className="h-6 w-6 text-gray-800" />
            </button>
            <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none">
              <Heart className="h-6 w-6 text-gray-800" />
            </button>
            <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none">
              <Share className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-2xl md:text-3xl font-bold text-secondary">{property.price}</div>
              <div className="text-sm text-gray-500">Aprox. {property.pricePerMeter} / m²</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Área</div>
              <div className="font-medium">{property.area}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Habitaciones</div>
              <div className="font-medium">{property.bedrooms}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Baños</div>
              <div className="font-medium">{property.bathrooms}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 text-sm mb-1">Año</div>
              <div className="font-medium">{property.year}</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-serif text-xl font-bold mb-4">Descripción</h3>
            <p className="text-gray-700 mb-4">
              {property.description}
            </p>
            {property.descriptionExtended && (
              <p className="text-gray-700">
                {property.descriptionExtended}
              </p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-serif text-xl font-bold mb-4">Características</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-secondary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Button 
              variant="secondary" 
              size="xl" 
              className="flex-1 font-medium flex justify-center items-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Agendar visita
            </Button>
            <Button 
              variant="outlined" 
              size="xl" 
              className="flex-1 font-medium flex justify-center items-center"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Contactar asesor
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
