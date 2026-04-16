import { useState } from "react";
import logo from "/src/assets/icons/logoElderShop.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#0b1e2d] text-white shadow-md">

      {/* TOP BAR */}
      <div className="flex items-center justify-between h-30 px-6">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Elder Shop" className="h-20" />
          <span className="hidden md:block text-xl font-bold tracking-wide">
            THE ELDER SHOP
          </span>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 px-6">
          <input
            type="search"
            placeholder="Buscar juegos, consolas, accesorios..."
            className="w-full max-w-lg mx-auto px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          <button className="hidden md:block hover:text-yellow-400 transition">
            Iniciar sesión
          </button>

          <button className="hidden md:block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition">
            Registrarse
          </button>

          {/* CARRITO */}
          <button className="relative">
            🛒
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-1 rounded-full">
              2
            </span>
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* NAVBAR (categorías) */}
      <nav className="hidden md:flex items-center justify-center gap-8 h-12 bg-[#081520] text-sm font-medium">

        <a href="#" className="hover:text-yellow-400 transition">
          Juegos
        </a>

        <a href="#" className="hover:text-yellow-400 transition">
          Consolas
        </a>

        <a href="#" className="hover:text-yellow-400 transition">
          Accesorios
        </a>

        <a href="#" className="hover:text-yellow-400 transition">
          Ofertas
        </a>

      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#081520] px-6 py-4 space-y-4">

          <input
            type="search"
            placeholder="Buscar..."
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          />

          <a href="#" className="block">Juegos</a>
          <a href="#" className="block">Consolas</a>
          <a href="#" className="block">Accesorios</a>
          <a href="#" className="block">Ofertas</a>

          <hr className="border-gray-700" />

          <button className="block w-full text-left">
            Iniciar sesión
          </button>

          <button className="block w-full text-left text-yellow-400">
            Registrarse
          </button>
        </div>
      )}

    </header>
  );
}