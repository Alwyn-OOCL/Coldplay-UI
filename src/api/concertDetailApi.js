import baseApi from "./baseApi";

export const concertDetail = async (id) => {
  try {
    const response = await baseApi.get(`/concertdetail/${id}`);
    return response.data;
  } catch (error) {
    console.error("Concert detail error:", error);
    throw error;
  }
};
