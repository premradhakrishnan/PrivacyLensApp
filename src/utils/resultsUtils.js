// utils/resultsUtils.js
import { brandColors, scoreRatings, MAX_SCORE, ENUMERATION_TO_SECTION } from './constants';

/**
 * Groups assessment scores by section using the enumeration-to-section mapping
 * @param {Array} scores - Assessment scores 
 * @returns {Object} - Scores grouped by section
 */
export const groupScoresBySection = (scores) => {
  if (!scores || !Array.isArray(scores)) return {};
  
  const groupedScores = {};
  
  // Initialize all sections from mapping
  Object.keys(ENUMERATION_TO_SECTION).forEach(section => {
    groupedScores[section] = [];
  });
  
  // Add scores to corresponding sections
  scores.forEach(item => {
    // Find the section for this enumeration
    const enumNumber = parseInt(item.enumeration);
    const section = findSectionByEnumeration(enumNumber);
    
    if (section) {
      if (!groupedScores[section]) {
        groupedScores[section] = [];
      }
      groupedScores[section].push(item);
    }
  });
  
  return groupedScores;
};

/**
 * Finds the section name for a given enumeration number
 * @param {number} enumNumber - The enumeration number
 * @returns {string|null} - Section name or null if not found
 */
export const findSectionByEnumeration = (enumNumber) => {
  for (const [section, enums] of Object.entries(ENUMERATION_TO_SECTION)) {
    if (enums.includes(enumNumber)) {
      return section;
    }
  }
  return null;
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
  
  // Color based on score rating thresholds
  if (score >= scoreRatings.STRONG.threshold) return scoreRatings.STRONG.color;
  if (score >= scoreRatings.MODERATE.threshold) return scoreRatings.MODERATE.color;
  return scoreRatings.WEAK.color;
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
  
  // Rating based on thresholds
  if (score >= scoreRatings.STRONG.threshold) return scoreRatings.STRONG.label;
  if (score >= scoreRatings.MODERATE.threshold) return scoreRatings.MODERATE.label;
  return scoreRatings.WEAK.label;
};

/**
 * Returns formatted score display 
 * @param {number} score - The score value
 * @param {number} maxScore - Maximum possible score
 * @returns {string} - Formatted score text
 */
export const getScoreDisplay = (score, maxScore = MAX_SCORE) => {
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

/**
 * Calculates the section score from individual items
 * @param {Array} items - Array of assessment items for a section
 * @returns {Object} - Object with score, maxPossible, and percentage
 */
export const calculateSectionScore = (items) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return { score: 0, maxPossible: 0, percentage: 0 };
  }
  
  const score = items.reduce((acc, item) => acc + parseInt(item.score || 0), 0);
  const maxPossible = items.length * 2; // Each item can have a max score of 2
  const percentage = maxPossible > 0 ? (score / maxPossible) * 100 : 0;
  
  return { score, maxPossible, percentage };
};

/**
 * Get score level text based on score value (0, 1, or 2)
 * @param {number} score - The score value (0, 1, or 2)
 * @returns {Object} - Object with label and color
 */
export const getScoreLevelInfo = (score) => {
  score = parseInt(score);
  
  switch(score) {
    case 2:
      return { label: "Excellent", color: brandColors.green };
    case 1:
      return { label: "Partial", color: "#f3c01d" }; // Yellow
    case 0:
      return { label: "Missing", color: "#f44336" }; // Red
    default:
      return { label: "N/A", color: "#9e9e9e" }; // Gray
  }
};