import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { useCartQueries } from "../hooks/useCartQueries";

interface CartItem {
    id: number; // ID del CarritoItem en la base de datos
    producto_variante_id: number;
    cantidad: number;
    nombre?: string;
    precioUnitario?: number;
    imagen?: string;
    varianteInfo?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
    addToCart: (productData: Omit<CartItem, "id">) => Promise<void>;
    updateQuantity: (itemId: number, varianteId: number, nuevaCantidad: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    getItemQuantity: (varianteId: number) => number;
    totalUnits: number;
    subtotal: number;
    total: number;
    isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthContext();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Inyectamos nuestro hook de TanStack Query
    const { cartData, isLoading, addItem, removeItem } = useCartQueries(isAuthenticated);

    // Efecto para sincronizar los datos devueltos por FastAPI con el estado local del Context
    useEffect(() => {
        if (!isAuthenticated) {
            setCartItems([]);
            setIsCartOpen(false);
            return;
        }

        if (cartData && cartData.items) {
            // Mapeamos los campos del backend a la estructura visual que ya usan tus componentes del front
            const mappedItems: CartItem[] = cartData.items.map((item: any) => ({
                id: item.id,
                producto_variante_id: item.producto_variante_id,
                cantidad: item.cantidad,
                // Si tu relación 'variante' en el backend ya trae el producto anidado:
                nombre: item.variante?.producto?.nombre || "Producto",
                precioUnitario: item.variante?.precio || 0,
                imagen: item.variante?.producto?.image_url || "/placeholder.png",
                varianteInfo: item.variante?.nombre || ""
            }));
            setCartItems(mappedItems);
        }
    }, [cartData, isAuthenticated]);

    // Obtener cuántas unidades hay de una variante
    const getItemQuantity = (varianteId: number) => {
        const item = cartItems.find(i => i.producto_variante_id === varianteId);
        return item ? item.cantidad : 0;
    };

    // Agregar al carrito (Llamada al POST del Backend)
    const addToCart = async (productData: Omit<CartItem, "id">) => {
        if (!isAuthenticated) return;
        try {
            await addItem({
                producto_variante_id: productData.producto_variante_id,
                cantidad: productData.cantidad
            });
        } catch (error) {
            console.error("Error al añadir item al carrito en BD:", error);
        }
    };

    // Actualizar cantidad (Suma, resta o elimina desde las flechas)
    const updateQuantity = async (itemId: number, varianteId: number, nuevaCantidad: number) => {
        if (!isAuthenticated) return;

        const itemActual = cartItems.find(i => i.id === itemId);
        if (!itemActual) return;

        if (nuevaCantidad <= 0) {
            await removeFromCart(itemId);
            return;
        }

        // Calculamos la diferencia netamente para mandar al backend
        // Si hay 2 unidades y pasamos a 3, mandamos +1. Si pasamos a 1, mandamos -1.
        const diferencia = nuevaCantidad - itemActual.cantidad;

        try {
            await addItem({
                producto_variante_id: varianteId,
                cantidad: diferencia
            });
        } catch (error) {
            console.error("Error al actualizar cantidad en BD:", error);
        }
    };

    // Eliminar completamente el ítem del renglón (Llamada al DELETE del Backend)
    const removeFromCart = async (itemId: number) => {
        if (!isAuthenticated) return;
        try {
            await removeItem(itemId);
        } catch (error) {
            console.error("Error al remover item del carrito en BD:", error);
        }
    };

    // Cálculos automáticos y reactivos basados en la data real mapeada de la BD
    const totalUnits = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.precioUnitario || 0) * item.cantidad, 0);
    const total = subtotal;

    return (
        <CartContext.Provider value={{
            cartItems, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart,
            getItemQuantity, totalUnits, subtotal, total, isLoading
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
    return context;
}