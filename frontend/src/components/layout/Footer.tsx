import lara from '../../assets/images/lara.png'
import kratos from '../../assets/images/kratos.png'


export default function Footer() {
  return (
    <footer className="relative w-full bg-[#081520] text-gray-300 overflow-hidden">

      {/* IMAGEN IZQUIERDA */}
      <img
        src={lara}
        alt=""
        className="hidden lg:block absolute left-0 bottom-0 w-64 opacity-60 pointer-events-none"
      />

      {/* IMAGEN DERECHA */}
      <img
        src={kratos}
        alt=""
        className="hidden lg:block absolute right-0 bottom-0 w-64 opacity-60 pointer-events-none"
      />

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-6 py-17 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">

        {/* MARCA */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-wide">
            THE ELDER SHOP
          </h2>

          <p className="text-sm text-gray-400 leading-relaxed">
            Juegos, consolas y accesorios para verdaderos gamers.
            Calidad, variedad y pasión por el gaming.
          </p>

          <div className="mt-4 space-y-1 text-sm text-gray-400">
            <p>📍 Buenos Aires, Argentina</p>
            <p>📞 +54 11 1234-5678</p>
            <p>✉️ ventas@eldershop.com</p>
          </div>
        </div>

        {/* CATEGORÍAS */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Categorías
          </h3>

          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">Juegos</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Consolas</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Accesorios</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Ofertas</a></li>
          </ul>
        </div>

        {/* INFORMACIÓN */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Información
          </h3>

          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">Contacto</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Soporte</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Envíos</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Devoluciones</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Suscribite
          </h3>

          <p className="text-sm text-gray-400 mb-4">
            Recibí ofertas y novedades exclusivas.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Tu email"
              className="w-full px-4 py-2 rounded-l-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button className="bg-yellow-500 text-black px-4 rounded-r-lg hover:bg-yellow-400 transition">
              OK
            </button>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-3 mt-4 text-xl">
            <span className="cursor-pointer hover:text-yellow-400">📘</span>
            <span className="cursor-pointer hover:text-yellow-400">📸</span>
            <span className="cursor-pointer hover:text-yellow-400">🐦</span>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700 relative z-10"></div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 relative z-10">

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