import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function Header({ title, showBackButton = true }) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.default', color: 'text.primary', marginBottom: 2 }}>
      <Toolbar>
        {showBackButton && (
          <IconButton edge="start" color="inherit" onClick={handleBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: showBackButton ? 'flex-start' : 'center' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
