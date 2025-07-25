export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  pricePerMeter: string;
  status: string;
  type: string;
  images: string[];
  area: string;
  bedrooms: string;
  bathrooms: string;
  year: string;
  description: string;
  descriptionExtended?: string;
  features: string[];
  // Campos adicionales del backend
  constructionArea?: string;
  terrainArea?: string;
  pricePerMeterTerrain?: string;
  operation?: string;
  parking?: number;
  currency?: string;
  rawPrice?: number;
  virtualTourUrl?: string;
}

export interface FilterOptions {
  searchTerm?: string;
  type: string;
  location: string;
  price: string;
}
