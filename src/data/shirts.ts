import type { Shirt } from '../types';

export const shirts: Shirt[] = [
  {
    id: '1',
    name: 'Colapinto FW46 – Debut 2024',
    collection: 'FORMULA UNO',
    originalPrice: 30000000,
    discountPercentage: 33,
    images: [
      'https://acdn-us.mitiendanube.com/stores/003/856/863/products/hamilton-0e3941d52c6ae6205117490655635452-1024-1024.webp',
      'https://acdn-us.mitiendanube.com/stores/003/856/863/products/hamilton-frente-d35f51bf45d6d16f7417490655626655-1024-1024.webp',
      'https://acdn-us.mitiendanube.com/stores/003/856/863/products/sin-titulo-1-712d3e0f2ca173294b17490655563235-1024-1024.webp'
    ],
    description: 'Fit oversize – estilo relajado, con caída amplia y cómoda. Algodón 24/1 peinado – textura suave, resistente y de calidad. Estampa DTF premium – definición nítida, pensada para durar. Cuello con tapa costura – reforzado para mantener forma y estructura. Producción nacional – hecho en Argentina.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['f1', 'racing', 'hamilton', 'legacy'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true,
  },
  {
    id: '2',
    name: 'F1 MCL38 Driver Series',
    collection: 'FORMULA UNO',
    originalPrice: 30000,
    discountPercentage: 26.67,
    images: [
      'https://acdn-us.mitiendanube.com/stores/003/856/863/products/piastri-3d99e192029e0fc14017490648780901-1024-1024.webp',
      'https://acdn-us.mitiendanube.com/stores/003/856/863/products/piastri-frente-d0285c6ab18003fdb317490648767084-1024-1024.webp',
      'https://acdn-us.mitiendanube.com/stores/003/856/863/products/sin-titulo-1-712d3e0f2ca173294b17490655563235-1024-1024.webp'
    ],
    description: 'Diseño inspirado en los monoplazas de Formula 1',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rojo', 'Negro', 'Azul'],
    tags: ['f1', 'racing', 'velocidad'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '3',
    name: 'Fast & Furious Tokyo Drift',
    collection: 'FAST AND FURIOUS',
    originalPrice: 30000,
    discountPercentage: 23.33,
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500'
    ],
    description: 'Inspirado en las escenas icónicas de Tokyo Drift',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro', 'Naranja', 'Verde'],
    tags: ['drift', 'tuning', 'street'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '4',
    name: 'Nissan Skyline R34',
    collection: 'SKYLINE/SUPRA',
    originalPrice: 30000,
    discountPercentage: 13.33,
    images: [
      'https://images.unsplash.com/photo-1502877828070-33de3d5d97d2?w=500',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=500'
    ],
    description: 'El legendario Skyline R34 GT-R en tu camiseta',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Blanco', 'Plata'],
    tags: ['skyline', 'gtr', 'jdm'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '5',
    name: 'BMW M3 E46',
    collection: 'BMW',
    originalPrice: 30000,
    discountPercentage: 20,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500'
    ],
    description: 'El icónico BMW M3 E46 en diseño minimalista',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Negro', 'Blanco', 'Azul'],
    tags: ['bmw', 'm3', 'german'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '6',
    name: 'Most Wanted Heat Level 5',
    collection: 'MOST WANTED',
    originalPrice: 30000,
    discountPercentage: 30,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500',
      'https://images.unsplash.com/photo-1502877828070-33de3d5d97d2?w=500'
    ],
    description: 'Inspirado en el clásico videojuego Need for Speed Most Wanted',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Amarillo', 'Rojo'],
    tags: ['nfs', 'gaming', 'retro'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '7',
    name: 'Toyota Supra MK4',
    collection: 'SKYLINE/SUPRA',
    originalPrice: 30000,
    discountPercentage: 15,
    images: [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=500',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500'
    ],
    description: 'La leyenda del Toyota Supra MK4 Turbo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blanco', 'Negro', 'Amarillo'],
    tags: ['supra', 'jdm', 'turbo'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '8',
    name: 'Porsche Carrera GT',
    collection: 'PORSCHE',
    originalPrice: 30000,
    discountPercentage: 10,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=500'
    ],
    description: 'El exclusivo Porsche Carrera GT en tu guardarropa',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Plata', 'Negro', 'Blanco'],
    tags: ['carrera', 'supercar', 'exclusivo'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '9',
    name: 'Max Verstappen RB20 Champion',
    collection: 'FORMULA UNO',
    originalPrice: 32000,
    discountPercentage: 26.56,
    images: [
      'https://images.unsplash.com/photo-1541447271487-09612b3f49f7?w=500',
      'https://images.unsplash.com/photo-1593693709857-d6495124e659?w=500'
    ],
    description: 'Celebra los éxitos del campeón mundial Max Verstappen con esta camiseta exclusiva de Red Bull Racing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Azul', 'Rojo', 'Negro'],
    tags: ['f1', 'redbull', 'verstappen', 'champion'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '10',
    name: 'Lewis Hamilton Legacy',
    collection: 'FORMULA UNO',
    originalPrice: 33000,
    discountPercentage: 27.27,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Homenaje a la legendaria carrera de Lewis Hamilton, siete veces campeón mundial',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Plata', 'Morado'],
    tags: ['f1', 'mercedes', 'hamilton', 'champion'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '11',
    name: 'Ferrari SF-24 Leclerc Edition',
    collection: 'FORMULA UNO',
    originalPrice: 34000,
    discountPercentage: 26.47,
    images: [
      'https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=500',
      'https://images.unsplash.com/photo-1592853625511-0f6b1e081f6d?w=500'
    ],
    description: 'Diseño inspirado en el monoplaza SF-24 de Charles Leclerc con los colores emblemáticos de Ferrari',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Rojo', 'Negro', 'Amarillo'],
    tags: ['f1', 'ferrari', 'leclerc', 'scuderia'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '12',
    name: 'McLaren Papaya Lando Norris',
    collection: 'FORMULA UNO',
    originalPrice: 31000,
    discountPercentage: 25.81,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Camiseta con el diseño papaya característico de McLaren y tributo a Lando Norris',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Naranja', 'Azul', 'Negro'],
    tags: ['f1', 'mclaren', 'norris', 'papaya'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '13',
    name: 'Aston Martin AMR24 Alonso',
    collection: 'FORMULA UNO',
    originalPrice: 30000,
    discountPercentage: 25,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Diseño elegante inspirado en el Aston Martin de Fernando Alonso',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Verde', 'Negro', 'Amarillo'],
    tags: ['f1', 'astonmartin', 'alonso', 'racing'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '14',
    name: 'Alpine A524 Gasly Edition',
    collection: 'FORMULA UNO',
    originalPrice: 29000,
    discountPercentage: 25.86,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Camiseta con los colores del equipo Alpine F1 y diseño inspirado en Pierre Gasly',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Rosa', 'Negro'],
    tags: ['f1', 'alpine', 'gasly', 'french'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '15',
    name: 'Williams FW46 Colapinto Special',
    collection: 'FORMULA UNO',
    originalPrice: 33000,
    discountPercentage: 25.76,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Edición especial dedicada a Franco Colapinto y su debut en Williams Racing',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Azul', 'Blanco', 'Celeste'],
    tags: ['f1', 'williams', 'colapinto', 'argentina'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: true
  },
  {
    id: '16',
    name: 'Haas F1 Team Hulkenberg',
    collection: 'FORMULA UNO',
    originalPrice: 28000,
    discountPercentage: 26.79,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Camiseta del equipo Haas F1 con diseño inspirado en Nico Hulkenberg',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanco', 'Negro', 'Rojo'],
    tags: ['f1', 'haas', 'hulkenberg', 'american'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '17',
    name: 'Sauber C44 Zhou Guanyu',
    collection: 'FORMULA UNO',
    originalPrice: 29000,
    discountPercentage: 27.59,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Diseño inspirado en el Sauber C44 de Zhou Guanyu con elementos de la cultura china',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Verde', 'Negro', 'Rojo'],
    tags: ['f1', 'sauber', 'zhou', 'china'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  },
  {
    id: '18',
    name: 'RB F1 Team Tsunoda Special',
    collection: 'FORMULA UNO',
    originalPrice: 30000,
    discountPercentage: 26.67,
    images: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=500',
      'https://images.unsplash.com/photo-1593693397723-218b5e4e8f75?w=500'
    ],
    description: 'Camiseta del equipo RB F1 con diseño especial de Yuki Tsunoda',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Blanco', 'Rojo'],
    tags: ['f1', 'rb', 'tsunoda', 'japan'],
    coutes: 24,
    porcentajeWithCoutes: 2.4,
    freeShippingThreshold: 100000,
    featured: false
  }
]; 