// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DetailedResults from './components/DetailedResults';
import PrivacyDashboard from './PrivacyDashboard';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CustomPage from './pages/CustomPage'; // Import the CustomPage component

// Import the theme
import theme from './theme';
import './App.css';

// Main content component
const MainContent = ({ activeTab }) => {
  // This component renders content based on activeTab
  switch (activeTab) {
    case 0:
      return <HomePage />;
    case 1: // Problem Background
      return <PrivacyDashboard tabValue={1} />;
    case 2: // Our Solution
      return <PrivacyDashboard tabValue={2} />;
    case 3: // Search
      return <PrivacyDashboard tabValue={3} />;
    case 4: // Aggregate Findings
      return <PrivacyDashboard tabValue={4} />;
    case 5: // Custom Findings Tab
      return <CustomPage tabValue={5}/>; // Render the CustomPage component for /findings
    default:
      return <HomePage />;
  }
};

// Routes wrapper component
const AppRoutes = () => {
  // Get current location
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on pathname
  const getTabFromPath = (pathname) => {
    switch (pathname) {
      case '/':
        return 0;
      case '/problem-background':
        return 1;
      case '/solution':
        return 2;
      case '/search':
        return 3;
      case '/aggregate-findings':
        return 4;
      case '/findings': // Add custom findings tab
        return 5;
      default:
        return 0;
    }
  };

  // Initialize active tab based on current path
  const [activeTab, setActiveTab] = useState(getTabFromPath(location.pathname));

  // Handle tab changes
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    // Navigate to appropriate route
    switch (newTab) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/problem-background');
        break;
      case 2:
        navigate('/solution');
        break;
      case 3:
        navigate('/search');
        break;
      case 4:
        navigate('/aggregate-findings');
        break;
      case 5:
        navigate('/findings');
        break;
      default:
        navigate('/');
    }
  };

  return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Header activeTab={activeTab} setActiveTab={handleTabChange} />

        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<MainContent activeTab={0} />} />
            <Route path="/problem-background" element={<MainContent activeTab={1} />} />
            <Route path="/solution" element={<MainContent activeTab={2} />} />
            <Route path="/search" element={<MainContent activeTab={3} />} />
            <Route path="/aggregate-findings" element={<MainContent activeTab={4} />} />
            <Route path="/findings" element={<MainContent activeTab={5} />} /> {/* Add new route */}
            <Route path="/detailed-results" element={<DetailedResults />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
  );
};

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
  );
};

export default App;
