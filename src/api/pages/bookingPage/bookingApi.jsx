import baseApi from "../../baseApi";
export const submitBooking = async (bookingData) => {
  try {
    const response = await baseApi.post("/orders", bookingData);
    return response;
  } catch (error) {
    console.error("Error submitting booking:", error);
    throw error;
  }
};

// Get payment channels
export const getPaymentChannels = async () => {
  try {
    const response = await baseApi.get("/transactions/channels");
    return response;
  } catch (error) {
    console.error("Error getting payment channels:", error);
    throw error;
  }
};

// Update payment information
export const makePayment = async (orderId, paymentData) => {
  try {
    const response = await baseApi.put(`/orders/${orderId}`, paymentData);
    return response;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
};
