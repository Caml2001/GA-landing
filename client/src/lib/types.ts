export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  pricePerMeter: string;
  status: string;
  type: string;
  image: string;
  area: string;
  bedrooms: string;
  bathrooms: string;
  year: string;
  description: string;
  descriptionExtended?: string;
  features: string[];
}

export interface FilterOptions {
  type: string;
  location: string;
  price: string;
}
