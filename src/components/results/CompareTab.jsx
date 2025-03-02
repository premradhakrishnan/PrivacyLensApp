// components/results/CompareTab.jsx
import React, { useState } from 'react';
import { 
  Typography, 
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { textStyles } from '../../utils/textStyles';
import { getScoreColor } from '../../utils/resultsUtils';

/**
 * Tab to compare multiple sites side by side
 * @param {Object} props
 * @param {Array} props.results - List of site results
 */
const CompareTab = ({ results }) => {
  const [selectedSites, setSelectedSites] = useState([]);
  
  // Find sites with assessment data
  const sitesWithData = results.filter(site => 
    site.finalScore !== null &&
    site.assessment
  );
  
  // Handle site selection
  const handleSiteChange = (event) => {
    const { value } = event.target;
    setSelectedSites(value);
  };
  
  // Get selected sites data
  const selectedSitesData = selectedSites.map(domain => 
    sitesWithData.find(site => site.domain === domain)
  ).filter(Boolean);
  
  // Prepare data for comparison table
  const prepareComparisonData = () => {
    if (selectedSitesData.length === 0) return [];
    
    // Create summary rows
    const summaryRows = [
      {
        category: 'Summary',
        label: 'Final Score',
        type: 'score',
        values: selectedSitesData.map(site => ({
          domain: site.domain,
          value: site.finalScore,
          display: site.finalScore !== null ? `${site.finalScore}/30` : 'N/A'
        }))
      },
      {
        category: 'Summary',
        label: 'Assessment Date',
        type: 'text',
        values: selectedSitesData.map(site => ({
          domain: site.domain,
          value: site.dateCaptured || 'N/A',
          display: site.dateCaptured || 'N/A'
        }))
      }
    ];
    
    // If we have detailed assessment data, add section summaries
    const sectionScores = {};
    
    selectedSitesData.forEach(site => {
      const scores = site.assessment?.PrivacyLensAssessmentScore;
      if (Array.isArray(scores)) {
        scores.forEach(item => {
          const section = item.section || 'Uncategorized';
          if (!sectionScores[section]) {
            sectionScores[section] = {};
          }
          if (!sectionScores[section][site.domain]) {
            sectionScores[section][site.domain] = { total: 0, possible: 0 };
          }
          
          sectionScores[section][site.domain].total += parseInt(item.score) || 0;
          sectionScores[section][site.domain].possible += 1;
        });
      }
    });
    
    // Convert section scores to rows
    const sectionRows = Object.entries(sectionScores).map(([section, domains]) => {
      return {
        category: 'Sections',
        label: section,
        type: 'section',
        values: selectedSitesData.map(site => {
          const sectionData = domains[site.domain] || { total: 0, possible: 0 };
          return {
            domain: site.domain,
            value: sectionData.total,
            display: `${sectionData.total}/${sectionData.possible}`,
            percentage: sectionData.possible > 0 
              ? Math.round((sectionData.total / sectionData.possible) * 100) 
              : 0
          };
        })
      };
    });
    
    return [...summaryRows, ...sectionRows];
  };
  
  const comparisonData = prepareComparisonData();
  
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3, ...textStyles.headingLeft }}>
        Compare Websites
      </Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={textStyles.headingLeft}>
            Select Websites to Compare
          </Typography>
          
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="sites-compare-label">Websites</InputLabel>
            <Select
              labelId="sites-compare-label"
              id="sites-compare"
              multiple
              value={selectedSites}
              label="Websites"
              onChange={handleSiteChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {sitesWithData.map(site => (
                <MenuItem key={site.domain} value={site.domain}>
                  {site.domain}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      
      {selectedSitesData.length > 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={textStyles.headingLeft}>
              Comparison Results
            </Typography>
            
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    {selectedSitesData.map(site => (
                      <TableCell key={site.domain} align="center">
                        {site.domain}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {comparisonData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell 
                        sx={{ 
                          fontWeight: row.category === 'Summary' ? 'bold' : 'normal'
                        }}
                      >
                        {row.label}
                      </TableCell>
                      {row.values.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} align="center">
                          {row.type === 'score' ? (
                            <Box 
                              sx={{ 
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: getScoreColor(cell.value),
                                color: 'white',
                                borderRadius: '50%',
                                width: 40,
                                height: 40,
                                fontWeight: 'bold'
                              }}
                            >
                              {cell.value !== null ? cell.value : '?'}
                            </Box>
                          ) : row.type === 'section' ? (
                            <Box>
                              <Typography variant="body2">{cell.display}</Typography>
                              <Box 
                                sx={{ 
                                  height: 4, 
                                  width: '100%', 
                                  bgcolor: '#e0e0e0',
                                  mt: 1,
                                  position: 'relative'
                                }}
                              >
                                <Box 
                                  sx={{ 
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    height: '100%',
                                    width: `${cell.percentage}%`,
                                    bgcolor: getScoreColor(cell.percentage / 3.33) // Scale to match 0-30 score
                                  }}
                                />
                              </Box>
                            </Box>
                          ) : (
                            cell.display
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Please select at least one website to compare.
          </Typography>
        </Box>
      )}
    </>
  );
};

export default CompareTab;