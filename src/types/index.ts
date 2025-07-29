export interface Shirt {
  id: string;
  name: string;
  collection: string;
  originalPrice: number;
  discountPercentage: number;
  images: string[];
  description: string;
  sizes: string[];
  colors?: string[];
  tags: string[];
  coutes: number;
  porcentajeWithCoutes: number;
  freeShippingThreshold: number;
  featured: boolean;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Filter {
  collections: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
} 