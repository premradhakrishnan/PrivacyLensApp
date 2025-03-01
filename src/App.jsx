// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PrivacyDashboard from "./PrivacyDashboard";
import DetailedResults from "./components/DetailedResults";
import theme from './theme'; // Import the theme we created
import './App.css';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<PrivacyDashboard />} />
                    <Route path="/detailed-results" element={<DetailedResults />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;