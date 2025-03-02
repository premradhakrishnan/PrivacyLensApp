// utils/resultsUtils.js
import { brandColors } from './constants';

/**
 * Groups assessment scores by section
 * @param {Array} scores - Assessment scores 
 * @returns {Object} - Scores grouped by section
 */
export const groupScoresBySection = (scores) => {
  if (!scores || !Array.isArray(scores)) return {};
  
  const groupedScores = {};
  scores.forEach(item => {
    if (!groupedScores[item.section]) {
      groupedScores[item.section] = [];
    }
    groupedScores[item.section].push(item);
  });
  
  return groupedScores;
};

/**
 * Returns appropriate color based on score
 * @param {number} score - The score value
 * @returns {string} - Color hex code
 */
export const getScoreColor = (score) => {
  // Return neutral gray for unavailable scores
  if (score === null || score === undefined || isNaN(score)) {
    return '#9e9e9e';
  }
  
  // Color based on score value
  if (score >= 25) return brandColors.green;
  if (score >= 20) return "#8cc43f"; // Light green
  if (score >= 15) return "#f3c01d"; // Yellow
  if (score >= 10) return "#ff9800"; // Orange
  return "#f44336"; // Red
};

/**
 * Returns rating text based on score
 * @param {number} score - The score value
 * @returns {string} - Rating text
 */
export const getScoreRating = (score) => {
  // Handle unavailable scores
  if (score === null || score === undefined || isNaN(score)) {
    return "Score Not Available";
  }
  
  // Normal rating logic
  if (score >= 25) return "Excellent";
  if (score >= 20) return "Good";
  if (score >= 15) return "Adequate";
  if (score >= 10) return "Concerning";
  return "Poor";
};

/**
 * Returns formatted score display 
 * @param {number} score - The score value
 * @param {number} maxScore - Maximum possible score
 * @returns {string} - Formatted score text
 */
export const getScoreDisplay = (score, maxScore = 30) => {
  if (score === null || score === undefined || isNaN(score)) {
    return "N/A";
  }
  return `${score}/${maxScore}`;
};

/**
 * Calculate average score from a list of sites
 * @param {Array} sites - List of site data objects
 * @returns {string|null} - Formatted average score or null
 */
export const calculateAverageScore = (sites) => {
  const availableScores = sites.filter(site => 
    site.finalScore !== null && site.finalScore !== undefined && !isNaN(site.finalScore)
  );
  
  if (availableScores.length === 0) return null;
  
  const sum = availableScores.reduce((acc, site) => acc + site.finalScore, 0);
  return (sum / availableScores.length).toFixed(1);
};

/**
 * Find highest score from a list of sites
 * @param {Array} sites - List of site data objects
 * @returns {number|null} - Highest score or null
 */
export const findHighestScore = (sites) => {
  const availableScores = sites.filter(site => 
    site.finalScore !== null && site.finalScore !== undefined && !isNaN(site.finalScore)
  );
  
  if (availableScores.length === 0) return null;
  return Math.max(...availableScores.map(site => site.finalScore));
};

/**
 * Find lowest score from a list of sites
 * @param {Array} sites - List of site data objects
 * @returns {number|null} - Lowest score or null
 */
export const findLowestScore = (sites) => {
  const availableScores = sites.filter(site => 
    site.finalScore !== null && site.finalScore !== undefined && !isNaN(site.finalScore)
  );
  
  if (availableScores.length === 0) return null;
  return Math.min(...availableScores.map(site => site.finalScore));
};