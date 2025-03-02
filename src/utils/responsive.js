// utils/responsive.js
import { useMediaQuery, useTheme } from '@mui/material';

/**
 * Custom hook to get responsive breakpoint values
 * @returns {Object} Object containing responsive breakpoint flags
 */
export const useResponsive = () => {
  const theme = useTheme();
  
  return {
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    isTablet: useMediaQuery(theme.breakpoints.down('md')),
    isDesktop: useMediaQuery(theme.breakpoints.up('md')),
    isLargeScreen: useMediaQuery(theme.breakpoints.up('lg'))
  };
};

/**
 * Responsive spacing values that change based on screen size
 */
export const responsiveSpacing = {
  // Margin values
  margin: {
    xs: 1,    // 8px on small screens
    sm: 2,    // 16px on medium screens
    md: 3,    // 24px on large screens
    lg: 4     // 32px on extra large screens
  },
  
  // Padding values
  padding: {
    xs: 1,    // 8px on small screens
    sm: 2,    // 16px on medium screens
    md: 3,    // 24px on large screens
    lg: 4     // 32px on extra large screens
  },
  
  // Gap values for flexbox and grid
  gap: {
    xs: 1,    // 8px on small screens
    sm: 2,    // 16px on medium screens
    md: 2.5,  // 20px on large screens
    lg: 3     // 24px on extra large screens
  }
};

/**
 * Returns a responsive value based on breakpoint
 * @param {Object} params - Object with breakpoint keys
 * @param {Object} breakpoints - Current breakpoints
 * @returns {any} The value for the current breakpoint
 */
export const getResponsiveValue = (params, breakpoints) => {
  if (breakpoints.isMobile && params.mobile !== undefined) {
    return params.mobile;
  } else if (breakpoints.isTablet && params.tablet !== undefined) {
    return params.tablet;
  } else {
    return params.desktop || params.default;
  }
};

/**
 * Helper function to generate responsive grid props
 * @param {Object} options - Grid options
 * @returns {Object} Props for Material UI Grid component
 */
export const responsiveGridProps = (options = {}) => {
  const defaults = {
    xs: 12,             // Full width on mobile
    sm: 6,              // Half width on tablets
    md: options.md || 4, // 1/3 width on desktop by default
    spacing: {
      xs: 2,            // 16px spacing on mobile
      sm: 2,            // 16px spacing on tablets
      md: 3             // 24px spacing on desktop
    }
  };
  
  const config = { ...defaults, ...options };
  
  return {
    item: true,
    xs: config.xs,
    sm: config.sm,
    md: config.md,
    lg: config.lg || config.md,
    xl: config.xl || config.lg || config.md
  };
};