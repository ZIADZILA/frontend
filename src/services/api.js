
import axios from 'axios';

const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL;

const api = axios.create({
  baseURL: API_GATEWAY_URL,
});

export const get = (url) => api.get(url);
export const post = (url, data) => api.post(url, data);
export const put = (url, data) => api.put(url, data);
export const del = (url) => api.delete(url);
