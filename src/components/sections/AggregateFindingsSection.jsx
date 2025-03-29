// components/sections/AggregateFindingsSection.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Slider,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { brandColors } from '../../utils/constants';
import axios from 'axios';

// Stats data for the overview section
const stats = [
  { label: 'Websites Analyzed', value: '10,000+' },
  { label: 'Active Users', value: '50,000+' },
  { label: 'Privacy Issues Identified', value: '25,000+' },
  { label: 'Average Response Time', value: '2.5s' },
];

// Helper function to create binning data for histogram-style charts
const createBins = (data, numBins) => {
  // Filter out invalid scores (e.g., null or undefined)
  const scores = data.map((item) => item.score).filter((score) => score !== null && score !== undefined);

  // If no valid scores, return an empty array
  if (scores.length === 0) {
    return [];
  }

  const min = Math.min(...scores);
  const max = Math.max(...scores);

  // Handle edge case: single score or all scores are the same
  if (min === max) {
    return [
      {
        binLabel: `${min.toFixed(2)}`, // Single bin label for the single value
        value: scores.length, // The count of occurrences for that value
      },
    ];
  }

  // Handle normal cases: multiple scores with a range
  const binSize = (max - min) / numBins;

  // Generate bins
  const binnedData = Array.from({ length: numBins }, (_, index) => {
    const binStart = min + index * binSize;
    const binEnd = binStart + binSize;
    return {
      binLabel: `${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`,
      value: scores.filter((score) => score >= binStart && score < binEnd).length,
    };
  });

  // Add values in the exact last bin (for scores equal to max)
  binnedData[binnedData.length - 1].value += scores.filter((score) => score === max).length;

  return binnedData;
};

// Reusable chart component to display histogram-style charts
const ScoreChart = ({ data, title, color }) => {
  const [numBins, setNumBins] = useState(5);

  // Filter the data to remove invalid scores
  const filteredData = data.filter((item) => item.score !== null && item.score !== undefined);

  const binnedData = createBins(filteredData, numBins);

  // If there is no data to render, show a fallback message
  if (binnedData.length === 0) {
    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h6" color="textSecondary">
            No data available to display in this chart.
          </Typography>
        </Box>
    );
  }

  return (
      <Box sx={{ mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        {/* Slider for adjusting number of bins */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Adjust Number of Bins</Typography>
          <Slider
              value={numBins}
              min={1}
              max={20}
              step={1}
              onChange={(e, newValue) => setNumBins(newValue)}
              valueLabelDisplay="auto"
          />
        </Box>

        {/* Chart Title */}
        <Typography variant="h5" align="center" gutterBottom>
          {title}
        </Typography>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={binnedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="binLabel" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value}`, 'Count']} />
            <Bar dataKey="value" fill={color} name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
  );
};

// Main component
const AggregateFindingsSection = () => {
  const [chartData, setChartData] = useState(null); // Data from the backend
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Effect to fetch chart data when the component is loaded
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        //const response = await axios.get('http://127.0.0.1:8000/getAllCharts'); // Replace with your API endpoint
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/getAllCharts`);
        if (response.data.status === 'success') {
          setChartData(response.data.data);
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        console.error('Error: ', err);
        setError('Failed to fetch chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  if (loading) {
    return <Typography>Loading chart data...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!chartData) {
    return <Typography>No chart data available.</Typography>;
  }

  return (
      <Box sx={{ p: 4 }}>
        {/* Header */}
        <Typography
            variant="h4"
            gutterBottom
            sx={{ color: brandColors.purple, fontWeight: 'bold', mb: 4 }}
        >
          Aggregate Findings
        </Typography>

        {/* Statistics Section */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1">{stat.label}</Typography>
                </Paper>
              </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Card sx={{ mb: 5, p: 3 }}>
          <CardContent>
            {/* Render the charts */}
            {['chart1', 'chart2', 'chart3', 'chart4', 'chart5', 'chart6', 'chart7'].map(
                (chartId, index) => {
                  const chartTitles = [
                      'Invasiveness Scores',
                    'Accessibility Scores',
                    'Scope Scores',
                    'Browser Storage Scores',
                    'Third Party Tracking Scores',
                    'Data Handling Scores',
                    'Health Data Privacy Scores',
                  ];
                  const chartColors = [
                    '#007bff',
                    brandColors.green,
                    '#ffc107',
                    '#dc3545',
                    '#17a2b8',
                    brandColors.purple,
                  ];

                  return (
                      <ScoreChart
                          key={chartId}
                          data={chartData[chartId]}
                          title={chartTitles[index]}
                          color={chartColors[index]}
                      />
                  );
                },
            )}

            {/* Cumulative domains chart */}
            <Box sx={{ mt: 5 }}>
              <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold', textAlign: 'center', color: brandColors.purple }}
              >
                Domains Over Time
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={chartData['chart8']}
                    margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date_added" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="cumulative_count" name="Total Domains" stroke={brandColors.purple} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
  );
};

export default AggregateFindingsSection;