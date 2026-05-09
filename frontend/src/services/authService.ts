import api from '../api/config/axios';
import type { ClienteCreate, AuthResponse } from '../types/auth';

export const authService = {
  // Registro de cliente
  register: async (data: ClienteCreate) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Login (Usa Form Data por OAuth2PasswordRequestForm en FastAPI)
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', email); // FastAPI espera 'username'
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  },

  // Confirmar email
  confirmEmail: async (token: string) => {
    const response = await api.get(`/auth/confirm-email?token=${token}`);
    return response.data;
  }
};