// components/sections/OurSolutionSection.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import CustomAccordion from '../common/CustomAccordion';
import { brandColors } from '../../utils/constants';

const OurSolutionSection = () => {
  // State to track which accordion is expanded
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: brandColors.purple, fontWeight: 'bold', my: 4, textAlign: 'left' }}>
        Our Solution
      </Typography>
      
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color={brandColors.purple} sx={{ textAlign: 'left' }}>
            How PrivacyLens Works to Protect Your Health Data
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mb: 3, textAlign: 'left' }}>
            PrivacyLens provides users with clear insights into how healthcare websites handle their personal data. 
            We analyze privacy policies to highlight potential risks and empower you to make informed decisions.
          </Typography>
          
          {/* Accordion Group */}
          <Box sx={{ mt: 4 }}>
            <CustomAccordion
              title="Privacy Policy Analysis Engine"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel1"
              color="purple"
            >
              <Typography variant="body1" paragraph>
                Our AI-powered analysis engine reads and evaluates privacy policies according to a comprehensive 
                rubric developed by privacy experts. The engine examines key factors including:
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: `${brandColors.purple}10`, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold" color={brandColors.purple}>
                      Privacy Document Accessibility
                    </Typography>
                    <Typography variant="body2">
                      How easy it is to find, access, and understand the policy
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: `${brandColors.green}10`, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold" color={brandColors.green}>
                      Privacy Document Scope
                    </Typography>
                    <Typography variant="body2">
                      The clarity and depth of the policy's content
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: `${brandColors.green}10`, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold" color={brandColors.green}>
                      Browser Storage
                    </Typography>
                    <Typography variant="body2">
                      The tracking technologies stored in a user's browser
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: `${brandColors.purple}10`, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold" color={brandColors.purple}>
                      Third-Party Tracking
                    </Typography>
                    <Typography variant="body2">
                     Website integration with third-party tracking technologies
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: `${brandColors.purple}10`, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold" color={brandColors.purple}>
                      Data Handling
                    </Typography>
                    <Typography variant="body2">
                      How the website handles your personal and technical data
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, bgcolor: `${brandColors.green}10`, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold" color={brandColors.green}>
                      Health Data Privacy
                    </Typography>
                    <Typography variant="body2">
                      The website's practices for handling and protecting your health data
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Typography variant="body1">
                Based on this analysis, each website receives an overall privacy protection score, 
                along with detailed breakdowns of specific privacy practices.
              </Typography>
            </CustomAccordion>
            
            <CustomAccordion
              title="Browser Extension Integration"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel2"
              color="green"
            >
              <Typography variant="body1" paragraph>
                Our Chrome browser extension seamlessly integrates with your Google search experience to provide 
                real-time privacy ratings for healthcare websites. As you search for health-related topics, 
                the extension:
              </Typography>
              
              <Box sx={{ pl: 3, mb: 2 }}>
                <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, width: 8, height: 8, borderRadius: '50%', bgcolor: brandColors.purple }}/>
                  Detects health-related search queries automatically
                </Typography>
                <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, width: 8, height: 8, borderRadius: '50%', bgcolor: brandColors.purple }}/>
                  Checks our database for privacy ratings of websites in your search results
                </Typography>
                <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, width: 8, height: 8, borderRadius: '50%', bgcolor: brandColors.purple }}/>
                  Displays color-coded privacy ratings (Weak, Moderate, Strong) next to each result
                </Typography>
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 2, width: 8, height: 8, borderRadius: '50%', bgcolor: brandColors.purple }}/>
                  Allows one-click access to detailed privacy analysis reports
                </Typography>
              </Box>
              
              <Typography variant="body1">
                This seamless integration helps you make privacy-conscious decisions without disrupting your 
                normal browsing experience.
              </Typography>
            </CustomAccordion>
            
            <CustomAccordion
              title="Our Privacy Grading System"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel3"
              color="purple"
            >
              <Typography variant="body1" paragraph>
                PrivacyLens evaluates websites using a comprehensive grading system that considers multiple 
                privacy factors, each weighted according to its importance for health data protection:
              </Typography>
              
              <Box sx={{ my: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="body2" fontWeight="bold">Privacy Factor</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight="bold">Weight</Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">Privacy Document Accessibility</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">12%</Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">Privacy Document Scope</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">20%</Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">Browser Storage</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">15%</Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">Third-Party Tracking</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">18%</Typography>
                  </Grid>
                  
                  <Grid item xs={8}>
                    <Typography variant="body2">Data Handling</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">20%</Typography>
                  </Grid>

                  <Grid item xs={8}>
                    <Typography variant="body2">Health Data Policy</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">15%</Typography>
                  </Grid>
                </Grid>
              </Box>
              
              <Typography variant="body1" paragraph>
                Based on the composite score, websites receive one of three privacy ratings:
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} md={4}>
                  <Box sx={{
                    p: 2,
                    bgcolor: 'rgba(198, 40, 40, 0.1)',
                    borderRadius: 2,
                    border: '1px solid rgba(198, 40, 40, 0.3)'
                  }}>
                    <Typography variant="body1" fontWeight="bold" color="#c62828" gutterBottom>
                      Weak (0-29%)
                    </Typography>
                    <Typography variant="body2">
                      Websites with significant privacy concerns, including excessive data collection,
                      broad third-party sharing, and limited user control.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'rgba(249, 168, 37, 0.1)', 
                    borderRadius: 2,
                    border: '1px solid rgba(249, 168, 37, 0.3)'
                  }}>
                    <Typography variant="body1" fontWeight="bold" color="#f9a825" gutterBottom>
                      Moderate (30-74%)
                    </Typography>
                    <Typography variant="body2">
                      Websites with adequate privacy protections but with some concerning practices 
                      in specific areas.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{
                    p: 2,
                    bgcolor: 'rgba(46, 125, 50, 0.1)',
                    borderRadius: 2,
                    border: '1px solid rgba(46, 125, 50, 0.3)'
                  }}>
                    <Typography variant="body1" fontWeight="bold" color="#2e7d32" gutterBottom>
                      Strong (75-100%)
                    </Typography>
                    <Typography variant="body2">
                      Websites with transparent policies that minimize data collection, limit third-party
                      sharing, and give users strong control over their information.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CustomAccordion>
            
            <CustomAccordion
              title="Aggregate Privacy Insights"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel4"
              color="green"
            >
              <Typography variant="body1" paragraph>
                Beyond individual website ratings, PrivacyLens provides valuable insights into industry-wide 
                privacy trends for healthcare websites. Our aggregate findings include:
              </Typography>
              
              <Grid container spacing={3} sx={{ my: 2 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, border: `1px solid ${brandColors.purple}30`, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom color={brandColors.purple} sx={{ fontSize: '1.1rem' }}>
                      Privacy Score Distribution
                    </Typography>
                    <Typography variant="body2">
                      How healthcare websites compare across different categories, revealing which types of 
                      sites tend to have better or worse privacy practices.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, border: `1px solid ${brandColors.green}30`, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom color={brandColors.green} sx={{ fontSize: '1.1rem' }}>
                      Common Privacy Violations
                    </Typography>
                    <Typography variant="body2">
                      The most widespread concerning practices across healthcare websites, helping users 
                      understand what to watch out for.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, border: `1px solid ${brandColors.green}30`, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom color={brandColors.green} sx={{ fontSize: '1.1rem' }}>
                      Top Performing Websites
                    </Typography>
                    <Typography variant="body2">
                      Healthcare resources with exemplary privacy practices that users can trust with their 
                      sensitive information.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, border: `1px solid ${brandColors.purple}30`, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom color={brandColors.purple} sx={{ fontSize: '1.1rem' }}>
                      Privacy Trend Analysis
                    </Typography>
                    <Typography variant="body2">
                      How privacy practices in the healthcare industry are evolving over time, based on 
                      our ongoing monitoring.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Typography variant="body1">
                These aggregate insights help drive industry-wide improvements by highlighting 
                both concerning practices and positive examples worth emulating.
              </Typography>
            </CustomAccordion>
            
            <CustomAccordion
              title="User Education & Empowerment"
              expanded={expanded}
              onChange={handleChange}
              panelId="panel5"
              color="purple"
            >
              <Typography variant="body1" paragraph>
                PrivacyLens goes beyond simply rating websites by providing educational resources to help 
                users understand healthcare privacy issues and take control of their data:
              </Typography>
              
              <Box sx={{ my: 2 }}>
                <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      mr: 2, 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: brandColors.purple,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      mt: 0.5
                    }}
                  >
                    1
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" color={brandColors.purple}>
                      Privacy Glossary
                    </Typography>
                    <Typography variant="body2">
                      Plain-language explanations of common privacy terms and concepts found in healthcare privacy policies.
                    </Typography>
                  </Box>
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      mr: 2, 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: brandColors.green,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      mt: 0.5
                    }}
                  >
                    2
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" color={brandColors.green}>
                      Privacy Best Practices
                    </Typography>
                    <Typography variant="body2">
                      Actionable guidance on protecting your health data online, including browser settings, 
                      cookie management, and smart data-sharing decisions.
                    </Typography>
                  </Box>
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      mr: 2, 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: brandColors.purple,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      mt: 0.5
                    }}
                  >
                    3
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" color={brandColors.purple}>
                      Red Flag Detection
                    </Typography>
                    <Typography variant="body2">
                      Guidance on identifying warning signs in privacy policies that indicate heightened 
                      data collection or sharing risks.
                    </Typography>
                  </Box>
                </Typography>
                
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box 
                    sx={{ 
                      mr: 2, 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: brandColors.green,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      mt: 0.5
                    }}
                  >
                    4
                  </Box>
                  <Box>
                    <Typography variant="body1" fontWeight="bold" color={brandColors.green}>
                      Data Rights Resources
                    </Typography>
                    <Typography variant="body2">
                      Information on exercising your legal rights regarding personal health data, including 
                      requesting data deletion and limiting data sharing.
                    </Typography>
                  </Box>
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mt: 2 }}>
                By combining actionable privacy ratings with educational resources, PrivacyLens empowers 
                users to make informed choices about their health data privacy and take concrete steps 
                to protect their sensitive information.
              </Typography>
            </CustomAccordion>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OurSolutionSection;