import axios from 'axios';

const API_URL = window.__runtime_config__?.RECOMMEND_URL || 'http://20.1.2.3/api/recommend';

// API 요청 시 인증 토큰을 포함하는 axios 인스턴스
const apiClient = axios.create({
  baseURL: API_URL
});

// 요청 인터셉터를 통해 모든 요청에 인증 토큰 추가
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 추천 구독 카테고리 조회
export const getRecommendedCategory = async (userId) => {
  try {
    const response = await apiClient.get(`/categories?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '추천 카테고리 조회에 실패했습니다.');
  }
};
