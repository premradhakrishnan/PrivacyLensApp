// components/layout/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { brandColors } from '../../utils/constants';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{ 
        bgcolor: '#f5f5f5', 
        py: isMobile ? 3 : 4, 
        borderTop: '1px solid #e0e0e0',
        mt: 4
      }}
    >
      <Container maxWidth="lg" sx={{ px: isMobile ? 2 : 3 }}>
        <Grid container spacing={isMobile ? 2 : 4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: isMobile ? 2 : 0 }}>
              <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom fontWeight="bold" color={brandColors.purple}>
                Privacy Lens
              </Typography>
              <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
                Making healthcare privacy policies transparent and understandable.
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ mb: isMobile ? 2 : 0 }}>
              <Typography variant={isMobile ? "subtitle1" : "subtitle1"} gutterBottom fontWeight="bold">
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: isMobile ? 2 : 0 }}>
                <Typography variant="body2" component="a" href="#" 
                  sx={{ 
                    display: 'block', 
                    mb: isMobile ? 0 : 1, 
                    color: 'text.secondary', 
                    textDecoration: 'none',
                    '&:hover': { color: brandColors.purple }
                  }}>
                  Home
                </Typography>
                <Typography variant="body2" component="a" href="#" 
                  sx={{ 
                    display: 'block', 
                    mb: isMobile ? 0 : 1, 
                    color: 'text.secondary', 
                    textDecoration: 'none',
                    '&:hover': { color: brandColors.purple }
                  }}>
                  Problem Background
                </Typography>
                <Typography variant="body2" component="a" href="#" 
                  sx={{ 
                    display: 'block', 
                    mb: isMobile ? 0 : 1, 
                    color: 'text.secondary', 
                    textDecoration: 'none',
                    '&:hover': { color: brandColors.purple }
                  }}>
                  Our Solution
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Box>
              <Typography variant={isMobile ? "subtitle1" : "subtitle1"} gutterBottom fontWeight="bold">
                Connect With Us
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                connect@privacylens.info
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {/* Social media icons would go here */}
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: isMobile ? 2 : 4, pt: isMobile ? 1 : 2, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Privacy Lens. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;