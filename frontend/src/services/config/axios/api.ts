import axios from 'axios';
import { notification } from 'antd';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toUpperCase();
    const successMsg = response.config.headers?.['X-Success-Message'];

    if (successMsg && method && ['POST', 'PUT', 'DELETE'].includes(method)) {
      notification.success({
        message: 'Sucess!',
        description: successMsg,
      });
    }

    return response;
  },

  (error) => {
    const skipErrorToast = error?.config?.headers?.['X-Skip-Error-Notify'];
    if (!skipErrorToast) {
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        'Unexpected error occurred';

      notification.error({
        message: 'Error!',
        description: errMsg,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
