import React from 'react';
import { Card, CardContent, Typography, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function RecommendCard({ recommendCategory }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // recommendCategory.categoryName을 사용하여 해당 카테고리 페이지로 이동
    navigate(`/category/${recommendCategory.categoryName}`);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  
  return (
    <Card sx={{ mb: 3 }} className="recommend-card">
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {formatDate(recommendCategory.baseDate)} 기준
          </Typography>
          <Typography variant="h6" gutterBottom>
            {recommendCategory.spendingCategory} 지출이 많으시네요!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {recommendCategory.categoryName} 관련 구독 서비스를 추천해 드려요.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default RecommendCard;
