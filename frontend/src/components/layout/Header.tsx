import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import logo from "/src/assets/icons/logoElderShop.png";
import Instagram from "/src/assets/icons/Instagram.svg";
import Facebook from "/src/assets/icons/Facebook.svg";
import WhatsApp from "/src/assets/icons/WhatsAppIcon.svg";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<string | null>(null);

  // NUEVO: controla el modal de confirmación
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const {
    isAuthenticated,
    isAdmin,
    logout
  } = useAuthContext();

  const navigate = useNavigate();


  // LOGOUT REAL
  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };


  return (
    <>
      <header className="w-full bg-[#041e33] text-white shadow-md relative z-40">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-40 pl-1 pr-6 mx-10">

          {/* LOGO */}
          <Link to="/">
            <div className="flex items-center gap-0 ml-2">

              <img
                src={logo}
                alt="Elder Shop"
                className="h-30"
              />

              <span className="hidden md:block text-3xl font-bold tracking-wide font-medieval ml-4">
                THE ELDER SHOP
              </span>

            </div>
          </Link>


          {/* SEARCH */}
          {isAuthenticated && (
            <div className="hidden md:flex flex-1 px-6">
              <input
                type="search"
                placeholder="Buscar juegos, consolas, accesorios..."
                className="w-full max-w-2xl mx-auto px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          )}


          {/* ACTIONS */}
          <div className="flex items-center gap-4">

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="hidden md:block mr-2 hover:text-yellow-400 transition cursor-pointer"
                >
                  Iniciar sesión
                </Link>

                <Link
                  to="/register"
                  className="hidden md:block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition cursor-pointer"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <>
                {/* CARRITO */}
                <button className="relative cursor-pointer text-3xl px-5 hover:scale-110 transition">
                  🛒

                  <span className="absolute -top-2 right-3 bg-yellow-500 text-black text-xs px-1 rounded-full">
                    2
                  </span>
                </button>


                {/* ADMIN */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hidden md:block bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-500 transition"
                  >
                    Admin
                  </Link>
                )}


                {/* LOGOUT */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="hidden md:block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}


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


        {/* NAVBAR */}
        <div className="hidden md:flex items-center justify-between gap-8 h-15 bg-[#081520] text-sm font-medium font-medieval">

          {/* CONTENEDOR RELATIVO */}
          <div className="relative h-full ml-1">

            {isAuthenticated && (
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="h-full px-25 text-white font-extrabold bg-[#1a2e3e] hover:bg-[#253d52] border-b-2 border-yellow-500 cursor-pointer transition-colors"
              >
                CATEGORÍAS {catOpen ? '▲' : '▼'}
              </button>
            )}

            {catOpen && (
              <ul
                className="absolute left-0 top-full w-full bg-[#081520] border border-gray-700 shadow-xl z-50"
                onMouseLeave={() => setActiveSub(null)}
              >

                {/* JUEGOS */}
                <li
                  className="relative hover:bg-yellow-500 hover:text-black transition group"
                  onMouseEnter={() => setActiveSub('juegos')}
                >
                  <a href="#" className="flex justify-between items-center px-6 py-3">
                    Juegos <span>▶</span>
                  </a>

                  {activeSub === 'juegos' && (
                    <ul className="absolute left-full top-0 w-48 bg-[#081520] border border-gray-700 shadow-xl text-white">

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">PC</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">PS4</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">PS5</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3">
                        <a href="#">Xbox Series</a>
                      </li>

                    </ul>
                  )}
                </li>


                {/* CONSOLAS */}
                <li
                  className="relative hover:bg-yellow-500 hover:text-black transition border-t border-gray-700"
                  onMouseEnter={() => setActiveSub('consolas')}
                >
                  <a href="#" className="flex justify-between items-center px-6 py-3">
                    Consolas <span>▶</span>
                  </a>

                  {activeSub === 'consolas' && (
                    <ul className="absolute left-full top-0 w-48 bg-[#081520] border border-gray-700 shadow-xl text-white">

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">PS4</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">PS5</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3">
                        <a href="#">Nintendo</a>
                      </li>

                    </ul>
                  )}
                </li>


                {/* ACCESORIOS */}
                <li
                  className="relative hover:bg-yellow-500 hover:text-black transition border-t border-gray-700"
                  onMouseEnter={() => setActiveSub('accesorios')}
                >
                  <a href="#" className="flex justify-between items-center px-6 py-3">
                    Accesorios <span>▶</span>
                  </a>

                  {activeSub === 'accesorios' && (
                    <ul className="absolute left-full top-0 w-48 bg-[#081520] border border-gray-700 shadow-xl text-white">

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">Joysticks</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">Auriculares</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3 border-b border-gray-700">
                        <a href="#">Pantallas</a>
                      </li>

                      <li className="hover:bg-yellow-500 hover:text-black p-3">
                        <a href="#">Teclados</a>
                      </li>

                    </ul>
                  )}
                </li>

              </ul>
            )}
          </div>


          {/* REDES */}
          <div className="flex items-center gap-4 h-full pr-6">

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="block hover:scale-110 transition-transform"
            >
              <img
                src={Instagram}
                alt="Instagram"
                className="h-10 w-10 object-contain"
              />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="block hover:scale-110 transition-transform"
            >
              <img
                src={Facebook}
                alt="Facebook"
                className="h-10 w-10 object-contain"
              />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="block hover:scale-110 transition-transform"
            >
              <img
                src={WhatsApp}
                alt="WhatsApp"
                className="h-10 w-10 object-contain"
              />
            </a>

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

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="block">
                  Iniciar sesión
                </Link>

                <Link
                  to="/register"
                  className="block text-yellow-400"
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="block w-full text-left text-red-400"
              >
                Logout
              </button>
            )}

          </div>
        )}

      </header>


      {/* ========================= MODAL LOGOUT ========================= */}

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] px-4">

          <div className="w-full max-w-md bg-[#0d1b2a] border border-gray-700 rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">

            <h2 className="text-2xl font-bold text-white mb-3 font-medieval">
              ¿Cerrar sesión?
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              Vas a salir de tu cuenta actual en The Elder Shop.
            </p>

            <div className="flex justify-end gap-4">

              {/* CANCELAR */}
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white cursor-pointer"
              >
                Cancelar
              </button>

              {/* CONFIRMAR */}
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-white font-bold cursor-pointer"
              >
                Sí, salir
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}