import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.onsafety.com.br',
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'token': 'oimsGSIfEuEHlmBZ1bMpIGq9Q36YrVoSUUUwvLPEhFU'
  },
});

const token = 'oimsGSIfEuEHlmBZ1bMpIGq9Q36YrVoSUUUwvLPEhFU';
axios.interceptors.request.use(
  config => {
    config.headers.authorization = `token ${token}`;
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default api;
