import api from '../api/config/axios';

// Declaramos la interfaz exacta de lo que espera el POST en FastAPI (data: CarritoItemCreate)
export interface CarritoItemCreate {
    producto_variante_id: number;
    cantidad: number;
}

export const cartService = {
    
    // GET /carrito/
    getCart: async () => {
        
        const response = await api.get('/carrito/');
        return response.data;
    },

    // POST /carrito/items
    addItem: async (data: CarritoItemCreate) => {
        const response = await api.post('/carrito/items', data);
        return response.data;
    },

    // DELETE /carrito/items/{item_id}
    removeItem: async (itemId: number) => {
        const response = await api.delete(`/carrito/items/${itemId}`);
        return response.data;
    }
};