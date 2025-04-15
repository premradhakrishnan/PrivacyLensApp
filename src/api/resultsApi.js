// api/resultsApi.js

/**
 * Fetches detailed privacy results for a list of domains
 * @param {string[]} domains - List of domains to fetch results for
 * @returns {Promise<Array>} - Results for each domain
 */
export const fetchDetailedResults = async (domains) => {
    try {
      // Use the environment variable instead of hardcoded URL
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log('App apiUrl: ' + apiUrl);
      // Call backend API
      const response = await fetch(`http://127.0.0.1:8000/detailedResults`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ domains }) // pass domains in the request body
      });
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      // Return parsed JSON data
      const data = await response.json();
      console.log("Fetched detailed results:",data);
      return data;
    } catch (error) {
      console.error("Error fetching detailed results:", error);
      throw error;
    }
  };