// components/results/CompareTab.jsx
import React from 'react';
import { 
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  Tooltip,
} from '@mui/material';
import { InfoOutlined, Check, Close } from '@mui/icons-material';
import { textStyles } from '../../utils/textStyles';
import { getScoreColor } from '../../utils/resultsUtils';

/**
 * Compare tab for results page
 * @param {Object} props
 * @param {Array} props.results - List of site results
 */
const CompareTab = ({ results }) => {
  // Helper function to render N/A text consistently
  const renderNA = () => (
    <Typography sx={{ textAlign: 'center', width: '100%', display: 'block' }}>
      N/A
    </Typography>
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Select two or more websites to compare their privacy policies side by side.
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" sx={textStyles.headingLeft}>
            Website Comparison
          </Typography>
          
          <TableContainer sx={{ mt: 3 }}>
            <Table>
              <TableBody>
                {/* Domain names row - added for better site identification */}
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Website</TableCell>
                  {results.map(site => (
                    <TableCell key={`domain-${site.domain}`} align="center">
                      <Typography fontWeight="bold" color="primary" sx={{ textAlign: 'center', width: '100%' }}>
                        {site.domain}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell align="center">Score</TableCell>
                  {results.map(site => (
                    <TableCell key={`score-${site.domain}`} align="center">
                      {site.finalScore !== undefined && site.finalScore !== null ? (
                        <Typography 
                          fontWeight="bold" 
                          sx={{ color: getScoreColor(site.finalScore), textAlign: 'center', width: '100%' }}
                        >
                          {site.finalScore}/30
                        </Typography>
                      ) : (
                        renderNA()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell align="center">Last Updated</TableCell>
                  {results.map(site => (
                    <TableCell key={`updated-${site.domain}`} align="center">
                      {site.dateCaptured ? (
                        <Typography sx={{ textAlign: 'center', width: '100%' }}>
                          {new Date(site.dateCaptured).toLocaleDateString()}
                        </Typography>
                      ) : (
                        renderNA()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell align="center">Privacy Policy Document Present</TableCell>
                  {results.map(site => {
                    const item = site.assessment?.PrivacyLensAssessmentScore?.find(
                      s => s.question === "Privacy Policy Document Present"
                    );
                    return (
                      <TableCell key={`policy-${site.domain}`} align="center">
                        {!item ? (
                          renderNA()
                        ) : item.answer === "Yes" ? (
                          <Box sx={{ textAlign: 'center', width: '100%' }}>
                            <Check sx={{ color: 'green' }} />
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: 'center', width: '100%' }}>
                            <Close sx={{ color: 'red' }} />
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell align="center">Last Update Date Indicated</TableCell>
                  {results.map(site => {
                    const item = site.assessment?.PrivacyLensAssessmentScore?.find(
                      s => s.question === "Last Update Date Indicated"
                    );
                    return (
                      <TableCell key={`update-date-${site.domain}`} align="center">
                        {!item ? (
                          renderNA()
                        ) : item.answer === "Yes" ? (
                          <Box sx={{ textAlign: 'center', width: '100%' }}>
                            <Check sx={{ color: 'green' }} />
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: 'center', width: '100%' }}>
                            <Close sx={{ color: 'red' }} />
                          </Box>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell align="center">Use of Third Party Resources</TableCell>
                  {results.map(site => {
                    const item = site.assessment?.PrivacyLensAssessmentScore?.find(
                      s => s.question === "Use of Third Party Resources"
                    );
                    
                    if (!item) {
                      return (
                        <TableCell key={`third-party-${site.domain}`} align="center">
                          {renderNA()}
                        </TableCell>
                      );
                    }
                    
                    const score = parseInt(item?.score || "0");
                    return (
                      <TableCell key={`third-party-${site.domain}`} align="center">
                        <Box sx={{ textAlign: 'center', width: '100%' }}>
                          {item?.answer === "Yes" && score === 0 ? (
                            <Tooltip title="Yes, but with privacy concerns">
                              <InfoOutlined sx={{ color: 'orange' }} />
                            </Tooltip>
                          ) : item?.answer === "Yes" ? (
                            <Check sx={{ color: 'green' }} />
                          ) : (
                            <Close sx={{ color: 'red' }} />
                          )}
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="secondary"
            >
              Generate Detailed Comparison Report
            </Button>
          </Box> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompareTab;