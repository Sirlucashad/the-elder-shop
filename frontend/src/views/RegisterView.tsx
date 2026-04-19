import logoElder from '../assets/icons/logoElderShop.png';

export default function RegisterView() {
  return (
    <div className="max-w-screen bg-linear-to-b from-slate-900 to-slate-950 py-10 px-4 flex items-center justify-center ">

      {/* CONTENEDOR */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 py-10 relative z-30">

        {/* IZQUIERDA */}
        <div className="bg-stone-200 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold font-medieval mb-4">
            Registrate!!
          </h2>

          <p className="text-black px-3 text-lg  leading-relaxed font-medieval font-bold">
            Registrate como usuario para personalizar tu perfil y acceder a ofertas exclusivas. Con tu cuenta, podrás guardar tus productos favoritos, realizar compras de manera rápida y sencilla, y recibir recomendaciones personalizadas. ¡Únete a nuestra comunidad y disfruta de una experiencia de compra única!
          </p>
        </div>

        {/* DERECHA (FORM) */}
        <div className="bg-stone-200 p-8 rounded-lg shadow-sm">

          <form className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">
                Email
              </label>
              <input
                type="email"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">
                Password
              </label>
              <input
                type="password"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              />
            </div>

            {/* NOMBRE Y APELLIDO */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-black font-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-black font-bold">
                  Apellido
                </label>
                <input
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                />
              </div>
            </div>

            {/* TELEFONO Y PROVINCIA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-black font-bold">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-black font-bold">
                  Provincia
                </label>
                <select className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 cursor-pointer">
                  <option>CABA</option>
                  <option>Buenos Aires</option>
                  <option>Córdoba</option>
                </select>
              </div>
            </div>

            {/* DIRECCIÓN */}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">
                Dirección
              </label>
              <input
                type="text"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 cursor-pointer"
              />
            </div>

            {/* BOTÓN */}
            <div className='flex justify-end'>
              <button
                type="submit"
                className="mt-4 bg-amber-600 text-white px-16 py-2 rounded-md hover:bg-amber-700 transition cursor-pointer"
              >
                Crear
              </button>
            </div>

          </form>

        </div>

      </div>
      <div className="hidden md:block absolute -right-40 -bottom-50 -rotate-23  size-150 z-20 opacity-20 ">
        <img className="" src={logoElder} alt="Elder Shop" />
      </div>
    </div>
  );
}