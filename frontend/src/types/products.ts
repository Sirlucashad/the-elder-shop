export interface ProductFormData {
    // PRODUCTO BASE
    nombre: string;
    descripcion: string;
    precio_base: number;
    tipo_id: number;
    image_url?: string;

    // VARIANTE
    stock?: number;
    precio_variante?: number;
    plataforma_id?: number;
    formato_id?: number;

    // VIDEOJUEGO
    anio_lanzamiento?: number;
    jugadores_max?: number;
    es_cooperativo?: boolean;

    // GÉNEROS
    accion?: boolean;
    aventura?: boolean;
    rpg?: boolean;
    shooter?: boolean;
    survival?: boolean;
    deportes?: boolean;
}

// Product Types
export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  genero_id?: number;
  imagen_url?: string;
}