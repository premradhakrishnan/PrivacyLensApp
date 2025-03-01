// pages/HomePage.jsx
import React from 'react';
import { Box, Container } from '@mui/material';

// Import components
import HeroSection from '../components/home/HeroSection';
import WhyPrivacyMatters from '../components/home/WhyPrivacyMatters';
import StatsSection from '../components/home/StatsSection';
import HowItWorks from '../components/home/HowItWorks';
import KeyFeatures from '../components/home/KeyFeatures';
import CtaSection from '../components/home/CtaSection';
import GettingStartedSteps from '../components/home/GettingStartedSteps';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Why Privacy Matters Section */}
        <WhyPrivacyMatters />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* How Privacy Lens Works Section */}
        <HowItWorks />
        
        {/* Key Features Section */}
        <KeyFeatures />
        
        {/* Call to Action Section */}
        <CtaSection />
        
        {/* Getting Started Guide */}
        <GettingStartedSteps />
      </Box>
    </Container>
  );
};

export default HomePage;