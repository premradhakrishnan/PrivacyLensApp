// components/FeaturesSection.jsx
import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

const FeaturesSection = ({ features }) => (
  <>
    <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
      Key Features
    </Typography>
    <Grid container spacing={4} sx={{ mb: 8 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}
          >
            <Box sx={{ mb: 2, p: 2, borderRadius: '50%', bgcolor: 'primary.light', opacity: 0.1 }}>
              {feature.icon}
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {feature.title}
            </Typography>
            <Typography color="text.secondary">{feature.description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </>
);

export default FeaturesSection;