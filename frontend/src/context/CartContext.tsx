import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

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
    const [isLoading, setIsLoading] = useState(false);

    // Cargar carrito (aquí simularíamos el GET a FastAPI)
    const fetchCart = async () => {
        if (!isAuthenticated) return;
        // En producción: const res = await axios.get('/api/carrito/') -> setCartItems(res.data.items)
    };

    useEffect(() => {
        if (!isAuthenticated) {
            setCartItems([]);
            setIsCartOpen(false);
        }
    }, [isAuthenticated]);

    // Obtener de forma reactiva cuántas unidades hay de X variante en el carrito
    const getItemQuantity = (varianteId: number) => {
        const item = cartItems.find(i => i.producto_variante_id === varianteId);
        return item ? item.cantidad : 0;
    };

    // Agregar al carrito reactivamente (POST a /api/carrito/items)
    const addToCart = async (productData: Omit<CartItem, "id">) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.producto_variante_id === productData.producto_variante_id);
            if (existing) {
                // Si ya existe, sumamos la cantidad seleccionada
                return prev.map(i =>
                    i.producto_variante_id === productData.producto_variante_id
                        ? { ...i, cantidad: i.cantidad + productData.cantidad }
                        : i
                );
            }
            // Si es nuevo, le creamos un ID provisorio hasta que FastAPI responda el definitivo
            return [...prev, { ...productData, id: Date.now() }];
        });

        // Opcional: Acá harías el llamado real await axios.post('/api/carrito/items', ...)
    };

    const updateQuantity = async (itemId: number, varianteId: number, nuevaCantidad: number) => {
        if (nuevaCantidad <= 0) {
            await removeFromCart(itemId);
            return;
        }
        setCartItems(prev => prev.map(item => item.producto_variante_id === varianteId ? { ...item, cantidad: nuevaCantidad } : item));
    };

    const removeFromCart = async (itemId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

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