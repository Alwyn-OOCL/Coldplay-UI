import baseApi from '../baseApi';

export const charity = async (code) => {
    try {
        const response = await baseApi.post(`/code/validation`, {
           code
        });
        return response.data;
    } catch (error) {
        console.error('Exchange operation error:', error);
        throw error;
    }
}