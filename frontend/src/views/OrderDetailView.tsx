import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderService } from "../services/orderService";
import { OrdenOut } from "../types/orders";

export default function OrderDetailView() {
    const { id } = useParams<{ id: string }>();
    const [orden, setOrden] = useState<OrdenOut | null>(null);
    const [loading, setLoading] = useState(true);
    const [urlPago, setUrlPago] = useState<string | null>(null);

    const formatearMoneda = (valor: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

    useEffect(() => {
        const cargarDatosOrden = async () => {
            if (!id) return;
            try {
                const data = await orderService.getDetalleOrden(parseInt(id));
                setOrden(data);

                // Si la orden está pendiente y fue con MercadoPago, generamos la preferencia en el backend
                if (data.estado === "pendiente" && data.metodo_pago === "mercadopago") {
                    const pagoData = await orderService.iniciarPago(data.id);
                    setUrlPago(pagoData.url_pago);
                }
            } catch (err) {
                console.error("Error al obtener la orden", err);
            } finally {
                setLoading(false);
            }
        };

        cargarDatosOrden();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <span className="text-teal-400 font-bold animate-pulse text-sm">Cargando detalles de la orden...</span>
            </div>
        );
    }

    if (!orden) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-rose-400">
                Orden no encontrada.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">

                {/* CABECERA DE LA ORDEN */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-2">
                    <div>
                        <h1 className="text-xl font-black text-slate-100 tracking-tight">Orden #{orden.id}</h1>
                        <p className="text-xs text-slate-500">Realizada el {new Date(orden.created_at).toLocaleDateString()}</p>
                    </div>

                    {/* Badge Dinámico de Estado */}
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${orden.estado === "pagada" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            orden.estado === "pendiente" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}>
                        {orden.estado}
                    </span>
                </div>

                {/* ACCIÓN DE PAGO SI ESTÁ PENDIENTE */}
                {orden.estado === "pendiente" && urlPago && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-xs text-amber-300">
                            <strong>¡Tu orden ha sido registrada!</strong> Por favor completa el pago para asegurar tus copias y activar las descargas digitales.
                        </div>
                        <a
                            href={urlPago}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs py-2.5 px-5 rounded-lg transition-all text-center whitespace-nowrap shadow-md shadow-teal-500/10"
                        >
                            Pagar con Mercado Pago 💳
                        </a>
                    </div>
                )}

                {/* PANTALLA DE ÉXITO SI ESTÁ PAGADA */}
                {orden.estado === "pagada" && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-300">
                        🎉 <strong>¡Pago aprobado!</strong> Tus claves de activación e instrucciones han sido enviadas a tu correo. ¡A disfrutar!
                    </div>
                )}

                {/* ITEMS COMPRADOS */}
                <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-wider text-slate-500 font-bold">Artículos en esta orden</h3>
                    <div className="divide-y divide-slate-800">
                        {orden.items.map((item) => (
                            <div key={item.id} className="py-3 flex justify-between items-center text-sm">
                                <div>
                                    <span className="text-slate-200 font-medium block">Variante ID: #{item.producto_variante_id}</span>
                                    <span className="text-xs text-slate-500">Cantidad: {item.cantidad}</span>
                                </div>
                                <span className="text-slate-300 font-semibold">{formatearMoneda(item.precio_unitario * item.cantidad)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECCIÓN DEL TOTAL */}
                <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
                    <span className="text-slate-400 text-sm font-medium">Monto Total:</span>
                    <span className="text-2xl font-black text-amber-400 tracking-tight">{formatearMoneda(orden.total)}</span>
                </div>

            </div>
        </div>
    );
}