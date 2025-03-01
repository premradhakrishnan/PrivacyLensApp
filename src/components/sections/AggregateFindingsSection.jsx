// components/sections/AggregateFindingsSection.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Slider,
  Paper
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { brandColors } from '../../utils/constants';

// Sample chart data
const chartData = {
  chart1: Array.from({ length: 100 }, (_, i) => ({ score: Math.random() * 30 })),
  chart2: Array.from({ length: 100 }, (_, i) => ({ score: Math.random() * 10 })),
  chart3: Array.from({ length: 100 }, (_, i) => ({ score: Math.random() * 8 })),
  chart4: Array.from({ length: 100 }, (_, i) => ({ score: Math.random() * 8 })),
  chart5: Array.from({ length: 100 }, (_, i) => ({ score: Math.random() * 5 })),
  chart6: Array.from({ length: 100 }, (_, i) => ({ score: Math.random() * 5 })),
  chart7: [
    { date_added: '2023-01-01', cumulative_count: 105 },
    { date_added: '2023-02-01', cumulative_count: 220 },
    { date_added: '2023-03-01', cumulative_count: 356 },
    { date_added: '2023-04-01', cumulative_count: 421 },
    { date_added: '2023-05-01', cumulative_count: 508 },
    { date_added: '2023-06-01', cumulative_count: 612 },
    { date_added: '2023-07-01', cumulative_count: 701 }
  ],
  // For pie chart if needed
  policyTypesData: [
    { name: 'Comprehensive', value: 235 },
    { name: 'Basic', value: 312 },
    { name: 'Minimal', value: 178 },
    { name: 'None', value: 55 }
  ]
};

// Stats data
const stats = [
  { label: "Websites Analyzed", value: "10,000+" },
  { label: "Active Users", value: "50,000+" },
  { label: "Privacy Issues Identified", value: "25,000+" },
  { label: "Average Response Time", value: "2.5s" }
];

const createBins = (data, numBins) => {
  const scores = data.map((item) => item.score); // Extract all scores
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const binSize = (max - min) / numBins;
  
  // Generate bins and count occurrences within each bin
  const binnedData = Array.from({ length: numBins }, (_, index) => {
    const binStart = min + index * binSize;
    const binEnd = binStart + binSize;
    return {
      binLabel: `${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`, // Label for the bin
      value: scores.filter((score) => score >= binStart && score < binEnd).length,
    };
  });
  return binnedData;
};

// A reusable score chart component with binning functionality
const ScoreChart = ({ data, title, color }) => {
  const [numBins, setNumBins] = useState(5); // Default number of bins
  
  // Recalculate binned data when numBins changes
  const binnedData = createBins(data, numBins);
  
  return (
    <Box
      style={{
        marginBottom: '60px', // Ensure enough space below each ScoreChart
        padding: '24px', // Consistent padding inside the component
        border: '1px solid #e0e0e0', // Optional border for better clarity
        borderRadius: '8px', // Rounded corners
      }}
    >
      {/* Slider Section */}
      <Box
        style={{
          paddingBottom: '20px', // Add space between slider and chart
          marginBottom: '20px', // Ensure spacing between slider and chart logic
          borderBottom: '1px solid #ddd', // Optional visual separation
        }}
      >
        <Typography variant="h6" gutterBottom>
          Adjust Number of Bins
        </Typography>
        <Slider
          value={numBins}
          min={1}
          max={20}
          step={1}
          onChange={(e, newValue) => setNumBins(newValue)}
          valueLabelDisplay="auto"
          style={{
            width: '90%', // Center alignment and constraint to prevent overflow
            margin: '0 auto', // Center horizontally
          }}
        />
      </Box>
      
      {/* Chart Section */}
      <Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          style={{ marginBottom: '16px' }}
        >
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={binnedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="binLabel" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

const AggregateFindingsSection = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: brandColors.purple, fontWeight: 'bold', my: 4 }}>
        Aggregate Findings
      </Typography>
      
      <Card elevation={3} sx={{ mb: 5, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: brandColors.purple, mb: 3, fontWeight: 'bold' }}>
            Overview of Privacy Scores
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Our analysis of privacy policies across healthcare websites reveals important trends in how user data is handled. 
            Below are the key findings from our assessment of over 10,000 websites.
          </Typography>
          
          {/* Statistics overview section */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' },
                    padding: '10px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                >
                  <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <div className="page-container"
               style={{
                 width: '100%',
                 minWidth: '100%',
                 maxWidth: '1200px',
                 margin: '0 auto',
                 padding: '20px',
               }}
          >
            {/* Render charts 1 through 6 */}
            {['chart1', 'chart2', 'chart3', 'chart4', 'chart5', 'chart6'].map((chartId, index) => {
              // Define specific titles for each chart
              const chartTitles = [
                'Distribution of Invasiveness Scores',
                'Distribution of Scope Scores',
                'Distribution of Storage Scores',
                'Distribution of Tracking Scores',
                'Distribution of Handling Scores',
                'Distribution of Access Scores',
              ];

              // Define specific colors for each chart
              const chartColors = [
                '#007bff', // Blue for chart 1
                brandColors.green, // Green for chart 2
                '#ffc107', // Yellow for chart 3
                '#dc3545', // Red for chart 4
                '#17a2b8', // Teal for chart 5
                brandColors.purple, // Purple for chart 6
              ];

              return (
                <div
                  key={chartId}
                  style={{
                    marginBottom: '50px',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  <ScoreChart
                    data={chartData[chartId]}
                    title={chartTitles[index]}
                    color={chartColors[index]}
                  />
                </div>
              );
            })}

            {/* Render cumulative chart for domains */}
            <div
              style={{
                marginTop: '50px',
                padding: '30px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: brandColors.purple }}>
                Distribution of Cumulative Domains
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={chartData['chart7']}
                  margin={{ top: 20, right: 30, left: 50, bottom: 100 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date_added"
                    label={{ value: 'Date Added', position: 'bottom', offset: 50 }}
                    angle={-45}
                    textAnchor="end"
                    dy={0}
                    tickFormatter={(value) => value.substring(0, 10)}
                  />
                  <YAxis
                    label={{
                      value: 'Cumulative Count',
                      angle: -90,
                      position: 'left',
                      offset: 0,
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="cumulative_count"
                    stroke={brandColors.purple}
                    activeDot={{ r: 8 }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card elevation={3} sx={{ mb: 5, p: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: brandColors.purple, mb: 3, fontWeight: 'bold' }}>
            Key Takeaways
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                <strong>Data Collection Practices:</strong> Our analysis reveals that a majority of healthcare websites collect extensive personal information. 
                Over 60% fall into the medium to high invasiveness category, indicating significant data collection beyond what's necessary for basic service.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Third-Party Sharing:</strong> Approximately 65% of sites share data with third parties for purposes beyond basic functionality,
                potentially compromising sensitive health information without clear user consent.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                <strong>Data Retention:</strong> Most websites (58%) store user data for extended periods without clear justification or deletion policies.
                Only 23% of sites provide clear retention timelines or data deletion options.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>User Rights:</strong> While GDPR and CCPA have improved the landscape, 45% of healthcare websites still provide limited 
                or difficult-to-access options for users to control their personal data.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AggregateFindingsSection;