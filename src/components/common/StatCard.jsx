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
import { brandColors } from '/src/utils/constants';

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
  maxScore = 68, 
  tooltipText = '', 
  loading = false,
  sx = {} 
}) => {
  // Helper to determine score color based on score value or return a default for N/A
  const getScoreColor = (score) => {
    // If score is null or undefined, return a neutral gray color
    if (score === null || score === undefined) return '#9e9e9e';
    
    // Normal score color calculation
    if (score >= maxScore * 0.83) return brandColors.green; // 25/30 or higher (83%)
    if (score >= maxScore * 0.67) return "#8cc43f"; // 20/30 or higher (67%)
    if (score >= maxScore * 0.5) return "#f3c01d"; // 15/30 or higher (50%)
    if (score >= maxScore * 0.33) return "#ff9800"; // 10/30 or higher (33%)
    return "#f44336"; // Below 10/30 (33%)
  };

  // Score rating text helper with N/A handling
  const getScoreRating = (score) => {
    // Handle null/undefined/NaN scores
    if (score === null || score === undefined || isNaN(score)) {
      return "Not Available";
    }
    
    // Normal rating logic
    if (score >= maxScore * 0.83) return "Excellent";
    if (score >= maxScore * 0.67) return "Good";
    if (score >= maxScore * 0.5) return "Adequate";
    if (score >= maxScore * 0.33) return "Concerning";
    return "Poor";
  };

  // Generate display text for the score
  const getScoreDisplay = (score, maxScore) => {
    if (score === null || score === undefined || isNaN(score)) {
      return "N/A";
    }
    return `${score}/${maxScore}`;
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderLeft: score !== null ? `4px solid ${getScoreColor(score)}` : '4px solid #9e9e9e',
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
                  color: getScoreColor(score)
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
                color: score !== null ? getScoreColor(score) : 'text.secondary',
                fontWeight: 'medium'
              }}
            >
              {getScoreRating(score)}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;