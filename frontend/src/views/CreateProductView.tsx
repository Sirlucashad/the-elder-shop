import { useForm } from "react-hook-form";
import ProductForm from "../components/ProductForm";
import { useProductActions } from "../hooks/useProducts"; // Importamos el hook
import type { ProductFormData } from "../types/products";

export default function CreateProductView() {
   
    const { createProduct, isCreating } = useProductActions();

    const initialValues: ProductFormData = {
        // PRODUCTO BASE
        nombre: "",
        descripcion: "",
        precio_base: 0,
        tipo_id: 0,
        image_url: "",

        // VARIANTE
        stock: 0,
        precio_variante: 0,
        plataforma_id: undefined,
        formato_id: undefined,

        // VIDEOJUEGO
        anio_lanzamiento: new Date().getFullYear(),
        jugadores_max: 1,
        es_cooperativo: false,

        // GÉNEROS
        accion: false,
        aventura: false,
        rpg: false,
        shooter: false,
        survival: false,
        deportes: false,
    };

    const {
        register,
        handleSubmit,
        watch,
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
                <div className="mb-10">
                    <p className="text-amber-400 uppercase tracking-widest text-sm font-bold">
                        Panel administrativo
                    </p>

                    <h1 className="text-5xl font-black text-white mt-3 font-medieval">
                        Crear producto
                    </h1>
                </div>

                {/* CARD */}
                <div className="bg-stone-200 rounded-3xl shadow-2xl border border-slate-700 p-8 md:p-10">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate // Evitamos validaciones nativas del navegador
                    >

                        <ProductForm
                            register={register}
                            errors={errors}
                            watch={watch}
                            isPending={isCreating} // Pasamos el estado de carga de la mutación
                        />

                    </form>

                </div>
            </div>
        </div>
    );
}