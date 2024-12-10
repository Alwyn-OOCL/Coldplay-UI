import baseApi from './baseApi';

export const login = async (email, password) => {
    try {
        const response = await baseApi.post('/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await baseApi.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};