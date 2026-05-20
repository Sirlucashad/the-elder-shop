import api from "../api/config/axios";

export interface Genero {
    id: number;
    nombre: string;
}

export const generoService = {

    getGeneros: async () => {

        const { data } = await api.get<Genero[]>("/generos/");

        return data;
    }
};