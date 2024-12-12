import baseApi from "./baseApi";

export const login = async (credential, password) => {
  try {
    const response = await baseApi.post("/login", { credential, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await baseApi.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
