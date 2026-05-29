export interface VarianteDigitalFormData {
    url_descarga: string;
    peso_gb?: number;
    instrucciones_canje?: string;
}

export interface VarianteFormData {
    plataforma_id?: number;
    formato_id?: number;

    stock: number;
    precio: number;

    detalle_digital?: VarianteDigitalFormData;
}

export interface VideojuegoFormData {
    anio_lanzamiento: number;
    jugadores_max: number;
    es_cooperativo: boolean;

    generos_ids: string[];
}

export interface ProductFormData {
    nombre: string;
    descripcion?: string;

    tipo_id: number | "";

    image_url?: string;
    public_id?: string;

    variantes: VarianteFormData[];

    videojuego?: VideojuegoFormData;
}














export interface Plataforma {
    id: number;
    nombre: string;
}

export interface Formato {
    id: number;
    nombre: string;
}

export interface Genero {
    id: number;
    nombre: string;
}

export interface VarianteDigital {
    id: number;

    url_descarga: string;
    peso_gb?: number;
    instrucciones_canje?: string;
}

export interface Variante {
    id: number;

    plataforma_id?: number;
    formato_id?: number;

    stock: number;
    precio?: number;

    plataforma?: Plataforma;
    formato?: Formato;

    detalle_digital?: VarianteDigital;
}

export interface Videojuego {
    anio_lanzamiento: number;
    jugadores_max: number;
    es_cooperativo: boolean;

    generos: Genero[];
}

export interface Product {
    id: number;

    nombre: string;
    descripcion?: string;

    image_url?: string;

    variantes: Variante[];

    videojuego?: Videojuego;
}