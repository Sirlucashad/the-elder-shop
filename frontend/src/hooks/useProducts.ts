import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type { ProductFormData } from "../types/products";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Importamos la magia de sonner

// Hook para obtener la lista de productos completa
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: productService.getProducts,
    });
};

// Hook para extraer y filtrar los géneros únicos desde los productos ya cargados
export const useGenerosDesdeProductos = () => {
    return useQuery({
        queryKey: ["products"], // Comparte la misma Query Key para usar la memoria caché existente
        queryFn: productService.getProducts,
        select: (productos) => {
            const generosMap = new Map<number, { id: number; nombre: string }>();

            if (!Array.isArray(productos)) return [];

            productos.forEach((producto) => {
                // Obtenemos los géneros de forma completamente segura mediante encadenamiento opcional
                const generos = producto?.videojuego?.generos;

                if (Array.isArray(generos)) {
                    generos.forEach((genero) => {
                        // Evita duplicados usando el id en el Map
                        if (genero && genero.id !== undefined) {
                            if (!generosMap.has(genero.id)) {
                                generosMap.set(genero.id, {
                                    id: genero.id,
                                    nombre: genero.nombre,
                                });
                            }
                        }
                    });
                }
            });

            // Retornamos la lista mapeada y ordenada alfabéticamente por nombre
            return Array.from(generosMap.values()).sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );
        },
    });
};

// Hook para las acciones de escritura
export const useProductActions = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Mutación para Crear
    const createMutation = useMutation({
        mutationFn: (data: ProductFormData) => productService.createProduct(data),
        onSuccess: (newProduct) => {
            // Mensaje de éxito vibrante
            toast.success(`¡Producto "${newProduct.nombre}" creado con éxito!`, {
                description: "La tienda se ha actualizado correctamente.",
            });

            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/admin");
        },
        onError: (error: any) => {
            const msg = error.response?.data?.detail || "No se pudo conectar con el servidor";

            // Mensaje de error colaborativo
            toast.error("Error al crear el producto", {
                description: msg,
            });
        }
    });

    // Mutación para Eliminar
    const deleteMutation = useMutation({
        mutationFn: (id: number) => productService.deleteProduct(id),
        onSuccess: () => {
            toast.success("Producto eliminado correctamente", {
                description: "El inventario ha sido actualizado.",
            });
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error: any) => {
            const msg = error.response?.data?.detail || "Error interno";
            toast.error("No se pudo eliminar el producto", {
                description: msg,
            });
        }
    });

    return {
        createProduct: createMutation.mutate,
        isCreating: createMutation.isPending,
        deleteProduct: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending
    };
};