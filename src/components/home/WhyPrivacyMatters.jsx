// components/home/WhyPrivacyMatters.jsx
import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { brandColors } from '../../utils/constants';

const WhyPrivacyMatters = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <SectionTitle 
        title="Why Privacy Matters in Healthcare" 
      />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" paragraph>
            Healthcare data is among the most sensitive personal information. When this data is collected online, it's often subject to different rules than in traditional healthcare settings.
          </Typography>
          <Typography variant="body1" paragraph>
            Privacy Lens helps bridge this gap by analyzing how websites protect—or expose—your health information.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: '100%', bgcolor: `${brandColors.lightGreen}20` }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold" color={brandColors.purple}>
                Did you know?
              </Typography>
              <Typography variant="body2">
                Many healthcare websites share your sensitive data with third parties without clear disclosure. 
                Our analysis found that over 70% of health websites have concerning privacy practices.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyPrivacyMatters;