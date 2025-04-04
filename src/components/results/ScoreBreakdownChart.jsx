// components/results/ScoreBreakdownChart.jsx
import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Tooltip, Paper } from '@mui/material';
import { textStyles } from '../../utils/textStyles';
import { getScoreLevelInfo, groupScoresBySection, calculateSectionScore } from '../../utils/resultsUtils';
import { ENUMERATION_TO_SECTION } from '../../utils/constants';

/**
 * Chart component that displays the breakdown of scores by level (0-2)
 * @param {Object} props
 * @param {Array} props.scores - Array of assessment scores
 * @param {boolean} props.showSections - Whether to show section breakdown
 */
const ScoreBreakdownChart = ({ scores = [], showSections = false }) => {
  // Count scores by level (0, 1, 2)
  const scoreCounts = {
    0: scores.filter(item => parseInt(item.score) === 0).length,
    1: scores.filter(item => parseInt(item.score) === 1).length,
    2: scores.filter(item => parseInt(item.score) === 2).length
  };
  
  // Get score level info for each level
  const scoreLevelInfo = {
    0: getScoreLevelInfo(0),
    1: getScoreLevelInfo(1),
    2: getScoreLevelInfo(2)
  };
  
  // Group scores by section if needed
  const groupedScores = showSections ? groupScoresBySection(scores) : {};
  
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={textStyles.headingLeft}>
          Score Breakdown
        </Typography>
        
        {/* Overall Score Distribution */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {[2, 1, 0].map(level => (
            <Grid item xs={4} key={level}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center'
                }}
              >
                <Box 
                  sx={{ 
                    height: '120px', 
                    width: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: `${scoreLevelInfo[level].color}20`,
                    border: `3px solid ${scoreLevelInfo[level].color}`,
                    mb: 1
                  }}
                >
                  <Typography variant="h3" sx={{ color: scoreLevelInfo[level].color, fontWeight: 'bold' }}>
                    {scoreCounts[level]}
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight="bold">
                  {scoreLevelInfo[level].label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {scores.length > 0 ? Math.round((scoreCounts[level] / scores.length) * 100) : 0}% of criteria
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        
        {/* Section Breakdown */}
        {showSections && Object.keys(groupedScores).length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Category Breakdown
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(groupedScores).map(([section, items]) => {
                if (items.length === 0) return null;
                
                const { score, maxPossible, percentage } = calculateSectionScore(items);
                
                // Calculate score breakdown for this section
                const sectionBreakdown = {
                  0: items.filter(item => parseInt(item.score) === 0).length,
                  1: items.filter(item => parseInt(item.score) === 1).length,
                  2: items.filter(item => parseInt(item.score) === 2).length
                };
                
                return (
                  <Grid item xs={12} md={6} key={section}>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {section}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Score: {score}/{maxPossible} ({Math.round(percentage)}%)
                      </Typography>
                      
                      <Box sx={{ display: 'flex', mt: 2 }}>
                        {[2, 1, 0].map(level => {
                          const width = (sectionBreakdown[level] / items.length) * 100;
                          if (width === 0) return null;
                          
                          return (
                            <Tooltip 
                              key={level} 
                              title={`${scoreLevelInfo[level].label}: ${sectionBreakdown[level]} (${Math.round(width)}%)`}
                            >
                              <Box 
                                sx={{ 
                                  width: `${width}%`, 
                                  height: '20px',
                                  bgcolor: scoreLevelInfo[level].color,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                {width > 15 && (
                                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                    {sectionBreakdown[level]}
                                  </Typography>
                                )}
                              </Box>
                            </Tooltip>
                          );
                        })}
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoreBreakdownChart;