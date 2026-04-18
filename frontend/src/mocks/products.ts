import godOfWar from "../assets/images/godOfWar.jfif";





export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    stock: number;
}



export const productsMock: Product[] = [
    {
        id: 1,
        name: "God of War Ragnarok",
        price: 59999,
        image: godOfWar,
        description: "Acción y aventura en el mundo nórdico",
        category: "Juegos",
        stock: 12,
    },
    {
        id: 2,
        name: "PlayStation 5",
        price: 899999,
        image: "https://source.unsplash.com/featured/400x300?playstation5",
        description: "Consola de nueva generación",
        category: "Consolas",
        stock: 5,
    },
    {
        id: 3,
        name: "Xbox Series X",
        price: 859999,
        image: "https://source.unsplash.com/featured/400x300?xbox",
        description: "Potencia y rendimiento en gaming",
        category: "Consolas",
        stock: 7,
    },
    {
        id: 4,
        name: "Joystick DualSense",
        price: 120000,
        image: "https://source.unsplash.com/featured/400x300?gaming-controller",
        description: "Control inalámbrico PS5",
        category: "Accesorios",
        stock: 20,
    },
    {
        id: 5,
        name: "Auriculares Gamer RGB",
        price: 45000,
        image: "https://source.unsplash.com/featured/400x300?gaming-headset",
        description: "Sonido envolvente y micrófono integrado",
        category: "Accesorios",
        stock: 15,
    },
    {
        id: 6,
        name: "FIFA 24",
        price: 49999,
        image: "https://source.unsplash.com/featured/400x300?soccer-game",
        description: "El simulador de fútbol más realista",
        category: "Juegos",
        stock: 10,
    },
    {
        id: 7,
        name: "Silla Gamer Pro",
        price: 320000,
        image: "https://source.unsplash.com/featured/400x300?gaming-chair",
        description: "Comodidad para largas sesiones",
        category: "Accesorios",
        stock: 3,
    },
    {
        id: 8,
        name: "Monitor 144Hz 27\"",
        price: 410000,
        image: "https://source.unsplash.com/featured/400x300?gaming-monitor",
        description: "Alta tasa de refresco para gaming",
        category: "Accesorios",
        stock: 6,
    },
];