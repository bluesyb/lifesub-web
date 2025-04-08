import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Button } from '@mui/material';

function SubscriptionDetail({ subscription, isSubscribed, onSubscribe, onCancel, loading }) {
  // 숫자에 천 단위 콤마 추가
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Avatar 
          src={subscription.logoUrl} 
          alt={subscription.serviceName}
          variant="rounded"
          sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
        />
        <Typography variant="h5" component="div" gutterBottom>
          {subscription.serviceName}
        </Typography>
        <Chip 
          label={subscription.category} 
          size="small" 
          sx={{ mb: 2, bgcolor: 'rgba(80, 72, 229, 0.1)', color: 'primary.main' }} 
        />
        <Typography variant="body1" sx={{ mb: 2 }}>
          {subscription.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">구독료</Typography>
            <Typography variant="h6" color="primary.main">
              월 {formatNumber(subscription.price)}원
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">최대 공유 인원</Typography>
            <Typography variant="h6">
              {subscription.maxSharedUsers}명
            </Typography>
          </Box>
        </Box>
        
        {isSubscribed ? (
          <Button 
            variant="outlined" 
            color="error" 
            fullWidth 
            onClick={onCancel}
            disabled={loading}
          >
            구독 취소
          </Button>
        ) : (
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={onSubscribe}
            disabled={loading}
          >
            구독하기
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default SubscriptionDetail;
