// components/results/ResultsHeader.jsx
import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { textStyles } from '../../utils/textStyles';

/**
 * Header component for the results page
 * @param {Object} props
 * @param {React.ReactNode} props.children - Additional actions/controls
 * @param {string} props.title - Header title
 */
const ResultsHeader = ({ children, title = "Privacy Analysis Results" }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between' 
      }}>
        <Typography variant="h5" component="h1" sx={textStyles.headingLeft}>
          {title}
        </Typography>
        
        {children && (
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            {children}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ResultsHeader;