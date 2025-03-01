// Updated PrivacyDashboard.jsx with improved homepage layout
import React, { useState } from 'react';
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider
} from '@mui/material';
import { 
  Security, 
  Visibility, 
  TrendingUp, 
  Assignment,
  Menu as MenuIcon,
  KeyboardArrowDown
} from '@mui/icons-material';

// Import components
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import GettingStarted from './components/GettingStarted';
import BannerImage from './assets/pl_banner.png';

// Brand colors from your theme
const brandColors = {
  purple: '#7e3dab',
  green: '#8cc43f', 
  lightGreen: '#beed68',
  darkPurple: '#5e2d7f',
  lightPurple: '#a168c9'
};

const PrivacyDashboard = () => {
  // State management
  const [tabValue, setTabValue] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Features data
  const features = [
    {
      title: "Privacy Policy Analysis",
      description: "Instant analysis of health related website privacy policies in our plugin or website.",
      icon: <Assignment sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Our Grading",
      description: "To analyze privacy policies, we use a comprehensive rubric developed by the PrivacyLens team.",
      icon: <Visibility sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Search Functionality",
      description: "Search functionality allows you to find desired websites to analyze privacy policies.",
      icon: <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Aggregate Findings",
      description: "On the aggregate findings page, you can see aggregated findings from all websites analyzed by PrivacyLens.",
      icon: <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    }
  ];

  // Stats data
  const stats = [
    { label: "Websites Analyzed", value: "10,000+" },
    { label: "Active Users", value: "50,000+" },
    { label: "Privacy Issues Identified", value: "25,000+" },
    { label: "Average Response Time", value: "2.5s" }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const navItems = [
    { label: "Home", value: 0 },
    { label: "Problem Background", value: 1 },
    { label: "Our Solution", value: 2 },
    { label: "Search", value: 3 },
    { label: "Aggregate Findings", value: 4 }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: brandColors.purple, fontWeight: 'bold' }}>
        Privacy Lens
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemText 
              primary={item.label} 
              onClick={() => setTabValue(item.value)}
              sx={{ 
                textAlign: 'center',
                py: 1,
                color: tabValue === item.value ? brandColors.purple : 'inherit',
                fontWeight: tabValue === item.value ? 'bold' : 'normal'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* New Header / Navigation */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'black', borderBottom: '1px solid #eaeaea' }}>
        <Toolbar>
          {/* Logo Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img 
              src={BannerImage} 
              alt="Privacy Lens Logo"
              style={{ height: '50px', marginRight: '10px' }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: brandColors.purple, display: { xs: 'none', sm: 'block' } }}>
              Privacy Lens
            </Typography>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button 
                key={item.label}
                onClick={() => setTabValue(item.value)}
                sx={{ 
                  mx: 1, 
                  color: tabValue === item.value ? brandColors.purple : 'text.primary',
                  fontWeight: tabValue === item.value ? 'bold' : 'normal',
                  borderBottom: tabValue === item.value ? `2px solid ${brandColors.purple}` : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    bgcolor: 'transparent',
                    borderBottom: `2px solid ${brandColors.lightPurple}`
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          
          {/* CTA Button */}
          <Button 
            variant="contained" 
            sx={{ 
              ml: 2, 
              bgcolor: brandColors.green, 
              '&:hover': { bgcolor: brandColors.lightGreen, color: '#333' },
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Home Tab - Updated Layout */}
        {tabValue === 0 && (
          <Box>
            {/* Hero Section With Improved Layout */}
            <Card 
              sx={{
                mb: 6,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <CardContent sx={{ 
                py: 8, 
                backgroundImage: 'linear-gradient(135deg, #6140AC 0%, rgb(151, 133, 191) 100%)',
                color: 'white',
                position: 'relative',
                zIndex: 1
              }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={7}>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Understand Privacy Policies at a Glance
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                      Make informed decisions about your health data privacy with our AI-powered analysis tool
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          bgcolor: 'white',
                          color: brandColors.purple,
                          '&:hover': { bgcolor: 'grey.100' },
                          px: 4,
                          py: 1.5
                        }}
                      >
                        Analyze a Website
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: 'white',
                          color: 'white',
                          '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                          px: 4,
                          py: 1.5
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
                    <Security sx={{ fontSize: { xs: 150, md: 200 }, opacity: 0.9 }} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* "Why Privacy Matters" Section */}
            <Box sx={{ mb: 8 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: brandColors.purple
                }}
              >
                Why Privacy Matters in Healthcare
              </Typography>
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" paragraph>
                    Healthcare data is among the most sensitive personal information. When this data is collected online, it's often subject to different rules than in traditional healthcare settings.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Privacy Lens helps bridge this gap by analyzing how websites protect—or expose—your health information.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card elevation={3} sx={{ height: '100%', bgcolor: `${brandColors.lightGreen}20` }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom fontWeight="bold" color={brandColors.purple}>
                        Did you know?
                      </Typography>
                      <Typography variant="body2">
                        Many healthcare websites share your sensitive data with third parties without clear disclosure. 
                        Our analysis found that over 70% of health websites have concerning privacy practices.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Statistics Section with Improved Layout */}
            <Box sx={{ mb: 8 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: brandColors.purple
                }}
              >
                Making an Impact
              </Typography>
              <StatsSection stats={stats} />
            </Box>

            {/* How It Works Section - Redesigned from FeaturesSection */}
            <Box sx={{ mb: 8 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: brandColors.purple
                }}
              >
                How Privacy Lens Works
              </Typography>
              
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <img 
                    src="/api/placeholder/500/350" 
                    alt="How Privacy Lens Works" 
                    style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    {[
                      { 
                        number: 1, 
                        title: "Enter a Healthcare Website", 
                        description: "Simply provide the URL of any healthcare website you want to analyze",
                        color: brandColors.purple
                      },
                      { 
                        number: 2, 
                        title: "AI-Powered Analysis", 
                        description: "Our algorithms scan the privacy policy and evaluate it against our comprehensive rubric",
                        color: brandColors.green
                      },
                      { 
                        number: 3, 
                        title: "Get Detailed Results", 
                        description: "Receive a clear breakdown of how the website handles your data across multiple categories",
                        color: brandColors.purple
                      },
                      { 
                        number: 4, 
                        title: "Make Informed Decisions", 
                        description: "Use our insights to decide which healthcare services best protect your privacy",
                        color: brandColors.green
                      }
                    ].map((step, index) => (
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

            {/* Key Features Section */}
            <Box sx={{ mb: 8 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: brandColors.purple
                }}
              >
                Key Features
              </Typography>
              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card
                      elevation={2}
                      sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': { 
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                        },
                        borderTop: `4px solid ${index % 2 === 0 ? brandColors.purple : brandColors.green}`
                      }}
                    >
                      <Box 
                        sx={{ 
                          mb: 2, 
                          p: 2, 
                          borderRadius: '50%', 
                          bgcolor: index % 2 === 0 ? `${brandColors.lightPurple}30` : `${brandColors.lightGreen}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {React.cloneElement(feature.icon, { 
                          style: { fontSize: 40, color: index % 2 === 0 ? brandColors.purple : brandColors.green } 
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
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* CTA Section */}
            <Box 
              sx={{ 
                py: 6, 
                px: 4, 
                textAlign: 'center', 
                borderRadius: 4, 
                mb: 8,
                bgcolor: `${brandColors.lightGreen}30`,
                boxShadow: '0 8px 32px rgba(140, 196, 63, 0.15)'
              }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: brandColors.purple }}>
                Ready to Protect Your Health Data?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, maxWidth: '700px', mx: 'auto' }}>
                Start analyzing healthcare websites today and take control of your privacy.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ 
                  bgcolor: brandColors.green, 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.1rem',
                  '&:hover': { bgcolor: brandColors.lightGreen, color: '#333' } 
                }}
              >
                Analyze a Website Now
              </Button>
            </Box>

            {/* Getting Started Guide - Simplified */}
            <Box sx={{ mb: 8 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: brandColors.purple
                }}
              >
                Getting Started is Easy
              </Typography>
              
              <Grid container spacing={4}>
                {[
                  { 
                    number: 1, 
                    title: "Install Privacy Lens", 
                    description: "Head to the Chrome Web Store and install the Privacy Lens extension."
                  },
                  { 
                    number: 2, 
                    title: "Start Your Search", 
                    description: "Start the plugin, then do a health related search on Google."
                  },
                  { 
                    number: 3, 
                    title: "See Instant Results", 
                    description: "See the invasiveness of each site listed in the Privacy Lens plugin. Enjoy!"
                  }
                ].map((step, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card
                      sx={{
                        p: 4,
                        height: '100%',
                        bgcolor: '#EFFAD9',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'translateY(-5px)' }
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: brandColors.purple,
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          fontSize: 24,
                          fontWeight: 'bold'
                        }}
                      >
                        {step.number}
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight="bold">
                        {step.title}
                      </Typography>
                      <Typography>
                        {step.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 50,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    bgcolor: brandColors.purple
                  }}
                >
                  Get Started Now
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {/* Other tabs remain unchanged */}
        {tabValue !== 0 && (
          <Typography variant="h5" sx={{ textAlign: 'center', my: 8, color: 'text.secondary' }}>
            Switch to this tab content when selected ({navItems[tabValue].label})
          </Typography>
        )}
      </Container>

      {/* Footer */}
      <Box 
        sx={{ 
          bgcolor: '#f5f5f5', 
          py: 4, 
          borderTop: '1px solid #e0e0e0',
          mt: 4
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom fontWeight="bold" color={brandColors.purple}>
                Privacy Lens
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Making healthcare privacy policies transparent and understandable.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Quick Links
              </Typography>
              <Typography variant="body2" component="a" href="#" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Home
              </Typography>
              <Typography variant="body2" component="a" href="#" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Problem Background
              </Typography>
              <Typography variant="body2" component="a" href="#" sx={{ display: 'block', mb: 1, color: 'text.secondary', textDecoration: 'none' }}>
                Our Solution
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Connect With Us
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                info@privacylens.org
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                {/* Social media icons would go here */}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Privacy Lens. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PrivacyDashboard;