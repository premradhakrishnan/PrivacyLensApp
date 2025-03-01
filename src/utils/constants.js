// utils/constants.js
// Import icons but don't use JSX directly in this file
import { 
  Security, 
  Visibility, 
  TrendingUp, 
  Assignment 
} from '@mui/icons-material';

// Brand colors
export const brandColors = {
  purple: '#7e3dab',
  green: '#8cc43f', 
  lightGreen: '#beed68',
  darkPurple: '#5e2d7f',
  lightPurple: '#a168c9'
};

// Features data for Key Features section
// Instead of JSX, we'll export the icon component itself
export const featuresData = [
  {
    title: "Privacy Policy Analysis",
    description: "Instant analysis of health related website privacy policies in our plugin or website.",
    iconComponent: Assignment // Just export the component reference, not JSX
  },
  {
    title: "Our Grading",
    description: "To analyze privacy policies, we use a comprehensive rubric developed by the PrivacyLens team.",
    iconComponent: Visibility
  },
  {
    title: "Search Functionality",
    description: "Search functionality allows you to find desired websites to analyze privacy policies.",
    iconComponent: Security
  },
  {
    title: "Aggregate Findings",
    description: "On the aggregate findings page, you can see aggregated findings from all websites analyzed by PrivacyLens.",
    iconComponent: TrendingUp
  }
];

// Stats data for Statistics section
export const statsData = [
  { label: "Websites Analyzed", value: "10,000+" },
  { label: "Active Users", value: "50,000+" },
  { label: "Privacy Issues Identified", value: "25,000+" },
  { label: "Average Response Time", value: "2.5s" }
];

// Navigation items
export const navItems = [
  { label: "Home", value: 0 },
  { label: "Problem Background", value: 1 },
  { label: "Our Solution", value: 2 },
  { label: "Search", value: 3 },
  { label: "Aggregate Findings", value: 4 }
];

// Getting started steps
export const gettingStartedSteps = [
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
];