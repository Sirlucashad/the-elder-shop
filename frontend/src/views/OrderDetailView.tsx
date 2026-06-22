import { useParams, Link } from "react-router-dom";
import { useOrderDetail } from "../hooks/useOrders";
import { useProcesarPago } from "../hooks/usePagos"; // 💡 Importamos el nuevo hook

export default function OrderDetailView() {
    const { id } = useParams<{ id: string }>();
    const ordenId = id ? parseInt(id, 10) : undefined;

    const { data: orden, isLoading, error } = useOrderDetail(ordenId);
    const { mutate: procesarPago, isPending: isProcessingPayment } = useProcesarPago(); // 💡 Hook de pago

    const formatearMoneda = (valor: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#020813] flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">Consultando rollos del gremio...</p>
            </div>
        );
    }

    if (error || !orden) {
        return (
            <div className="min-h-screen bg-[#020813] flex flex-col items-center justify-center p-4 text-center">
                <span className="text-4xl mb-4">❌</span>
                <h2 className="text-xl font-bold text-slate-200 font-medieval">Orden Inexistente</h2>
                <p className="text-slate-500 text-sm mt-1 mb-6">El pergamino de compra solicitado no figura en los registros reales.</p>
                <Link to="/shop" className="bg-slate-800 text-slate-200 px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-700 transition">
                    Volver a la tienda
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020813] text-slate-100 py-12 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                <div className="text-center border-b border-slate-800/60 pb-6 mb-6">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl mb-3">
                        ✓
                    </div>
                    <h1 className="text-2xl font-black text-slate-200 uppercase tracking-wider font-medieval">
                        ¡Orden Generada!
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        ID del Registro: <span className="font-mono text-amber-400 font-bold">#{orden.id}</span>
                    </p>
                </div>

                {/* Instrucciones de pago */}
                <div className="bg-[#040d1a] border border-slate-800/60 rounded-xl p-5 mb-6 space-y-3">
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide flex items-center gap-1.5 font-medieval">
                        <span>⚔️</span> Portal de Suministros
                    </h3>

                    {orden.metodo_pago === "mercadopago" && (
                        <div className="text-xs text-slate-300 space-y-3">
                            {orden.estado === "pendiente" ? (
                                <>
                                    <p>Tu orden se encuentra en estado <span className="text-amber-400 font-mono font-bold">{orden.estado}</span>. Genera el enlace de transacciones con la API:</p>
                                    <button
                                        onClick={() => ordenId && procesarPago(ordenId)}
                                        disabled={isProcessingPayment}
                                        className="bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 disabled:text-slate-400 text-white font-black px-5 py-2.5 rounded-lg transition-all text-xs tracking-wider uppercase cursor-pointer flex items-center gap-2"
                                    >
                                        {isProcessingPayment ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Abriendo portal mágico...
                                            </>
                                        ) : (
                                            "🔗 Desplegar Portal de Pago"
                                        )}
                                    </button>
                                </>
                            ) : (
                                <p className="text-emerald-400 font-bold">✨ Esta orden ya ha sido saldada con éxito en las arcas reales.</p>
                            )}
                        </div>
                    )}

                    {orden.metodo_pago === "tarjeta" && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                            La verificación de la tarjeta de crédito se encuentra bajo revisión de seguridad. Estado: <span className="text-amber-400 font-mono font-bold">{orden.estado}</span>.
                        </p>
                    )}
                </div>

                {/* Desglose de artículos */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Artículos de la Orden</h3>
                    <div className="space-y-2">
                        {orden.items?.map((item, index) => (
                            <div key={index} className="flex justify-between text-xs bg-[#020813]/30 p-3 rounded-xl border border-slate-950">
                                <div>
                                    <span className="text-slate-200 font-bold block">Variante ID: #{item.producto_variante_id}</span>
                                    <span className="text-[11px] text-slate-500 font-mono">Precio Unitario: {formatearMoneda(item.precio_unitario)}</span>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <span className="text-slate-400 block font-mono">x{item.cantidad}</span>
                                    <span className="text-amber-400 font-bold font-mono">
                                        {formatearMoneda(item.subtotal || (item.cantidad * item.precio_unitario))}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-800 pt-4 flex justify-between items-center px-1">
                        <span className="text-xs uppercase text-slate-400 tracking-wider">Monto de la Factura:</span>
                        <span className="text-xl font-black text-yellow-400 font-mono">{formatearMoneda(orden.total)}</span>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                    <Link to="/shop" className="text-xs font-bold text-amber-500 hover:text-amber-400 underline tracking-wide uppercase">
                        ← Regresar al catálogo de la tienda
                    </Link>
                </div>
            </div>
        </div>
    );
}