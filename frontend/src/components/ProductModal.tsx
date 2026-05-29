import { useState, useEffect } from "react";
import type { Product, Variante } from "../types/products";
import { useCart } from "../context/CartContext"; // Hook del carrito

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

    const esVideojuego = !!product.videojuego;
    const variantes = product.variantes || [];

    // Selección de la variante activa local
    const [varianteSeleccionada, setVarianteSeleccionada] = useState<Variante>(variantes[0]);

    // Buscar si la variante seleccionada ya tiene presencia real en el carrito
    const itemEnCarrito = cartItems.find(i => i.producto_variante_id === varianteSeleccionada?.id);

    // Estado local para controlar el número del input del modal
    const [cantidad, setCantidad] = useState<number>(1);

    // Cada vez que cambie la variante seleccionada o el carrito, actualizamos el valor base
    useEffect(() => {
        if (itemEnCarrito) {
            setCantidad(itemEnCarrito.cantidad);
        } else {
            setCantidad(1); // Valor inicial por defecto si está en 0
        }
    }, [varianteSeleccionada, itemEnCarrito]);

    // Manejo de cantidades locales respetando el stock real
    const incrementar = () => {
        if (cantidad < (varianteSeleccionada?.stock || 1)) {
            setCantidad(prev => prev + 1);
        }
    };

    const decrementar = () => {
        if (cantidad > 1) {
            setCantidad(prev => prev - 1);
        }
    };

    // Al darle al botón principal, inyecta o actualiza el carrito central
    const handleActionCarrito = () => {
        if (itemEnCarrito) {
            // Si el usuario baja manualmente a través del modal (cosa que no permite el decrementar pero por seguridad)
            updateQuantity(itemEnCarrito.id, varianteSeleccionada.id, cantidad);
        } else {
            addToCart({
                producto_variante_id: varianteSeleccionada.id,
                cantidad: cantidad,
                nombre: product.nombre,
                precioUnitario: varianteSeleccionada.precio || 0,
                imagen: product.image_url || "",
                varianteInfo: `${varianteSeleccionada.plataforma?.nombre || "General"} - ${varianteSeleccionada.formato?.nombre || ""}`
            });
        }
        onClose(); // Cerrar de forma limpia
    };

    // Precios formateados originales
    const precioUnitario = varianteSeleccionada?.precio || 0;
    const precioTotal = precioUnitario * cantidad;

    const formatearMoneda = (valor: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(valor);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
            {/* Fondo clickeable para cerrar */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Contenedor del Modal */}
            <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">

                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white p-2 rounded-full transition-colors cursor-pointer"
                >
                    ✕
                </button>

                {/* COLUMNA IZQUIERDA: IMAGEN */}
                <div className="w-full md:w-1/2 bg-slate-950 flex items-center justify-center relative aspect-video md:aspect-auto">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.nombre}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-slate-600">Sin Imagen</span>
                    )}
                </div>

                {/* COLUMNA DERECHA: INFORMACIÓN Y ACCIONES */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">

                    {/* TIPO & BADGES */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${esVideojuego ? "bg-purple-600/30 text-purple-400 border border-purple-500/30" : "bg-blue-600/30 text-blue-400 border border-blue-500/30"
                            }`}>
                            {esVideojuego ? "Videojuego" : "Accesorio / Otro"}
                        </span>
                        {esVideojuego && product.videojuego?.es_cooperativo && (
                            <span className="text-[10px] bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-sm font-medium">
                                Cooperativo 👥
                            </span>
                        )}
                    </div>

                    {/* TÍTULO */}
                    <h2 className="text-2xl md:text-3xl font-black text-slate-100 mb-2 tracking-tight">
                        {product.nombre}
                    </h2>

                    {/* GÉNEROS */}
                    {esVideojuego && product.videojuego?.generos && product.videojuego.generos.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                            {product.videojuego.generos.map((gen) => (
                                <span key={gen.id} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-700">
                                    {gen.nombre}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* DESCRIPCIÓN COMPLETA */}
                    <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">Descripción</h4>
                        <p className="text-sm text-slate-300 leading-relaxed max-h-24 overflow-y-auto pr-2">
                            {product.descripcion || "Este producto no cuenta con una descripción detallada todavía."}
                        </p>
                    </div>

                    {/* DETALLES ADICIONALES */}
                    {esVideojuego && product.videojuego && (
                        <div className="grid grid-cols-2 gap-4 bg-slate-950/40 p-3 rounded-xl border border-slate-800 mb-6 text-xs text-slate-400">
                            <div>
                                <span className="block text-slate-500">Año de lanzamiento:</span>
                                <span className="font-semibold text-slate-200">{product.videojuego.anio_lanzamiento || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500">Máx. Jugadores:</span>
                                <span className="font-semibold text-slate-200">{product.videojuego.jugadores_max || "N/A"}</span>
                            </div>
                        </div>
                    )}

                    {/* SELECCIÓN DE VARIANTE */}
                    {variantes.length > 1 && (
                        <div className="mb-6">
                            <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Selecciona una opción:</h4>
                            <div className="grid grid-cols-2 gap-2">
                                {variantes.map((v) => (
                                    <button
                                        key={v.id}
                                        type="button"
                                        onClick={() => setVarianteSeleccionada(v)}
                                        className={`p-2.5 text-xs rounded-xl border text-left transition-all cursor-pointer ${varianteSeleccionada.id === v.id
                                            ? "bg-teal-500/10 border-teal-500 text-teal-400 font-bold"
                                            : "bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600"
                                            }`}
                                    >
                                        <span className="block font-medium text-slate-200">{v.plataforma?.nombre || "General"}</span>
                                        <span className="text-[10px] opacity-80">{v.formato?.nombre || "Físico"}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ESPACIO TÉCNICO DE LA VARIANTE ACTUAL */}
                    <div className="text-xs space-y-1 text-slate-400 mb-6 bg-slate-950/20 p-3 rounded-lg border border-slate-800/60">
                        <div className="flex justify-between">
                            <span>Formato elegido:</span>
                            <span className="text-slate-200 font-medium">{varianteSeleccionada?.formato?.nombre || "No especificado"}</span>
                        </div>
                        {varianteSeleccionada?.detalle_digital?.peso_gb && (
                            <div className="flex justify-between">
                                <span>Peso estimado:</span>
                                <span className="text-slate-200 font-medium">{varianteSeleccionada.detalle_digital.peso_gb} GB</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span>Stock disponible:</span>
                            <span className={`font-semibold ${varianteSeleccionada?.stock > 0 ? "text-emerald-400" : "text-rose-400"}`}>
                                {varianteSeleccionada?.stock || 0} unidades
                            </span>
                        </div>
                    </div>

                    {/* COMPRA: CONTROLES DE CANTIDAD Y PRECIO TOTAL */}
                    <div className="mt-auto pt-4 border-t border-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <span className="text-xs text-slate-500 uppercase font-bold block">Total estimado</span>
                                <span className="text-2xl font-black text-teal-400 tracking-tight">
                                    {formatearMoneda(precioTotal)}
                                </span>
                            </div>

                            {/* Selector de cantidad */}
                            <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden p-1">
                                <button
                                    onClick={decrementar}
                                    disabled={cantidad <= 1}
                                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none font-bold cursor-pointer hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    ー
                                </button>
                                <span className="w-10 text-center font-bold text-sm text-slate-200 select-none">
                                    {cantidad}
                                </span>
                                <button
                                    onClick={incrementar}
                                    disabled={cantidad >= (varianteSeleccionada?.stock || 0)}
                                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none font-bold cursor-pointer hover:bg-slate-800 rounded-lg transition-colors"
                                >
                                    ＋
                                </button>
                            </div>
                        </div>

                        {/* BOTONES DE ACCIÓN PRINCIPALES */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleActionCarrito}
                                disabled={!varianteSeleccionada || varianteSeleccionada.stock <= 0}
                                className="flex-1 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-transparent text-slate-950 font-black text-sm py-3.5 px-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer text-center"
                            >
                                {varianteSeleccionada?.stock > 0
                                    ? (itemEnCarrito ? "Actualizar Carrito" : "Agregar al Carrito")
                                    : "Agotado"
                                }
                            </button>

                            <button
                                onClick={onClose}
                                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-sm py-3.5 px-4 rounded-xl transition-colors cursor-pointer"
                            >
                                Volver
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}