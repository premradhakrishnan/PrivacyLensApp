// src/theme.js
import { createTheme } from '@mui/material/styles';

// Brand colors based on logo (from PrivacyDashboard1.jsx)
const brandColors = {
  purple: '#7e3dab',
  green: '#8cc43f', 
  lightGreen: '#beed68',
  darkPurple: '#5e2d7f',
  lightPurple: '#a168c9'
};

const theme = createTheme({
  palette: {
    primary: {
      main: brandColors.purple,
      light: brandColors.lightPurple,
      dark: brandColors.darkPurple,
      contrastText: '#fff',
    },
    secondary: {
      main: brandColors.green,
      light: brandColors.lightGreen,
      dark: '#72a32f',
      contrastText: '#fff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "Avenir", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: brandColors.purple,
          '&:hover': {
            backgroundColor: brandColors.darkPurple,
          },
        },
        containedSecondary: {
          backgroundColor: brandColors.green,
          '&:hover': {
            backgroundColor: '#72a32f',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;