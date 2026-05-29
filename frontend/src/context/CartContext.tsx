import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

// Asumimos un tipado básico basado en tus schemas de FastAPI
interface CartItem {
    id: number;
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
    addToCart: (varianteId: number, cantidad: number) => Promise<void>;
    updateQuantity: (itemId: number, varianteId: number, nuevaCantidad: number) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
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
    const [isLoading, setIsLoading] = useState(false);

    // Simulación de fetch a tu endpoint router.get("/")
    const fetchCart = async () => {
        if (!isAuthenticated) return;
        setIsLoading(true);
        try {
            // Aquí harías tu llamado real: axios.get('/api/carrito/')
            // Por ahora simularemos datos para que veas la barra lateral en acción:
            const mockItems: CartItem[] = [
                {
                    id: 10,
                    producto_variante_id: 1,
                    cantidad: 1,
                    nombre: "PlayStation 5 Slim",
                    precioUnitario: 800000,
                    imagen: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200",
                    varianteInfo: "1TB - Física"
                },
                {
                    id: 11,
                    producto_variante_id: 5,
                    cantidad: 2,
                    nombre: "Elden Ring",
                    precioUnitario: 60000,
                    imagen: "https://images.unsplash.com/photo-1655821888788-6107699e173b?w=200",
                    varianteInfo: "PS5 - Digital"
                }
            ];
            setCartItems(mockItems);
        } catch (error) {
            console.error("Error cargando el carrito", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCartItems([]);
            setIsCartOpen(false);
        }
    }, [isAuthenticated]);

    // Corresponde a tu endpoint router.post("/items")
    const addToCart = async (varianteId: number, cantidad: number) => {
        try {
            // POST a /api/carrito/items con { producto_variante_id: varianteId, cantidad }
            await fetchCart(); // Recargar datos frescos del backend
        } catch (error) {
            console.error("Error agregando item", error);
        }
    };

    // Combina eliminar y agregar según la cantidad deseada
    const updateQuantity = async (itemId: number, varianteId: number, nuevaCantidad: number) => {
        if (nuevaCantidad <= 0) {
            await removeFromCart(itemId);
            return;
        }
        // Lógica para actualizar cantidad (ej. si tu backend incrementa, restás o sumás la diferencia)
        // O modificando el estado local temporalmente:
        setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, cantidad: nuevaCantidad } : item));
    };

    // Corresponde a tu endpoint router.delete("/items/{item_id}")
    const removeFromCart = async (itemId: number) => {
        try {
            // DELETE a /api/carrito/items/${itemId}
            setCartItems(prev => prev.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error removiendo item", error);
        }
    };

    // Cálculos reactivos en base a lo que decidas manejar en Frontend
    const totalUnits = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    const subtotal = cartItems.reduce((acc, item) => acc + (item.precioUnitario || 0) * item.cantidad, 0);

    // Respondemos a tu duda: El subtotal es ideal por si metés cupones de descuento o promociones especiales.
    const descuento = 0;
    const total = subtotal - descuento;

    return (
        <CartContext.Provider value={{
            cartItems, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart,
            totalUnits, subtotal, total, isLoading
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