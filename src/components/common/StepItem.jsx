import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { brandColors } from '../utils/constants';

/**
 * StepItem component for displaying numbered steps with consistent styling
 * 
 * @param {Object} props Component props
 * @param {number} props.number The step number
 * @param {string} props.title The title of the step
 * @param {string} props.description The description text for the step
 * @param {Object} props.sx Additional styling props
 */
const StepItem = ({ 
  number, 
  title, 
  description, 
  sx = {} 
}) => {
  return (
    <Paper 
      elevation={1}
      sx={{ 
        p: 2, 
        mb: 2,
        display: 'flex',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        ...sx
      }}
    >
      {/* Number bubble */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: brandColors.purple,
          color: 'white',
          fontWeight: 'bold',
          mr: 2,
          flexShrink: 0
        }}
      >
        <Typography variant="h6">
          {number}
        </Typography>
      </Box>
      
      {/* Content */}
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StepItem;