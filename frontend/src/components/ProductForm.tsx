import type { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import type { ProductFormData } from "../types/products";



interface Props {
    register: UseFormRegister<ProductFormData>;
    errors: FieldErrors<ProductFormData>;
    watch: UseFormWatch<ProductFormData>;
    isPending?: boolean;
}

export default function ProductForm({
    register,
    errors,
    watch,
    isPending
}: Props) {

    /*
        tipo_id:
        1 = Videojuego
        2 = Consola
        3 = Accesorio
    */

    const tipoSeleccionado = watch("tipo_id");

    return (
        <div className="space-y-8">

            {/* ========================================================= */}
            {/* DATOS GENERALES */}
            {/* ========================================================= */}

            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-300 shadow-sm">

                <h2 className="text-2xl font-black text-slate-900 mb-6">
                    Información general
                </h2>

                <div className="space-y-5">

                    {/* NOMBRE */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Nombre
                        </label>

                        <input
                            type="text"
                            placeholder="Ej: Elden Ring"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("nombre", {
                                required: "El nombre es obligatorio"
                            })}
                        />

                        {errors.nombre && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nombre.message}
                            </p>
                        )}
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Descripción
                        </label>

                        <textarea
                            rows={5}
                            placeholder="Describe el producto..."
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("descripcion")}
                        />
                    </div>

                    {/* TIPO */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Tipo de producto
                        </label>

                        <select
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("tipo_id", {
                                required: "Selecciona un tipo",
                                valueAsNumber: true
                            })}
                        >
                            <option value="">
                                -- Seleccionar --
                            </option>

                            <option value={1}>
                                Videojuego
                            </option>

                            <option value={2}>
                                Consola
                            </option>

                            <option value={3}>
                                Accesorio
                            </option>
                        </select>

                        {errors.tipo_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tipo_id.message}
                            </p>
                        )}
                    </div>

                    {/* IMAGE URL */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            URL de imagen
                        </label>

                        <input
                            type="text"
                            placeholder="https://..."
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("image_url")}
                        />
                    </div>

                </div>
            </div>

            {/* ========================================================= */}
            {/* VARIANTE / INVENTARIO */}
            {/* ========================================================= */}

            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-300 shadow-sm">

                <h2 className="text-2xl font-black text-slate-900 mb-6">
                    Inventario y variante
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                    {/* STOCK */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Stock
                        </label>

                        <input
                            type="number"
                            placeholder="0"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("stock", {
                                valueAsNumber: true
                            })}
                        />
                    </div>

                    {/* PRECIO */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Precio
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            placeholder="99999"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("precio_base", {
                                required: "El precio es obligatorio",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Debe ser mayor a 0"
                                }
                            })}
                        />

                        {errors.precio_base && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.precio_base.message}
                            </p>
                        )}
                    </div>

                    {/* PLATAFORMA */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Plataforma
                        </label>

                        <select
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("plataforma_id", {
                                valueAsNumber: true
                            })}
                        >
                            <option value="">
                                -- Seleccionar --
                            </option>

                            <option value={1}>
                                PC
                            </option>

                            <option value={2}>
                                PlayStation 5
                            </option>

                            <option value={3}>
                                Xbox Series
                            </option>

                            <option value={4}>
                                Nintendo Switch
                            </option>
                        </select>
                    </div>

                    {/* FORMATO */}
                    <div>
                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Formato
                        </label>

                        <select
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                            {...register("formato_id", {
                                valueAsNumber: true
                            })}
                        >
                            <option value="">
                                -- Seleccionar --
                            </option>

                            <option value={1}>
                                Digital
                            </option>

                            <option value={2}>
                                Físico
                            </option>
                        </select>
                    </div>

                </div>
            </div>

            {/* ========================================================= */}
            {/* VIDEOJUEGO */}
            {/* ========================================================= */}

            {tipoSeleccionado === 1 && (

                <div className="bg-slate-100 rounded-2xl p-6 border border-slate-300 shadow-sm">

                    <h2 className="text-2xl font-black text-slate-900 mb-6">
                        Datos del videojuego
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        {/* AÑO */}
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">
                                Año de lanzamiento
                            </label>

                            <input
                                type="number"
                                placeholder="2025"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                                {...register("anio_lanzamiento", {
                                    valueAsNumber: true
                                })}
                            />
                        </div>

                        {/* JUGADORES */}
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">
                                Máximo de jugadores
                            </label>

                            <input
                                type="number"
                                placeholder="4"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                                {...register("jugadores_max", {
                                    valueAsNumber: true
                                })}
                            />
                        </div>

                    </div>

                    {/* COOPERATIVO */}
                    <div className="mt-6">
                        <label className="flex items-center gap-3 text-slate-800 font-semibold">

                            <input
                                type="checkbox"
                                className="size-5 accent-amber-600"
                                {...register("es_cooperativo")}
                            />

                            Tiene modo cooperativo
                        </label>
                    </div>

                    {/* GÉNEROS */}
                    <div className="mt-8">

                        <h3 className="text-lg font-black text-slate-900 mb-4">
                            Géneros
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("accion")} />
                                Acción
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("aventura")} />
                                Aventura
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("rpg")} />
                                RPG
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("shooter")} />
                                Shooter
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("survival")} />
                                Survival
                            </label>

                            <label className="flex items-center gap-2">
                                <input type="checkbox" {...register("deportes")} />
                                Deportes
                            </label>

                        </div>
                    </div>
                </div>
            )}

            {/* BOTÓN */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-amber-600 hover:bg-amber-700 transition py-4 rounded-2xl font-black text-white shadow-xl disabled:opacity-50"
            >
                {isPending
                    ? "Creando producto..."
                    : "Crear producto"}
            </button>

        </div>
    );
}