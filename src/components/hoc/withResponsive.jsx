// components/hoc/withResponsive.jsx
import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

/**
 * Higher-Order Component that adds responsive props to any component
 * 
 * @param {React.ComponentType} Component - The component to enhance with responsive features
 * @returns {React.ComponentType} - Enhanced component with responsive props
 */
const withResponsive = (Component) => {
  // Return a new component with added responsive props
  const WithResponsive = (props) => {
    const theme = useTheme();
    
    // Create responsive breakpoint flags
    const responsiveProps = {
      isMobile: useMediaQuery(theme.breakpoints.down('sm')),
      isTablet: useMediaQuery(theme.breakpoints.down('md')),
      isDesktop: useMediaQuery(theme.breakpoints.up('md')),
      isLargeScreen: useMediaQuery(theme.breakpoints.up('lg')),
      
      // Helper functions for responsive values
      getResponsiveValue: (mobileValue, tabletValue, desktopValue) => {
        if (useMediaQuery(theme.breakpoints.down('sm'))) return mobileValue;
        if (useMediaQuery(theme.breakpoints.down('md'))) return tabletValue;
        return desktopValue;
      },
      
      // Responsive spacing helpers
      spacing: {
        xs: useMediaQuery(theme.breakpoints.down('sm')) ? 1 : 2,
        sm: useMediaQuery(theme.breakpoints.down('sm')) ? 2 : 3,
        md: useMediaQuery(theme.breakpoints.down('sm')) ? 3 : 4,
        lg: useMediaQuery(theme.breakpoints.down('sm')) ? 4 : 5
      },
      
      // Breakpoint-specific classes
      responsiveClasses: {
        fullWidthOnMobile: useMediaQuery(theme.breakpoints.down('sm')) ? 'mobile-full-width' : '',
        stackOnMobile: useMediaQuery(theme.breakpoints.down('sm')) ? 'mobile-stack' : '',
        hideOnMobile: useMediaQuery(theme.breakpoints.down('sm')) ? 'desktop-only' : ''
      }
    };
    
    // Pass the responsive props to the wrapped component
    return <Component {...props} responsive={responsiveProps} />;
  };
  
  // Display name for debugging
  WithResponsive.displayName = `WithResponsive(${Component.displayName || Component.name || 'Component'})`;
  
  return WithResponsive;
};

export default withResponsive;