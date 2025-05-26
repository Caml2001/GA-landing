import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* Imagen skeleton */}
        <Skeleton className="w-full h-64" />
        
        {/* Precio skeleton */}
        <div className="absolute top-4 right-4">
          <Skeleton className="h-6 w-24 rounded-full bg-white/20" />
        </div>
        
        {/* Status skeleton */}
        <div className="absolute bottom-4 left-4">
          <Skeleton className="h-5 w-20 rounded bg-white/20" />
        </div>
      </div>
      
      <CardContent className="p-6">
        {/* Título skeleton */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        
        {/* Ubicación skeleton */}
        <Skeleton className="h-4 w-1/2 mb-4" />
        
        {/* Iconos y datos skeleton */}
        <div className="flex justify-between">
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-1" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-1" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCardSkeleton; 