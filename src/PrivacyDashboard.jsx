// PrivacyDashboard.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { brandColors } from './utils/constants';

// Import section components
import ProblemBackgroundSection from './components/sections/ProblemBackgroundSection';
import OurSolutionSection from './components/sections/OurSolutionSection';
import SearchSection from './components/SearchSection';
import AggregateFindingsSection from './components/sections/AggregateFindingsSection';
import CustomPage from './pages/CustomPage';

const PrivacyDashboard = ({ tabValue = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const handleSearch = async (event = null, predefinedQuery = null) => {
    if (event) event.preventDefault();

    setIsLoading(true);
    setError(false);

    try {
      const query = predefinedQuery || searchQuery;

      if (!query) {
        throw new Error("Search query cannot be empty");
      }

      if (!predefinedQuery) {
        setSearchResults([]);
      }

      const postResponse = await fetch('http://127.0.0.1:8000/searchresults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery: query }),
      });

      if (!postResponse.ok) {
        throw new Error(`POST request failed with status: ${postResponse.status}`);
      }

      const responseData = await postResponse.json();

      setSearchResults((prevResults) => {
        const newResults = responseData.data.filter(
            (newResult) => !prevResults.some((prevResult) => prevResult.domain === newResult.domain)
        );
        return [...prevResults, ...newResults];
      });

    } catch (error) {
      console.error("Error during search:", error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (tabValue) {
      case 0:
        return null;
      case 1:
        return <ProblemBackgroundSection />;
      case 2:
        return <OurSolutionSection />;
      case 3:
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
      case 4:
        return <AggregateFindingsSection />;
      case 5:
        return <CustomPage />;
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

// CustomPage.jsx (create this in your components folder)

