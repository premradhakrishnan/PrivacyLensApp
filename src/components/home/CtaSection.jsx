// components/home/CtaSection.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { brandColors } from '../../utils/constants';

const CtaSection = () => {
  return (
    <Box 
      sx={{ 
        py: 6, 
        px: 4, 
        textAlign: 'center', 
        borderRadius: 4, 
        mb: 8,
        bgcolor: `${brandColors.lightGreen}30`,
        boxShadow: '0 8px 32px rgba(140, 196, 63, 0.15)'
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: brandColors.purple }}>
        Ready to Protect Your Health Data?
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
        Start analyzing healthcare websites today and take control of your privacy.
      </Typography>
      <Button 
        variant="contained" 
        size="large" 
        sx={{ 
          bgcolor: brandColors.green, 
          px: 4, 
          py: 1.5,
          fontSize: '1.1rem',
          '&:hover': { bgcolor: brandColors.lightGreen, color: '#333' } 
        }}
      >
        Analyze a Website Now
      </Button>
    </Box>
  );
};

export default CtaSection;