// components/layout/Header.jsx
import React, { useState } from 'react';
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
  useTheme
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { brandColors } from '../../utils/constants';

const navItems = [
  { label: "Home", value: 0 },
  { label: "Problem Background", value: 1 },
  { label: "Our Solution", value: 2 },
  { label: "Search", value: 3 },
  { label: "Aggregate Findings", value: 4 }
];

const Header = ({ activeTab, setActiveTab }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavClick = (tabValue) => {
    setActiveTab(tabValue);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: brandColors.purple, fontWeight: 'bold' }}>
        Privacy Lens
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            disablePadding
            onClick={() => handleNavClick(item.value)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemText 
              primary={item.label} 
              sx={{ 
                textAlign: 'center',
                py: 1,
                color: activeTab === item.value ? brandColors.purple : 'inherit',
                fontWeight: activeTab === item.value ? 'bold' : 'normal'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'black', borderBottom: '1px solid #eaeaea' }}>
        <Toolbar>
          {/* Logo Area */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              flexGrow: 1, 
              cursor: 'pointer' 
            }}
            onClick={() => handleNavClick(0)}
          >
            <img 
              src="/src/assets/pl_banner.png" 
              alt="Privacy Lens Logo"
              style={{ height: '50px', marginRight: '10px' }}
            />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: 'bold', 
                color: brandColors.purple, 
                display: { xs: 'none', sm: 'block' } 
              }}
            >
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
                onClick={() => handleNavClick(item.value)}
                sx={{ 
                  mx: 1, 
                  color: activeTab === item.value ? brandColors.purple : 'text.primary',
                  fontWeight: activeTab === item.value ? 'bold' : 'normal',
                  borderBottom: activeTab === item.value ? `2px solid ${brandColors.purple}` : 'none',
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
    </>
  );
};

export default Header;