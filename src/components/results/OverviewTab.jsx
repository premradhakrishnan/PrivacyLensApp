// components/results/OverviewTab.jsx
import React from 'react';
import { Typography, Grid, Card, CardContent, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { textStyles } from '../../utils/textStyles';
import { calculateAverageScore, findHighestScore, findLowestScore } from '../../utils/resultsUtils';
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
                  {results.length} websites analyzed using the Global Health Website Privacy Policy Evaluation Rubric.
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Average Score:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {calculateAverageScore(results) || "Not Available"}{calculateAverageScore(results) ? "/30" : ""}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Highest Score:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {findHighestScore(results) !== null ? `${findHighestScore(results)}/30` : "Not Available"}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Lowest Score:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {findLowestScore(results) !== null ? `${findLowestScore(results)}/30` : "Not Available"}
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
                    <TableRow>
                      <TableCell>Use of Third Party Tracking</TableCell>
                      <TableCell align="center">3/3</TableCell>
                      <TableCell align="right">100%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Vague Data Retention Policies</TableCell>
                      <TableCell align="center">2/3</TableCell>
                      <TableCell align="right">67%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Limited User Control Over Health Data</TableCell>
                      <TableCell align="center">2/3</TableCell>
                      <TableCell align="right">67%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2, ...textStyles.headingLeft }}>
        Individual Site Assessments
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