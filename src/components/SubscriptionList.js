import React from 'react';
import { Typography, Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SubscriptionList({ subscriptions, title }) {
  const navigate = useNavigate();
  
  const handleSubscriptionClick = (subscriptionId) => {
    navigate(`/subscription/${subscriptionId}`);
  };
  
  // 구독 서비스가 없는 경우
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          구독 중인 서비스가 없습니다.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
        {subscriptions.map((subscription, index) => (
          <React.Fragment key={subscription.id}>
            <ListItem 
              alignItems="center" 
              button 
              onClick={() => handleSubscriptionClick(subscription.id)}
              sx={{ py: 2 }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={subscription.logoUrl} 
                  alt={subscription.serviceName}
                  variant="rounded"
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={subscription.serviceName}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            {index < subscriptions.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default SubscriptionList;
