import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function AdminDashboardView() {

    const { user } = useAuthContext();

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-6 py-10">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-10">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                    <div>
                        <p className="text-amber-400 font-semibold tracking-wide uppercase text-sm">
                            Panel administrativo
                        </p>

                        <h1 className="text-4xl md:text-5xl font-black font-medieval mt-2">
                            The Elder Shop
                        </h1>

                       
                    </div>

                    {/* ADMIN CARD */}
                    <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-5 shadow-xl min-w-[260px]">

                        <p className="text-sm text-stone-400 mb-2">
                            Sesión iniciada como
                        </p>

                        <h3 className="text-2xl font-bold text-amber-400">
                            {user?.username}
                        </h3>

                        <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-sm">
                            <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                            Administrador activo
                        </div>

                    </div>
                </div>
            </div>

            {/* GRID PRINCIPAL */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* PRODUCTOS */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl hover:border-amber-500/40 transition">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-black">
                            Productos
                        </h2>

                        <span className="text-5xl">
                            🎮
                        </span>
                    </div>

                    <p className="text-stone-400 leading-relaxed mb-8">
                        Crear, editar y eliminar videojuegos, consolas y accesorios.
                        Este será el núcleo principal del panel.
                    </p>

                    <div className="flex flex-col gap-3">

                        <Link
                            to="/admin/create-product"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-xl transition text-center"
                        >
                            Crear producto
                        </Link>

                        <Link
                            to="/admin/products"
                            className="border border-slate-700 hover:border-amber-500 hover:text-amber-400 py-3 px-5 rounded-xl transition text-center"
                        >
                            Administrar productos
                        </Link>

                    </div>
                </div>

                {/* CATEGORÍAS */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl hover:border-amber-500/40 transition">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-black">
                            Categorías
                        </h2>

                        <span className="text-5xl">
                            📚
                        </span>
                    </div>

                    <p className="text-stone-400 leading-relaxed mb-8">
                        Organizá el catálogo en categorías como Acción, RPG, Soulslike,
                        Consolas o Accesorios.
                    </p>

                    <div className="flex flex-col gap-3">

                        <Link
                            to="/admin/categories/create"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-xl transition text-center"
                        >
                            Crear categoría
                        </Link>

                        <Link
                            to="/admin/categories"
                            className="border border-slate-700 hover:border-amber-500 hover:text-amber-400 py-3 px-5 rounded-xl transition text-center"
                        >
                            Ver categorías
                        </Link>

                    </div>
                </div>

                {/* PLATAFORMAS */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl hover:border-amber-500/40 transition">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-black">
                            Plataformas
                        </h2>

                        <span className="text-5xl">
                            🕹️
                        </span>
                    </div>

                    <p className="text-stone-400 leading-relaxed mb-8">
                        Gestioná plataformas disponibles como PC, PS5, Xbox o Nintendo.
                    </p>

                    <div className="flex flex-col gap-3">

                        <Link
                            to="/admin/platforms/create"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-xl transition text-center"
                        >
                            Crear plataforma
                        </Link>

                        <Link
                            to="/admin/platforms"
                            className="border border-slate-700 hover:border-amber-500 hover:text-amber-400 py-3 px-5 rounded-xl transition text-center"
                        >
                            Administrar plataformas
                        </Link>

                    </div>
                </div>

                {/* ÓRDENES */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl hover:border-amber-500/40 transition">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-black">
                            Órdenes
                        </h2>

                        <span className="text-5xl">
                            📦
                        </span>
                    </div>

                    <p className="text-stone-400 leading-relaxed mb-8">
                        Revisá compras realizadas, estados de pago y órdenes pendientes.
                    </p>

                    <div className="flex flex-col gap-3">

                        <Link
                            to="/admin/orders"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-xl transition text-center"
                        >
                            Ver órdenes
                        </Link>

                    </div>
                </div>

                {/* USUARIOS */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl hover:border-amber-500/40 transition">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-black">
                            Usuarios
                        </h2>

                        <span className="text-5xl">
                            👥
                        </span>
                    </div>

                    <p className="text-stone-400 leading-relaxed mb-8">
                        Administrá clientes registrados y permisos administrativos.
                    </p>

                    <div className="flex flex-col gap-3">

                        <Link
                            to="/admin/users"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-xl transition text-center"
                        >
                            Administrar usuarios
                        </Link>

                    </div>
                </div>

                {/* ESTADÍSTICAS */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-7 shadow-2xl hover:border-amber-500/40 transition">

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-2xl font-black">
                            Estadísticas
                        </h2>

                        <span className="text-5xl">
                            📈
                        </span>
                    </div>

                    <p className="text-stone-400 leading-relaxed mb-8">
                        Visualizá ventas, productos más vendidos y rendimiento general.
                    </p>

                    <div className="flex flex-col gap-3">

                        <Link
                            to="/admin/analytics"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-xl transition text-center"
                        >
                            Ver estadísticas
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
}