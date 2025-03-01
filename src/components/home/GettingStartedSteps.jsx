// components/home/GettingStartedSteps.jsx
import React from 'react';
import { Box, Grid, Card, Typography, Button } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { gettingStartedSteps } from '../../utils/constants';
import { brandColors } from '../../utils/constants';

const GettingStartedSteps = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <SectionTitle 
        title="Getting Started is Easy"
      />
      
      <Grid container spacing={4}>
        {gettingStartedSteps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                p: 4,
                height: '100%',
                bgcolor: '#EFFAD9',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}
            >
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: brandColors.purple,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  fontSize: 24,
                  fontWeight: 'bold'
                }}
              >
                {step.number}
              </Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {step.title}
              </Typography>
              <Typography>
                {step.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 50,
            textTransform: 'none',
            fontSize: '1.1rem',
            bgcolor: brandColors.purple
          }}
        >
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
};

export default GettingStartedSteps;