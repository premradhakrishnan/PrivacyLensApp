import React from 'react';
import { Container, Box, Typography, Divider } from '@mui/material';
import { textStyles } from '/src/utils/textStyles';

/**
 * PageContainer component to provide consistent layout for pages
 * 
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render
 * @param {string} props.title Optional page title
 * @param {string} props.subtitle Optional page subtitle
 * @param {boolean} props.showDivider Whether to show a divider below the title
 * @param {Object} props.sx Additional styling props for the container
 * @param {Object} props.contentSx Additional styling props for the content area
 */
const PageContainer = ({ 
  children, 
  title, 
  subtitle, 
  showDivider = true,
  sx = {}, 
  contentSx = {} 
}) => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        ...sx
      }}
    >
      {title && (
        <Box sx={{ mb: subtitle ? 1 : 3 }}>
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ ...textStyles.headingLeft }}
          >
            {title}
          </Typography>
          
          {subtitle && (
            <Typography 
              variant="subtitle1" 
              color="text.secondary"
              sx={{ ...textStyles.bodyLeft, mb: 3 }}
            >
              {subtitle}
            </Typography>
          )}
          
          {showDivider && <Divider sx={{ mb: 4 }} />}
        </Box>
      )}
      
      <Box sx={contentSx}>
        {children}
      </Box>
    </Container>
  );
};

export default PageContainer;