export interface AdminUser {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'super-admin';
  createdAt: Date;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface ShirtFormData {
  name: string;
  collection: string;
  originalPrice: number;
  discountPercentage: number;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  tags: string[];
  coutes: number;
  porcentajeWithCoutes: number;
  freeShippingThreshold: number;
  featured: boolean;
}

export interface CollectionFormData {
  name: string;
  description: string;
  image: string;
}

export interface SettingsFormData {
  contact: {
    phone: string;
    whatsapp: string;
    whatsappDefaultMessage: string;
    email: string;
    address: string;
  };
  socialNetworks: {
    id: string;
    name: string;
    url: string;
    icon: string;
    enabled: boolean;
  }[];
  texts: {
    footerDescription: string;
  };
}