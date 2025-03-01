// components/home/KeyFeatures.jsx
import React from 'react';
import { Box, Grid } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from '../common/FeatureCard';
import { featuresData } from '../../utils/constants';

const KeyFeatures = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <SectionTitle title="Key Features" />
      <Grid container spacing={4}>
        {featuresData.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FeatureCard feature={feature} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KeyFeatures;