import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.tsx';

import logoElder from '../assets/icons/logoElderShop.png';

export default function HomeView() {

  const { isAuthenticated } = useAuthContext();

  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-stone-200">

      {/* GLOWS */}
      <div className="absolute -top-37.5 -left-25 w-112.5 h-112.5 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute -bottom-30 -right-25 w-100 h-100 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />


      {/* HERO */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16">

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">

          {/* IZQUIERDA */}
          <div className="space-y-8">

            {/* TAG */}
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-2 text-sm text-amber-300">

              <div className="size-2 rounded-full bg-amber-400 animate-pulse" />

              Consolas • Juegos • Accesorios
            </div>


            {/* TITULO */}
            <div className="space-y-6">

              <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight">

                Tu próxima
                <span className="block text-amber-400">
                  aventura
                </span>

                empieza acá.
              </h1>


              <p className="max-w-2xl text-lg leading-relaxed text-stone-300">

                Descubrí videojuegos, consolas y accesorios para todos los estilos de jugador.
                Desde clásicos inmortales hasta los últimos lanzamientos, armá tu setup ideal y llevá tu experiencia al siguiente nivel.

              </p>
            </div>


            {/* BOTONES */}
            <div className="flex flex-wrap gap-4 pt-2">


              <>
                {isAuthenticated ? (
                  <Link
                    to="/shop"
                    className="bg-amber-600 hover:bg-amber-700 transition px-8 py-4 rounded-xl font-bold text-white shadow-xl"
                  >
                    Ingresa a la tienda
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-amber-600 hover:bg-amber-700 transition px-8 py-4 rounded-xl font-bold text-white shadow-xl"
                    >
                      Ingresa a tu cuenta
                    </Link>

                    <Link
                      to="/auth/register"
                      className="border border-stone-600 hover:border-amber-500 hover:text-amber-400 transition px-8 py-4 rounded-xl font-semibold"
                    >
                      Crea tu cuenta
                    </Link>
                  </>
                )}
              </>

            </div>


            {/* FEATURES */}
            <div className="grid sm:grid-cols-3 gap-4 pt-8">

              <div className="rounded-2xl border border-stone-800 bg-slate-900/70 backdrop-blur p-5">

                <p className="text-3xl font-black text-amber-400">
                  +500
                </p>

                <p className="mt-2 text-sm text-stone-400">
                  Juegos y accesorios disponibles
                </p>
              </div>


              <div className="rounded-2xl border border-stone-800 bg-slate-900/70 backdrop-blur p-5">

                <p className="text-3xl font-black text-amber-400">
                  24h
                </p>

                <p className="mt-2 text-sm text-stone-400">
                  Actualización constante de catálogo
                </p>
              </div>


              <div className="rounded-2xl border border-stone-800 bg-slate-900/70 backdrop-blur p-5">

                <p className="text-3xl font-black text-amber-400">
                  ⚡
                </p>

                <p className="mt-2 text-sm text-stone-400">
                  Compras rápidas y seguras
                </p>
              </div>

            </div>
          </div>


          {/* DERECHA */}
          <div className="relative flex justify-center items-center">

            {/* CARD PRINCIPAL */}
            <div className="relative w-full max-w-xl rounded-4xl border border-stone-800 bg-linear-to-b from-slate-900 to-slate-950 p-8 shadow-2xl overflow-hidden">

              {/* GLOW */}
              <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-transparent pointer-events-none" />


              {/* LOGO */}
              <div className="relative flex justify-center">

                <img
                  src={logoElder}
                  alt="The Elder Shop"
                  className="w-64 md:w-72 object-contain drop-shadow-[0_0_40px_rgba(251,191,36,0.25)]"
                />
              </div>


              {/* TEXTO */}
              <div className="relative mt-8 space-y-5 text-center">

                <h2 className="text-3xl md:text-4xl font-black text-stone-100">
                  Todo gamer necesita un buen inventario.
                </h2>

                <p className="text-stone-400 leading-relaxed">

                  Armá tu colección, descubrí nuevos mundos y equipate con tecnología preparada para largas sesiones de juego.

                </p>
              </div>


              {/* MINI CARDS */}
              <div className="relative mt-10 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-stone-800 bg-slate-900/80 p-4">

                  <p className="text-sm text-stone-400">
                    Categorías
                  </p>

                  <p className="mt-2 text-xl font-bold text-amber-400">
                    Consolas
                  </p>
                </div>


                <div className="rounded-2xl border border-stone-800 bg-slate-900/80 p-4">

                  <p className="text-sm text-stone-400">
                    Top ventas
                  </p>

                  <p className="mt-2 text-xl font-bold text-amber-400">
                    RPG • FPS
                  </p>
                </div>

              </div>
            </div>







          </div>
        </div>
      </section>


      {/* SECCION DESTACADA */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-24">

        <div className="rounded-4xl border border-stone-800 bg-slate-900/70 backdrop-blur overflow-hidden">

          <div className="grid lg:grid-cols-3">

            <div className="p-8 border-b lg:border-b-0 lg:border-r border-stone-800">

              <p className="text-sm uppercase tracking-widest text-amber-400 font-bold">
                Juegos
              </p>

              <h3 className="mt-4 text-3xl font-black">
                Descubrí nuevos mundos.
              </h3>

              <p className="mt-4 text-stone-400 leading-relaxed">
                Explorá títulos clásicos y modernos para cada tipo de jugador.
              </p>
            </div>


            <div className="p-8 border-b lg:border-b-0 lg:border-r border-stone-800">

              <p className="text-sm uppercase tracking-widest text-amber-400 font-bold">
                Hardware
              </p>

              <h3 className="mt-4 text-3xl font-black">
                Mejorá tu setup.
              </h3>

              <p className="mt-4 text-stone-400 leading-relaxed">
                Consolas, joysticks y accesorios preparados para largas sesiones.
              </p>
            </div>


            <div className="p-8">

              <p className="text-sm uppercase tracking-widest text-amber-400 font-bold">
                Comunidad
              </p>

              <h3 className="mt-4 text-3xl font-black">
                Jugá sin límites.
              </h3>

              <p className="mt-4 text-stone-400 leading-relaxed">
                Unite a miles de jugadores que expanden su colección cada día.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}