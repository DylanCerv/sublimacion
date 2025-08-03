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

export interface SocialNetwork {
  id: string;
  name: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  whatsappDefaultMessage: string;
  email: string;
  address?: string;
  businessHours: string;
}

export interface SiteTexts {
  footerDescription: string;
}

export interface SiteSettings {
  id: string;
  contact: ContactInfo;
  socialNetworks: SocialNetwork[];
  texts: SiteTexts;
  createdAt: Date;
  updatedAt: Date;
} 