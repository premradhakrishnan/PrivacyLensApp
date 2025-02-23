// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivacyDashboard from "./PrivacyDashboard";
import DetailedResults from "./components/DetailedResults";
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivacyDashboard />} />
                <Route path="/detailed-results" element={<DetailedResults />} />
            </Routes>
        </Router>
    );
};

export default App;