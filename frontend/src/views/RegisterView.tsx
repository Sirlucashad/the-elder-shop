import { useForm } from 'react-hook-form';
import { useRegister } from '../hooks/useAuth';
import ErrorMessage from '../components/ErrorMessage'
import type { ClienteCreate } from '../types/auth';
import logoElder from '../assets/icons/logoElderShop.png';
import { LOCALIZACIONES_ARGENTINA, type Provincia } from '../constants/locations';
import { toast } from 'sonner';

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


  // 1. Inicializamos React Hook Form
  const { register, watch, handleSubmit, formState: { errors } } = useForm<ClienteCreate>({ defaultValues: initialValues });

  // 2. Traemos la mutación de TanStack Query
  const { mutate, isPending } = useRegister();

  // 3. Función que se dispara al enviar el formulario
  const onSubmit = (data: ClienteCreate) => {
    const { password_confirmation, ...dataToSubmit } = data;
    mutate(dataToSubmit as ClienteCreate);
  };

  const password = watch('password')
  const provinciaSeleccionada = watch('provincia') as Provincia;
  const ciudadesDisponibles = provinciaSeleccionada ? LOCALIZACIONES_ARGENTINA[provinciaSeleccionada] : [];

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

            {/* NOMBRE Y APELLIDO */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-black font-bold">Nombre</label>
                <input
                  id='nombre'
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2"
                  {...register("nombre", {
                    required: 'El nombre es obligatorio'
                  })}
                />
                {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
              </div>



              {/* APELLIDO */}
              <div>
                <label className="block text-sm mb-1 text-black font-bold">Apellido</label>
                <input
                  id='apellido'
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2"
                  {...register("apellido", {
                    required: 'El apellido es obligatorio'
                  })}
                />
                {errors.apellido && <ErrorMessage>{errors.apellido.message}</ErrorMessage>}
              </div>
            </div>

            {/*USERNAME*/}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">Nombre de usuario</label>
              <input
                id='username'
                type="text"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2"
                {...register("username", {
                  required: 'El nombre de usuario es obligatorio'
                })}
              />
              {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">Email</label>
              <input
                id='email'
                type="email"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                {...register("email", {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'El email no es válido'
                  }
                })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">Password</label>
              <input
                id='password'
                type="password"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                {...register("password", {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres'
                  }
                })}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
            </div>
            <div>
              <label className="block text-sm mb-1 text-black font-bold">Confirmar Password</label>
              <input
                id='password_confirmation'
                type="password"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                {...register("password_confirmation", {
                  required: 'Confirmar password es obligatorio',
                  validate: (value) => value === password || 'Las contraseñas no coinciden',

                })}
              />
              {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
            </div>




            <div className="grid grid-cols-2 gap-4">

              <div>
                <div>
                  <label className="block text-sm mb-1 text-black font-bold">Provincia</label>
                  <select className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 cursor-pointer"
                    id='provincia'
                    {...register("provincia")}

                  >
                    <option value="" selected disabled hidden>Seleccione una provincia</option>

                    {Object.keys(LOCALIZACIONES_ARGENTINA).map(prov => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}

                  </select>
                 
                </div>


                <div>
                  <label className="block text-sm mb-1 text-black font-bold">Ciudad</label>
                  <select className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 hover:cursor-pointer"
                    id='ciudad'
                    disabled={!provinciaSeleccionada}
                    {...register("ciudad")}
                  >
                    <option value="">{provinciaSeleccionada ? "Seleccione ciudad" : "Elija provincia"}</option>
                    {ciudadesDisponibles.map(ciudad => (
                      <option key={ciudad} value={ciudad}>{ciudad}</option>
                    ))}
                  </select>
                </div>


              </div>

              <div>
                <label className="block text-sm mb-1 text-black font-bold">Teléfono</label>
                <input className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 "
                  id='telefono'
                  type="text"
                  {...register("telefono")}
                />
              </div>

              {/* CIUDAD */}

            </div>

            {/* DIRECCIÓN */}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">Dirección</label>
              <input
                id='direccion'
                {...register("direccion")}
                type="text"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* BOTÓN CON ESTADO DE CARGA */}
            <div className='flex justify-end'>
              <button
                type="submit"
                disabled={isPending}
                className="mt-4 bg-amber-600 text-white px-16 py-2 rounded-md hover:bg-amber-700 transition cursor-pointer disabled:opacity-50"
              >
                {isPending ? 'Creando...' : 'Crear'}
              </button>
            </div>
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