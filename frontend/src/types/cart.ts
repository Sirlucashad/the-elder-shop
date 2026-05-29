export interface CartItem {
    id: number; // item_id en la base de datos
    producto_variante_id: number;
    cantidad: number;
   
    variante?: {
        id: number;
        precio: number;
        plataforma?: { nombre: string };
        formato?: { nombre: string };
        producto?: {
            nombre: string;
            imagen_url?: string;
        };
    };
}

export interface Cart {
    id: number;
    items: CartItem[];
}