import { useState } from "react";
import logo from "/src/assets/icons/logoElderShop.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="w-full bg-[#0c375a] text-white shadow-md">

      {/* TOP BAR */}
      <div className="flex items-center justify-between h-40 pl-1 pr-6">

        {/* LOGO */}
        <div className="flex items-center gap-0">

          <img src={logo} alt="Elder Shop" className="h-30" />


          <span className="hidden md:block text-3xl font-bold tracking-wide font-medieval">
            THE ELDER SHOP
          </span>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 px-6">
          <input
            type="search"
            placeholder="Buscar juegos, consolas, accesorios..."
            className="w-full max-w-2xl mx-auto px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          <button className="hidden md:block hover:text-yellow-400 transition cursor-pointer">
            Iniciar sesión
          </button>

          <button className="hidden md:block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition cursor-pointer">
            Registrarse
          </button>

          {/* CARRITO */}
          <button className="relative cursor-pointer text-3xl hover:scale-110 transition">
            🛒
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-1 rounded-full ">
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

      {/*-----------------------------------------------DIVISION DEL HEADER---------------------------------------------------------*/}


      {/* NAVBAR (categorías) */}
      <div className="hidden md:flex items-center gap-8 h-15 bg-[#081520] text-sm font-medium">

        {/* CONTENEDOR RELATIVO*/}
        <div className="relative h-full ml-4">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="h-full px-25 text-white font-extrabold bg-[#1a2e3e] hover:bg-[#253d52] border-b-2 border-yellow-500 cursor-pointer transition-colors"
          >
            CATEGORÍAS {catOpen ? '▲' : '▼'}
          </button>

          {/* EL RECTÁNGULO DESPLEGABLE */}
          {catOpen && (
            <ul className="absolute left-0 top-full w-full bg-[#081520] border border-gray-700 shadow-xl z-50">
              <li className="hover:bg-yellow-500 hover:text-black transition">
                <a href="#" className="block px-6 py-3">Juegos PC</a>
              </li>
              <li className="hover:bg-yellow-500 hover:text-black transition border-t border-gray-700">
                <a href="#" className="block px-6 py-3">PlayStation</a>
              </li>
              <li className="hover:bg-yellow-500 hover:text-black transition border-t border-gray-700">
                <a href="#" className="block px-6 py-3">Xbox</a>
              </li>
              <li className="hover:bg-yellow-500 hover:text-black transition border-t border-gray-700">
                <a href="#" className="block px-6 py-3">Nintendo</a>
              </li>
            </ul>
          )}
        </div>
      </div>



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