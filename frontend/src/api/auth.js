// frontend/src/api/auth.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',  // 后端地址
  withCredentials: true,  // 携带 Cookie（用于 Session）
});

export const login = async (data) => {
    try {
      const response = await api.post('/login', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || '登录失败');
    }
  };