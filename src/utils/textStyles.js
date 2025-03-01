// utils/textStyles.js
import { Box } from '@mui/material';
import React from 'react';

// Text alignment utility objects for consistent styling across components
export const textStyles = {
  // Left-aligned text styling for headings
  headingLeft: {
    textAlign: 'left',
    mb: 2
  },
  
  // Left-aligned text styling for paragraphs
  bodyLeft: {
    textAlign: 'left',
    mb: 2
  },
  
  // Left-aligned text styling with custom margin
  leftAligned: (marginBottom = 2) => ({
    textAlign: 'left',
    mb: marginBottom
  }),
  
  // Container for left-aligned content sections
  contentContainer: {
    textAlign: 'left',
    width: '100%'
  },
  
  // Section title styling (left-aligned)
  sectionTitle: {
    textAlign: 'left',
    fontWeight: 'bold',
    mb: 3
  }
};

// Helper component for consistent section titles
export const LeftAlignedSection = ({ children, sx = {} }) => (
  <Box sx={{ 
    textAlign: 'left', 
    width: '100%',
    ...sx
  }}>
    {children}
  </Box>
);