// components/common/FeatureCard.jsx
import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import { brandColors } from '../../utils/constants';

const FeatureCard = ({ feature, index }) => {
  const isEven = index % 2 === 0;
  const colorScheme = isEven 
    ? { main: brandColors.purple, light: brandColors.lightPurple } 
    : { main: brandColors.green, light: brandColors.lightGreen };
    
  // Create the Icon component from the component reference
  const IconComponent = feature.iconComponent;

  return (
    <Card
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': { 
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
        },
        borderTop: `4px solid ${colorScheme.main}`
      }}
    >
      <Box 
        sx={{ 
          mb: 2, 
          p: 2, 
          borderRadius: '50%', 
          bgcolor: `${colorScheme.light}30`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Use the Icon component correctly with JSX */}
        <IconComponent style={{ fontSize: 40, color: colorScheme.main }} />
      </Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        fontWeight="bold"
        sx={{ color: colorScheme.main }}
      >
        {feature.title}
      </Typography>
      <Typography color="text.secondary">
        {feature.description}
      </Typography>
    </Card>
  );
};

export default FeatureCard;