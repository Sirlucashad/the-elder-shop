import api from '../api/config/axios.tsx';
import { type LoginResponse, type User } from '../types';

export const authService = {
  // Registro de cliente (Público)
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login (Usa Form Data por OAuth2PasswordRequestForm)
  login: async (email: string, pass: string): Promise<LoginResponse> => {
    const params = new URLSearchParams();
    params.append('username', email); // FastAPI espera 'username'
    params.append('password', pass);

    const response = await api.post<LoginResponse>('/auth/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  },

  // Recuperar contraseña
  forgotPassword: async (email: string) => {
    const response = await api.post(`/auth/forgot-password?email=${email}`);
    return response.data;
  }
};