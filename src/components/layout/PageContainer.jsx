// components/layout/PageContainer.jsx
import React from 'react';
import { Container, Box, useTheme, useMediaQuery } from '@mui/material';

/**
 * A responsive container component for page content
 * Handles different padding and max-width based on screen size
 */
const PageContainer = ({ children, maxWidth = "lg", sx = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container 
      maxWidth={maxWidth}
      sx={{ 
        py: isMobile ? 2 : 4,
        px: isMobile ? 1.5 : 3, // Smaller padding on mobile
        overflow: 'hidden', // Prevent horizontal scroll on mobile
        ...sx
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 2 : 3
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

// Media query helper for dynamic spacing and layout
const getResponsiveSpacing = (theme, isMobile, options = {}) => {
  const { base = 3, mobileReduction = 1 } = options;
  return isMobile ? base - mobileReduction : base;
};

export default PageContainer;