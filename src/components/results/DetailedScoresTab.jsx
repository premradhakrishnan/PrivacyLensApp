// components/results/DetailedScoresTab.jsx
import React, { useState } from 'react';
import { 
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Tooltip,
  Grid
} from '@mui/material';
import { 
  ExpandMore, 
  InfoOutlined 
} from '@mui/icons-material';
import { textStyles } from '../../utils/textStyles';
import { 
  getScoreColor, 
  getScoreRating, 
  groupScoresBySection, 
  calculateSectionScore 
} from '../../utils/resultsUtils';
import { MAX_SCORE, ENUMERATION_TO_SECTION } from '../../utils/constants';
import ScoreBreakdownChart from './ScoreBreakdownChart';

/**
 * Detailed scores tab for results page
 * @param {Object} props
 * @param {Array} props.results - List of site results
 */
const DetailedScoresTab = ({ results }) => {
  const [expandedRubric, setExpandedRubric] = useState(false);
  
  // Generate section columns from ENUMERATION_TO_SECTION
  const sectionColumns = Object.keys(ENUMERATION_TO_SECTION);

  return (
    <>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        The detailed scores are based on the {MAX_SCORE}-point Privacy Lens Evaluation Rubric with 34 criteria across 6 categories. Each criterion is scored from 0-2 points.
      </Typography>
      
      {/* Add Score Breakdown Chart for all sites combined */}
      {results.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <ScoreBreakdownChart 
            scores={results.flatMap(site => site.assessment?.PrivacyLensAssessmentScore || [])}
            showSections={true}
          />
        </Box>
      )}
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Website</TableCell>
              <TableCell>Total Score</TableCell>
              {sectionColumns.map(section => (
                <TableCell key={section} align="center">
                  <Tooltip title={`${section} section score`} placement="top">
                    <Box sx={{ width: '100%' }}>
                      {section}
                    </Box>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(site => {
              // Group scores by section and calculate section scores
              const groupedScores = groupScoresBySection(site.assessment?.PrivacyLensAssessmentScore || []);
              
              // Function to get section score display
              const getSectionScoreDisplay = (sectionName) => {
                if (!groupedScores[sectionName] || groupedScores[sectionName].length === 0) return "N/A";
                
                const { score, maxPossible } = calculateSectionScore(groupedScores[sectionName]);
                return `${score}/${maxPossible}`;
              };
              
              // Calculate section percentage for color
              const getSectionPercentage = (sectionName) => {
                if (!groupedScores[sectionName] || groupedScores[sectionName].length === 0) return 0;
                
                const { score, maxPossible } = calculateSectionScore(groupedScores[sectionName]);
                return maxPossible > 0 ? (score / maxPossible) * 100 : 0;
              };
              
              return (
                <TableRow key={site.domain}>
                  <TableCell>{site.domain}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {site.finalScore !== undefined && site.finalScore !== null ? (
                        <>
                          <Typography 
                            variant="body2" 
                            fontWeight="bold"
                            sx={{ color: getScoreColor(site.finalScore) }}
                          >
                            {site.finalScore}/{MAX_SCORE}
                          </Typography>
                          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                            <Chip 
                              label={getScoreRating(site.finalScore)} 
                              size="small"
                              sx={{ 
                                bgcolor: getScoreColor(site.finalScore),
                                color: 'white',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>
                        </>
                      ) : (
                        <>
                          <Typography variant="body2" fontWeight="bold" color="text.secondary">
                            N/A
                          </Typography>
                          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                            <Chip 
                              label="Not Available" 
                              size="small"
                              sx={{ 
                                bgcolor: '#9e9e9e',
                                color: 'white',
                                fontSize: '0.7rem'
                              }}
                            />
                          </Box>
                        </>
                      )}
                    </Box>
                  </TableCell>
                  
                  {/* Section scores */}
                  {sectionColumns.map(section => {
                    const scoreDisplay = getSectionScoreDisplay(section);
                    const percentage = getSectionPercentage(section);
                    const scoreColor = percentage >= 70 ? '#8cc43f' : 
                                      percentage >= 40 ? '#f3c01d' : 
                                      percentage > 0 ? '#ff9800' : '#9e9e9e';
                    
                    return (
                      <TableCell key={section} align="center">
                        <Box sx={{ position: 'relative' }}>
                          <Typography 
                            variant="body2" 
                            fontWeight="bold"
                            sx={{ color: scoreColor }}
                          >
                            {scoreDisplay}
                          </Typography>
                          
                          {scoreDisplay !== "N/A" && (
                            <Box 
                              sx={{ 
                                height: 4, 
                                width: '100%', 
                                bgcolor: '#e0e0e0',
                                mt: 1,
                                borderRadius: 2,
                                position: 'relative',
                                overflow: 'hidden'
                              }}
                            >
                              <Box 
                                sx={{ 
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  height: '100%',
                                  width: `${percentage}%`,
                                  bgcolor: scoreColor,
                                  borderRadius: 2
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="h6" sx={{ mt: 4, mb: 2, ...textStyles.headingLeft }}>
        Detailed Rubric Criteria
      </Typography>
      
      <Accordion expanded={expandedRubric} onChange={() => setExpandedRubric(!expandedRubric)}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>View Complete Evaluation Rubric</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            The Privacy Lens Evaluation Rubric assesses privacy policies across 6 categories with 34 total criteria. Each criterion can receive a score of 0-2 points.
          </Typography>
          
          <Grid container spacing={2}>
            {Object.entries(ENUMERATION_TO_SECTION).map(([section, enumerations]) => (
              <Grid item xs={12} key={section}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                  {section} ({enumerations.length} criteria)
                </Typography>
                
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                        <TableCell width="10%">#</TableCell>
                        <TableCell width="30%">Criteria</TableCell>
                        <TableCell width="60%">Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {enumerations.map(enumNumber => (
                        <TableRow key={enumNumber}>
                          <TableCell>{enumNumber}</TableCell>
                          <TableCell>Criterion {enumNumber}</TableCell>
                          <TableCell>Description of criterion {enumNumber} from the rubric</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button variant="outlined" size="small">
              Download Complete Rubric
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DetailedScoresTab;