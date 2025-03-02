// components/StepItem.jsx
import React from 'react';
import { Paper, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { brandColors } from '../utils/constants';

/**
 * A responsive component for displaying numbered steps
 * Adapts layout and sizing based on screen dimensions
 */
const StepItem = ({ number, title, description, sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Paper
      elevation={1}
      sx={{
        p: isMobile ? 2 : 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: 2,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 3
        },
        ...sx
      }}
    >
      <Box
        sx={{
          bgcolor: brandColors.purple,
          color: 'white',
          width: isMobile ? '36px' : '48px',
          height: isMobile ? '36px' : '48px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: isMobile ? '1.2rem' : '1.5rem',
          flexShrink: 0
        }}
      >
        {number}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          component="h3" 
          sx={{ 
            fontWeight: 'bold',
            mb: 0.5,
            color: theme.palette.text.primary
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontSize: isMobile ? '0.875rem' : '1rem'
          }}
        >
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StepItem;