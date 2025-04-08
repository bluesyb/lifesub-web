import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getServicesByCategory } from '../api/mySubApi';
import Header from '../components/Header';
import SubscriptionItem from '../components/SubscriptionItem';

function CategorySubscriptionsPage() {
  const { id } = useParams();
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryName, setCategoryName] = useState('');
  
  useEffect(() => {
    const fetchCategoryServices = async () => {
      try {
        setLoading(true);
        const response = await getServicesByCategory(id);
        setServices(response.data);
        
        // 카테고리 이름 설정
        // 여기서는 카테고리 ID를 이름으로 사용
        // 실제로는 카테고리 정보를 가져오는 API가 필요할 수 있음
        setCategoryName(getCategoryNameById(id));
      } catch (error) {
        setError('구독 서비스 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching category services:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryServices();
  }, [id]);
  
  // 카테고리 ID에 따른 이름 반환 함수
  const getCategoryNameById = (categoryId) => {
    const categoryMap = {
      'OTT': 'OTT/동영상',
      'MUSIC': '음악',
      'FOOD': '식품',
      'LIFE': '생활',
      'BEAUTY': '뷰티',
      'EDU': '교육'
    };
    
    return categoryMap[categoryId] || categoryId;
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
      <Header title={`${categoryName} 구독 서비스`} />
      
      <Container maxWidth="sm" sx={{ pb: 4 }}>
        <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
          {categoryName} 구독 서비스
        </Typography>
        
        {services.length > 0 ? (
          services.map((service) => (
            <SubscriptionItem key={service.serviceId} subscription={service} />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            해당 카테고리의 구독 서비스가 없습니다.
          </Typography>
        )}
      </Container>
      
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CategorySubscriptionsPage;


