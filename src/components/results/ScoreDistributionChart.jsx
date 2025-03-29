// components/results/ScoreDistributionChart.jsx
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { textStyles } from '../../utils/textStyles';
import { brandColors } from '../../utils/constants';

/**
 * Chart component that displays distribution of scores
 * @param {Object} props
 * @param {Array} props.sites - List of site data objects
 */
const ScoreDistributionChart = ({ sites }) => {
  const ranges = [
    // { label: "Poor (0-9)", count: 0, color: "#f44336" },
    // { label: "Concerning (10-14)", count: 0, color: "#ff9800" },
    { label: "Weak (0-19)", count: 0, color: "#f3c01d" },
    { label: "Moderate (20-49)", count: 0, color: "#8cc43f" },
    { label: "Strong (68-50)", count: 0, color: brandColors.green },
    { label: "Not Available", count: 0, color: "#9e9e9e" } // Added category for N/A scores
  ];
  
  // Count sites in each range
  sites.forEach(site => {
    const score = site.finalScore;
    
    // Check if score is available
    if (score === null || score === undefined || isNaN(score)) {
      ranges[5].count++; // Count in Not Available category
    } else if (score >= 25) {
      ranges[4].count++;
    } else if (score >= 20) {
      ranges[3].count++;
    } else if (score >= 15) {
      ranges[2].count++;
    } else if (score >= 10) {
      ranges[1].count++;
    } else {
      ranges[0].count++;
    }
  });
  
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={textStyles.headingLeft}>
          Privacy Score Distribution
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {ranges.map((range, index) => (
            <Box key={index} sx={{ flex: 1, textAlign: 'center', px: 1 }}>
              <Box 
                sx={{ 
                  height: `${Math.max(30, range.count * 20)}px`, 
                  backgroundColor: range.color,
                  borderRadius: '4px 4px 0 0',
                  mb: 1,
                  minWidth: '30px',
                  mx: 'auto'
                }} 
              />
              <Typography variant="body2" fontWeight="bold">
                {range.count}
              </Typography>
              <Typography variant="caption" display="block">
                {range.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ScoreDistributionChart;