import axios from "axios";

const api = axios.create({
    'development': {
        baseURL: 'https://649138542f2c7ee6c2c7dd46.mockapi.io/api/v1/'
    },
    'qa': {
        baseURL: 'https://days15-todo-backend-demo-production-30a0.up.railway.app/'
    }
}[process.env.REACT_APP_ENV || 'development']);
export default api;