import { useQuery } from "@tanstack/react-query";

import { generoService } from "../services/generoService";


export const useGeneros = () => {

    return useQuery({

        queryKey: ["generos"],

        queryFn: generoService.getGeneros
    });
};