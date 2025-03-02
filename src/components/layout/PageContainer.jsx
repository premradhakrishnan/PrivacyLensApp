// components/layout/PageContainer.jsx
import React from 'react';
import { Container, Box } from '@mui/material';

/**
 * Standard page container with consistent padding and layout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child content
 * @param {Object} props.sx - Additional sx props for the container
 */
const PageContainer = ({ children, sx = {} }) => {
  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          py: 4, 
          minHeight: '80vh',
          ...sx 
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default PageContainer;