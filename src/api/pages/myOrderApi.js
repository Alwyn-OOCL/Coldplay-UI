import baseApi from "../baseApi";

export const getOrders = async (userId) => {
    try {
      const response = await baseApi.get(`/orders?userId=${userId}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error getting orders:", error);
      throw error;
    }
  };