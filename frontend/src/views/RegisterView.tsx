import { useForm } from 'react-hook-form';
import { useRegister } from '../hooks/useAuth';
import type { ClienteCreate } from '../types/auth';
import logoElder from '../assets/icons/logoElderShop.png';
import { provinciasArgentina } from '../constants/locations';

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
            </div>
            <div>
              <label className="block text-sm mb-1 text-black font-bold">Confirmar Password</label>
              <input
                id='password_confirmation'
                type="password"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400"
                {...register("password_confirmation", {
                  required: 'La contraseña es obligatoria',
                  validate: (value) => value === password || 'Las contraseñas no coinciden',

                })}
              />
            </div>



            {/* TELEFONO Y PROVINCIA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 text-black font-bold">Teléfono</label>
                <input
                  id='telefono'
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2"
                  {...register("telefono")}
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-black font-bold">Provincia</label>
                <select
                  id='provincia'
                  {...register("provincia")}
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="" selected disabled hidden>Seleccione una provincia</option>
                  {provinciasArgentina.map((provincia) => (
                    <option key={provincia.id} value={provincia.nombre}>{provincia.nombre}</option>
                  ))}

                </select>
              </div>

              {/* CIUDAD */}
              <div>
                <label className="block text-sm mb-1 text-black font-bold">Ciudad</label>
                <input
                  id='ciudad'
                  {...register("ciudad")}
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded-md px-3 py-2"
                />
              </div>
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