import { Link } from "react-router-dom";
import { useProducts, useProductActions } from "../hooks/useProducts";
import { toast } from "sonner"; // Asumiendo el uso de sooner para notificaciones
import {
    Edit,
    Trash2,
    Plus,
    Package,
    AlertTriangle,
    Layers,
    Gamepad2,
    Loader2
} from "lucide-react";

export default function ProductsView() {
    // 1. Consumimos los hooks de TanStack Query
    const { data: products, isLoading, isError } = useProducts();
    const { deleteProduct, isDeleting } = useProductActions();

  

    // Manejador de eliminación con feedback
    const handleDelete = (id: number, nombre: string) => {
        toast.warning(`¿Eliminar "${nombre}"?`, {
            description: "Esta acción no se puede deshacer.",
            action: {
                label: "Confirmar",
                onClick: () => {
                    deleteProduct(id, {
                        onSuccess: () => toast.success("Item eliminado de la forja"),
                        onError: () => toast.error("No se pudo eliminar el item")
                    });
                },
            },
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
                <Loader2 className="text-amber-500 animate-spin" size={48} />
                <div className="text-amber-500 animate-pulse font-black text-xl uppercase tracking-widest font-medieval">
                    Invocando inventario...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <div className="bg-red-500/10 border border-red-500/50 p-8 rounded-3xl text-center max-w-md">
                    <AlertTriangle className="text-red-500 mx-auto mb-4" size={56} />
                    <h3 className="text-white font-bold text-2xl mb-2">Error de Conexión</h3>
                    <p className="text-red-400/80 mb-6">
                        Las crónicas de la base de datos no pudieron ser leídas en este momento.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold transition-colors"
                    >
                        Reintentar conjuro
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <p className="text-amber-400 uppercase tracking-[0.3em] text-xs font-black mb-2">
                            Gestión de Suministros
                        </p>
                        <h1 className="text-6xl font-black text-white font-medieval tracking-tight">
                            Productos
                        </h1>
                    </div>

                    <Link
                        to="/admin/create-product"
                        className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 active:scale-95"
                    >
                        <Plus size={20} strokeWidth={3} />
                        AGREGAR ITEM
                    </Link>
                </div>

                {/* TABLA PRINCIPAL */}
                <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 shadow-2xl backdrop-blur-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-0">
                            <thead>
                                <tr className="bg-slate-800/60 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                                    <th className="px-8 py-6">Info del Producto</th>
                                    <th className="px-6 py-6 text-center">Categoría / Plataforma</th>
                                    <th className="px-6 py-6 text-center">Stock</th>
                                    <th className="px-6 py-6 text-center">Precio</th>
                                    <th className="px-8 py-6 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/40">
                                {products?.map((product: any) => (
                                    <tr key={product.id} className="group hover:bg-white/2 transition-colors">
                                        {/* INFO Y THUMBNAIL */}
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-5">
                                                <div className="relative size-20 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 group-hover:border-amber-500/50 transition-all shadow-lg">
                                                    {product.image_url ? (
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.nombre}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                                                            <Package size={28} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="max-w-xs">
                                                    <h3 className="text-white font-bold text-lg group-hover:text-amber-400 transition-colors truncate">
                                                        {product.nombre}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                                                        {product.descripcion || "Sin descripción disponible"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* CATEGORÍA / PLATAFORMA */}
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                {/* CATEGORÍAS (GÉNEROS) */}
                                                <div className="flex flex-wrap justify-center gap-1 max-w-37.5">
                                                    {product.videojuego?.generos?.map((g: any) => (
                                                        <span
                                                            key={g.id}
                                                            className="text-[9px] font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700 uppercase tracking-tighter"
                                                        >
                                                            {g.nombre}
                                                        </span>
                                                    ))}
                                                    {(!product.videojuego?.generos || product.videojuego.generos.length === 0) && (
                                                        <span className="text-[9px] text-slate-600 italic">Sin categoría</span>
                                                    )}
                                                </div>

                                                {/* PLATAFORMA Y FORMATO */}
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="flex items-center gap-1.5 text-[11px] font-black text-amber-200 bg-amber-900/30 px-3 py-1.5 rounded-lg border border-amber-500/20">
                                                        <Gamepad2 size={14} className="text-amber-500" />
                                                        {product.variantes?.[0]?.plataforma?.nombre || "N/A"}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                                        {product.variantes?.[0]?.formato?.nombre || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* STOCK */}
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex flex-col items-center gap-1.5">
                                                <div className={`text-xl font-black ${product.variantes?.[0]?.stock < 5 ? 'text-red-500 animate-pulse' : 'text-slate-200'}`}>
                                                    {product.variantes?.[0]?.stock ?? 0}
                                                </div>
                                                {/* ... el resto de la barra de progreso usando product.variantes[0].stock ... */}
                                            </div>
                                        </td>

                                        {/* PRECIO */}
                                        <td className="px-6 py-6 text-center">
                                            <div className="text-2xl font-black text-amber-500 italic">
                                                ${Number(product.variantes?.[0]?.precio || 0).toLocaleString('es-ES')}
                                            </div>
                                        </td>

                                        {/* ACCIONES */}
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end items-center gap-3">
                                                <Link
                                                    to={`/admin/products/edit/${product.id}`}
                                                    className="p-3 bg-slate-800/50 hover:bg-amber-600/20 hover:text-amber-500 text-slate-400 rounded-xl transition-all border border-slate-700 hover:border-amber-500/30 shadow-sm"
                                                    title="Editar Item"
                                                >
                                                    <Edit size={20} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.nombre)}
                                                    disabled={isDeleting}
                                                    className="p-3 bg-slate-800/50 hover:bg-red-600/20 hover:text-red-500 text-slate-400 rounded-xl transition-all border border-slate-700 hover:border-red-500/30 disabled:opacity-20 disabled:cursor-not-allowed shadow-sm hover:cursor-pointer"
                                                    title="Eliminar Item"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ESTADO VACÍO */}
                    {products?.length === 0 && (
                        <div className="py-32 text-center">
                            <div className="bg-slate-800/30 size-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-700/50">
                                <Layers className="text-slate-700" size={48} />
                            </div>
                            <h3 className="text-white text-2xl font-bold font-medieval">La bóveda está vacía</h3>
                            <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                                No se han forjado items todavía. Comienza agregando uno nuevo.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}