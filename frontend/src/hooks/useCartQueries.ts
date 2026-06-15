import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cartService, type CarritoItemCreate } from "../services/cartService";

export function useCartQueries(isAuthenticated: boolean) {
    const queryClient = useQueryClient();

    // Query para obtener el carrito de la BD
    const cartQuery = useQuery({
        queryKey: ["cart"],
        queryFn: cartService.getCart,
        enabled: isAuthenticated, // Solo se ejecuta si el usuario está logueado
        staleTime: 1000 * 60 * 5,  // 5 minutos de caché antes de considerar vieja la data
    });

    // Mutación para agregar ítems
    const addItemMutation = useMutation({
        mutationFn: (data: CarritoItemCreate) => cartService.addItem(data),
        onSuccess: () => {
            // Invalidamos la caché para que haga un re-fetch automático con la data real de la BD
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    });

    // Mutación para remover o decrementar un ítem
    const removeItemMutation = useMutation({
        mutationFn: (itemId: number) => cartService.removeItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
    });

    return {
        cartData: cartQuery.data,
        isLoading: cartQuery.isLoading,
        addItem: addItemMutation.mutateAsync,
        removeItem: removeItemMutation.mutateAsync,
        isAdding: addItemMutation.isPending,
        isRemoving: removeItemMutation.isPending
    };
}