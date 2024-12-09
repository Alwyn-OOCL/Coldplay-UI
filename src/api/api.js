import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/parkingManager',
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    // You can add any custom logic before the request is sent
    config.metadata = { startTime: new Date() }
    console.log("Request:", config)
    return config;
  },
  error => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const duration = new Date() - response.config.metadata.startTime
    response.duration = duration
    console.log(`method: ${response.config.method} url: ${response.config.url} duration: ${response.duration}ms`)
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Handle global errors here
    if (error.response && error.response.status === 404) {
        window.location.href = "/404-not-found"
      }
  
      if (error.response && error.response.status === 500) {
        window.location.href = "/server-error"
      }
  
      console.error("Response Error:", error)
    return Promise.reject(error);
  }
);

export default api;