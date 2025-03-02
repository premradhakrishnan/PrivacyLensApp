// components/layout/ResponsiveGrid.jsx
import React from 'react';
import { Grid, useTheme, useMediaQuery, Box } from '@mui/material';

/**
 * A responsive grid layout component that adjusts column count based on screen size
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Grid items
 * @param {number} props.mobileColumns - Number of columns on mobile (default: 1)
 * @param {number} props.tabletColumns - Number of columns on tablet (default: 2)
 * @param {number} props.desktopColumns - Number of columns on desktop (default: 3)
 * @param {number|Object} props.spacing - Grid spacing (as MUI Grid spacing prop) 
 * @param {Object} props.sx - Additional styles for the Grid container
 * @param {boolean} props.equalHeight - Force all children to have equal height
 */
const ResponsiveGrid = ({ 
  children, 
  mobileColumns = 1, 
  tabletColumns = 2, 
  desktopColumns = 3,
  spacing = { xs: 2, sm: 2, md: 3 },
  sx = {},
  equalHeight = false
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Convert children to array
  const childrenArray = React.Children.toArray(children);
  
  return (
    <Grid 
      container 
      spacing={spacing}
      sx={sx}
    >
      {childrenArray.map((child, index) => {
        // Calculate column width based on screen size
        let cols;
        if (isMobile) cols = 12 / mobileColumns;
        else if (isTablet) cols = 12 / tabletColumns;
        else cols = 12 / desktopColumns;
        
        return (
          <Grid 
            item 
            key={index} 
            xs={12 / mobileColumns}
            sm={12 / tabletColumns}
            md={12 / desktopColumns}
            sx={{
              height: equalHeight ? '100%' : 'auto',
              display: 'flex'
            }}
          >
            {equalHeight ? (
              <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
                {child}
              </Box>
            ) : child}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ResponsiveGrid;