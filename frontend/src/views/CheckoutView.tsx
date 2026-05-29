// src/views/CheckoutView.tsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { orderService } from "../services/orderService";

export default function CheckoutView() {
    // Usamos 'total' o 'subtotal' provenientes de tu CartContext
    const { cartItems, total, subtotal, clearCartVisual } = useCart();
    const [metodoPago, setMetodoPago] = useState<"tarjeta" | "mercadopago" | "transferencia">("mercadopago");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Salvaguarda por si el total viene indefinido en el render inicial
    const totalFinal = total || subtotal || 0;

    const formatearMoneda = (valor: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

    const handleConfirmarCompra = async () => {
        if (cartItems.length === 0) return;
        setIsSubmitting(true);
        setError(null);

        try {
            // 1. Llamar al backend para hacer el checkout mandando el método seleccionado
            const ordenGenerada = await orderService.crearOrden(metodoPago);

            // 2. Limpiar el estado visual del carrito en React
            if (clearCartVisual) {
                clearCartVisual();
            }

            // 3. Redireccionar de forma segura a la vista de detalles de la orden generada
            window.location.href = `/ordenes/${ordenGenerada.id}`;
        } catch (err: any) {
            console.error("Error en Checkout:", err);
            setError(err.response?.data?.detail || "Hubo un error al procesar tu orden de compra.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
                <span className="text-5xl mb-4">⚔️</span>
                <p className="text-slate-400 text-lg mb-4 font-medium">Tu inventario está vacío para realizar el checkout.</p>
                <a href="/shop" className="bg-amber-500 hover:bg-yellow-500 text-slate-950 font-bold px-6 py-2 rounded-xl transition-all uppercase text-sm tracking-wide">
                    Volver a la tienda
                </a>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* COLUMNA IZQUIERDA: MÉTODOS DE PAGO */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-black text-amber-400 uppercase tracking-wider mb-4 font-medieval">1. Método de Pago</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Opción MercadoPago */}
                            <button
                                type="button"
                                onClick={() => setMetodoPago("mercadopago")}
                                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${metodoPago === "mercadopago"
                                        ? "bg-teal-500/10 border-teal-500 text-teal-400 font-bold"
                                        : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600"
                                    }`}
                            >
                                <span className="block text-sm font-bold text-slate-200">Mercado Pago</span>
                                <span className="text-xs opacity-70">Tarjetas, Débito o Dinero en cuenta</span>
                            </button>

                            {/* Opción Tarjeta Directa */}
                            <button
                                type="button"
                                onClick={() => setMetodoPago("tarjeta")}
                                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${metodoPago === "tarjeta"
                                        ? "bg-teal-500/10 border-teal-500 text-teal-400 font-bold"
                                        : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600"
                                    }`}
                            >
                                <span className="block text-sm font-bold text-slate-200">Tarjeta de Crédito / Débito</span>
                                <span className="text-xs opacity-70">Procesamiento inmediato</span>
                            </button>
                        </div>
                    </div>

                    {/* Alerta de Error por falta de stock o fallas de red */}
                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl text-rose-400 text-sm font-medium animate-pulse">
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {/* COLUMNA DERECHA: RESUMEN FLOTANTE */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-4 shadow-xl">
                    <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3 font-medieval tracking-wide">Resumen del Pedido</h2>

                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-xs border-b border-slate-800/40 pb-2">
                                <div className="space-y-0.5">
                                    <span className="text-slate-200 font-medium block max-w-[180px] truncate">{item.nombre}</span>
                                    {item.varianteInfo && (
                                        <span className="text-amber-500/70 text-[10px]">{item.varianteInfo}</span>
                                    )}
                                </div>
                                <span className="text-slate-400 font-bold">x{item.cantidad}</span>
                                <span className="text-slate-200 font-semibold">
                                    {formatearMoneda((item.precioUnitario || 0) * item.cantidad)}
                                    room</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-800 pt-4 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Total final:</span>
                            <span className="text-xl font-black text-yellow-400 tracking-tight">{formatearMoneda(totalFinal)}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleConfirmarCompra}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 font-black text-sm py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer text-center uppercase tracking-wide"
                    >
                        {isSubmitting ? "Procesando Orden..." : "🛡️ Confirmar y comprar"}
                    </button>
                </div>

            </div>
        </div>
    );
}