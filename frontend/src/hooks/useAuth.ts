import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner'; 

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
     
      toast.success(data.message || "¡Registro exitoso! Por favor, verifica tu email.");
      navigate('/login');
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.detail || "Error en el registro";
      toast.error(errorMsg);
    }
  });
};

export const useConfirmEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (token: string) => authService.confirmEmail(token),
    onSuccess: (data) => {
      toast.success(data.message || "¡Cuenta activada! Ya puedes iniciar sesión.");
      navigate('/login');
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.detail || "El enlace es inválido o ha expirado.";
      toast.error(errorMsg);
      navigate('/register');
    }
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: any) => authService.login(email, password),
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Toast de bienvenida personalizado
      toast.success(`¡Bienvenido de nuevo, ${data.user.nombre}!`);
      
      navigate('/dashboard'); 
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.detail || "Credenciales inválidas";
      toast.error(errorMsg);
    }
  });
};