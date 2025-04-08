import axios from 'axios';

const API_URL = window.__runtime_config__?.MYSUB_URL || 'http://20.1.2.3/api/mysub';

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

// 총 구독료 조회
export const getTotalFee = async (userId) => {
  try {
    const response = await apiClient.get(`/total-fee?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '총 구독료 조회에 실패했습니다.');
  }
};

// 나의 구독 목록 조회
export const getMySubscriptions = async (userId) => {
  try {
    const response = await apiClient.get(`/list?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '구독 목록 조회에 실패했습니다.');
  }
};

// 구독 서비스 상세 조회
export const getSubscriptionDetail = async (subscriptionId) => {
  try {
    const response = await apiClient.get(`/services/${subscriptionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '구독 상세 정보 조회에 실패했습니다.');
  }
};

// 구독 신청
export const subscribeService = async (subscriptionId, userId) => {
  try {
    const response = await apiClient.post(`/services/${subscriptionId}/subscribe?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '구독 신청에 실패했습니다.');
  }
};

// 구독 취소
export const cancelSubscription = async (subscriptionId) => {
  try {
    const response = await apiClient.delete(`/services/${subscriptionId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '구독 취소에 실패했습니다.');
  }
};

// 카테고리 목록 조회
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '카테고리 목록 조회에 실패했습니다.');
  }
};

// 카테고리별 구독 서비스 목록 조회
export const getServicesByCategory = async (categoryId) => {
  try {
    const response = await apiClient.get(`/services?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '카테고리별 구독 서비스 조회에 실패했습니다.');
  }
};
