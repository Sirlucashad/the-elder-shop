// src/hooks/useOrders.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import { orderService } from "../services/orderService";
import type { OrdenOut } from "../types/orders";

/**
 * Hook para obtener el detalle de una orden (Query)
 */
export function useOrderDetail(ordenId: number | undefined) {
  return useQuery<OrdenOut, Error>({
    queryKey: ["orden", ordenId],
    queryFn: () => orderService.obtenerDetalleOrden(ordenId!),
    enabled: !!ordenId,
    staleTime: 1000 * 60 * 5,
  });
}

/**
 * Hook para ejecutar el checkout en base al carrito de la Base de Datos (Mutation)
 */
export function useCreateOrder() {
  return useMutation<OrdenOut, any, "tarjeta" | "mercadopago">({
    mutationFn: (metodoPago) => orderService.crearOrden(metodoPago),
  });
}