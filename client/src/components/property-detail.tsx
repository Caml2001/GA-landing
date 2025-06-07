import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Image, 
  Heart, 
  Share, 
  Check, 
  Phone, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Calendar,
  Ruler,
  Car,
  Home,
  Bath,
  Bed,
  DollarSign
} from "lucide-react";
import { Property } from "@/lib/types";
import { generatePropertyUrl } from "@/lib/utils";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  if (!isOpen) return null;



  const handleClose = () => {
    const propertyId = property?.id;
    
    // UUIDs originales del backend de las propiedades de DHASA
    const dhasaUUIDs = [
      'f6001b1b-e6bc-4459-b816-4aa92cbaca36',
      '15869b7e-9ff1-43a7-b1ab-9b0e35e3d2b2',
      '63dbc3bc-505e-4ae7-aef4-7f9c49c186ca',
      'ee8a1805-cd9b-47f8-ace3-2709730d15b0'
    ];
    
    const isDhasa = dhasaUUIDs.includes(propertyId || '');
    
    console.log('Property ID:', propertyId);
    console.log('Is DHASA property?', isDhasa);
    
    if (property && isDhasa) {
      console.log('✅ Redirecting to dhasa.com.mx');
      window.location.href = 'https://dhasa.com.mx/';
    } else {
      console.log('❌ Going to home');
      onClose();
    }
  };

  // Usar todas las imágenes reales del backend
  const images = property.images || [];

  // Reiniciar el índice de imagen cuando cambie la propiedad
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [property.id]);

  // Debug logs
  console.log('Property images:', images);
  console.log('Current image index:', currentImageIndex);
  console.log('Total images:', images.length);

  const nextImage = () => {
    console.log('Next image clicked');
    setCurrentImageIndex((prev) => {
      const newIndex = (prev + 1) % images.length;
      console.log('Moving from', prev, 'to', newIndex);
      return newIndex;
    });
  };

  const prevImage = () => {
    console.log('Previous image clicked');
    setCurrentImageIndex((prev) => {
      const newIndex = (prev - 1 + images.length) % images.length;
      console.log('Moving from', prev, 'to', newIndex);
      return newIndex;
    });
  };

  const handleWhatsApp = () => {
    const propertyPath = generatePropertyUrl(property.id, property.title);
    const propertyUrl = `${window.location.origin}${propertyPath}`;
    const message = `Hola, me interesa la propiedad: ${property.title} - ${property.price}\n\nVer más detalles: ${propertyUrl}`;
    // TODO: Usar número de WhatsApp del backend cuando esté disponible
    // const whatsappNumber = property.contact?.whatsapp;
    const whatsappNumber = "+524491102428"; // Temporal hasta tener backend
    if (whatsappNumber) {
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCall = () => {
    // TODO: Usar número de teléfono del backend cuando esté disponible
    // const phoneNumber = property.contact?.phone;
    const phoneNumber = "+524491102428"; // Temporal hasta tener backend
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleShare = async () => {
    // Generar URL SEO-friendly de la propiedad
    const propertyPath = generatePropertyUrl(property.id, property.title);
    const propertyUrl = `${window.location.origin}${propertyPath}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Mira esta increíble propiedad: ${property.title}`,
          url: propertyUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      navigator.clipboard.writeText(propertyUrl);
      alert('Enlace copiado al portapapeles');
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden">
      {/* MÓVIL: Pantalla completa */}
      <div className="h-full flex flex-col md:hidden">
        {/* Header con imagen y controles */}
        <div className="relative h-64 bg-gray-900">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={property.title}
                className="object-cover w-full h-full"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-center">
                <Home className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm opacity-75">Sin imagen disponible</p>
              </div>
            </div>
          )}
          
          {/* Controles superiores */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <button
              onClick={handleClose}
              className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>
            
            <div className="flex space-x-2">
              <button 
                onClick={handleShare}
                className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
              >
                <Share className="h-5 w-5 text-gray-800" />
              </button>
              <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                <Heart className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Navegación de imágenes */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
              >
                <ChevronLeft className="h-5 w-5 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
              >
                <ChevronRight className="h-5 w-5 text-gray-800" />
              </button>
              
              {/* Indicadores de imagen */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Contador de imágenes */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Información principal */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-secondary">{property.price}</div>
                  <div className="text-xs text-gray-500">{property.pricePerMeter} / m²</div>
                </div>
              </div>

              {/* Estado de la propiedad */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {property.status}
              </div>
            </div>

            {/* Características principales - Grid compacto */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Home className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Área</span>
                </div>
                <div className="font-semibold text-sm">
                  {property.constructionArea || property.terrainArea || property.area}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Bed className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Recámaras</span>
                </div>
                <div className="font-semibold text-sm">{property.bedrooms}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Bath className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Baños</span>
                </div>
                <div className="font-semibold text-sm">{property.bathrooms}</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-xs text-gray-500">Año</span>
                </div>
                <div className="font-semibold text-sm">{property.year}</div>
              </div>
            </div>

            {/* Información adicional del backend */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detalles de la propiedad</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Tipo de propiedad</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                
                {property.operation && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Operación</span>
                    <span className="font-medium">{property.operation}</span>
                  </div>
                )}
                
                {property.constructionArea && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Área de construcción</span>
                    <span className="font-medium">{property.constructionArea}</span>
                  </div>
                )}
                
                {property.terrainArea && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Área de terreno</span>
                    <span className="font-medium">{property.terrainArea}</span>
                  </div>
                )}
                 
                {property.pricePerMeter && property.pricePerMeter !== 'N/A' && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Precio por m² construcción</span>
                    <span className="font-medium">{property.pricePerMeter}</span>
                  </div>
                )}
                
                {property.pricePerMeterTerrain && property.pricePerMeterTerrain !== 'N/A' && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Precio por m² terreno</span>
                    <span className="font-medium">{property.pricePerMeterTerrain}</span>
                  </div>
                )}
                
                {property.parking && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Estacionamientos</span>
                    <span className="font-medium">{property.parking} espacios</span>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Descripción</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {property.description}
              </p>
              {property.descriptionExtended && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {property.descriptionExtended}
                </p>
              )}
            </div>

            {/* Características y amenidades */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Características</h3>
              <div className="grid grid-cols-1 gap-2">
                {property.features.slice(0, showAllFeatures ? property.features.length : 6).map((feature, index) => (
                  <div key={index} className="flex items-center py-1">
                    <Check className="h-4 w-4 mr-3 text-secondary flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              {property.features.length > 6 && (
                <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="mt-3 text-secondary text-sm font-medium"
                >
                  {showAllFeatures ? 'Ver menos' : `Ver todas (${property.features.length})`}
                </button>
              )}
            </div>

            

            {/* Espaciado para los botones fijos */}
            <div className="h-20"></div>
          </div>
        </div>

        {/* Botones de acción fijos en la parte inferior */}
        <div className="bg-white border-t border-gray-200 p-4 space-y-3">
          <div className="flex gap-3">
            <Button 
              onClick={handleCall}
              variant="outlined" 
              className="flex-1 py-3 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Llamar
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className="flex-1 py-3 bg-secondary text-white flex items-center justify-center"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
          </div>
          <Button 
            variant="outlined" 
            className="w-full py-3 border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            Agendar visita
          </Button>
        </div>
      </div>

      {/* DESKTOP: Modal centrado (diseño original mejorado) */}
      <div 
        className="hidden md:flex fixed inset-0 bg-black bg-opacity-80 justify-center items-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) handleClose();
        }}
      >
        <div className="bg-white rounded-xl max-w-5xl w-full max-h-screen overflow-auto">
          <div className="relative">
            {/* Galería de imágenes para desktop */}
            <div className="relative h-96 bg-gray-900">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Controles de navegación */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white text-center">
                    <Home className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg opacity-75">Sin imagen disponible</p>
                  </div>
                </div>
              )}
            </div>

            <button
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
              onClick={handleClose}
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
              <button 
                onClick={handleShare}
                className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
              >
                <Share className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">{property.title}</h2>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-2xl md:text-3xl font-bold text-secondary">{property.price}</div>
                <div className="text-sm text-gray-500">Aprox. {property.pricePerMeter} / m²</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Área</div>
                <div className="font-medium">{property.constructionArea || property.terrainArea || property.area}</div>
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
                onClick={handleCall}
                variant="secondary" 
                size="xl" 
                className="flex-1 font-medium flex justify-center items-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Agendar visita
              </Button>
              <Button 
                onClick={handleWhatsApp}
                variant="outlined" 
                size="xl" 
                className="flex-1 font-medium flex justify-center items-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
