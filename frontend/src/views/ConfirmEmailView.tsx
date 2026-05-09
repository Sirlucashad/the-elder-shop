import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useConfirmEmail } from '../hooks/useAuth';

export default function ConfirmEmailView() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    // Usamos el nuevo hook que creamos
    const { mutate, isPending } = useConfirmEmail();

    // Ref para asegurar que la mutación se ejecute solo una vez
    const hasCalled = useRef(false);

    useEffect(() => {
        // Si hay un token y no hemos disparado la petición aún
        if (token && !hasCalled.current) {
            mutate(token);
            hasCalled.current = true;
        }
    }, [token, mutate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
            <div className="bg-stone-200 p-8 rounded-lg shadow-xl text-center max-w-md border-2 border-amber-600/20">
                <h2 className="text-3xl font-bold font-medieval mb-4 text-slate-900">
                    {isPending ? "Validando Pergamino" : "Verificación"}
                </h2>

                {isPending ? (
                    <div className="space-y-4">
                        {/* Spinner personalizado con tus colores de marca */}
                        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-amber-600 border-r-4 border-r-transparent mx-auto"></div>
                        <p className="text-slate-700 font-medieval text-lg">
                            Buscando tu nombre en los registros antiguos...
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <p className="text-slate-600 font-bold">Procesando respuesta del servidor...</p>
                        <p className="text-xs text-slate-400">Serás redirigido en breve.</p>
                    </div>
                )}
            </div>
        </div>
    );
}