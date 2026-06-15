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



export interface ProductCreate {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  genero_id: number;
}