// components/results/SiteScoreCard.jsx
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Box, 
  Button, 
  Divider, 
  Tooltip,
  LinearProgress,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { 
  InfoOutlined, 
  ExpandMore, 
  ExpandLess, 
  CheckCircle, 
  Cancel,
  WarningAmber
} from '@mui/icons-material';

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
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  
  // Handle null or undefined site data
  if (!site) return null;
  
  const finalScore = site.finalScore !== undefined ? site.finalScore : null;
  const scoreColor = getScoreColor(finalScore);
  const scoreRating = getScoreRating(finalScore);
  
  // Safely extract assessment scores
  const assessmentScores = site.assessment?.PrivacyLensAssessmentScore || [];
  
  // Safely extract summary data with null checks
  // Handle both object and array formats for summary
  let summary = null;
  if (site.assessment?.PrivacyLensAssessmentSummary) {
    if (Array.isArray(site.assessment.PrivacyLensAssessmentSummary)) {
      summary = site.assessment.PrivacyLensAssessmentSummary[0];
    } else {
      summary = site.assessment.PrivacyLensAssessmentSummary;
    }
  }
  
  const hasPositives = summary?.positives && Array.isArray(summary.positives);
  const hasConcerns = summary?.concerns && Array.isArray(summary.concerns);
  
  // Function to toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Get grouped scores by section
  const groupedScores = groupScoresBySection(assessmentScores);
  
  // Open full analysis dialog
  const handleOpenFullAnalysis = () => {
    setOpenDialog(true);
  };
  
  // Close full analysis dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
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
              {site.dateCaptured ? 
                `Analyzed: ${new Date(site.dateCaptured).toLocaleDateString()}` :
                "Not yet analyzed"
              }
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: { xs: 'left', sm: 'center' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', sm: 'center' } }}>
              <Typography variant="h5" sx={{ color: scoreColor, fontWeight: 'bold', mr: 1 }}>
                {getScoreDisplay(finalScore)}
              </Typography>
              {finalScore !== null && (
                <Tooltip title={`Score Rating: ${scoreRating}`}>
                  <InfoOutlined fontSize="small" />
                </Tooltip>
              )}
            </Box>
            <Typography variant="body2">{finalScore !== null ? scoreRating : "Not scored"}</Typography>
          </Grid>
          <Grid item xs={6} sm={3} sx={{ textAlign: 'right' }}>
            {(assessmentScores.length > 0 || summary) ? (
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => onSelectSite(site)}
                size="small"
              >
                {isExpanded ? "Collapse" : "View Details"}
              </Button>
            ) : (
              <Button 
                variant="outlined" 
                color="primary"
                disabled
                size="small"
              >
                No Data Available
              </Button>
            )}
          </Grid>
        </Grid>
        
        {isExpanded && assessmentScores.length > 0 && (
          <Box mt={2}>
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" sx={textStyles.headingLeft}>
              Summary
            </Typography>
            {summary ? (
              <>
                <Typography variant="body2" paragraph sx={textStyles.bodyLeft}>
                  {summary.overview || "No overview available."}
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={textStyles.headingLeft}>
                      Positives
                    </Typography>
                    {hasPositives && summary.positives.length > 0 ? (
                      <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                        {summary.positives.map((item, index) => (
                          <li key={index}>
                            <Typography variant="body2">{item}</Typography>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={textStyles.bodyLeft}>
                        No positive points identified.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={textStyles.headingLeft}>
                      Concerns
                    </Typography>
                    {hasConcerns && summary.concerns.length > 0 ? (
                      <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                        {summary.concerns.map((item, index) => (
                          <li key={index}>
                            <Typography variant="body2">{item}</Typography>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={textStyles.bodyLeft}>
                        No concerns identified.
                      </Typography>
                    )}
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
            
            {Object.keys(groupedScores).length > 0 ? (
              <Box sx={{ mt: 2 }}>
                {Object.entries(groupedScores).map(([section, items]) => {
                  const sectionScore = items.reduce((acc, item) => acc + parseInt(item.score || 0), 0);
                  const maxPossible = items.length;
                  const percentage = (sectionScore / maxPossible) * 100;
                  
                  // Count failing items (score = 0)
                  const failingItems = items.filter(item => parseInt(item.score) === 0);
                  const hasFailures = failingItems.length > 0;
                  
                  return (
                    <Box key={section} sx={{ mb: 2 }}>
                      <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={6}>
                          <Box 
                            sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              cursor: 'pointer' 
                            }}
                            onClick={() => toggleSection(section)}
                          >
                            {expandedSections[section] ? <ExpandLess /> : <ExpandMore />}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {section}
                              {hasFailures && (
                                <Tooltip title={`${failingItems.length} failed metrics`}>
                                  <WarningAmber 
                                    fontSize="small" 
                                    color="warning" 
                                    sx={{ ml: 1, verticalAlign: 'middle' }} 
                                  />
                                </Tooltip>
                              )}
                            </Typography>
                          </Box>
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
                      
                      <Collapse in={expandedSections[section]} timeout="auto" unmountOnExit>
                        <Box sx={{ pl: 4, pr: 2, pt: 1, pb: 1 }}>
                          {items.map((item, index) => (
                            <Grid container key={index} sx={{ mb: 1 }}>
                              <Grid item xs={10}>
                                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                  {parseInt(item.score) === 1 ? (
                                    <CheckCircle fontSize="small" color="success" sx={{ mr: 1 }} />
                                  ) : (
                                    <Cancel fontSize="small" color="error" sx={{ mr: 1 }} />
                                  )}
                                  {item.question}
                                </Typography>
                              </Grid>
                              <Grid item xs={2} sx={{ textAlign: 'right' }}>
                                <Chip 
                                  label={item.answer} 
                                  size="small"
                                  color={item.answer === 'Yes' ? 'success' : 'error'}
                                  variant="outlined"
                                />
                              </Grid>
                              {parseInt(item.score) === 0 && (
                                <Grid item xs={12}>
                                  <Typography 
                                    variant="caption" 
                                    color="text.secondary"
                                    sx={{ pl: 4, fontStyle: 'italic' }}
                                  >
                                    {item.justification}
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>
                          ))}
                        </Box>
                      </Collapse>
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
                onClick={handleOpenFullAnalysis}
                disabled={assessmentScores.length === 0}
              >
                Full Analysis Report
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
      
      {/* Full Analysis Report Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h6">
            Full Privacy Analysis Report: {site.domain}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {summary && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Executive Summary
              </Typography>
              <Typography variant="body2" paragraph>
                {summary.overview}
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    Strengths
                  </Typography>
                  {hasPositives && summary.positives.length > 0 ? (
                    <ul>
                      {summary.positives.map((item, index) => (
                        <li key={index}>
                          <Typography variant="body2">{item}</Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No strengths identified.
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                    Areas of Concern
                  </Typography>
                  {hasConcerns && summary.concerns.length > 0 ? (
                    <ul>
                      {summary.concerns.map((item, index) => (
                        <li key={index}>
                          <Typography variant="body2">{item}</Typography>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No concerns identified.
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}
          
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Detailed Assessment
          </Typography>
          
          <TableContainer component={Paper} sx={{ mt: 2, mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell width="40%"><strong>Question</strong></TableCell>
                  <TableCell width="15%"><strong>Answer</strong></TableCell>
                  <TableCell width="15%"><strong>Score</strong></TableCell>
                  <TableCell width="30%"><strong>Justification</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assessmentScores.map((item, index) => (
                  <TableRow 
                    key={index}
                    sx={{
                      backgroundColor: parseInt(item.score) === 0 ? 'rgba(255, 235, 235, 0.5)' : 'inherit'
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2">
                        {item.question}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Section: {item.section}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.answer} 
                        size="small"
                        color={item.answer === 'Yes' ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        fontWeight="bold"
                        color={parseInt(item.score) === 1 ? 'success.main' : 'error.main'}
                      >
                        {item.score}/1
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {item.justification}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {site.assessment?.assumptions_or_gaps && (
            <Box>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Assessment Notes & Assumptions
              </Typography>
              <ul>
                {site.assessment.assumptions_or_gaps.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body2">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          {/* <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              // Here you could implement export functionality
              // For example, exporting to PDF or CSV
              alert('Export functionality will be implemented here');
            }}
          >
            Export Report
          </Button> */}
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SiteScoreCard;