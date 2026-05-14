import api from '../api/config/axios';
import type { ProductFormData, Product } from "../types/products";

export const productService = {
    // GET ALL - Llama a @router.get("/")
    getProducts: async () => {
        const { data } = await api.get<Product[]>("/productos/");
        return data;
    },

    // GET BY ID - Llama a @router.get("/{producto_id}")
    getProductById: async (id: number) => {
        const { data } = await api.get<Product>(`/productos/${id}`);
        return data;
    },

    // CREATE - Llama a @router.post("/")
    createProduct: async (formData: ProductFormData) => {
        // Mapeamos los checkboxes del formulario a los IDs de tu base de datos
        const generos_ids: number[] = [];
        if (formData.accion) generos_ids.push(1);
        if (formData.aventura) generos_ids.push(2);
        if (formData.rpg) generos_ids.push(3);
        if (formData.shooter) generos_ids.push(4);
        if (formData.survival) generos_ids.push(5);
        if (formData.deportes) generos_ids.push(6);

        // Estructuramos el JSON exactamente como lo espera tu ProductoCreate de Pydantic
        const body = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            tipo_id: formData.tipo_id,
            image_url: formData.image_url || "",
            image_public_id: "", 
            variantes: [
                {
                    plataforma_id: formData.plataforma_id,
                    formato_id: formData.formato_id,
                    stock: formData.stock || 0,
                    precio: formData.precio_base
                }
            ],
            videojuego: formData.tipo_id === 1 ? {
                anio_lanzamiento: formData.anio_lanzamiento,
                jugadores_max: formData.jugadores_max,
                es_cooperativo: formData.es_cooperativo,
                generos_ids: generos_ids
            } : null
        };

        const { data } = await api.post<Product>("/productos/", body);
        return data;
    },

    // DELETE - Llama a @router.delete("/{producto_id}")
    deleteProduct: async (id: number) => {
        const { data } = await api.delete(`/productos/${id}`);
        return data;
    }
};