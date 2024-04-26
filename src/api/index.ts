// import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// const api: AxiosInstance = axios.create({
//   baseURL: 'https://api.onsafety.com.br',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': '*/*',
//     'token': 'oimsGSIfEuEHlmBZ1bMpIGq9Q36YrVoSUUUwvLPEhFU'
//   },
// });

// const token = 'oimsGSIfEuEHlmBZ1bMpIGq9Q36YrVoSUUUwvLPEhFU';
// axios.interceptors.request.use(
//   config => {
//     config.headers.authorization = `token ${token}`;
//     return config;
//   },
//   error => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const token = process.env.NEXT_PUBLIC_TOKEN;

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'token': token
  },
});

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

