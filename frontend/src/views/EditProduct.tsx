import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import type { ProductFormData, Product } from "../types/products";

import ProductForm from "../components/ProductForm";
import { useProductById, useUpdateProduct } from "../hooks/useProducts";
import logoElder from "../assets/icons/logoElderShop.png";


function mapProductToFormData(product: Product): ProductFormData {
    const variante = product.variantes?.[0];

    return {
        nombre: product.nombre,
        descripcion: product.descripcion ?? "",

        tipo_id: product.videojuego ? 1 : "",

        image_url: product.image_url ?? "",
        public_id: "",

        variantes: [
            {
                plataforma_id: variante?.plataforma_id ?? undefined,
                formato_id: variante?.formato_id ?? undefined,
                stock: variante?.stock ?? 0,
                precio: variante?.precio ?? 0,

                detalle_digital: variante?.detalle_digital
                    ? {
                        url_descarga: variante.detalle_digital.url_descarga,
                        peso_gb: variante.detalle_digital.peso_gb,
                        instrucciones_canje: variante.detalle_digital.instrucciones_canje,
                    }
                    : undefined,
            },
        ],

        videojuego: product.videojuego
            ? {
                anio_lanzamiento: product.videojuego.anio_lanzamiento,
                jugadores_max: product.videojuego.jugadores_max,
                es_cooperativo: product.videojuego.es_cooperativo,
                generos_ids: product.videojuego.generos.map((g) => g.id.toString()),
            }
            : undefined,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Vista principal
// ─────────────────────────────────────────────────────────────────────────────
export default function EditProduct() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const productId = Number(id);

    const { data: product, isLoading, isError } = useProductById(productId);
    const { mutate: updateProduct, isPending } = useUpdateProduct(productId);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ProductFormData>({
        defaultValues: {
            nombre: "",
            descripcion: "",
            tipo_id: "",
            image_url: "",
            public_id: "",
            variantes: [
                {
                    plataforma_id: undefined,
                    formato_id: undefined,
                    stock: 0,
                    precio: 0,
                    detalle_digital: undefined,
                },
            ],
            videojuego: undefined,
        },
    });

    // Cargamos los valores del producto cuando llegue la respuesta de la API
    useEffect(() => {
        if (product) {
            reset(mapProductToFormData(product));
        }
    }, [product, reset]);

    const onSubmit = (formData: ProductFormData) => {
        updateProduct(formData);
    };

    // ── Estados de carga / error ─────────────────────────────────────────────

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-800 to-black text-black">
                <div className="text-center space-y-3 relative z-30">
                    <div className="size-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-slate-300 font-medium animate-pulse">Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-800 to-black text-black px-4">
                <div className="text-center space-y-4 max-w-sm relative z-30">
                    <p className="text-5xl">😕</p>
                    <p className="text-slate-200 font-bold text-lg">
                        No se pudo cargar el producto
                    </p>
                    <p className="text-slate-400 text-sm">
                        Verificá que el ID sea correcto o que el servidor esté disponible.
                    </p>
                    <button
                        onClick={() => navigate("/admin")}
                        className="mt-2 px-6 py-2 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 shadow-lg shadow-amber-900/40 transition dynamic-btn"
                    >
                        Volver al listado
                    </button>
                </div>
            </div>
        );
    }

    // ── Vista principal ──────────────────────────────────────────────────────

    return (
        <div className="relative z-10 min-h-screen pb-16 text-black bg-linear-to-b from-slate-800 to-black overflow-hidden">
            <div className="max-w-3xl mx-auto px-4 py-10 relative z-30">

                {/* Encabezado */}
                <div className="mb-8 md:flex md:items-center md:justify-between">

                   <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        Editar producto
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">
                        Modificá los datos de{" "}
                        <span className="font-bold text-amber-500">{product.nombre}</span>
                    </p>
                    
                   </div>
                    <button
                        type="button"
                        onClick={() => navigate("/admin/products")}
                        className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-4 transform group-hover:-translate-x-1 transition-transform"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M19 12H5M12 5l-7 7 7 7" />
                        </svg>
                        Volver al listado
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <ProductForm
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                        isPending={isPending}
                        isEditing
                    />
                </form>

            </div>

            {/* LOGO DECORATIVO */}
            <div className="hidden md:block absolute -right-40 -bottom-50 -rotate-23 size-150 z-20 opacity-15 pointer-events-none">
                <img
                    src={logoElder}
                    alt="Elder Shop"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}