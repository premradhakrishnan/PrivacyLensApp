// components/home/HowItWorks.jsx
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { brandColors } from '../../utils/constants';

const steps = [
  { 
    number: 1, 
    title: "Enter a Healthcare Website", 
    description: "Simply provide the URL of any healthcare website you want to analyze",
    color: brandColors.purple
  },
  { 
    number: 2, 
    title: "AI-Powered Analysis", 
    description: "Our algorithms scan the privacy policy and evaluate it against our comprehensive rubric",
    color: brandColors.green
  },
  { 
    number: 3, 
    title: "Get Detailed Results", 
    description: "Receive a clear breakdown of how the website handles your data across multiple categories",
    color: brandColors.purple
  },
  { 
    number: 4, 
    title: "Make Informed Decisions", 
    description: "Use our insights to decide which healthcare services best protect your privacy",
    color: brandColors.green
  }
];

const HowItWorks = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <SectionTitle title="How Privacy Lens Works" />
      
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img 
            src="/api/placeholder/500/350" 
            alt="How Privacy Lens Works" 
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            {steps.map((step, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  mb: 3
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: step.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                    fontSize: 18,
                    fontWeight: 'bold'
                  }}
                >
                  {step.number}
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: step.color }}>
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;