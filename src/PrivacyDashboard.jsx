// PrivacyDashboard.jsx - Improved with modular structure
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useMediaQuery,
  useTheme,
  Link
} from '@mui/material';
import {
  Security,
  Visibility,
  TrendingUp,
  Assignment
} from '@mui/icons-material';

// Import components
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import { brandColors } from './utils/constants';

// Import section components
import ProblemBackgroundSection from './components/sections/ProblemBackgroundSection';
import OurSolutionSection from './components/sections/OurSolutionSection';
import SearchSection from './components/SearchSection';
import AggregateFindingsSection from './components/sections/AggregateFindingsSection';

const PrivacyDashboard = ({ tabValue = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Features data
  const features = [
    {
      title: "Privacy Policy Analysis",
      description: "Instant analysis of health related website privacy policies in our plugin or website.",
      icon: <Assignment sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Our Grading",
      description: "To analyze privacy policies, we use a comprehensive rubric developed by the PrivacyLens team.",
      icon: <Visibility sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Search Functionality",
      description: "Search functionality allows you to find desired websites to analyze privacy policies.",
      icon: <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Aggregate Findings",
      description: "On the aggregate findings page, you can see aggregated findings from all websites analyzed by PrivacyLens.",
      icon: <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    }
  ];

  // Stats data
  const stats = [
    { label: "Websites Analyzed", value: "10,000+" },
    { label: "Active Users", value: "50,000+" },
    { label: "Privacy Issues Identified", value: "25,000+" },
    { label: "Average Response Time", value: "2.5s" }
  ];

  // Sample search results for demonstration
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSearchTriggered(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchQuery.trim() !== '') {
        // Sample data
        setSearchResults([
          {
            domain: "healthexample.com",
            PrivacyLensAssessmentSummary: "This site has moderate privacy protections with some concerning practices around third-party data sharing.",
            privacyPolicyURL: "https://healthexample.com/privacy",
            finalScore: 18,
            sectionScores: {
              "Policy Accessibility": 85,
              "Data Collection": 70,
              "Third-Party Sharing": 55,
              "User Control": 65,
              "Data Security": 75
            }
          },
          {
            domain: "medicalinfo.org",
            PrivacyLensAssessmentSummary: "Strong privacy protections with clear opt-out mechanisms and minimal data collection.",
            privacyPolicyURL: "https://medicalinfo.org/privacy",
            finalScore: 26,
            sectionScores: {
              "Policy Accessibility": 90,
              "Data Collection": 85,
              "Third-Party Sharing": 80,
              "User Control": 85,
              "Data Security": 90
            }
          }
        ]);
        setError('');
      } else {
        setSearchResults([]);
        setError('Please enter a valid website URL');
      }
      setIsLoading(false);
    }, 1000);
  };

  // Render different content based on tabValue
  const renderContent = () => {
    switch (tabValue) {
      case 0: // Home is now handled by HomePage component
        return null;
      case 1: // Problem Background
        return <ProblemBackgroundSection />;
      case 2: // Our Solution
        return <OurSolutionSection />;
      case 3: // Search
        return (
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: brandColors.purple, fontWeight: 'bold', my: 4 }}>
              Search Privacy Policies
            </Typography>
            
            <SearchSection 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              error={error}
              searchResults={searchResults}
              isLoading={isLoading}
              isSearchTriggered={isSearchTriggered}
            />
          </Box>
        );
      case 4: // Aggregate Findings
        return <AggregateFindingsSection />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {renderContent()}
    </Container>
  );
};

export default PrivacyDashboard;