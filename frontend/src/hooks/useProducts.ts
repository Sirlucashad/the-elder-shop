import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";
import type { ProductFormData } from "../types/products";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Hook para obtener la lista de productos completa
export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: productService.getProducts,
    });
};

// Hook para obtener un producto por ID
export const useProductById = (id: number) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productService.getProductById(id),
        enabled: !!id,
    });
};

// Hook para extraer y filtrar los géneros únicos desde los productos ya cargados
export const useGenerosDesdeProductos = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: productService.getProducts,
        select: (productos) => {
            const generosMap = new Map<number, { id: number; nombre: string }>();

            if (!Array.isArray(productos)) return [];

            productos.forEach((producto) => {
                const generos = producto?.videojuego?.generos;

                if (Array.isArray(generos)) {
                    generos.forEach((genero) => {
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

            return Array.from(generosMap.values()).sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );
        },
    });
};

// Hook para las acciones de escritura (crear y eliminar)
export const useProductActions = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // Mutación para Crear
    const createMutation = useMutation({
        mutationFn: (data: ProductFormData) => productService.createProduct(data),
        onSuccess: (newProduct) => {
            toast.success(`¡Producto "${newProduct.nombre}" creado con éxito!`, {
                description: "La tienda se ha actualizado correctamente.",
            });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            navigate("/admin");
        },
        onError: (error: any) => {
            const msg = error.response?.data?.detail || "No se pudo conectar con el servidor";
            toast.error("Error al crear el producto", {
                description: msg,
            });
        },
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
        },
    });

    return {
        createProduct: createMutation.mutate,
        isCreating: createMutation.isPending,
        deleteProduct: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
    };
};

// Hook para actualizar un producto
export const useUpdateProduct = (id: number) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (data: ProductFormData) => productService.updateProduct(id, data),
        onSuccess: (updated) => {
            toast.success(`¡Producto "${updated.nombre}" actualizado!`, {
                description: "Los cambios se guardaron correctamente.",
            });
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
            navigate("/admin");
        },
        onError: (error: any) => {
            const msg = error.response?.data?.detail || "No se pudo conectar con el servidor";
            toast.error("Error al actualizar el producto", { description: msg });
        },
    });
};