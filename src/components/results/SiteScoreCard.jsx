// components/results/SiteScoreCard.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Divider, 
  Tooltip,
  LinearProgress
} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

import { textStyles } from '../../utils/textStyles';
import { 
  getScoreColor, 
  getScoreRating, 
  getScoreDisplay,
  groupScoresBySection 
} from '../../utils/resultsUtils';
import { brandColors } from '../../utils/constants';

/**
 * Card component that displays site score and details
 * @param {Object} props
 * @param {Object} props.site - Site data object
 * @param {Function} props.onSelectSite - Callback when site is selected
 * @param {boolean} props.isExpanded - Whether card is expanded
 */
const SiteScoreCard = ({ site, onSelectSite, isExpanded }) => {
  const finalScore = site.finalScore !== undefined ? site.finalScore : null;
  const scoreColor = getScoreColor(finalScore);
  const scoreRating = getScoreRating(finalScore);
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: `4px solid ${scoreColor}`,
        transition: 'all 0.3s ease',
        boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" sx={textStyles.headingLeft}>
              {site.domain}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyzed: {new Date(site.dateCaptured).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
              <Typography variant="h5" sx={{ color: scoreColor, fontWeight: 'bold', mr: 1 }}>
                {getScoreDisplay(finalScore)}
              </Typography>
              <Tooltip title={`Score Rating: ${scoreRating}`}>
                <InfoOutlined fontSize="small" />
              </Tooltip>
            </Box>
            <Typography variant="body2">{scoreRating}</Typography>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: 'right' }}>
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => onSelectSite(site)}
              size="small"
            >
              {isExpanded ? "Collapse" : "View Details"}
            </Button>
          </Grid>
        </Grid>
        
        {isExpanded && (
          <Box mt={2}>
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" sx={textStyles.headingLeft}>
              Summary
            </Typography>
            {site.assessment?.PrivacyLensAssessmentSummary ? (
              <>
                <Typography variant="body2" paragraph sx={textStyles.bodyLeft}>
                  {site.assessment.PrivacyLensAssessmentSummary.overview}
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={textStyles.headingLeft}>
                      Positives
                    </Typography>
                    <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                      {site.assessment.PrivacyLensAssessmentSummary.positives.map((item, index) => (
                        <li key={index}>
                          <Typography variant="body2">{item}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={textStyles.headingLeft}>
                      Concerns
                    </Typography>
                    <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                      {site.assessment.PrivacyLensAssessmentSummary.concerns.map((item, index) => (
                        <li key={index}>
                          <Typography variant="body2">{item}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={textStyles.bodyLeft}>
                Detailed assessment information is not available for this site.
              </Typography>
            )}
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" sx={textStyles.headingLeft}>
              Category Scores
            </Typography>
            
            {site.assessment?.PrivacyLensAssessmentScore ? (
              <Box sx={{ mt: 2 }}>
                {Object.entries(groupScoresBySection(site.assessment.PrivacyLensAssessmentScore)).map(([section, items]) => {
                  const sectionScore = items.reduce((acc, item) => acc + parseInt(item.score || 0), 0);
                  const maxPossible = items.length;
                  const percentage = (sectionScore / maxPossible) * 100;
                  
                  return (
                    <Box key={section} sx={{ mb: 2 }}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="body2">{section}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2" align="right">
                            {sectionScore}/{maxPossible}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={percentage} 
                                sx={{ 
                                  height: 8, 
                                  borderRadius: 4,
                                  backgroundColor: '#e0e0e0',
                                  '& .MuiLinearProgress-bar': {
                                    backgroundColor: percentage > 70 ? brandColors.green : 
                                                  percentage > 40 ? '#f3c01d' : 
                                                  '#f44336'
                                  }
                                }} 
                              />
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Category scores are not available for this site.
              </Typography>
            )}
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary"
                size="small"
                onClick={() => window.open(`https://${site.domain}`, '_blank')}
              >
                Visit Website
              </Button>
              <Button 
                sx={{ ml: 2 }}
                variant="outlined" 
                color="secondary"
                size="small"
              >
                Full Analysis Report
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SiteScoreCard;