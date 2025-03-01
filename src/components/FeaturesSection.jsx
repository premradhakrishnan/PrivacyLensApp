// components/FeaturesSection.jsx
import React from 'react';
import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';

// If not using theme provider, define colors here
const brandColors = {
  purple: '#7e3dab',
  green: '#8cc43f', 
  lightGreen: '#beed68',
  darkPurple: '#5e2d7f',
  lightPurple: '#a168c9'
};

const FeaturesSection = ({ features }) => {
  const theme = useTheme();
  
  return (
    <>
    <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          mt: 4, 
          fontWeight: 'bold',
          color: brandColors.purple // Use theme color or direct color
        }}
      >Why Privacy Matters in Healthcare</Typography>
<Typography color="text.secondary">Healthcare data is among the most sensitive personal information. When this data is collected online, it's often subject to different rules than in traditional healthcare settings.
</Typography>

Privacy Lens helps bridge this gap by analyzing how websites protect—or expose—your health information.
    <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          mt: 4, 
          fontWeight: 'bold',
          color: brandColors.purple // Use theme color or direct color
        }}
      >
        Our Mission
      </Typography>
      <Typography color="text.secondary">
      Privacy Lens provides users with clear insights into how healthcare websites handle their personal data. We analyze privacy policies to highlight potential risks and empower you to make informed decisions.
      </Typography>
      
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: brandColors.purple }}>How Privacy Lens Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0 mt-1" 
                     style={{ backgroundColor: brandColors.purple }}>1</div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: brandColors.purple }}>Enter a Healthcare Website</h3>
                  <p className="text-gray-600">Simply provide the URL of any healthcare website you want to analyze</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0 mt-1"
                     style={{ backgroundColor: brandColors.green }}>2</div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: brandColors.green }}>AI-Powered Analysis</h3>
                  <p className="text-gray-600">Our algorithms scan the privacy policy and evaluate it against our comprehensive rubric</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0 mt-1"
                     style={{ backgroundColor: brandColors.purple }}>3</div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: brandColors.purple }}>Get Detailed Results</h3>
                  <p className="text-gray-600">Receive a clear breakdown of how the website handles your data across multiple categories</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0 mt-1"
                     style={{ backgroundColor: brandColors.green }}>4</div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: brandColors.green }}>Make Informed Decisions</h3>
                  <p className="text-gray-600">Use our insights to decide which healthcare services best protect your privacy</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img 
              src="/api/placeholder/500/350" 
              alt="How Privacy Lens Works" 
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: brandColors.green }}>
              {/* <Search size={32} color="white" /> */}
            </div>
          </div>
        </div>
      </div>

      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: 4, 
          mt: 4, 
          fontWeight: 'bold',
          color: brandColors.purple // Use theme color or direct color
        }}
      >
        Key Features
      </Typography>
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' },
                borderBottom: `3px solid ${index % 2 === 0 ? brandColors.purple : brandColors.green}`
              }}
            >
              <Box 
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  borderRadius: '50%', 
                  bgcolor: index % 2 === 0 ? `${brandColors.lightPurple}40` : `${brandColors.lightGreen}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {React.cloneElement(feature.icon, { 
                  color: index % 2 === 0 ? brandColors.purple : brandColors.green,
                  style: { fontSize: 40 } 
                })}
              </Box>
              <Typography 
                variant="h6" 
                gutterBottom 
                fontWeight="bold"
                sx={{ 
                  color: index % 2 === 0 ? brandColors.purple : brandColors.green 
                }}
              >
                {feature.title}
              </Typography>
              <Typography color="text.secondary">{feature.description}</Typography>
            </Paper>

            
          </Grid>
        ))}
      </Grid>
      <div className="p-12 text-center rounded-lg mb-16" 
                       style={{ backgroundColor: `${brandColors.lightGreen}30` }}>
                    <h2 className="text-3xl font-bold mb-4" style={{ color: brandColors.purple }}>Ready to Protect Your Health Data?</h2>
                    <p className="text-xl max-w-3xl mx-auto mb-6">
                      Start analyzing healthcare websites today and take control of your privacy.
                    </p>
                    <button className="text-white px-6 py-3 rounded-lg font-medium flex items-center mx-auto transition"
                            style={{ backgroundColor: brandColors.green }}>
                      {/* <Search size={20} className="mr-2" /> */}
                      Analyze a Website Now
                    </button>
                  </div>
    </>
  );
};

export default FeaturesSection;