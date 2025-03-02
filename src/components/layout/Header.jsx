// components/layout/EnhancedHeader.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Slide,
  Container,
  Avatar
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { brandColors } from '../../utils/constants';
import { navItems } from '../../utils/constants';

/**
 * Enhanced header with improved mobile experience
 * Features: collapsible on scroll, smooth animations, improved mobile menu
 */
const EnhancedHeader = ({ activeTab, setActiveTab }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle scroll events to collapse/expand header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (tabValue) => {
    setActiveTab(tabValue);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // More modern mobile drawer with animation and full-screen design
  const drawer = (
    <Box 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'white'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 3, // Increased padding
        borderBottom: '1px solid #eaeaea'
      }}>
        <Typography variant="h6" sx={{ color: brandColors.purple, fontWeight: 'bold' }}>
          Privacy Lens
        </Typography>
        <IconButton onClick={handleDrawerToggle} edge="end" aria-label="close menu">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ flex: 1, py: 2, px: 3 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            disablePadding
            onClick={() => handleNavClick(item.value)}
            sx={{ 
              cursor: 'pointer',
              py: 0.5,
              mb: 1.5, // Add margin between items
              borderRadius: '8px', // Rounded corners for items
              '&:hover': {
                bgcolor: '#f5f5f5', // Light background on hover
              },
              ...(activeTab === item.value && {
                bgcolor: `${brandColors.purple}15`, // Very light purple background for active item
              })
            }}
          >
            <ListItemText 
              primary={item.label} 
              sx={{ 
                textAlign: 'left', // Left-align text
                px: 2, // Horizontal padding inside items
                py: 1.5,
                color: activeTab === item.value ? brandColors.purple : 'inherit',
                fontWeight: activeTab === item.value ? 'bold' : 'normal',
                '& .MuiTypography-root': {
                  fontSize: '1.1rem'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ p: 3, borderTop: '1px solid #eaeaea' }}>
        <Button 
          variant="contained" 
          fullWidth
          onClick={() => handleNavClick(3)} // Navigate to Search
          sx={{ 
            bgcolor: brandColors.green, 
            py: 1.5,
            '&:hover': { bgcolor: brandColors.lightGreen, color: '#333' }
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Slide appear={false} direction="down" in={!scrolled}>
        <AppBar 
          position="sticky" 
          elevation={scrolled ? 2 : 0} 
          sx={{ 
            bgcolor: 'white', 
            color: 'black', 
            borderBottom: scrolled ? 'none' : '1px solid #eaeaea',
            transition: 'all 0.3s ease'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar 
              sx={{ 
                height: scrolled && !isSmallMobile ? '70px' : (isSmallMobile ? '70px' : '90px'),
                px: isSmallMobile ? 1 : 2,
                transition: 'height 0.3s ease'
              }}
            >
              {/* Logo Area - Simplified for mobile */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  flexGrow: 1, 
                  cursor: 'pointer',
                  maxHeight: '100%',
                  overflow: 'hidden'
                }}
                onClick={() => handleNavClick(0)}
              >
                <img 
                  src="/src/assets/pl_banner.png" 
                  alt="Privacy Lens Logo"
                  style={{ 
                    height: isSmallMobile ? '60px' : (scrolled ? '70px' : '90px'),
                    marginRight: '10px',
                    transition: 'height 0.3s ease'
                  }}
                />
                
                {/* Show text logo on very small screens */}
                {isSmallMobile && (
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      color: brandColors.purple,
                      display: { xs: 'block', sm: 'none' }
                    }}
                  >
                    Privacy Lens
                  </Typography>
                )}
              </Box>

              {/* Mobile Menu Button - Better tap target */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  mr: isSmallMobile ? 0 : 1, 
                  display: { md: 'none' },
                  padding: '12px' // Larger tap target
                }}
              >
                <MenuIcon />
              </IconButton>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.label}
                    onClick={() => handleNavClick(item.value)}
                    sx={{ 
                      mx: 1, 
                      color: activeTab === item.value ? brandColors.purple : 'text.primary',
                      fontWeight: activeTab === item.value ? 'bold' : 'normal',
                      borderBottom: activeTab === item.value ? `2px solid ${brandColors.purple}` : 'none',
                      borderRadius: 0,
                      py: 1,
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
              
              {/* CTA Button - Hidden on smallest screens */}
              <Button 
                variant="contained" 
                onClick={() => handleNavClick(3)} // Navigate to Search
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
          </Container>
        </AppBar>
      </Slide>

      {/* Improved Mobile Navigation Drawer with slide animation */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: isSmallMobile ? '100%' : 280,
            borderRadius: isSmallMobile ? 0 : '0 0 0 16px'
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default EnhancedHeader;