export default function Footer() {
  return (
    <footer className="w-full bg-[#081520] text-gray-300 mt-10">

      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* MARCA */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            THE ELDER SHOP
          </h2>
          <p className="text-sm text-gray-400">
            Juegos, consolas y accesorios para verdaderos gamers.
            Calidad, variedad y pasión por el gaming.
          </p>
        </div>

        {/* NAVEGACIÓN */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categorías</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">Juegos</a></li>
            <li><a href="#" className="hover:text-yellow-400">Consolas</a></li>
            <li><a href="#" className="hover:text-yellow-400">Accesorios</a></li>
            <li><a href="#" className="hover:text-yellow-400">Ofertas</a></li>
          </ul>
        </div>

        {/* AYUDA */}
        <div>
          <h3 className="text-white font-semibold mb-4">Ayuda</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">Contacto</a></li>
            <li><a href="#" className="hover:text-yellow-400">Soporte</a></li>
            <li><a href="#" className="hover:text-yellow-400">Envíos</a></li>
            <li><a href="#" className="hover:text-yellow-400">Devoluciones</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Suscribite
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            Recibí ofertas y novedades.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Tu email"
              className="w-full px-3 py-2 rounded-l-lg bg-gray-800 text-white outline-none"
            />
            <button className="bg-yellow-500 text-black px-4 rounded-r-lg hover:bg-yellow-400 transition">
              OK
            </button>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700"></div>

      {/* BOTTOM FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">

        <p>
          © {new Date().getFullYear()} The Elder Shop. Todos los derechos reservados.
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-yellow-400">Términos</a>
          <a href="#" className="hover:text-yellow-400">Privacidad</a>
        </div>

      </div>

    </footer>
  );
}
