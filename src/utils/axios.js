import axios from 'axios';

const env = import.meta.env.MODE

const baseUrl = env === 'development' ? 'http://127.0.0.1:8080' : 'https://event-auto.fly.dev'

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout:10000,
  withCredentials: true,
})

export default axiosInstance;