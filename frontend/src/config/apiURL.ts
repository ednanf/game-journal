export const API_BASE_URL =
  import.meta.env.VITE_ENV === 'development'
    ? 'http://localhost:9000/api/v1'
    : 'https://production-url/api/v1';
