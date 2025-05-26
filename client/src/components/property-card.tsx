import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, BedDouble, Bath } from "lucide-react";
import { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <Card
      className="overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={property.images[0] || "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"}
          alt={property.title}
          className="object-cover w-full h-64"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary">
          {property.price}
        </div>
        <Badge 
          variant={property.status === "Disponible" ? "available" : "sold"}
          className="absolute bottom-4 left-4 px-3 py-1 text-xs font-medium"
        >
          {property.status}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-bold mb-2">{property.title}</h3>
        <p className="text-gray-600 mb-4">{property.location}</p>
        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex items-center">
            <Home className="h-5 w-5 mr-1 text-gray-500" />
            <span>{property.area}</span>
          </div>
          <div className="flex items-center">
            <BedDouble className="h-5 w-5 mr-1 text-gray-500" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-5 w-5 mr-1 text-gray-500" />
            <span>{property.bathrooms}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
