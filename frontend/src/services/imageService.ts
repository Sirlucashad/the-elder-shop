import api from '../api/config/axios';

export const imageService = {
    upload: async (file: File): Promise<{ url: string; public_id: string }> => {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await api.post<{ url: string; public_id: string }>(
            "/upload-image/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return data;
    },
};