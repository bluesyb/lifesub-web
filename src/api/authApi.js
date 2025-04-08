import axios from 'axios';

const API_URL = window.__runtime_config__?.AUTH_URL || 'http://20.1.2.3/api/auth';

export const login = async (userId, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      userId,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
  }
};

export const logout = async (userId) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_URL}/logout`, 
      { userId },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '로그아웃에 실패했습니다.');
  }
};
