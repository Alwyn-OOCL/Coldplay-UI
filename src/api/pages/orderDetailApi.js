import baseApi from "../baseApi";

export const getOrderDetail = async (orderId) => {
  try {
    const response = await baseApi.get(`/orders/${orderId}`);
    return response;
  } catch (error) {
    console.error("Error getting order detail:", error);
    throw error;
  }
};

export const refundTicket = async (ticketId) => {
    try {
      const response = await baseApi.put(`/tickets/${ticketId}`);
      return response;
    } catch (error) {
      console.error("Error refunding ticket:", error);
      throw error;
    }
  };