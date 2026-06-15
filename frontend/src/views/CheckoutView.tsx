// src/views/CheckoutView.tsx
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCreateOrder } from "../hooks/useOrders";
import { useNavigate, Link } from "react-router-dom";

export default function CheckoutView() {
    const { cartItems, total, subtotal, clearCartVisual } = useCart();
    const navigate = useNavigate();

    // Ajustado a los Enums reales de tu backend: "mercadopago" | "tarjeta"
    const [metodoPago, setMetodoPago] = useState<"mercadopago" | "tarjeta">("mercadopago");

    const { mutate: ejecutarCheckout, isPending, error: mutationError } = useCreateOrder();

    const totalFinal = total || subtotal || 0;

    const formatearMoneda = (valor: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

    // Capturamos el detail exacto del HTTPException de FastAPI ("El carrito está vacío", "Stock insuficiente", etc.)
    const mensajeError = mutationError?.response?.data?.detail || mutationError?.message || null;

    const handleConfirmarCompra = () => {
        // Ejecutamos la mutación pura hacia /ordenes/checkout?metodo_pago=...
        ejecutarCheckout(metodoPago, {
            onSuccess: (ordenGenerada) => {
                if (clearCartVisual) {
                    clearCartVisual();
                }
                // Redirección al detalle usando el ID devuelto por OrdenOut
                navigate(`/ordenes/${ordenGenerada.id}`);
            },
            onError: (err) => {
                console.error("Fallo en las herrerías del backend:", err);
            }
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[75vh] bg-[#020813] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-slate-900/80 border-2 border-dashed border-amber-500/30 rounded-full flex items-center justify-center text-4xl mb-6 shadow-lg shadow-amber-500/5 animate-bounce">
                    ⚔️
                </div>
                <h2 className="text-2xl font-bold text-slate-200 mb-2 font-medieval tracking-wide">Tu Inventario está vacío</h2>
                <p className="text-slate-400 max-w-sm mb-8 text-sm">No posees equipamiento en tu bolsa listo para tasar.</p>
                <Link
                    to="/shop"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-8 py-3.5 rounded-xl transition-all uppercase text-xs tracking-wider shadow-md shadow-amber-500/10 active:scale-95"
                >
                    Volver a la Forja
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020813] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020813] to-[#020813]">
            <div className="max-w-6xl mx-auto">

                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 uppercase tracking-widest font-medieval">
                        Mesa de Transacciones
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                        Asegura tus pertenencias de la base de datos y selecciona tu tributo
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* MÉTODOS DE PAGO */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                            <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wider mb-6 flex items-center gap-2 font-medieval">
                                <span>📜</span> 1. Elegir Método de Pago
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {/* Mercado Pago */}
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => setMetodoPago("mercadopago")}
                                    className={`p-5 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 cursor-pointer ${metodoPago === "mercadopago"
                                            ? "bg-sky-500/5 border-sky-500 shadow-md shadow-sky-500/5"
                                            : "bg-[#040d1a]/60 border-slate-800 text-slate-400 hover:border-slate-700"
                                        }`}
                                >
                                    <div className="flex justify-between w-full items-start">
                                        <span className="text-2xl">💎</span>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${metodoPago === "mercadopago" ? "border-sky-500" : "border-slate-700"}`}>
                                            {metodoPago === "mercadopago" && <div className="w-2 h-2 bg-sky-400 rounded-full" />}
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`block text-sm font-bold ${metodoPago === "mercadopago" ? "text-sky-400" : "text-slate-200"}`}>Mercado Pago</span>
                                        <span className="text-[11px] opacity-60 block mt-0.5 leading-tight">Plataforma integrada de pagos</span>
                                    </div>
                                </button>

                                {/* Tarjeta Directa */}
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => setMetodoPago("tarjeta")}
                                    className={`p-5 rounded-xl border text-left transition-all relative flex flex-col justify-between h-32 cursor-pointer ${metodoPago === "tarjeta"
                                            ? "bg-emerald-500/5 border-emerald-500 shadow-md shadow-emerald-500/5"
                                            : "bg-[#040d1a]/60 border-slate-800 text-slate-400 hover:border-slate-700"
                                        }`}
                                >
                                    <div className="flex justify-between w-full items-start">
                                        <span className="text-2xl">🛡️</span>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${metodoPago === "tarjeta" ? "border-emerald-500" : "border-slate-700"}`}>
                                            {metodoPago === "tarjeta" && <div className="w-2 h-2 bg-emerald-400 rounded-full" />}
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`block text-sm font-bold ${metodoPago === "tarjeta" ? "text-emerald-400" : "text-slate-200"}`}>Tarjeta de Crédito</span>
                                        <span className="text-[11px] opacity-60 block mt-0.5 leading-tight">Pasarela directa segura</span>
                                    </div>
                                </button>

                            </div>
                        </div>

                        {/* Panel informativo de Alerta sobre el error 400 */}
                        {mensajeError && (
                            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-400 text-sm font-medium flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span>⚠️</span> <strong>Error del Servidor:</strong> {mensajeError}
                                </div>
                                <p className="text-[11px] text-rose-300/80 pl-6 mt-1">
                                    Nota: Asegúrate de que tu vista de tienda esté impactando los productos en la base de datos de tu usuario antes de realizar el cobro.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* RESUMEN FLOTANTE */}
                    <div className="bg-[#050f1e] border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-5 sticky top-24">
                        <h2 className="text-base font-bold text-slate-200 border-b border-slate-800/80 pb-3 flex items-center gap-2 font-medieval">
                            <span>🧳</span> Resumen del Pedido
                        </h2>

                        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3 justify-between items-center bg-[#020813]/40 p-2.5 rounded-xl border border-slate-900">
                                    <div className="min-w-0">
                                        <span className="text-xs text-slate-200 font-semibold block truncate max-w-[160px]">
                                            {item.nombre || item.name}
                                        </span>
                                        <span className="text-[11px] text-slate-500 font-mono block">Cantidad: {item.cantidad}</span>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <span className="text-xs text-slate-300 font-bold font-mono">
                                            {formatearMoneda((item.precioUnitario || item.precio || 0) * item.cantidad)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-800/80 pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 text-xs uppercase tracking-wider">Tributo Total:</span>
                                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 font-mono tracking-tight">
                                    {formatearMoneda(totalFinal)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleConfirmarCompra}
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 disabled:from-slate-800/80 disabled:to-slate-800/80 disabled:text-slate-600 text-slate-950 font-black text-xs py-4 rounded-xl transition-all uppercase tracking-widest cursor-pointer active:scale-[0.98]"
                        >
                            {isPending ? "Sellando Pacto..." : "🛡️ Confirmar y comprar"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}