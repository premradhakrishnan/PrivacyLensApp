// components/HeroSection.jsx
import React from 'react';
import { Card, CardContent, Grid, Typography, Button, Box } from '@mui/material';
import { Search as SearchIcon, Security } from '@mui/icons-material';

const HeroSection = () => (
  <Card
    sx={{
      mb: 6,
      bgcolor: 'primary.main',
      color: 'white',
      backgroundImage: 'linear-gradient(135deg, #4282AA 0%, #55A3D4 100%)'
    }}
  >
    <CardContent sx={{ py: 8 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Understand Privacy Policies at a Glance
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Make informed decisions about your health data privacy with our AI-powered analysis tool
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' }
            }}
            startIcon={<SearchIcon />}
          >
            Analyze a Website
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box sx={{ textAlign: 'center' }}>
            <Security sx={{ fontSize: 200, opacity: 0.9 }} />
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default HeroSection;