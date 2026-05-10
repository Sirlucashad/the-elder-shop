import { useForm } from 'react-hook-form';
import { useRegister } from '../hooks/useAuth';
import ClientForm from '../components/ClientForm';

import type { ClienteCreate } from '../types/auth';
import logoElder from '../assets/icons/logoElderShop.png';



export default function RegisterView() {

  const initialValues: ClienteCreate = {
    email: '',
    username: '',
    nombre: '',
    apellido: '',
    password: '',
    password_confirmation: '',
    telefono: '',
    provincia: '',
    ciudad: '',
    direccion: ''
  };



  const { register, watch, handleSubmit, formState: { errors } } = useForm<ClienteCreate>({ defaultValues: initialValues });


  const { mutate, isPending } = useRegister();

  const onSubmit = (data: ClienteCreate) => {
    const { password_confirmation, ...dataToSubmit } = data;
    mutate(dataToSubmit as ClienteCreate);
  };



  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-slate-900 to-slate-950 py-10 px-4 flex items-center justify-center overflow-hidden">

      {/* CONTENEDOR PRINCIPAL */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 py-10 relative z-30">

        {/* IZQUIERDA (Info) */}
        <div className="bg-stone-200 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold font-medieval mb-4 text-slate-900">
            ¡¡Regístrate!!
          </h2>
          <p className="text-black px-3 text-lg leading-relaxed font-medieval font-bold">
            Regístrate como usuario para personalizar tu perfil y acceder a ofertas exclusivas.
            ¡Únete a nuestra comunidad de The Elder Shop!
          </p>
        </div>

        {/* DERECHA */}
        <div className="bg-stone-200 p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <ClientForm register={register} errors={errors} watch={watch} isPending={isPending} /> {/*ACA INSERTÉ EL FORMULARIO COMO COMP REUTILIZABLE*/}

          </form>
        </div>
      </div>

      {/* MEDALLÓN DECORATIVO */}
      <div className="hidden md:block absolute -right-40 -bottom-50 -rotate-23 size-150 z-20 opacity-20 pointer-events-none">
        <img src={logoElder} alt="Elder Shop" className="w-full h-full object-contain" />
      </div>
    </div>
  );
}