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

// Score rating thresholds
export const scoreRatings = {
  STRONG: { threshold: 50, label: "Strong", color: brandColors.green },
  MODERATE: { threshold: 20, label: "Moderate", color: "#f3c01d" }, // Yellow
  WEAK: { threshold: 0, label: "Weak", color: "#ff9800" }  // Orange
};

// Maximum possible score (34 questions with max score of 2 each)
export const MAX_SCORE = 68;

// Enumeration to section mapping
export const ENUMERATION_TO_SECTION = {
  "Privacy Document Accessibility": [1, 2, 3, 4],
  "Privacy Document Scope": [5, 6, 7, 8, 9, 10, 11],
  "Browser Storage": [12, 13, 14, 15, 16],
  "Third Party Tracking": [17, 18, 19, 20, 21, 22],
  "Data Handling": [23, 24, 25, 26, 27, 28, 29],
  "Health Data Privacy": [30, 31, 32, 33, 34]
};

// Features data for Key Features section
export const featuresData = [
  {
    title: "Privacy Policy Analysis",
    description: "Instant analysis of health related website privacy policies in our plugin or website.",
    iconComponent: Assignment
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

// Navigation items with route paths
export const navItems = [
  { label: "Home", value: 0, path: "/" },
  { label: "Problem Background", value: 1, path: "/problem-background" },
  { label: "Our Solution", value: 2, path: "/our-solution" },
  { label: "Search", value: 3, path: "/search" },
  { label: "Aggregate Findings", value: 4, path: "/aggregate-findings" },
  { label: 'Comparative Analysis', value: 5 }
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