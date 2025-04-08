import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!userId.trim()) {
      setError('사용자 ID를 입력해주세요.');
      return;
    }
    
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // 로그인 API 호출
      const response = await login(userId, password);
      
      // 성공 시 토큰 저장 및 메인 페이지로 이동
      const token = response.data.accessToken;
      
      // 토큰에서 사용자 정보 추출
      const decoded = jwtDecode(token);
      const user = {
        userId: decoded.userId,
        userName: decoded.userName
      };
      
      // 컨텍스트에 로그인 정보 저장
      authLogin(token, user);
      
      // 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      setError(error.message || '로그인에 실패했습니다. ID와 비밀번호를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', p: 3 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          라이프섭
        </Typography>
        <Typography variant="body1" color="text.secondary">
          모든 구독 서비스를 한 곳에서 관리하세요.
        </Typography>
      </Box>
      
      <Card sx={{ maxWidth: 400, mx: 'auto', width: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            로그인
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="사용자 ID"
              name="userId"
              autoComplete="username"
              autoFocus
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : '로그인'}
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
        사용자: user01 ~ user10, 비밀번호: Passw0rd
      </Typography>
    </Box>
  );
}

export default LoginPage;
