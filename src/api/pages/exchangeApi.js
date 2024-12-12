import baseApi from '../baseApi';

export const exchange = async (userId, totalPoint) => {
    try {
        const response = await baseApi.put(`/shop/exchange`, {
            userId,
            totalPoint
        });
        return response.data;
    } catch (error) {
        console.error('Exchange operation error:', error);
        throw error;
    }
}