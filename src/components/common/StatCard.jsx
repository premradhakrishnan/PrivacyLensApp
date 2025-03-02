// components/StatCard.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { brandColors } from '../utils/constants';

/**
 * A responsive statistics card component
 * Automatically adjusts size and layout based on screen dimensions
 */
const StatCard = ({ label, value, icon, sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Card 
      elevation={2}
      sx={{
        height: '100%',
        borderLeft: `4px solid ${brandColors.purple}`,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
        },
        ...sx
      }}
    >
      <CardContent>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: 2
          }}
        >
          {icon && (
            <Box 
              sx={{ 
                color: brandColors.purple,
                fontSize: isMobile ? '2rem' : '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {icon}
            </Box>
          )}
          
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                mb: 0.5 
              }}
            >
              {value}
            </Typography>
            
            <Typography 
              variant={isMobile ? "body2" : "body1"}
              color="text.secondary"
            >
              {label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;