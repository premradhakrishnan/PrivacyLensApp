// components/results/ScoreDistributionChart.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Tooltip } from '@mui/material';
import { textStyles } from '../../utils/textStyles';
import { brandColors, scoreRatings, MAX_SCORE } from '../../utils/constants';

/**
 * Chart component that displays distribution of scores
 * @param {Object} props
 * @param {Array} props.sites - List of site data objects
 */
const ScoreDistributionChart = ({ sites }) => {
  const ranges = [
    { 
      label: `${scoreRatings.WEAK.label} (0-${scoreRatings.MODERATE.threshold - 1})`, 
      count: 0, 
      color: scoreRatings.WEAK.color,
      min: 0,
      max: scoreRatings.MODERATE.threshold - 1
    },
    { 
      label: `${scoreRatings.MODERATE.label} (${scoreRatings.MODERATE.threshold}-${scoreRatings.STRONG.threshold - 1})`, 
      count: 0, 
      color: scoreRatings.MODERATE.color,
      min: scoreRatings.MODERATE.threshold,
      max: scoreRatings.STRONG.threshold - 1
    },
    { 
      label: `${scoreRatings.STRONG.label} (${scoreRatings.STRONG.threshold}-${MAX_SCORE})`, 
      count: 0, 
      color: scoreRatings.STRONG.color,
      min: scoreRatings.STRONG.threshold,
      max: MAX_SCORE
    },
    { 
      label: "Not Available", 
      count: 0, 
      color: "#9e9e9e",
      min: null,
      max: null
    }
  ];
  
  // Count sites in each range
  sites.forEach(site => {
    const score = site.finalScore;
    
    // Check if score is available
    if (score === null || score === undefined || isNaN(score)) {
      ranges[3].count++; // Count in Not Available category
    } else if (score >= scoreRatings.STRONG.threshold) {
      ranges[2].count++;
    } else if (score >= scoreRatings.MODERATE.threshold) {
      ranges[1].count++;
    } else {
      ranges[0].count++;
    } 
  });
  
  // Calculate the percentage for each range
  const totalSites = sites.length;
  ranges.forEach(range => {
    range.percentage = totalSites > 0 ? Math.round((range.count / totalSites) * 100) : 0;
  });
  
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={textStyles.headingLeft}>
          Privacy Score Distribution
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', mt: 2, height: '200px' }}>
          {ranges.map((range, index) => (
            <Tooltip 
              key={index} 
              title={`${range.label}: ${range.count} sites (${range.percentage}%)`}
              placement="top"
            >
              <Box 
                sx={{ 
                  flex: 1, 
                  mx: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '100%'
                }}
              >
                <Box 
                  sx={{ 
                    width: '100%',
                    minHeight: '30px',
                    height: `${Math.max(5, range.percentage)}%`, 
                    backgroundColor: range.color,
                    borderRadius: '4px 4px 0 0',
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'height 0.5s ease'
                  }} 
                >
                  {range.count > 0 && (
                    <Typography variant="body2" fontWeight="bold" color="white">
                      {range.count}
                    </Typography>
                  )}
                </Box>
                <Typography variant="body2" fontWeight="bold">
                  {range.percentage}%
                </Typography>
                <Typography variant="caption" display="block" noWrap sx={{ textAlign: 'center' }}>
                  {range.label}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ScoreDistributionChart;