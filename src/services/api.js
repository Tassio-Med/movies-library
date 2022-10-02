import axios from 'axios';

// API URL: /tv/popular?api_key=fedd1180bea199228b93bece9b17a8df&language=pt-BR
//BASE DA URL: https://api.themoviedb.org/3/

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;