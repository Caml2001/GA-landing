export interface Property {
  id: number;
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
}

export interface FilterOptions {
  type: string;
  location: string;
  price: string;
}
