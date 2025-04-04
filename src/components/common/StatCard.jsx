import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Tooltip,
  CircularProgress
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { brandColors, scoreRatings, MAX_SCORE } from '/src/utils/constants';
import { getScoreColor, getScoreRating } from '/src/utils/resultsUtils';

/**
 * StatCard component for displaying score statistics with proper handling of missing data
 * 
 * @param {Object} props Component props
 * @param {string} props.title The title of the stat card
 * @param {number|null} props.score The numerical score to display (null if not available)
 * @param {number} props.maxScore The maximum possible score
 * @param {string} props.tooltipText Additional information shown on tooltip hover
 * @param {boolean} props.loading Whether the data is still loading
 * @param {Object} props.sx Additional styling props
 */
const StatCard = ({ 
  title, 
  score, 
  maxScore = MAX_SCORE, 
  tooltipText = '', 
  loading = false,
  sx = {} 
}) => {
  // Generate display text for the score
  const getScoreDisplay = (score, maxScore) => {
    if (score === null || score === undefined || isNaN(score)) {
      return "N/A";
    }
    return `${score}/${maxScore}`;
  };

  // Get the color and rating from our utility functions
  const scoreColor = getScoreColor(score);
  const rating = getScoreRating(score);

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderLeft: `4px solid ${scoreColor}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        },
        ...sx
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ textAlign: 'left', mb: 1 }}>
          {title}
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  color: scoreColor
                }}
              >
                {getScoreDisplay(score, maxScore)}
              </Typography>
              
              {tooltipText && (
                <Tooltip title={tooltipText}>
                  <InfoOutlined sx={{ ml: 1, fontSize: 20, color: 'text.secondary' }} />
                </Tooltip>
              )}
            </Box>
            
            <Typography 
              variant="body1" 
              align="center" 
              sx={{ 
                mt: 1,
                color: score !== null ? scoreColor : 'text.secondary',
                fontWeight: 'medium'
              }}
            >
              {rating}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;