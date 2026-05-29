export interface DetalleOrdenOut {
    id: number;
    orden_id: number;
    producto_variante_id: number;
    cantidad: number;
    precio_unitario: number;
    producto_variante?: {
        id: number;
        precio: number;
        stock: number;
        plataforma?: { nombre: string };
        formato?: { nombre: string };
    };
}

export interface OrdenOut {
    id: number;
    usuario_id: number;
    total: number;
    metodo_pago: "tarjeta" | "mercadopago" | "transferencia";
    estado: "pendiente" | "pagada" | "cancelada";
    created_at: string;
    items: DetalleOrdenOut[];
}