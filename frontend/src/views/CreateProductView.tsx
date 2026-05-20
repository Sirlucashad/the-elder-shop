import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import ProductForm from "../components/ProductForm";

import { useProductActions } from "../hooks/useProducts";

import type { ProductFormData } from "../types/products";


export default function CreateProductView() {

    const { createProduct, isCreating } = useProductActions();

    const initialValues: ProductFormData = {

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

                detalle_digital: {
                    url_descarga: "",
                    peso_gb: undefined,
                    instrucciones_canje: ""
                }
            }
        ],

        videojuego: {
            anio_lanzamiento: new Date().getFullYear(),
            jugadores_max: 1,
            es_cooperativo: false,
            generos_ids: []
        }
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<ProductFormData>({
        defaultValues: initialValues
    });

    const onSubmit = (data: ProductFormData) => {
        createProduct(data);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-12">
            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="mb-10 flex justify-between items-center">
                    <div>
                        <p className="text-amber-400 uppercase tracking-widest text-sm font-bold">
                            Panel administrativo
                        </p>

                        <h1 className="text-5xl font-black text-white mt-3 font-medieval">
                            Crear producto
                        </h1>
                    </div>

                    <Link
                        to="/admin/products"
                        className=" bg-amber-600 hover:bg-amber-500 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:scale-105 active:scale-95"
                    >
                        Ver productos
                    </Link>
                </div>

                {/* CARD */}
                <div className="bg-stone-200 rounded-3xl shadow-2xl border border-slate-700 p-8 md:p-10">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >

                        <ProductForm
                            register={register}
                            errors={errors}
                            watch={watch}
                            setValue={setValue}
                            isPending={isCreating}
                        />

                    </form>

                </div>

            </div>
        </div>
    );
}