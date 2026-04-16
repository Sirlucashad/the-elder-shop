

export default function HomeView() {
  return (
    <div className="text-white">

      {/* HERO */}


      {/* CATEGORÍAS */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Categorías</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {["Juegos", "Consolas", "Accesorios", "Ofertas"].map((cat) => (
            <div
              key={cat}
              className="bg-[#112240] p-6 rounded-xl hover:scale-105 transition cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{cat}</h3>
            </div>
          ))}

        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Destacados</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

          {[1,2,3,4,5,6,7,8].map((item) => (
            <div
              key={item}
              className="bg-[#112240] rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <div className="h-40 bg-gray-700"></div>

              <div className="p-4">
                <h3 className="font-semibold">Producto {item}</h3>
                <p className="text-yellow-400">$99.999</p>

                <button className="mt-3 w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-400 transition">
                  Comprar
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* BENEFICIOS / CONFIANZA */}
      <section className="py-10 bg-[#081520]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 text-center">

          <div>
            <h3 className="font-semibold text-lg mb-2">🚚 Envíos a todo el país</h3>
            <p className="text-gray-400 text-sm">
              Rápidos y seguros.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">💳 Pagos seguros</h3>
            <p className="text-gray-400 text-sm">
              Todas las tarjetas y cuotas.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">⭐ Calidad garantizada</h3>
            <p className="text-gray-400 text-sm">
              Productos originales.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}