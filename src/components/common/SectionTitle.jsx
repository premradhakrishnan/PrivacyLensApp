// components/common/SectionTitle.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { brandColors } from '../../utils/constants';

const SectionTitle = ({ title, subtitle, centered = true, mb = 4 }) => {
  return (
    <Box sx={{ mb: mb, textAlign: centered ? 'center' : 'left' }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          color: brandColors.purple
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography 
          variant="subtitle1" 
          sx={{ 
            maxWidth: centered ? '800px' : 'auto', 
            mx: centered ? 'auto' : 0,
            color: 'text.secondary'
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;