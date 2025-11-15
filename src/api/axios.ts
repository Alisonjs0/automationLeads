import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_N8N_API_URL
});


export default api;