// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Import components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DetailedResults from './components/DetailedResults';

// Import your existing components
import SearchSection from './components/SearchSection';
import PrivacyDashboard from './PrivacyDashboard'; // For the existing Problem Background, Our Solution, and Aggregate Findings

// Import the theme
import theme from './theme';
import './App.css';

const App = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState(0);

  // Content to display based on active tab
  const getContent = () => {
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
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh'
        }}>
          <Header activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <Box sx={{ flex: 1 }}>
            {/* Main content area */}
            <Routes>
              <Route path="/" element={getContent()} />
              <Route path="/detailed-results" element={<DetailedResults />} />
            </Routes>
          </Box>
          
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;