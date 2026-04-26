// Auth Types
export interface User {
  id: number;
  email: string;
  username: string;
  rol: 'USER' | 'ADMIN';
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// Product Types
export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  genero_id?: number;
  imagen_url?: string;
}

export interface ProductCreate {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  genero_id: number;
}