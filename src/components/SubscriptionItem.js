import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SubscriptionItem({ subscription }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/subscription/${subscription.serviceId}`);
  };
  
  // 숫자에 천 단위 콤마 추가
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <Card sx={{ mb: 2 }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              src={subscription.logoUrl} 
              alt={subscription.serviceName}
              variant="rounded"
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography variant="h6" component="div" gutterBottom>
                {subscription.serviceName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {subscription.description}
              </Typography>
              <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600 }}>
                월 {formatNumber(subscription.price)}원
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default SubscriptionItem;
