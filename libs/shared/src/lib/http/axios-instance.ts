import axios, { AxiosInstance } from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;
const serverContext = import.meta.env.VITE_SERVER_CONTEXT;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${serverUrl}${serverContext}`,
});
