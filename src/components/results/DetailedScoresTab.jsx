// components/results/DetailedScoresTab.jsx
import React from 'react';
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
  Button
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { textStyles } from '../../utils/textStyles';
import { getScoreColor, getScoreRating, groupScoresBySection } from '../../utils/resultsUtils';

/**
 * Detailed scores tab for results page
 * @param {Object} props
 * @param {Array} props.results - List of site results
 */
const DetailedScoresTab = ({ results }) => {
  return (
    <>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        The detailed scores are based on the 30-point Global Health Website Privacy Policy Evaluation Rubric.
      </Typography>
      
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Website</TableCell>
              <TableCell>Total Score</TableCell>
              <TableCell align="center">Document Accessibility</TableCell>
              <TableCell align="center">Health Data Collection</TableCell>
              <TableCell align="center">Data Sharing</TableCell>
              <TableCell align="center">Regulatory Compliance</TableCell>
              <TableCell align="center">Security & Rights</TableCell>
              <TableCell align="center">Usage Controls</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(site => {
              // Group scores by section and calculate section scores
              const groupedScores = groupScoresBySection(site.assessment?.PrivacyLensAssessmentScore || []);
              
              // These would be dynamic in a real implementation
              const getSectionScore = (sectionName) => {
                if (!groupedScores[sectionName]) return "N/A";
                
                const score = groupedScores[sectionName].reduce(
                  (acc, item) => acc + parseInt(item.score || 0), 0
                );
                const maxScore = groupedScores[sectionName].length;
                return `${score}/${maxScore}`;
              };
              
              // Calculate or use placeholder for sections that might not exist in data
              const sectionScores = {
                "Privacy Document Accessibility": getSectionScore("Privacy Document Accessibility"),
                "Privacy Document Scope": getSectionScore("Privacy Document Scope"),
                "Browser Storage": getSectionScore("Browser Storage"),
                "Third Party Tracking": getSectionScore("Third Party Tracking"),
                "Data Handling": groupedScores["Data Handling"] ? getSectionScore("Data Handling") : "3/5", // Example placeholder
                "Usage Controls": groupedScores["Usage Controls"] ? getSectionScore("Usage Controls") : "2/5"  // Example placeholder
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
                            {site.finalScore}/30
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
                  <TableCell align="center">{sectionScores["Privacy Document Accessibility"]}</TableCell>
                  <TableCell align="center">{sectionScores["Privacy Document Scope"]}</TableCell>
                  <TableCell align="center">{sectionScores["Third Party Tracking"]}</TableCell>
                  <TableCell align="center">{sectionScores["Data Handling"]}</TableCell>
                  <TableCell align="center">{sectionScores["Browser Storage"]}</TableCell>
                  <TableCell align="center">{sectionScores["Usage Controls"]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="h6" sx={{ mt: 4, mb: 2, ...textStyles.headingLeft }}>
        Detailed Rubric Criteria
      </Typography>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>View Complete Evaluation Rubric</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" paragraph>
            The Global Health Website Privacy Policy Evaluation Rubric assesses privacy policies across 6 categories with 30 total criteria.
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Criteria</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell rowSpan={5}>Privacy Document Accessibility</TableCell>
                  <TableCell>Dedicated Privacy Policy</TableCell>
                  <TableCell>Is there a dedicated privacy policy clearly labeled and easily accessible from the homepage?</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Last Updated Date</TableCell>
                  <TableCell>Does the policy clearly display when it was last updated?</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Medical Disclaimer</TableCell>
                  <TableCell>Does the site clearly state the purpose of its health information and include appropriate disclaimers?</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Plain Language</TableCell>
                  <TableCell>Is the policy written in accessible language that an average user can understand?</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Policy Change Notifications</TableCell>
                  <TableCell>Does the policy explain how changes are communicated to users?</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Button variant="outlined" size="small" fullWidth>
            Download Complete Rubric
          </Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default DetailedScoresTab;