import axios from 'axios';

// Coneção com o n8n API
const api = axios.create({
  baseURL: process.env.REACT_APP_N8N_API_URL
});


export default api;