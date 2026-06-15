import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext"; 

import logo from "/src/assets/icons/logoElderShop.png";
import Instagram from "/src/assets/icons/Instagram.svg";
import Facebook from "/src/assets/icons/Facebook.svg";
import WhatsApp from "/src/assets/icons/WhatsAppIcon.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const { isAuthenticated, isAdmin, logout } = useAuthContext();
  const { totalUnits, isCartOpen, setIsCartOpen } = useCart(); 
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterView = location.pathname === "/register";

  const queryParams = new URLSearchParams(location.search);
  const tieneFiltrosActivos =
    queryParams.has("search") ||
    queryParams.has("categoria") ||
    queryParams.has("subcategoria");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("search") || "");
  }, [location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const params = new URLSearchParams(location.search);
    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    navigate(`/shop?${params.toString()}`);
  };

  const handleCategoryClick = (categoria: string, subcategoria?: string) => {
    const params = new URLSearchParams();
    params.set("categoria", categoria);
    if (subcategoria) {
      params.set("subcategoria", subcategoria);
    }
    params.set("page", "1");

    setCatOpen(false);
    setMenuOpen(false);
    navigate(`/shop?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCatOpen(false);
    setMenuOpen(false);
    navigate("/shop");
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      <header className="w-full bg-[#041e33] text-white shadow-md relative z-40">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-40 pl-1 pr-6 mx-10">

          {/* LOGO */}
          <Link to="/" onClick={handleClearFilters}>
            <div className="flex items-center gap-0 ml-2">
              <img src={logo} alt="Elder Shop" className="h-30" />
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
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Buscar juegos, consolas, accesorios..."
                className="w-full max-w-2xl mx-auto px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="hidden md:block mr-2 hover:text-yellow-400 transition cursor-pointer">
                  Iniciar sesión
                </Link>
                {!isRegisterView && (
                  <Link to="/register" className="hidden md:block bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition cursor-pointer">
                    Registrarse
                  </Link>
                )}
              </>
            ) : (
              <>
                {/* ICONO DE CARRITO REDISEÑADO */}
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="relative p-2.5 bg-slate-800/40 border border-slate-700/50 hover:border-amber-500/40 rounded-xl transition-all duration-200 hover:bg-slate-800 cursor-pointer group flex items-center justify-center"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">🛒</span>
                  {/* Badge inteligente: si es 0 no se renderiza en absoluto */}
                  {totalUnits > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-amber-500/20 animate-in zoom-in">
                      {totalUnits}
                    </span>
                  )}
                </button>

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
            <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              ☰
            </button>
          </div>
        </div>

        {/* NAVBAR */}
        <div className="hidden md:flex items-center justify-between gap-8 h-15 bg-[#081520] text-sm font-medium font-medieval">

          <div className="relative h-full ml-1 flex items-center">
            {isAuthenticated && (
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="h-full px-25 text-white font-extrabold bg-[#1a2e3e] hover:bg-[#253d52] border-b-2 border-yellow-500 cursor-pointer transition-colors"
              >
                CATEGORÍAS {catOpen ? "▲" : "▼"}
              </button>
            )}

            {tieneFiltrosActivos && (
              <button
                onClick={handleClearFilters}
                className="ml-4 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all duration-200 cursor-pointer shadow-sm shadow-amber-500/5 animate-in fade-in"
              >
                👁 Ver Todo
              </button>
            )}

            {catOpen && (
              <ul
                className="absolute left-0 top-full w-full bg-[#081520] border border-gray-700 shadow-xl z-50"
                onMouseLeave={() => setActiveSub(null)}
              >
                {/* JUEGOS */}
                <li className="relative hover:bg-yellow-500 hover:text-black transition group" onMouseEnter={() => setActiveSub("juegos")}>
                  <button onClick={() => handleCategoryClick("juegos")} className="w-full flex justify-between items-center px-6 py-3 text-left cursor-pointer">
                    Juegos <span>▶</span>
                  </button>
                  {activeSub === "juegos" && (
                    <ul className="absolute left-full top-0 w-48 bg-[#081520] border border-gray-700 shadow-xl text-white">
                      {["PC", "PS4", "PS5", "Xbox Series"].map((sub) => (
                        <li key={sub} className="hover:bg-yellow-500 hover:text-black border-b border-gray-700 last:border-none">
                          <button onClick={() => handleCategoryClick("juegos", sub.toLowerCase())} className="w-full p-3 text-left cursor-pointer">
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* CONSOLAS */}
                <li className="relative hover:bg-yellow-500 hover:text-black transition border-t border-gray-700" onMouseEnter={() => setActiveSub("consolas")}>
                  <button onClick={() => handleCategoryClick("consolas")} className="w-full flex justify-between items-center px-6 py-3 text-left cursor-pointer">
                    Consolas <span>▶</span>
                  </button>
                  {activeSub === "consolas" && (
                    <ul className="absolute left-full top-0 w-48 bg-[#081520] border border-gray-700 shadow-xl text-white">
                      {["PS4", "PS5", "Nintendo"].map((sub) => (
                        <li key={sub} className="hover:bg-yellow-500 hover:text-black border-b border-gray-700 last:border-none">
                          <button onClick={() => handleCategoryClick("consolas", sub.toLowerCase())} className="w-full p-3 text-left cursor-pointer">
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>

                {/* ACCESORIOS */}
                <li className="relative hover:bg-yellow-500 hover:text-black transition border-t border-gray-700" onMouseEnter={() => setActiveSub("accesorios")}>
                  <button onClick={() => handleCategoryClick("accesorios")} className="w-full flex justify-between items-center px-6 py-3 text-left cursor-pointer">
                    Accesorios <span>▶</span>
                  </button>
                  {activeSub === "accesorios" && (
                    <ul className="absolute left-full top-0 w-48 bg-[#081520] border border-gray-700 shadow-xl text-white">
                      {["Joysticks", "Auriculares", "Pantallas", "Teclados"].map((sub) => (
                        <li key={sub} className="hover:bg-yellow-500 hover:text-black border-b border-gray-700 last:border-none">
                          <button onClick={() => handleCategoryClick("accesorios", sub.toLowerCase())} className="w-full p-3 text-left cursor-pointer">
                            {sub}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </div>

          {/* REDES Y ADMIN */}
          <div className="flex items-center gap-4 h-full pr-6">
            {isAdmin && isAuthenticated && (
              <Link to="/admin" className="hidden md:block bg-yellow-600 px-5 py-3 rounded-lg hover:bg-yellow-500 transition">
                Admin
              </Link>
            )}
            <a href="#" target="_blank" rel="noreferrer" className="block hover:scale-110 transition-transform">
              <img src={Instagram} alt="Instagram" className="h-10 w-10 object-contain" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="block hover:scale-110 transition-transform">
              <img src={Facebook} alt="Facebook" className="h-10 w-10 object-contain" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="block hover:scale-110 transition-transform">
              <img src={WhatsApp} alt="WhatsApp" className="h-10 w-10 object-contain" />
            </a>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-[#081520] px-6 py-4 space-y-4">
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />

            {tieneFiltrosActivos && (
              <button onClick={handleClearFilters} className="w-full py-2 bg-amber-500 text-slate-950 font-bold rounded-lg text-center text-sm cursor-pointer">
                👁 Ver Todo el Catálogo
              </button>
            )}

            <button onClick={() => handleCategoryClick("juegos")} className="block text-left w-full cursor-pointer">Juegos</button>
            <button onClick={() => handleCategoryClick("consolas")} className="block text-left w-full cursor-pointer">Consolas</button>
            <button onClick={() => handleCategoryClick("accesorios")} className="block text-left w-full cursor-pointer">Accesorios</button>

            <hr className="border-gray-700" />

            {!isAuthenticated ? (
              <>
                <Link to="/login" className="block">Iniciar sesión</Link>
                <Link to="/register" className="block text-yellow-400">Registrarse</Link>
              </>
            ) : (
              <button onClick={() => setShowLogoutModal(true)} className="block w-full text-left text-red-400">
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* MODAL LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999] px-4">
          <div className="w-full max-w-md bg-[#0d1b2a] border border-gray-700 rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-white mb-3 font-medieval">¿Cerrar sesión?</h2>
            <p className="text-gray-300 leading-relaxed mb-8">Vas a salir de tu cuenta actual en The Elder Shop.</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setShowLogoutModal(false)} className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white cursor-pointer">
                Cancelar
              </button>
              <button onClick={handleLogout} className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-white font-bold cursor-pointer">
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}