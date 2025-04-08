import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, CircularProgress, Snackbar, Alert } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getTotalFee, getMySubscriptions, getCategories } from '../api/mySubApi';
import { getRecommendedCategory } from '../api/recommendApi';
import { logout } from '../api/authApi';
import Header from '../components/Header';
import FeeStatusCard from '../components/FeeStatusCard';
import SubscriptionList from '../components/SubscriptionList';
import RecommendCard from '../components/RecommendCard';
import CategoryList from '../components/CategoryList';

function MainPage() {
  const { currentUser, logout: authLogout } = useAuth();
  const navigate = useNavigate();
  
  const [totalFeeData, setTotalFeeData] = useState(null);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [recommendCategory, setRecommendCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        // 총 구독료 조회
        const totalFeeResponse = await getTotalFee(currentUser.userId);
        setTotalFeeData(totalFeeResponse.data);
        
        // 나의 구독 목록 조회
        const mySubsResponse = await getMySubscriptions(currentUser.userId);
        setMySubscriptions(mySubsResponse.data);
        
        // 추천 구독 카테고리 조회
        try {
          const recommendResponse = await getRecommendedCategory(currentUser.userId);
          setRecommendCategory(recommendResponse.data);
        } catch (error) {
          console.log('추천 카테고리를 가져오는데 실패했습니다:', error);
          // 추천 실패는 치명적이지 않으므로 전체 오류로 처리하지 않음
        }
        
        // 카테고리 목록 조회
        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data);
        
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser]);
  
  const handleLogout = async () => {
    try {
      if (currentUser) {
        await logout(currentUser.userId);
      }
      authLogout();
      navigate('/login');
    } catch (error) {
      setError('로그아웃에 실패했습니다.');
    }
  };
  
  if (loading) {
    return (
      <Box className="loading">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box>
      <Header title="마이 구독" showBackButton={false} />
      
      <Container maxWidth="sm" sx={{ pb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            {currentUser ? `${currentUser.userName}님의 구독` : '내 구독'}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            size="small"
          >
            로그아웃
          </Button>
        </Box>
        
        {totalFeeData && (
          <FeeStatusCard 
            totalFee={totalFeeData.totalFee} 
            feeLevel={totalFeeData.feeLevel} 
          />
        )}
        
        <SubscriptionList 
          subscriptions={mySubscriptions} 
          title="나의 구독 서비스" 
        />
        
        {recommendCategory && (
          <RecommendCard recommendCategory={recommendCategory} />
        )}
        
        <CategoryList 
          categories={categories} 
          title="구독 카테고리" 
        />
      </Container>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MainPage;
