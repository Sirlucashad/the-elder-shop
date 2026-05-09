export const UserRole = {
  USER: "user",
  ADMIN: "admin"
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// Lo que el backend espera en /register
export interface ClienteCreate {
  email: string;
  username: string;
  nombre: string;
  apellido: string;
  password: string; 
  password_confirmation: string; 
  telefono: string;
  provincia: string;
  ciudad: string;
  direccion: string;
}



// Lo que devuelve el /login exitoso
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    username: string;
    rol: UserRole;
  };
}