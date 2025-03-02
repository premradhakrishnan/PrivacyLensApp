// components/results/ResultsHeader.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Header component for the results page
 * @param {Object} props
 * @param {React.ReactNode} props.children - Action buttons or other components to render in header
 */
const ResultsHeader = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      mb: 4 
    }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy Analysis Results
      </Typography>
      <Box>
        {children}
      </Box>
    </Box>
  );
};

export default ResultsHeader;