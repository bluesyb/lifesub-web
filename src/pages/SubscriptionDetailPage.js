import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getSubscriptionDetail, subscribeService, cancelSubscription } from '../api/mySubApi';
import Header from '../components/Header';
import SubscriptionDetail from '../components/SubscriptionDetail';

function SubscriptionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  
  useEffect(() => {
    const fetchSubscriptionDetail = async () => {
      try {
        setLoading(true);
        const response = await getSubscriptionDetail(id);
        setSubscription(response.data);
        
        // 이 부분은 API 응답에 따라 수정 필요
        // 현재 사용자가 이 서비스를 구독 중인지 확인
        // 응답에 이 정보가 없다면 별도의 API를 호출하거나 로직을 수정해야 함
        setIsSubscribed(false); // 임시로 false로 설정
        
      } catch (error) {
        setError('구독 서비스 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching subscription detail:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubscriptionDetail();
  }, [id]);
  
  const handleSubscribe = async () => {
    if (!currentUser) return;
    
    try {
      setActionLoading(true);
      await subscribeService(id, currentUser.userId);
      setIsSubscribed(true);
      setSuccess('구독이 완료되었습니다.');
      
      // 잠시 후 메인 페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('구독 신청에 실패했습니다.');
      console.error('Error subscribing:', error);
    } finally {
      setActionLoading(false);
    }
  };
  
  const handleCancelConfirm = () => {
    setOpenConfirmDialog(true);
  };
  
  const handleCancelDialogClose = () => {
    setOpenConfirmDialog(false);
  };
  
  const handleCancelSubscription = async () => {
    try {
      setActionLoading(true);
      await cancelSubscription(id);
      setIsSubscribed(false);
      setSuccess('구독이 취소되었습니다.');
      setOpenConfirmDialog(false);
      
      // 잠시 후 메인 페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('구독 취소에 실패했습니다.');
      console.error('Error canceling subscription:', error);
    } finally {
      setActionLoading(false);
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
      <Header title="구독 서비스 상세" />
      
      <Container maxWidth="sm" sx={{ pb: 4 }}>
        {subscription ? (
          <SubscriptionDetail
            subscription={subscription}
            isSubscribed={isSubscribed}
            onSubscribe={handleSubscribe}
            onCancel={handleCancelConfirm}
            loading={actionLoading}
          />
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            구독 서비스 정보를 불러올 수 없습니다.
          </Typography>
        )}
      </Container>
      
      {/* 알림 메시지 */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>
      
      {/* 구독 취소 확인 다이얼로그 */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDialogClose}
      >
        <DialogTitle>구독 취소</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 구독을 취소하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialogClose} color="primary">
            취소
          </Button>
          <Button onClick={handleCancelSubscription} color="error" disabled={actionLoading}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SubscriptionDetailPage;
