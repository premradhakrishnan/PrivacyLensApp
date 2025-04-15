// components/results/OverviewTab.jsx
import React from 'react';
import { Typography, Grid, Card, CardContent, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { textStyles } from '../../utils/textStyles';
import { calculateAverageScore, findHighestScore, findLowestScore } from '../../utils/resultsUtils';
import { getCommonPrivacyIssues } from '../../utils/privacyIssuesUtils';
import ScoreDistributionChart from './ScoreDistributionChart';
import SiteScoreCard from './SiteScoreCard';

/**
 * Overview tab for results page
 * @param {Object} props
 * @param {Array} props.results - List of site results
 * @param {string|null} props.expandedSite - Domain of currently expanded site
 * @param {Function} props.onSiteSelect - Callback when a site is selected
 */
const OverviewTab = ({ results, expandedSite, onSiteSelect }) => {
  // Get common privacy issues from the data
  const commonIssues = getCommonPrivacyIssues(results);
  
  // Calculate valid results count
  const validResultsCount = results.filter(r => r.finalScore !== null).length;

  return (
    <>
      <ScoreDistributionChart sites={results} />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={textStyles.headingLeft}>
                Analysis Summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" paragraph>
                  {validResultsCount} websites analyzed using the Privacy Lens Evaluation Rubric.
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Average Score:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {calculateAverageScore(results) || "Not Available"}{calculateAverageScore(results) ? "/68" : ""}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Highest Score:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {findHighestScore(results) !== null ? `${findHighestScore(results)}/68` : "Not Available"}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Lowest Score:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {findLowestScore(results) !== null ? `${findLowestScore(results)}/68` : "Not Available"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={textStyles.headingLeft}>
                Common Privacy Issues
              </Typography>
              {commonIssues.length > 0 ? (
                <TableContainer component={Box} sx={{ mt: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Issue</TableCell>
                        <TableCell align="center">Frequency</TableCell>
                        <TableCell align="right">% of Sites</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {commonIssues.slice(0, 5).map((issue, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {/* Capitalize first letter and format issue text */}
                            {issue.issue.charAt(0).toUpperCase() + issue.issue.slice(1)}
                          </TableCell>
                          <TableCell align="center">
                            {issue.count}/{validResultsCount}
                          </TableCell>
                          <TableCell align="right">
                            {issue.percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                      {commonIssues.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            No common issues found in available data
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {validResultsCount > 0 
                    ? "Unable to identify common issues from the available data."
                    : "No assessment data available to analyze."}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, ...textStyles.headingLeft }}>
        Individual Site Details
      </Typography>
      
      {results.map(site => (
        <SiteScoreCard 
          key={site.domain} 
          site={site} 
          onSelectSite={onSiteSelect}
          isExpanded={expandedSite === site.domain}
        />
      ))}
    </>
  );
};

export default OverviewTab;