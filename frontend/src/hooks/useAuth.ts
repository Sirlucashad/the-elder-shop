import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      console.log("Registro exitoso:", data.message);
      
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "Error en el registro");
    }
  });
};

export const useConfirmEmail = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (token: string) => authService.confirmEmail(token),
    onSuccess: (data) => {
      // Mensaje de éxito (puedes usar un toast o alert)
      alert(data.message || "¡Cuenta activada con éxito!");
      // Redirigimos al login para que el usuario ingrese
      navigate('/login');
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "El enlace es inválido o ha expirado.");
      navigate('/register'); // Opcional: mandarlo a registrarse de nuevo
    }
  });
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: any) => authService.login(email, password),
    onSuccess: (data) => {
      // Guardamos el token (tu interceptor de axios ya lo busca aquí)
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/dashboard'); 
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || "Credenciales inválidas");
    }
  });
};