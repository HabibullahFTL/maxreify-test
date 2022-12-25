import axios from 'axios';

const baseURL = 'https://x8ki-letl-twmt.n7.xano.io/api:magnum';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
