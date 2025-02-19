import React from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  InputAdornment, 
  Card, 
  CardHeader, 
  CardContent, 
  Typography, 
  Alert 
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Link } from 'react-router-dom';

const SearchSection = ({ 
  searchQuery, 
  setSearchQuery, 
  handleSearch, 
  error, 
  searchResults, 
  isLoading,
  historicalData 
}) => (
  <Box sx={{ space: 'y-6' }}>
    <Box component="form" onSubmit={handleSearch} sx={{ mb: 6 }}>
      <TextField
        fullWidth
        placeholder="Search for analyzed websites..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button type="submit" variant="contained" startIcon={<Search />}>
                Search
              </Button>
            </InputAdornment>
          ),
        }}
      />
      {error && <Alert severity="error">Website not found or incorrect input</Alert>}
    </Box>
    


    <Card>
      <CardHeader title="Privacy Policy Analysis Results" />
      <CardContent>
        <Box sx={{ mt: 4 }}>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Typography key={index} variant="body1">
                {result?.domain_name || "No domain name available"}
              </Typography>
            ))
          ) : (
            !isLoading && (
              <Typography variant="body2" color="textSecondary">
                No results to display. Click "Search" to fetch data.
              </Typography>
            )
          )}
        </Box>
      </CardContent>
    </Card>

    <Button
    component={Link}
    to="/detailed-results"
    variant="contained"
    color="secondary"
    sx={{ mt: 2 }}
  >
    View Detailed Results
  </Button>

    {/* Historical Performance Chart */}
    <Card sx={{ mt: 4 }}>
      <CardHeader title="Historical Performance by Section" />
      <CardContent>
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" angle={-45} textAnchor="end" height={100} />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="average" fill="#4282AA" name="Average Score" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  </Box>
);

export default SearchSection;