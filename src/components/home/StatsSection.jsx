// components/home/StatsSection.jsx
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { statsData } from '../../utils/constants';

const StatsSection = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <SectionTitle 
        title="Making an Impact" 
      />
      
      <Grid container spacing={3}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
                padding: '10px'
              }}
            >
              <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;