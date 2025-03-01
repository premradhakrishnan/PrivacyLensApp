// components/home/WhyPrivacyMatters.jsx
import React from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { brandColors } from '../../utils/constants';

const WhyPrivacyMatters = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <Grid container spacing={4}>
        {/* First Column - Why Privacy Matters */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: brandColors.purple, textAlign: 'left', mt: 1 }}>
            Why Privacy Matters in Healthcare
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
            Healthcare data is among the most sensitive personal information. When this data is collected online, it's often subject to different rules than in traditional healthcare settings.
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
            Privacy Lens helps bridge this gap by analyzing how websites protect—or expose—your health information.
          </Typography>
          
          <Typography variant="h6" gutterBottom fontWeight="bold" color={brandColors.purple} sx={{ textAlign: 'left', mt: 3 }}>
            Did you know?
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'left' }}>
            Many healthcare websites share your sensitive data with third parties without clear disclosure. 
            Our analysis found that over 70% of health websites have concerning privacy practices.
          </Typography>
        </Grid>
        
        {/* Second Column - Our Mission */}
        <Grid item xs={12} md={6}>
          
          
          <Card elevation={3} sx={{ bgcolor: `${brandColors.lightGreen}15`, mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: brandColors.green, textAlign: 'left', ml: 2, mt: 1 }}>
            Our Mission
          </Typography>
            <CardContent sx={{ textAlign: 'left' }}>
              <Typography variant="body1" paragraph>
                People worldwide increasingly adopt a do-it-yourself approach to healthcare, yet lack timely, actionable privacy information when they need it most. As a result, they make uninformed decisions about which websites to trust.
              </Typography>
              <Typography variant="body1">
                Privacy Lens empowers users to make informed choices about their health data privacy, helping them avoid sites that collect and share sensitive information in ways they would have otherwise avoided had they known the risks.
              </Typography>
            </CardContent>
          </Card>
          
          {/* <Typography variant="body1" paragraph sx={{ textAlign: 'left', pl: 2, borderLeft: `3px solid ${brandColors.purple}` }}>
            <strong>Browser Plugin:</strong> We automatically detect health-related Google searches and instantly show privacy ratings for each result. Our backend analyzes website privacy policies against our comprehensive rubric and provides visual indicators of Strong, Moderate, or Weak protection.
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'left', pl: 2, borderLeft: `3px solid ${brandColors.green}` }}>
            <strong>Direct Website Analysis:</strong> Enter any healthcare website URL directly into our tool for an immediate privacy policy assessment, receiving a detailed breakdown of how your data might be collected, used, and shared.
          </Typography> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyPrivacyMatters;