import api from "../api/config/axios"; 

interface PagoResponse {
    pago_id: number;
    url_pago: string;
}

export const pagoService = {
    crearPago: async (ordenId: number): Promise<PagoResponse> => {
        const { data } = await api.post<PagoResponse>(`/pagos/${ordenId}`);
        return data;
    }
};