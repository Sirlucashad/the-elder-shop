import { useState } from "react";
import type { Product } from "../types/products";

interface ProductCardProps {
    product: Product;
    onOpenModal: () => void;
}

export default function ProductCard({ product, onOpenModal }: ProductCardProps) {
    const esVideojuego = !!product.videojuego;
    const variantesValidas = product.variantes || [];

    // Buscar variante de menor precio como principal
    const variantePrincipal = variantesValidas.reduce((min, v) =>
        (v.precio ?? 0) < (min.precio ?? 0) ? v : min,
        variantesValidas[0]
    );

    const stockDisponible = variantePrincipal?.stock || 0;

    // Estado local para el carrito de esta tarjeta
    const [cantidad, setCantidad] = useState<number>(0);

    // Formatear el precio
    const tienePrecio = variantePrincipal && variantePrincipal.precio !== undefined;
    const precioFormateado = tienePrecio
        ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(variantePrincipal.precio!)
        : "Consultar";

    const plataformasUnicas = Array.from(
        new Set(variantesValidas.map(v => v.plataforma?.nombre).filter(Boolean))
    );
    const formatosUnicos = Array.from(
        new Set(variantesValidas.map(v => v.formato?.nombre).filter(Boolean))
    );

    // Handlers para el carrito con stopPropagation
    const agregarAlCarrito = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evita que se abra el modal al interactuar con el botón
        if (stockDisponible > 0) {
            setCantidad(1);
        }
    };

    const incrementar = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (cantidad < stockDisponible) {
            setCantidad(prev => prev + 1);
        }
    };

    const decrementar = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCantidad(prev => prev - 1);
    };

    return (
        <div
            onClick={onOpenModal}
            className="group flex flex-col h-full bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300 cursor-pointer"
        >
            {/* CONTENEDOR DE IMAGEN (Cambiado de aspect-video a aspect-square para dar más espacio y proporción cuadrada) */}
            <div className="relative aspect-square w-full bg-slate-800 overflow-hidden">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-800">
                        No Image
                    </div>
                )}

                {/* BADGE: TIPO DE PRODUCTO */}
                <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm uppercase ${esVideojuego ? "bg-purple-600 text-purple-100" : "bg-blue-600 text-blue-100"
                    }`}>
                    {esVideojuego ? "Videojuego" : "Accesorio / Otro"}
                </span>
            </div>

            {/* CONTENIDO DEL PRODUCTO */}
            <div className="flex flex-col flex-1 p-4">
                {/* TÍTULO (Cambia a color dorado en hover de la card) */}
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 line-clamp-1 transition-colors">
                    {product.nombre}
                </h3>

                {/* GÉNEROS (Si es videojuego) */}
                {esVideojuego && product.videojuego?.generos && product.videojuego.generos.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5 mb-2">
                        {product.videojuego.generos.map((gen) => (
                            <span
                                key={gen.id}
                                className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded-sm"
                            >
                                {gen.nombre}
                            </span>
                        ))}
                    </div>
                )}

                {/* DESCRIPCIÓN */}
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 mb-4 flex-1">
                    {product.descripcion || "Sin descripción disponible."}
                </p>

                {/* ESPECIFICACIONES TÉCNICAS */}
                <div className="space-y-1.5 border-t border-slate-800 pt-3 mb-4">
                    {plataformasUnicas.length > 0 && (
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Plataforma:</span>
                            <span className="text-slate-300 font-medium">{plataformasUnicas.join(', ')}</span>
                        </div>
                    )}

                    {formatosUnicos.length > 0 && (
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">Formato:</span>
                            <span className="text-slate-300 font-medium">{formatosUnicos.join(', ')}</span>
                        </div>
                    )}

                    {/* Muestra si alguna variante tiene stock */}
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Disponibilidad:</span>
                        {stockDisponible > 0 ? (
                            <span className="text-emerald-400 font-medium">En Stock ({stockDisponible})</span>
                        ) : (
                            <span className="text-rose-400 font-medium">Sin Stock</span>
                        )}
                    </div>
                </div>

                {/* PRECIO Y ACCIÓN TRANSFORMA-BOTÓN (Estética Dorada) */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800/50">
                    <div>
                        {variantesValidas.length > 1 && (
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Desde</p>
                        )}
                        <p className="text-xl font-black text-amber-400 tracking-tight">
                            {precioFormateado}
                        </p>
                    </div>

                    {/* Lógica del botón dinámico */}
                    {stockDisponible === 0 ? (
                        <button
                            disabled
                            className="bg-slate-800 text-slate-500 text-xs py-2 px-3.5 rounded-lg font-bold"
                        >
                            Agotado
                        </button>
                    ) : cantidad === 0 ? (
                        <button
                            onClick={agregarAlCarrito}
                            className="bg-amber-500 hover:bg-yellow-500 text-slate-950 font-bold text-xs py-2 px-3.5 rounded-lg transition-all duration-200 active:scale-95 cursor-pointer shadow-md shadow-amber-500/10"
                        >
                            Agregar
                        </button>
                    ) : (
                        <div className="flex items-center bg-slate-950 border border-slate-700 rounded-lg p-0.5 h-8">
                            <button
                                onClick={decrementar}
                                className="w-7 h-full flex items-center justify-center text-slate-400 hover:text-white font-bold hover:bg-slate-800 rounded-md transition-colors"
                            >
                                ー
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-200 select-none">
                                {cantidad}
                            </span>
                            <button
                                onClick={incrementar}
                                disabled={cantidad >= stockDisponible}
                                className="w-7 h-full flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent font-bold hover:bg-slate-800 rounded-md transition-colors"
                            >
                                ＋
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}