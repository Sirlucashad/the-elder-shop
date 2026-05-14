import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

import logoElder from '../assets/icons/logoElderShop.png';
import ErrorMessage from '../components/ErrorMessage';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginView() {

  const initialValues: LoginForm = {
    email: '',
    password: ''
  };

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ defaultValues: initialValues });

  const { mutate } = useLogin();


  const onSubmit = async (data: LoginForm) => {
    console.log(data);

    mutate(data);
  };


  return (
    <div className="relative py-15 w-full bg-linear-to-b from-slate-900 to-slate-950 flex items-center justify-center px-4 overflow-hidden">

      {/* Glow decorativo */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-700/10 blur-3xl rounded-full pointer-events-none" />


      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-20 w-full max-w-5xl grid md:grid-cols-2 bg-stone-200 rounded-2xl overflow-hidden shadow-2xl border border-stone-300">


        {/* PANEL IZQUIERDO */}
        <div className="hidden md:flex flex-col justify-center bg-slate-900 text-stone-200 p-12 relative overflow-hidden">

          <div className="absolute inset-0 opacity-10">
            <img
              src={logoElder} alt="Elder Shop" className="w-full h-full object-contain scale-125 rotate-12" />
          </div>

          <div className="relative z-10 space-y-6">

            <h1 className="text-5xl font-black font-medieval text-amber-400 leading-tight">
              The Elder Shop
            </h1>

            <p className="text-lg leading-relaxed text-stone-300 max-w-md">
              Accedé a tu cuenta para explorar artefactos, reliquias y ofertas legendarias.
              Porque todo aventurero necesita un buen inventario.
            </p>

            <div className="flex items-center gap-3 text-sm text-stone-400">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              Servidores imperiales operativos.
            </div>

          </div>
        </div>


        {/* PANEL DERECHO */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2 font-medieval">
              Iniciar sesión
            </h2>

            <p className="text-slate-600">
              Bienvenido nuevamente, viajero.
            </p>
          </div>


          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-1 text-black font-bold">
                Email
              </label>

              <input
                type="email"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-amber-400 transition"
                placeholder="correo@ejemplo.com"
                {...register('email', {
                  required: 'El email es obligatorio',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'El email no es válido'
                  }
                })}
              />

              {errors.email && (
                <ErrorMessage>
                  {errors.email.message}
                </ErrorMessage>
              )}
            </div>


            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm text-black font-bold">
                  Password
                </label>

                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-amber-700 hover:text-amber-800 hover:underline transition"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>


              <input
                type="password"
                className="w-full border bg-white border-gray-300 rounded-md px-3 py-3 outline-none focus:ring-2 focus:ring-amber-400 transition"
                placeholder="••••••••"
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 8,
                    message: 'Debe contener al menos 8 caracteres'
                  }
                })}
              />

              {errors.password && (
                <ErrorMessage>
                  {errors.password.message}
                </ErrorMessage>
              )}
            </div>


            {/* RECORDAR */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-slate-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="accent-amber-600 size-4"
                />
                Recordarme
              </label>

            </div>


            {/* BOTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 transition text-white font-bold py-3 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isSubmitting
                ? 'Ingresando...'
                : 'Ingresar'}
            </button>


            {/* REGISTER */}
            <div className="text-center text-sm text-slate-700 pt-2">
              ¿No tenés cuenta?{' '}

              <Link
                to="/auth/register"
                className="text-amber-700 font-bold hover:underline"
              >
                Registrate
              </Link>
            </div>

          </form>
        </div>
      </div>


      {/* MEDALLON DECORATIVO */}
      <div className="hidden lg:block absolute -right-32 -bottom-32 rotate-12 size-120 opacity-10 pointer-events-none select-none">
        <img
          src={logoElder}
          alt="Elder Shop"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

