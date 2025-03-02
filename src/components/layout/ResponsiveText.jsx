// components/common/ResponsiveText.jsx
import React from 'react';
import { Typography, useTheme, useMediaQuery } from '@mui/material';

/**
 * A responsive typography component that adjusts size based on screen dimensions
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} props.mobileVariant - Typography variant for mobile screens
 * @param {string} props.tabletVariant - Typography variant for tablet screens
 * @param {string} props.desktopVariant - Typography variant for desktop screens
 * @param {string} props.component - HTML component to render as
 * @param {Object} props.sx - Additional MUI styles
 */
const ResponsiveText = ({ 
  children, 
  mobileVariant = 'body1', 
  tabletVariant = 'h6', 
  desktopVariant = 'h5',
  component,
  sx = {},
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Determine which variant to use based on screen size
  let variant;
  if (isMobile) variant = mobileVariant;
  else if (isTablet) variant = tabletVariant;
  else variant = desktopVariant;
  
  return (
    <Typography
      variant={variant}
      component={component || (variant.startsWith('h') ? variant : 'p')}
      sx={sx}
      {...rest}
    >
      {children}
    </Typography>
  );
};

/**
 * Responsive heading component with preset variants
 */
export const ResponsiveHeading = ({ 
  children, 
  level = 1, // 1-6 like h1-h6
  component,
  sx = {},
  ...rest 
}) => {
  // Map level to variants for different screen sizes
  const variantMap = {
    1: { mobile: 'h4', tablet: 'h3', desktop: 'h2' },
    2: { mobile: 'h5', tablet: 'h4', desktop: 'h3' },
    3: { mobile: 'h6', tablet: 'h5', desktop: 'h4' },
    4: { mobile: 'subtitle1', tablet: 'h6', desktop: 'h5' },
    5: { mobile: 'subtitle2', tablet: 'subtitle1', desktop: 'h6' },
    6: { mobile: 'body1', tablet: 'subtitle2', desktop: 'subtitle1' }
  };
  
  const variants = variantMap[level] || variantMap[1];
  
  return (
    <ResponsiveText
      mobileVariant={variants.mobile}
      tabletVariant={variants.tablet}
      desktopVariant={variants.desktop}
      component={component || `h${level}`}
      sx={{
        fontWeight: level <= 3 ? 'bold' : 'medium',
        ...sx
      }}
      {...rest}
    >
      {children}
    </ResponsiveText>
  );
};

export default ResponsiveText;