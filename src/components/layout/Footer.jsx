// components/layout/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { brandColors } from '../../utils/constants';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: '#f5f5f5', 
        py: 4, 
        borderTop: '1px solid #e0e0e0',
        mt: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold" color={brandColors.purple}>
              Privacy Lens
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Making healthcare privacy policies transparent and understandable.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Typography variant="body2" component="a" href="#" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
              Home
            </Typography>
            <Typography variant="body2" component="a" href="#" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
              Problem Background
            </Typography>
            <Typography variant="body2" component="a" href="#" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
              Our Solution
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Connect With Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              connect@privacylens.info
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              {/* Social media icons would go here */}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Privacy Lens. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;