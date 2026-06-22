import { useMutation } from "@tanstack/react-query";
import { pagoService } from "../services/pagoService";

export function useProcesarPago() {
    return useMutation({
        mutationFn: (ordenId: number) => pagoService.crearPago(ordenId),
        onSuccess: (data) => {
            // 🚀 Redirección directa al checkout de Mercado Pago
            window.location.href = data.url_pago;
        },
        onError: (error) => {
            console.error("Error al inicializar el portal de pago:", error);
            alert("No se pudo desplegar el portal de suministros. Inténtalo de nuevo.");
        }
    });
}