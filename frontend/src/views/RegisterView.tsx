

export default function RegisterView() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      {/* CONTENEDOR */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* IZQUIERDA */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Registrarme
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Puedes registrarte como usuario del sitio, podrás gestionar tus
            compras, consultas y datos personales.
          </p>
        </div>

        {/* DERECHA (FORM) */}
        <div className="bg-white p-8 rounded-lg shadow-sm">

          <form className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* NOMBRE Y APELLIDO */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Apellido
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* TELEFONO Y PROVINCIA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-700">
                  Provincia
                </label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>CABA</option>
                  <option>Buenos Aires</option>
                  <option>Córdoba</option>
                </select>
              </div>
            </div>

            {/* DIRECCIÓN */}
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* BOTÓN */}
            <button
              type="submit"
              className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Crear
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}