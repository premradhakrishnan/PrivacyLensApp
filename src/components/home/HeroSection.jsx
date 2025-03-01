// components/home/HeroSection.jsx
import React from 'react';
import { Card, CardContent, Grid, Typography, Button, Box } from '@mui/material';
import { Security, Search, OpenInNew } from '@mui/icons-material';

const HeroSection = () => {
  return (
    <Card 
      sx={{
        mb: 6,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}
    >
      <CardContent sx={{ 
        py: 8, 
        backgroundImage: 'linear-gradient(135deg, #6140AC 0%, rgb(151, 133, 191) 100%)',
        color: 'white',
        position: 'relative',
        zIndex: 1
      }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Protect Your Health Data Privacy
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Know which websites respect your privacy with our browser plugin and analysis tool
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Search />}
                sx={{
                  bgcolor: 'white',
                  color: '#6140AC',
                  '&:hover': { bgcolor: 'grey.100' },
                  px: 4,
                  py: 1.5
                }}
              >
                Analyze a Website
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<OpenInNew />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  px: 4,
                  py: 1.5
                }}
              >
                Get Browser Plugin
              </Button>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Automatically see privacy ratings in Google search results or analyze any healthcare website directly
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
            <Security sx={{ fontSize: { xs: 150, md: 200 }, opacity: 0.9 }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HeroSection;