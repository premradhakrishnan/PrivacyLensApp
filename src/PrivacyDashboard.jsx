// PrivacyDashboard.jsx - Improved with modular structure
import React, {useRef, useState} from 'react';
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

const PrivacyDashboard = ({ tabValue = 0 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Sample search results for demonstration
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);


  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      // Send POST request
      //const postResponse = await fetch('http://127.0.0.1:8000/searchresults', {
      const postResponse = await fetch(`${import.meta.env.VITE_API_URL}/searchresults`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ searchQuery }), // Ensure searchQuery is being passed correctly
        });

        // Check for response success
        if (!postResponse.ok) {
        throw new Error(`POST request failed with status: ${postResponse.status}`);
      }

      // Parse JSON data from response
      const responseData = await postResponse.json();

      // Log the response to see its structure
      console.log("Received Response:", responseData);

      // Example of storing the "data" object in a React state (if using React)
      setSearchResults(responseData.data); // Assuming setSearchResults is a state updater function
      console.log("Search Results:", searchResults);

    } catch (error) {
        console.error("Error while making the POST request:", error);
      } finally {
        setIsLoading(false);
      }
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