import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 토큰 검증 및 사용자 정보 설정
    const verifyToken = () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      
      try {
        // 토큰 디코딩하여 사용자 정보 및 만료 시간 확인
        const decoded = jwtDecode(token);
        
        // 토큰 만료 체크
        if (decoded.exp * 1000 < Date.now()) {
          // 토큰 만료
          localStorage.removeItem('accessToken');
          setAccessToken(null);
          setIsAuthenticated(false);
          setCurrentUser(null);
        } else {
          // 유효한 토큰
          setAccessToken(token);
          setCurrentUser({
            userId: decoded.userId,
            userName: decoded.userName
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('토큰 검증 실패:', error);
        localStorage.removeItem('accessToken');
        setAccessToken(null);
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
      
      setLoading(false);
    };

    verifyToken();
  }, []);

  // 로그인 함수
  const login = (token, user) => {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    accessToken,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
