import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CategoryList({ categories, title }) {
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  
  if (!categories || categories.length === 0) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          카테고리 정보를 불러올 수 없습니다.
        </Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{title}</Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={6} key={category.categoryId}>
            <Card className="category-item">
              <CardActionArea onClick={() => handleCategoryClick(category.categoryId)}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" component="div" sx={{ fontWeight: 500 }}>
                    {category.categoryName}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryList;
