// hooks/useResponsiveHooks.js
import { useState, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

/**
 * Hook that returns responsive screen breakpoint flags
 * @returns {Object} Object containing responsive screen flags
 */
export const useScreenSize = () => {
  const theme = useTheme();
  
  return {
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    isTablet: useMediaQuery(theme.breakpoints.down('md')),
    isDesktop: useMediaQuery(theme.breakpoints.up('md')),
    isLargeScreen: useMediaQuery(theme.breakpoints.up('lg')),
    isExtraLargeScreen: useMediaQuery(theme.breakpoints.up('xl'))
  };
};

/**
 * Hook that returns a value specific to the current screen size
 * @param {any} mobileValue - Value for mobile screens (xs-sm)
 * @param {any} tabletValue - Value for tablet screens (md)
 * @param {any} desktopValue - Value for desktop screens (lg+)
 * @returns {any} The appropriate value for current screen size
 */
export const useResponsiveValue = (mobileValue, tabletValue, desktopValue) => {
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  
  if (isMobile) return mobileValue;
  if (isTablet) return tabletValue;
  return desktopValue;
};

/**
 * Hook that tracks window dimensions
 * @returns {Object} Current window width and height
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
};

/**
 * Hook that provides scroll position
 * @returns {Object} Object with scroll position and utilities
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: window.scrollX,
    scrollY: window.scrollY
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        scrollX: window.scrollX,
        scrollY: window.scrollY
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return {
    ...scrollPosition,
    isScrolled: scrollPosition.scrollY > 50,
    scrollToTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    scrollToPosition: (position) => window.scrollTo({ top: position, behavior: 'smooth' })
  };
};

/**
 * Hook that detects touch vs non-touch devices
 * @returns {boolean} True if touch device is detected
 */
export const useTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    
    setIsTouch(isTouchDevice);
  }, []);
  
  return isTouch;
};

/**
 * Hook for handling orientation changes
 * @returns {string} Current orientation ('portrait' or 'landscape')
 */
export const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );
  
  useEffect(() => {
    const handleResize = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return orientation;
};