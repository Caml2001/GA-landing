import { Property } from "@/lib/types";

export const properties: Property[] = [
  {
    id: 1,
    title: "Villa Moderna en Los Cabos",
    location: "Los Cabos, Baja California Sur",
    price: "$4,250,000",
    pricePerMeter: "$8,500",
    status: "Disponible",
    type: "Villa",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    ],
    area: "450 m²",
    bedrooms: "5 hab.",
    bathrooms: "4.5 baños",
    year: "2023",
    description: "Esta impresionante villa de diseño contemporáneo se encuentra en una de las zonas más exclusivas de Los Cabos, ofreciendo vistas panorámicas al océano Pacífico. La propiedad combina a la perfección arquitectura moderna con elementos naturales.",
    descriptionExtended: "Cuenta con amplios espacios abiertos, ventanales de piso a techo que maximizan la luz natural, y acabados de la más alta calidad. La propiedad incluye piscina infinity, jardines paisajísticos, y acceso directo a playa privada.",
    features: [
      "Piscina infinity",
      "Terraza panorámica",
      "Acceso a playa",
      "Cocina gourmet",
      "Domótica completa",
      "Garaje para 4 autos"
    ]
  },
  {
    id: 2,
    title: "Penthouse de Lujo en Polanco",
    location: "Polanco, Ciudad de México",
    price: "$3,800,000",
    pricePerMeter: "$11,875",
    status: "Disponible",
    type: "Penthouse",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    ],
    area: "320 m²",
    bedrooms: "4 hab.",
    bathrooms: "3.5 baños",
    year: "2022",
    description: "Espectacular penthouse en la exclusiva zona de Polanco con una vista panorámica de la ciudad. Este lujoso apartamento ofrece acabados de primer nivel, amplias estancias y una terraza privada perfecta para entretenimiento.",
    descriptionExtended: "El diseño interior fusiona elegancia contemporánea con detalles clásicos. Cuenta con tecnología de hogar inteligente, climatización zonificada y seguridad las 24 horas. Incluye 3 estacionamientos y bodega privada.",
    features: [
      "Terraza privada",
      "Vistas panorámicas",
      "Cocina equipada",
      "Vestidor principal",
      "Hogar inteligente",
      "Seguridad 24/7"
    ]
  },
  {
    id: 3,
    title: "Residencia Contemporánea",
    location: "Valle de Bravo, Estado de México",
    price: "$2,950,000",
    pricePerMeter: "$7,763",
    status: "Disponible",
    type: "Casa",
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"
    ],
    area: "380 m²",
    bedrooms: "4 hab.",
    bathrooms: "3 baños",
    year: "2021",
    description: "Excepcional residencia contemporánea inmersa en un entorno natural privilegiado en Valle de Bravo. Esta propiedad combina un diseño arquitectónico vanguardista con la calidez de materiales naturales como madera y piedra local.",
    descriptionExtended: "La casa ofrece integración total con el paisaje a través de grandes ventanales y espacios semi-abiertos. Cuenta con sistema de captación de agua pluvial, paneles solares y un diseño bioclimático que optimiza la eficiencia energética.",
    features: [
      "Diseño sostenible",
      "Jardín zen",
      "Estudio/biblioteca",
      "Chimenea central",
      "Paneles solares",
      "Área de meditación"
    ]
  },
  {
    id: 4,
    title: "Villa Frente al Mar",
    location: "Puerto Vallarta, Jalisco",
    price: "$6,500,000",
    pricePerMeter: "$11,207",
    status: "Vendida",
    type: "Villa",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"],
    area: "580 m²",
    bedrooms: "6 hab.",
    bathrooms: "7 baños",
    year: "2020",
    description: "Espectacular villa frente al océano en la exclusiva zona de la Bahía de Banderas. Esta propiedad de lujo ofrece acceso directo a la playa, vistas panorámicas al océano Pacífico y acabados de la más alta calidad.",
    descriptionExtended: "El diseño maximiza las vistas al mar desde prácticamente todas las habitaciones. Cuenta con una piscina infinity que se funde con el horizonte, spa privado, gimnasio equipado y un sistema completo de entretenimiento audiovisual.",
    features: [
      "Acceso directo a playa",
      "Piscina infinity",
      "Spa y gimnasio",
      "Muelle privado",
      "Cine en casa",
      "Suite principal con vista"
    ]
  },
  {
    id: 5,
    title: "Residencia de Diseñador",
    location: "San Miguel de Allende, Guanajuato",
    price: "$3,200,000",
    pricePerMeter: "$7,619",
    status: "Disponible",
    type: "Casa",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"],
    area: "420 m²",
    bedrooms: "4 hab.",
    bathrooms: "4.5 baños",
    year: "2022",
    description: "Extraordinaria residencia diseñada por un reconocido arquitecto, ubicada en el corazón histórico de San Miguel de Allende. Esta propiedad fusiona la arquitectura colonial mexicana con elementos contemporáneos.",
    descriptionExtended: "Los espacios interiores exhiben techos altos con vigas de madera, patios internos con vegetación local y fuentes tradicionales. La terraza superior ofrece vistas panorámicas de la ciudad y la Parroquia de San Miguel Arcángel.",
    features: [
      "Patio central",
      "Terraza panorámica",
      "Bodegas de vino",
      "Fuentes ornamentales",
      "Chimeneas de leña",
      "Cocina tradicional"
    ]
  },
  {
    id: 6,
    title: "Mansión en Reserva Forestal",
    location: "Avandaro, Estado de México",
    price: "$7,800,000",
    pricePerMeter: "$10,400",
    status: "Disponible",
    type: "Mansión",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"],
    area: "750 m²",
    bedrooms: "8 hab.",
    bathrooms: "9 baños",
    year: "2019",
    description: "Impresionante mansión situada en una reserva forestal privada, ofreciendo total privacidad y conexión con la naturaleza. Esta extraordinaria propiedad se encuentra rodeada de bosque maduro con vistas panorámicas al valle.",
    descriptionExtended: "El diseño arquitectónico prioriza la integración con el entorno natural utilizando materiales sustentables como piedra local, maderas certificadas y grandes cristales de alto rendimiento térmico. La propiedad incluye un lago artificial y senderos privados.",
    features: [
      "Lago artificial",
      "Caballerizas",
      "Cancha de tenis",
      "Viñedo privado",
      "Pabellón de eventos",
      "Capilla"
    ]
  },
  {
    id: 7,
    title: "Loft de Diseño",
    location: "Condesa, Ciudad de México",
    price: "$980,000",
    pricePerMeter: "$8,167",
    status: "Disponible",
    type: "Departamento",
    images: ["https://images.unsplash.com/photo-1493246318656-5bfd4cfb29b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"],
    area: "120 m²",
    bedrooms: "1 hab.",
    bathrooms: "1.5 baños",
    year: "2021",
    description: "Espectacular loft de diseño ubicado en el corazón de la Condesa. Este espacio único combina elementos industriales con acabados contemporáneos, creando un ambiente sofisticado y versátil.",
    descriptionExtended: "El diseño de planta abierta maximiza la sensación de amplitud, con techos de doble altura y ventanales que permiten abundante luz natural. Incluye cocina gourmet con isla central y terraza privada con vista al Parque México.",
    features: [
      "Doble altura",
      "Terraza privada",
      "Cocina gourmet",
      "Elementos industriales",
      "Domótica completa",
      "Estacionamiento"
    ]
  },
  {
    id: 8,
    title: "Hacienda Restaurada",
    location: "Mérida, Yucatán",
    price: "$4,500,000",
    pricePerMeter: "$6,000",
    status: "Disponible",
    type: "Casa",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"],
    area: "750 m²",
    bedrooms: "5 hab.",
    bathrooms: "5.5 baños",
    year: "1890 (Restaurada 2020)",
    description: "Magnífica hacienda del siglo XIX completamente restaurada combinando elementos históricos originales con comodidades modernas. Esta joya arquitectónica conserva los suelos de pasta, techos altos y herrería original.",
    descriptionExtended: "La restauración respetó la distribución original agregando un ala contemporánea que incluye spa, gimnasio y piscina. Los jardines cuentan con vegetación endémica, cenote privado y áreas de descanso tradicionales.",
    features: [
      "Cenote privado",
      "Elementos originales",
      "Capilla restaurada",
      "Huerto orgánico",
      "Colección de arte yucateco",
      "Sistema de riego automatizado"
    ]
  },
  {
    id: 9,
    title: "Departamento de Lujo",
    location: "Santa Fe, Ciudad de México",
    price: "$1,850,000",
    pricePerMeter: "$10,278",
    status: "Disponible",
    type: "Departamento",
    images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80"],
    area: "180 m²",
    bedrooms: "3 hab.",
    bathrooms: "2.5 baños",
    year: "2022",
    description: "Elegante departamento ubicado en el exclusivo distrito financiero de Santa Fe. Este espacio contemporáneo ofrece vistas espectaculares de la ciudad desde sus amplios ventanales y terraza privada.",
    descriptionExtended: "Los interiores diseñados por un reconocido interiorista combinan funcionalidad y sofisticación. La cocina está equipada con electrodomésticos de alta gama y la sala de estar cuenta con sistema de audio envolvente integrado a la domótica del hogar.",
    features: [
      "Domótica integral",
      "Cocina equipada",
      "Sistema de seguridad avanzado",
      "Gimnasio en condominio",
      "Estacionamientos (2)",
      "Bodega privada"
    ]
  }
];
