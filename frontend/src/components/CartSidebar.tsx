import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
    const navigate = useNavigate();
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        subtotal = 0,
        total = 0
    } = useCart();

    if (!isCartOpen) return null;

    const handleProcederCompra = () => {

        setIsCartOpen(false);


        navigate("/checkout");
    };

    return (
        <>
            {/* Fondo oscuro traslúcido para cerrar al hacer click fuera */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Contenedor del Panel Lateral */}
            <div className="fixed right-0 top-40 bottom-0 w-full sm:w-96 bg-[#061422] border-l border-slate-800 text-white z-50 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">

                {/* Cabecera del Carrito */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#041e33]">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">🧳</span>
                        <h2 className="text-lg font-bold font-medieval tracking-wide">Tu Inventario</h2>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-slate-400 hover:text-white text-sm bg-slate-800/50 hover:bg-slate-800 px-2 py-1 rounded-md transition cursor-pointer"
                    >
                        Cerrar ✕
                    </button>
                </div>

                {/* Lista de Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                            <span className="text-4xl mb-2">☠️</span>
                            <p className="font-medium">Tu carrito está vacío.</p>
                            <p className="text-xs text-slate-600 mt-1">¡Explorá el catálogo para equiparte!</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                                {/* Miniatura de Imagen */}
                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                    className="w-16 h-16 object-cover rounded-lg bg-slate-950 border border-slate-800 flex-shrink-0"
                                />

                                {/* Detalles de Texto */}
                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-sm font-semibold truncate text-slate-200">{item.nombre}</h4>
                                        {item.varianteInfo && (
                                            <p className="text-[11px] text-amber-500/70 font-medium">{item.varianteInfo}</p>
                                        )}
                                    </div>

                                    <p className="text-xs font-bold text-slate-300 mt-1">
                                        ${((item.precioUnitario || 0) * item.cantidad).toLocaleString("es-AR")}
                                    </p>
                                </div>

                                {/* Controles de Cantidad y Tacho */}
                                <div className="flex flex-col items-end justify-between flex-shrink-0">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-slate-500 hover:text-red-400 transition text-xs p-1 cursor-pointer"
                                        title="Eliminar del carrito"
                                    >
                                        🗑️
                                    </button>

                                    <div className="flex items-center bg-slate-950 rounded-lg p-0.5 border border-slate-800">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.producto_variante_id, item.cantidad - 1)}
                                            className="w-5 h-5 flex items-center justify-center text-xs text-slate-400 hover:text-amber-500 font-bold transition cursor-pointer"
                                            disabled={item.cantidad <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="w-6 text-center text-xs font-bold text-amber-400">{item.cantidad}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.producto_variante_id, item.cantidad + 1)}
                                            className="w-5 h-5 flex items-center justify-center text-xs text-slate-400 hover:text-amber-500 font-bold transition cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Sección de Totales y Botón de Pago */}
                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-slate-800 bg-[#041e33]/90 space-y-3">
                        <div className="space-y-1.5 text-sm text-slate-400">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="text-slate-200">${subtotal.toLocaleString("es-AR")}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-white pt-1.5 border-t border-slate-800/60">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Total:</span>
                                <span className="text-yellow-400">${total.toLocaleString("es-AR")}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleProcederCompra}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 py-3 rounded-xl font-bold text-sm tracking-wide shadow-md shadow-amber-500/10 hover:from-amber-400 hover:to-yellow-400 transition duration-200 cursor-pointer text-center block uppercase font-sans"
                        >
                            🛡️ Proceder a la Compra
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}