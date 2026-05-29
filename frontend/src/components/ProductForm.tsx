import type {
    UseFormRegister,
    FieldErrors,
    UseFormWatch,
    UseFormSetValue
} from "react-hook-form";

import type { ProductFormData } from "../types/products";

import { imageService } from "../services/imageService";

import { useState } from "react";

import { toast } from "sonner";

import { useGeneros } from "../hooks/useGenero";


interface Props {
    register: UseFormRegister<ProductFormData>;
    errors: FieldErrors<ProductFormData>;
    watch: UseFormWatch<ProductFormData>;
    setValue: UseFormSetValue<ProductFormData>;
    isPending?: boolean;
    isEditing?: boolean;
}


export default function ProductForm({
    register,
    errors,
    watch,
    setValue,
    isPending,
    isEditing
}: Props) {

    const tipoSeleccionado = watch("tipo_id");

    const imageUrl = watch("image_url");

    const formatoSeleccionado = watch("variantes.0.formato_id");

    const esDigital = Number(formatoSeleccionado) === 2;

    const [isUploading, setIsUploading] = useState(false);

    const {
        data: generos = [],
        isLoading: isLoadingGeneros
    } = useGeneros();

    // =========================================================
    // SUBIDA DE IMAGEN
    // =========================================================
    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        try {

            setIsUploading(true);

            const res = await imageService.upload(file);

            setValue("image_url", res.url);

            setValue("public_id", res.public_id);

            toast.success("Imagen subida correctamente");

        } catch (error) {

            console.error(error);

            toast.error(
                "Error al subir la imagen a Cloudinary"
            );

        } finally {

            setIsUploading(false);
        }
    };


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

                    {/* IMAGEN */}
                    <div>

                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Imagen del Producto
                        </label>

                        <input
                            type="hidden"
                            {...register("image_url", {
                                required: "La imagen es obligatoria"
                            })}
                        />

                        <input
                            type="hidden"
                            {...register("public_id")}
                        />

                        <div className="flex flex-col sm:flex-row items-center gap-5 bg-white p-4 rounded-xl border border-slate-300">

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isUploading || isPending}
                                className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-amber-50 file:text-amber-700
                                hover:file:bg-amber-100 file:cursor-pointer"
                            />

                            {isUploading && (
                                <p className="text-amber-600 font-medium text-sm animate-pulse">
                                    Subiendo imagen...
                                </p>
                            )}

                            {imageUrl && !isUploading && (

                                <div className="relative size-20 rounded-lg overflow-hidden border border-slate-200 shadow-inner">

                                    <img
                                        src={imageUrl}
                                        alt="Previsualización"
                                        className="w-full h-full object-cover"
                                    />

                                </div>
                            )}

                        </div>

                        {errors.image_url && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image_url.message}
                            </p>
                        )}

                    </div>

                </div>

            </div>

            {/* ========================================================= */}
            {/* VARIANTE */}
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
                            min={0}
                            placeholder="0"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            {...register(
                                "variantes.0.stock",
                                {
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: "El stock no puede ser negativo"
                                    }
                                }
                            )}
                        />

                        {errors.variantes?.[0]?.stock && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.variantes?.[0]?.stock?.message}
                            </p>
                        )}

                    </div>

                    {/* PRECIO */}
                    <div>

                        <label className="block text-sm font-bold text-slate-800 mb-2">
                            Precio
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            min={0}
                            placeholder="99999"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            {...register(
                                "variantes.0.precio",
                                {
                                    required: "El precio es obligatorio",
                                    valueAsNumber: true,
                                    min: {
                                        value: 0,
                                        message: "El precio no puede ser negativo"
                                    }
                                }
                            )}
                        />

                        {errors.variantes?.[0]?.precio && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.variantes?.[0]?.precio?.message}
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
                            {...register(
                                "variantes.0.plataforma_id",
                                {
                                    valueAsNumber: true
                                }
                            )}
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
                            {...register(
                                "variantes.0.formato_id",
                                {
                                    valueAsNumber: true
                                }
                            )}
                        >

                            <option value="">
                                -- Seleccionar --
                            </option>

                            <option value={1}>
                                Físico
                            </option>

                            <option value={2}>
                                Digital
                            </option>

                        </select>

                    </div>

                </div>

                {/* ========================================================= */}
                {/* DETALLES DIGITALES */}
                {/* ========================================================= */}
                {esDigital && (

                    <div className="mt-6 bg-slate-50 border border-slate-300 rounded-2xl p-5">

                        <h3 className="text-xl font-black text-slate-900 mb-5">
                            Detalles digitales
                        </h3>

                        <div className="space-y-5">

                            {/* URL */}
                            <div>

                                <label className="block text-sm font-bold text-slate-800 mb-2">
                                    URL de descarga
                                </label>

                                <input
                                    type="text"
                                    placeholder="https://cdn.tienda.com/juego"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
                                    {...register(
                                        "variantes.0.detalle_digital.url_descarga",
                                        {
                                            required:
                                                "La URL es obligatoria"
                                        }
                                    )}
                                />

                            </div>

                            {/* PESO */}
                            <div>

                                <label className="block text-sm font-bold text-slate-800 mb-2">
                                    Peso en GB
                                </label>

                                <input
                                    type="number"
                                    step="0.1"
                                    min={0}
                                    placeholder="80"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    {...register(
                                        "variantes.0.detalle_digital.peso_gb",
                                        {
                                            valueAsNumber: true,
                                            min: {
                                                value: 0,
                                                message: "El peso no puede ser negativo"
                                            }
                                        }
                                    )}
                                />

                            </div>

                            {/* INSTRUCCIONES */}
                            <div>

                                <label className="block text-sm font-bold text-slate-800 mb-2">
                                    Instrucciones de canje
                                </label>

                                <textarea
                                    rows={4}
                                    placeholder="Canjear en Steam..."
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-amber-500"
                                    {...register(
                                        "variantes.0.detalle_digital.instrucciones_canje"
                                    )}
                                />

                            </div>

                        </div>

                    </div>
                )}

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

                        <div>

                            <label className="block text-sm font-bold text-slate-800 mb-2">
                                Año de lanzamiento
                            </label>

                            <input
                                type="number"
                                placeholder="2026"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                {...register(
                                    "videojuego.anio_lanzamiento",
                                    {
                                        valueAsNumber: true
                                    }
                                )}
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-bold text-slate-800 mb-2">
                                Máximo de jugadores
                            </label>

                            <input
                                type="number"
                                min={1}
                                placeholder="4"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                {...register(
                                    "videojuego.jugadores_max",
                                    {
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "Debe haber al menos 1 jugador"
                                        }
                                    }
                                )}
                            />

                        </div>

                    </div>

                    {/* COOPERATIVO */}
                    <div className="mt-6">

                        <label className="flex items-center gap-3 text-slate-800 font-semibold cursor-pointer">

                            <input
                                type="checkbox"
                                className="size-5 accent-amber-600 cursor-pointer"
                                {...register(
                                    "videojuego.es_cooperativo"
                                )}
                            />

                            Tiene modo cooperativo

                        </label>

                    </div>

                    {/* GÉNEROS */}
                    <div className="mt-8">

                        <h3 className="text-lg font-black text-slate-900 mb-4">
                            Géneros / Categorías
                        </h3>

                        {isLoadingGeneros ? (

                            <p className="text-sm text-slate-500 animate-pulse">
                                Cargando géneros...
                            </p>

                        ) : generos.length === 0 ? (

                            <p className="text-sm text-slate-400 italic bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                No hay géneros cargados en la base de datos.
                            </p>

                        ) : (

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                                {generos.map((gen) => (

                                    <label
                                        key={gen.id}
                                        className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer bg-white p-3 rounded-xl border border-slate-200 hover:border-amber-500 transition-all shadow-sm"
                                    >

                                        <input
                                            type="checkbox"
                                            value={gen.id}
                                            className="size-4 accent-amber-600 cursor-pointer"
                                            {...register(
                                                "videojuego.generos_ids"
                                            )}
                                        />

                                        {gen.nombre}

                                    </label>

                                ))}

                            </div>

                        )}

                        {errors.videojuego?.generos_ids && (
                            <p className="text-red-500 text-sm mt-2">
                                Debes seleccionar al menos un género
                            </p>
                        )}

                    </div>

                </div>
            )}

            {/* ========================================================= */}
            {/* SUBMIT */}
            {/* ========================================================= */}
            <button
                type="submit"
                disabled={isPending || isUploading}
                className="w-full bg-amber-600 hover:bg-amber-700 hover:cursor-pointer transition py-4 rounded-2xl font-black text-white shadow-xl disabled:opacity-50"
            >

                {isPending
                    ? isEditing ? "Actualizando producto..." : "Creando producto..."
                    : isEditing ? "Actualizar producto" : "Crear producto"
                }

            </button>

        </div>
    );
}
