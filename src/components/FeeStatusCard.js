import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

// 구독료 레벨에 따른 메시지와 이미지
const feeStatusConfig = {
  'liker': {
    message: '구독이 취미인 당신, 적절한 소비습관을 가지고 있어요!',
    image: '/images/liker.png'
  },
  'collector': {
    message: '구독 수집가! 구독 서비스를 좋아하시는군요.',
    image: '/images/collector.png'
  },
  'addict': {
    message: '구독 중독자! 불필요한 구독은 없는지 확인해보세요.',
    image: '/images/addict.png'
  }
};

function FeeStatusCard({ totalFee, feeLevel }) {
  const status = feeStatusConfig[feeLevel] || feeStatusConfig.liker;
  
  // 숫자에 천 단위 콤마 추가
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <Card sx={{ mb: 3, p: 2 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <img src={status.image} alt={feeLevel} className="fee-image" />
        <Typography variant="h5" component="div" gutterBottom>
          매월 <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>{formatNumber(totalFee)}원</Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {status.message}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default FeeStatusCard;
