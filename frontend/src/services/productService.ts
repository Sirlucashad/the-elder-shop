import api from '../api/config/axios';
import type { ProductFormData, Product } from "../types/products";

export const productService = {

    // GET ALL
    getProducts: async () => {
        const { data } = await api.get<Product[]>("/productos/");
        return data;
    },

    // GET BY ID
    getProductById: async (id: number) => {
        const { data } = await api.get<Product>(`/productos/${id}`);
        return data;
    },

    // CREATE
    createProduct: async (formData: ProductFormData) => {

        const body = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            tipo_id: Number(formData.tipo_id),

            image_url: formData.image_url || "",
            image_public_id: formData.public_id || "",

            variantes: formData.variantes.map((v) => ({
                plataforma_id: v.plataforma_id || null,
                formato_id: v.formato_id || null,

                stock: Number(v.stock),
                precio: Number(v.precio),

                detalle_digital: v.detalle_digital
                    ? {
                        url_descarga: v.detalle_digital.url_descarga,
                        peso_gb: v.detalle_digital.peso_gb || null,
                        instrucciones_canje:
                            v.detalle_digital.instrucciones_canje || null
                    }
                    : null
            })),

            videojuego:
                Number(formData.tipo_id) === 1
                    ? {
                        anio_lanzamiento:
                            formData.videojuego?.anio_lanzamiento,

                        jugadores_max:
                            formData.videojuego?.jugadores_max,

                        es_cooperativo:
                            !!formData.videojuego?.es_cooperativo,

                        generos_ids:
                            formData.videojuego?.generos_ids || []
                    }
                    : null
        };

        const { data } = await api.post<Product>(
            "/productos/",
            body
        );

        return data;
    },

    // DELETE
    deleteProduct: async (id: number) => {
        const { data } = await api.delete(`/productos/${id}`);
        return data;
    },

    
    // UPDATE
    updateProduct: async (id: number, formData: ProductFormData) => {
        const body = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            tipo_id: Number(formData.tipo_id),
            image_url: formData.image_url || "",
            image_public_id: formData.public_id || "",
            variantes: formData.variantes.map((v) => ({
                plataforma_id: v.plataforma_id || null,
                formato_id: v.formato_id || null,
                stock: Number(v.stock),
                precio: Number(v.precio),
                detalle_digital: v.detalle_digital
                    ? {
                        url_descarga: v.detalle_digital.url_descarga,
                        peso_gb: v.detalle_digital.peso_gb || null,
                        instrucciones_canje: v.detalle_digital.instrucciones_canje || null,
                    }
                    : null,
            })),
            videojuego:
                Number(formData.tipo_id) === 1
                    ? {
                        anio_lanzamiento: formData.videojuego?.anio_lanzamiento,
                        jugadores_max: formData.videojuego?.jugadores_max,
                        es_cooperativo: !!formData.videojuego?.es_cooperativo,
                        generos_ids: formData.videojuego?.generos_ids || [],
                    }
                    : null,
        };

        const { data } = await api.put<Product>(`/productos/${id}`, body);
        return data;
    },
};