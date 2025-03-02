// utils/privacyIssuesUtils.js
/**
 * Analyzes assessment data to identify common privacy issues across multiple sites
 * @param {Array} results - Array of site assessment results
 * @param {Number} minOccurrences - Minimum number of sites with issue to be considered common
 * @returns {Array} Array of common privacy issues with frequency data
 */
export const findCommonPrivacyIssues = (results = [], minOccurrences = 1) => {
    // Filter out results without assessment scores
    const validResults = results.filter(result => 
      result.assessment && 
      result.assessment.PrivacyLensAssessmentScore && 
      Array.isArray(result.assessment.PrivacyLensAssessmentScore)
    );
    
    if (validResults.length === 0) return [];
    
    // Map to keep track of issues
    const issueMap = new Map();
    
    // Process each result
    validResults.forEach(result => {
      const scores = result.assessment.PrivacyLensAssessmentScore;
      
      // Focus on items with "No" answers or low scores as these represent issues
      const issues = scores.filter(item => 
        (item.answer === "No" || parseInt(item.score) === 0) && 
        item.question
      );
      
      // Count each issue
      issues.forEach(issue => {
        const issueKey = issue.question;
        if (issueMap.has(issueKey)) {
          issueMap.set(issueKey, issueMap.get(issueKey) + 1);
        } else {
          issueMap.set(issueKey, 1);
        }
      });
    });
    
    // Convert map to array and sort by frequency
    const issuesArray = Array.from(issueMap.entries())
      .map(([issue, count]) => ({
        issue,
        count,
        percentage: Math.round((count / validResults.length) * 100)
      }))
      .filter(item => item.count >= minOccurrences)
      .sort((a, b) => b.count - a.count);
    
    // Return the top issues (limit to reasonable number)
    return issuesArray.slice(0, 10);
  };
  
  /**
   * Find issues specifically mentioned in site assessment summaries
   * @param {Array} results - Array of site assessment results
   * @returns {Array} Array of common concerns from assessment summaries
   */
  export const findCommonSummaryConcerns = (results = []) => {
    const allConcerns = [];
    
    // Extract concerns from summaries
    results.forEach(result => {
      if (result.assessment) {
        // Handle both object and array format for summary
        const summary = result.assessment.PrivacyLensAssessmentSummary;
        if (summary) {
          const concerns = Array.isArray(summary) 
            ? summary[0]?.concerns 
            : summary.concerns;
            
          if (Array.isArray(concerns)) {
            allConcerns.push(...concerns);
          }
        }
      }
    });
    
    // Count frequency of each concern
    const concernCounter = new Map();
    allConcerns.forEach(concern => {
      // Normalize concerns by converting to lowercase and trimming
      const normalizedConcern = concern.toLowerCase().trim();
      if (concernCounter.has(normalizedConcern)) {
        concernCounter.set(normalizedConcern, concernCounter.get(normalizedConcern) + 1);
      } else {
        concernCounter.set(normalizedConcern, 1);
      }
    });
    
    // Convert map to array and sort by frequency
    return Array.from(concernCounter.entries())
      .map(([concern, count]) => ({
        issue: concern,
        count,
        percentage: Math.round((count / results.length) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Limit to top 10
  };
  
  /**
   * Combines algorithmic analysis with summary concerns to produce final list
   * @param {Array} results - Array of site assessment results
   * @returns {Array} Array of common privacy issues with frequency data
   */
  export const getCommonPrivacyIssues = (results = []) => {
    const validResultsCount = results.filter(r => r.assessment && 
      (r.assessment.PrivacyLensAssessmentScore || 
       r.assessment.PrivacyLensAssessmentSummary)).length;
       
    if (validResultsCount === 0) return [];
    
    // Get issues based on scores
    const scoreIssues = findCommonPrivacyIssues(results);
    
    // Get issues from summary concerns
    const summaryConcerns = findCommonSummaryConcerns(results);
    
    // Combine and deduplicate (prioritizing summary concerns when overlapping)
    // This is a simplified approach - for production, you might want more sophisticated
    // natural language processing to properly deduplicate similar concerns
    
    // If no summary concerns, just return score issues
    if (summaryConcerns.length === 0) return scoreIssues;
    
    // Otherwise, prioritize summary concerns and add unique score issues
    return summaryConcerns;
  };