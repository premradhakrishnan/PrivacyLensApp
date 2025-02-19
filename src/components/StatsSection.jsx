// components/StatsSection.jsx
import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

const StatsSection = ({ stats }) => (
  <Grid container spacing={3} sx={{ mb: 6 }}>
    {stats.map((stat, index) => (
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
);

export default StatsSection;