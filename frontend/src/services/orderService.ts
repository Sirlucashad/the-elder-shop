// src/services/orderService.ts
import api from "../api/config/axios"; 
import type { OrdenOut } from "../types/orders";

export const orderService = {
    /**
     * Hace el checkout del carrito actual del usuario logueado.
     * Endpoint FastAPI: POST /ordenes/checkout?metodo_pago=...
     */
    crearOrden: async (metodoPago: "tarjeta" | "mercadopago" | "transferencia"): Promise<OrdenOut> => {
        // Pasamos metodo_pago como Query Parameter tal cual lo recibe tu backend con FastAPI
        const response = await api.post<OrdenOut>(`/ordenes/checkout?metodo_pago=${metodoPago}`);
        return response.data;
    },

    /**
     * Obtiene el listado de órdenes históricas del usuario.
     * Endpoint FastAPI: GET /ordenes/
     */
    obtenerMisOrdenes: async (): Promise<OrdenOut[]> => {
        const response = await api.get<OrdenOut[]>("/ordenes/");
        return response.data;
    },

    /**
     * Obtiene el detalle completo de una orden específica.
     * Endpoint FastAPI: GET /ordenes/{orden_id}
     */
    obtenerDetalleOrden: async (ordenId: number): Promise<OrdenOut> => {
        const response = await api.get<OrdenOut>(`/ordenes/${ordenId}`);
        return response.data;
    },

    /**
     * Inicia el proceso de pago para una orden.
     * Endpoint FastAPI: POST /pagos/{orden_id}
     */
    iniciarPago: async (ordenId: number): Promise<any> => {
        const response = await api.post(`/pagos/${ordenId}`);
        return response.data; // Devuelve lo que retorne tu PagoService (ej: link de MercadoPago o éxito)
    }
};