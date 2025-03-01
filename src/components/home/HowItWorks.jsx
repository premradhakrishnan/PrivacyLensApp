// components/home/HowItWorks.jsx
import React, { useState } from 'react';
import { Box, Grid, Typography, Tabs, Tab } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { brandColors } from '../../utils/constants';

// Plugin workflow steps
const pluginSteps = [
  { 
    number: 1, 
    title: "Search for Health Information", 
    description: "As you search for health information on Google, our plugin automatically detects health-related queries",
    color: brandColors.purple
  },
  { 
    number: 2, 
    title: "Real-time Privacy Analysis", 
    description: "Privacy Lens instantly checks our database for privacy ratings of websites in your search results",
    color: brandColors.green
  },
  { 
    number: 3, 
    title: "See Privacy Ratings", 
    description: "Each search result displays a privacy rating (Strong, Moderate, or Weak) directly in your Google results",
    color: brandColors.purple
  },
  { 
    number: 4, 
    title: "Make Informed Choices", 
    description: "Choose websites that not only provide the information you need but also respect your privacy",
    color: brandColors.green
  }
];

// Direct analysis workflow steps
const directSteps = [
  { 
    number: 1, 
    title: "Enter a Healthcare Website", 
    description: "Simply provide the URL of any healthcare website you want to analyze",
    color: brandColors.purple
  },
  { 
    number: 2, 
    title: "AI-Powered Analysis", 
    description: "Our algorithms locate the privacy policy, extract the text, and evaluate it against our comprehensive rubric",
    color: brandColors.green
  },
  { 
    number: 3, 
    title: "Get Detailed Results", 
    description: "Receive a clear breakdown of how the website handles your data across multiple privacy categories",
    color: brandColors.purple
  },
  { 
    number: 4, 
    title: "Make Informed Decisions", 
    description: "Use our insights to decide which healthcare services best protect your sensitive health information",
    color: brandColors.green
  }
];

const HowItWorks = () => {
  // State to track which workflow is being displayed
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Get the appropriate steps based on the active tab
  const steps = activeTab === 0 ? pluginSteps : directSteps;
  
  return (
    <Box sx={{ mb: 8 }}>
      <SectionTitle title="How Privacy Lens Works" />
      
      {/* Tabs to switch between the two workflows */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        centered 
        sx={{ mb: 4 }}
        TabIndicatorProps={{ style: { backgroundColor: brandColors.purple } }}
      >
        <Tab 
          label="Browser Plugin" 
          sx={{ 
            fontWeight: activeTab === 0 ? 'bold' : 'normal',
            color: activeTab === 0 ? brandColors.purple : 'inherit'
          }} 
        />
        <Tab 
          label="Direct Website Analysis" 
          sx={{ 
            fontWeight: activeTab === 1 ? 'bold' : 'normal',
            color: activeTab === 1 ? brandColors.purple : 'inherit'
          }} 
        />
      </Tabs>
      
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: 350,
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: `${brandColors.lightPurple}20`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3
            }}
          >
            {activeTab === 0 ? (
              // Browser Plugin visualization
              <>
                <Typography variant="h5" sx={{ mb: 3, color: brandColors.purple, fontWeight: 'bold' }}>
                  Browser Plugin Visualization
                </Typography>
                <Box sx={{ 
                  width: '100%', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  backgroundColor: 'white',
                  p: 2,
                  mb: 2
                }}>
                  <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Search Results for: "diabetes symptoms"</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, p: 1, borderBottom: '1px solid #eee' }}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#2e7d32', // Green for strong
                      mr: 1 
                    }}/>
                    <Typography variant="body2">
                      <strong>Mayo Clinic:</strong> Type 2 diabetes - Symptoms and causes
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, p: 1, borderBottom: '1px solid #eee' }}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#f9a825', // Yellow for moderate
                      mr: 1 
                    }}/>
                    <Typography variant="body2">
                      <strong>Healthline:</strong> Early Signs and Symptoms of Diabetes
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <Box sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      bgcolor: '#c62828', // Red for weak
                      mr: 1 
                    }}/>
                    <Typography variant="body2">
                      <strong>WebMD:</strong> Diabetes: Symptoms, Causes, Testing, and Treatment
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Privacy Lens automatically rates each search result
                </Typography>
              </>
            ) : (
              // Direct Website Analysis visualization
              <>
                <Typography variant="h5" sx={{ mb: 3, color: brandColors.purple, fontWeight: 'bold' }}>
                  Website Analysis Tool
                </Typography>
                <Box sx={{ 
                  width: '100%', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  backgroundColor: 'white',
                  p: 2,
                  mb: 2
                }}>
                  <Box sx={{ mb: 2, display: 'flex' }}>
                    <Box sx={{ 
                      flex: 1,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      p: 1,
                      mr: 1,
                      color: '#666',
                      fontSize: '14px'
                    }}>
                      Enter website URL...
                    </Box>
                    <Box sx={{ 
                      bgcolor: brandColors.green,
                      color: 'white',
                      borderRadius: '4px',
                      p: 1,
                      fontWeight: 'bold',
                      fontSize: '14px'
                    }}>
                      Analyze
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'center', p: 2, borderTop: '1px solid #eee' }}>
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                      Privacy Protection Score: 65/100
                    </Typography>
                    <Box sx={{ 
                      height: 10, 
                      width: '100%', 
                      bgcolor: '#eee',
                      borderRadius: 5,
                      overflow: 'hidden',
                      mb: 2
                    }}>
                      <Box sx={{ 
                        width: '65%', 
                        height: '100%', 
                        background: `linear-gradient(90deg, ${brandColors.green}, ${brandColors.lightGreen})`,
                      }}/>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Moderate privacy protection - See detailed analysis below
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Enter any healthcare website to see its privacy rating
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            {steps.map((step, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  mb: 3
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: step.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                    fontSize: 18,
                    fontWeight: 'bold'
                  }}
                >
                  {step.number}
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: step.color }}>
                    {step.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;