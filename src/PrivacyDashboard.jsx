import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Paper,
  useTheme, Slider
} from '@mui/material';
import { 
  Security, 
  Visibility, 
  TrendingUp, 
  Assignment 
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Import components
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import ChatWindow from './components/ChatWindow';
import SearchSection from './components/SearchSection';
import GettingStarted from './components/GettingStarted';

import BannerImage from './assets/pl_banner.png';

const PrivacyDashboard = () => {
  // State management
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [searchResults, setSearchResults] = useState([]);

  // Features data
  const features = [
    {
      title: "Privacy Policy Analysis",
      description: "Instant analysis of health related website privacy policies in our plugin or website.",
      icon: <Assignment sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Our Grading",
      description: "To analyze privacy policies, we use a comprehensive rubric developed by the PrivacyLens team.",
      icon: <Visibility sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Search Functionality",
      description: "Search functionality allows you to find desired websites to analyze privacy policies.",
      icon: <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Aggregate Findings",
      description: "On the aggregate findings page, you can see aggregated findings from all websites analyzed by PrivacyLens.",
      icon: <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    }
  ];

  // Stats data
  const stats = [
    { label: "Websites Analyzed", value: "10,000+" },
    { label: "Active Users", value: "50,000+" },
    { label: "Privacy Issues Identified", value: "25,000+" },
    { label: "Average Response Time", value: "2.5s" }
  ];

  const createBins = (data, numBins) => {
    const scores = data.map((item) => item.score); // Extract all scores
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    const binSize = (max - min) / numBins;

    // Generate bins and count occurrences within each bin
    const binnedData = Array.from({ length: numBins }, (_, index) => {
      const binStart = min + index * binSize;
      const binEnd = binStart + binSize;

      return {
        binLabel: `${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`, // Label for the bin
        value: scores.filter((score) => score >= binStart && score < binEnd).length,
      };
    });

    return binnedData;
  };

  // eslint-disable-next-line react/prop-types
  const ScoreChart = ({ data, title, color }) => {
    const [numBins, setNumBins] = useState(5); // Default number of bins

    // Recalculate binned data when numBins changes
    const binnedData = createBins(data, numBins);

    return (
        <Box
            style={{
              marginBottom: '60px', // Ensure enough space below each ScoreChart
              padding: '24px', // Consistent padding inside the component
              border: '1px solid #e0e0e0', // Optional border for better clarity
              borderRadius: '8px', // Rounded corners
            }}
        >
          {/* Slider Section */}
          <Box
              style={{
                paddingBottom: '20px', // Add space between slider and chart
                marginBottom: '20px', // Ensure spacing between slider and chart logic
                borderBottom: '1px solid #ddd', // Optional visual separation
              }}
          >
            <Typography variant="h6" gutterBottom>
              Adjust Number of Bins
            </Typography>
            <Slider
                value={numBins}
                min={1}
                max={20}
                step={1}
                onChange={(e, newValue) => setNumBins(newValue)}
                valueLabelDisplay="auto"
                style={{
                  width: '90%', // Center alignment and constraint to prevent overflow
                  margin: '0 auto', // Center horizontally
                }}
            />
          </Box>

          {/* Chart Section */}
          <Box>
            <Typography
                variant="h5"
                align="center"
                gutterBottom
                style={{ marginBottom: '16px' }}
            >
              {title}
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={binnedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="binLabel" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={color} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
    );
  };

  // Search handler
  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      // Send POST request
        const postResponse = await fetch(`${import.meta.env.VITE_API_URL}/searchresults`, {
        //const postResponse = await fetch(` http://127.0.0.1:8000/searchresults`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }), // Ensure searchQuery is being passed correctly
      });

      // Check for response success
      if (!postResponse.ok) {
        throw new Error(`POST request failed with status: ${postResponse.status}`);
      }

      // Parse JSON data from response
      const responseData = await postResponse.json();

      // Log the response to see its structure
      console.log("Received Response:", responseData);

      // Example of storing the "data" object in a React state (if using React)
      setSearchResults(responseData.data); // Assuming setSearchResults is a state updater function
      console.log("Search Results:", searchResults);

    } catch (error) {
      console.error("Error while making the POST request:", error);
    } finally {
      setIsLoading(false);
    }
  };



  // Chat message handler
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      setChatMessages(prev => [...prev, { text: messageInput, sender: 'user' }]);
      setMessageInput('');
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev, 
          { text: "Thank you for your question. How else can I help?", sender: 'bot' }
        ]);
      }, 1000);
    }
  };

  const [chartData, setChartData] = useState(null); // Store all chart data here
  const [fetchError, setFetchError] = useState(null); // Renamed error to fetchError

  useEffect(() => {
    const fetchAllCharts = async () => {
      try {
        console.log("API URL:", import.meta.env.VITE_API_URL);
        //const response = await fetch(`http://localhost:8000/getAllCharts`); // API call
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getAllCharts`); // API call
        if (!response.ok) {
          throw new Error(`Error fetching charts: ${response.statusText}`);
        }
        const result = await response.json();
        if (result.status === 'success') {
          setChartData(result.data); // Save the chart data structure
        } else {
          setFetchError(result.message || 'Unknown error occurred'); // Handle backend-specific errors
        }
      } catch (error) {
        console.error('Failed to fetch charts:', error);
        setFetchError(`Failed to fetch chart data: ${error.message}`); // Set fetchError for API errors
      }
    };

    fetchAllCharts();
  }, []);


  if (!chartData && !fetchError) {
    return <div>Loading chart data...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }


  return (
    <Container maxWidth="lg">
        {/* Banner Image */}
      <Box 
        sx={{ 
          width: '80%',
          position: 'relative',
          mb: 4,
          '& img': {
            width: '80%',
          }
        }}
      >
        <img 
          src={BannerImage} 
          alt="Privacy Dashboard Banner"
        />

      </Box>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        {/* Navigation Tabs */}
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ mb: 4 }}
        >
          <Tab label="Home" />
          <Tab label="Problem Background" />
          <Tab label="Our Solution" />
          <Tab label="Search" />
          <Tab label="Aggregate Findings" />
        </Tabs>

        {/* Home Tab */}
        {tabValue === 0 && (
          <Box>
            <HeroSection />
            <FeaturesSection features={features} />
            <GettingStarted />
          </Box>
        )}

        {/* Search Results Tab */}
        {tabValue === 3 && (
          <Box style={{
            width: '100%',
            minWidth: '1200px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px', // Add consistent padding inside the container
          }}>
            <SearchSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                error={error}
                searchResults={searchResults} // Pass the state directly
                isLoading={isLoading}
            />
          </Box>
        )}

        {tabValue === 4 && (
            <div className="page-container"
                 style={{
                   width: '100%',
                   minWidth: '1200px',
                   maxWidth: '1200px',
                   margin: '0 auto',
                   padding: '20px', // Add consistent padding inside the container
                 }}
            >
              {/* Render charts 1 through 6 */}
              {['chart1', 'chart2', 'chart3', 'chart4', 'chart5', 'chart6'].map((chartId, index) => {
                // Define specific titles for each chart
                const chartTitles = [
                  'Distribution of Invasiveness Scores',
                  'Distribution of Scope Scores',
                  'Distribution of Storage Scores',
                  'Distribution of Tracking Scores',
                  'Distribution of Handling Scores',
                  'Distribution of Access Scores',
                ];

                // Define specific colors for each chart
                const chartColors = [
                  '#007bff', // Blue for chart 1
                  '#28a745', // Green for chart 2
                  '#ffc107', // Yellow for chart 3
                  '#dc3545', // Red for chart 4
                  '#17a2b8', // Teal for chart 5
                  '#6f42c1', // Purple for chart 6
                ];

                return (
                    <div
                        key={chartId}
                        style={{
                          marginBottom: '50px', // Increased space between charts
                          padding: '20px',
                          border: '1px solid #ddd', // Optional: add border for clarity
                          borderRadius: '8px', // Optional: rounded corners for distinction
                          backgroundColor: '#f9f9f9', // Optional: light background for charts
                        }}
                    >
                      <ScoreChart
                          data={chartData[chartId]} // Data for the chart
                          title={chartTitles[index]} // Assign specific titles based on index
                          color={chartColors[index]} // Assign specific colors based on index
                      />
                    </div>
                );
              })}

              {/* Render cumulative chart for domains */}
              <div
                  style={{
                    marginTop: '50px',
                    padding: '30px',
                    border: '1px solid #ddd', // Optional: add border for clarity
                    borderRadius: '8px', // Optional: rounded corners for distinction
                    backgroundColor: '#f9f9f9', // Optional: light background for cumulative chart
                  }}
              >
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
                  Distribution of Cumulative Domains
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                      data={chartData['chart7']}
                      margin={{ top: 20, right: 30, left: 50, bottom: 100 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date_added"
                        label={{ value: 'Date Added', position: 'bottom', offset: 50 }}
                        angle={-45}
                        textAnchor="end"
                        dy={0}
                        tickFormatter={(value) => value.substring(0, 10)}
                    />
                    <YAxis
                        label={{
                          value: 'Cumulative Count',
                          angle: -90,
                          position: 'left',
                          offset: 0,
                        }}
                    />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="cumulative_count"
                        stroke="#8884d8" // Keep consistent stroke color for cumulative chart
                        activeDot={{ r: 8 }}
                        isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
        )}

        {/* About Our Rubric Tab */}
        {tabValue === 2 && (
          <Card style={{
            width: '100%',
            minWidth: '1200px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px', // Add consistent padding inside the container
          }}>
            <CardHeader title="Building on the Shoulders of Past Researchers" />
            <CardContent>
              <Typography variant="body1" paragraph align="left">
                The paper <a href="https://people.eecs.berkeley.edu/~tygar/papers/Buck.pdf" target="_blank" rel="noopener noreferrer">Systematic Analysis and Evaluation of Web Privacy Policies and Implementations</a>, authored by <strong>Brad Miller, Kaitlyn Buck, and J.D. Tygar</strong> of UC Berkeley and Microsoft in 2012, presents a framework for evaluating website privacy policies. It critiques existing privacy disclosures, highlighting their complexity and inaccessibility to average users. The authors propose a structured rubric that assesses transparency, data handling, and user control, combining legal, technical, and usability perspectives. The paper also discusses how websites often fail to comply with their stated privacy policies and the challenges of enforcing meaningful privacy protections.
              </Typography>
            </CardContent>
            <CardHeader title="What has Changed Since 2012?" />
            <CardContent>
              <Typography variant="body1" paragraph align="left">
                Since the paper’s publication, privacy regulations and industry practices have evolved significantly. The EU’s GDPR (2018) and the California CCPA (2020) introduced stricter requirements for user consent, data access, and transparency. Academic studies have highlighted that privacy policies remain difficult to read, leading to the adoption of simplified privacy notices, layered disclosures, and AI-driven privacy summaries.
              </Typography>
              <Typography variant="body1" paragraph align="left">
                Additionally, technical research has exposed loopholes in enforcement, with companies continuing to track users despite opt-out mechanisms. Studies have also evaluated the usability of privacy controls, emphasizing that users rarely adjust default settings due to interface complexity. The modernized rubric reflects these insights by stressing explicit opt-in/opt-out options, user control over tracking, and improved transparency in data collection.
              </Typography>
            </CardContent>
            <CardHeader title="Modern Times Requre Modern Solutions" />
            <CardContent>
              <Typography variant="body1" paragraph align="left">
                The original Berkeley rubric focused on policy accessibility, comprehensibility, and enforcement, evaluating whether websites aligned with their stated privacy commitments. It analyzed data collection transparency, security measures, and third-party sharing, but lacked explicit attention to modern tracking methods (e.g., fingerprinting, persistent identifiers beyond cookies).
              </Typography>
              <Typography variant="body1" paragraph align="left">
                The PrivacyLens rubric expands upon this foundation by incorporating newer privacy concerns, such as device fingerprinting and cross-platform tracking. It also emphasizes user rights, including data modification, deletion, and retention limits—which were not as prominent in the original study. Additionally, the PrivacyLens rubric accounts for opt-out mechanisms and granular consent options, aligning it with contemporary privacy laws.
              </Typography>
              <Typography variant="body1" paragraph align="left">
                The intent and ethos behind PrivacyLens is to provide users with as much information as they want and need in order to browse health-care websites safely. While the current iteration of the rubric accounts for many different types of metrics and focus areas, there is always room for improvement. With that said, PrivacyLens has the entire rubric along with the LLM’s Master Prompt posted in order to provide maximum visibility and awareness to PrivacyLens’s users. Our team welcomes feedback and recommendations as it can only help everyone.
              </Typography>
            </CardContent>
            <CardHeader title="PrivacyLens Scoring" />
            <CardContent>
              <Typography variant="body1" paragraph align="left">
                The PrivacyLens rubric consists of 29 metrics across 5 major categories to properly score websites’ privacy policies. A Large Language Model, ChatGPT, is being utilized to automatically assess each website’s privacy policy according to the rubric, providing a repeatable and quick method of scoring. While an LLM is a powerful tool in these assessments, it is important to understand the standard in which these policies are being graded.
              </Typography>
              <Typography variant="body1" paragraph align="left">
                Currently, the rubric consists of 29 metrics that are binary (‘Yes’ or ‘No’) with an associated score of either 0 or 1. However, this implementation is limited by its lack of flexibility. For instance, some situations may require ‘grey’ scoring such as partial matches. Future iterations of this rubric will allow for weighting and floating scores between 0 and 1 to account for such nuances.
              </Typography>
              <Typography variant="body1" paragraph align="left">
                Websites whose privacy policies lack data for the metrics automatically score a zero in those areas. However, the same zero score is applied to policies that provide the required data but show poor results. While the rubric aims to encourage comprehensive privacy documentation, this approach can result in harsher scores for websites that don't explicitly state information. It’s important to consider that even a poorly worded policy may be better than no mention of a topic at all.
              </Typography>

              <Typography variant="h6" gutterBottom>1. Privacy Document Accessibility</Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Intent & Importance</strong>: This section evaluates how easily users can find and understand the website’s privacy policy. A well-structured and readily available privacy policy demonstrates transparency and a commitment to user privacy. If users struggle to locate this document or if it's outdated, it raises concerns about whether the company prioritizes data protection. Furthermore, notifying users of policy changes is essential, as data handling practices may evolve over time. Without clear notifications, users might unknowingly accept new terms that could negatively impact their privacy.
              </Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Scoring Method</strong>: Each metric in this section is binary (0 or 1). A website earns a 1 if it provides a dedicated, easily accessible privacy policy, includes a last-updated date, and offers notifications about changes. If any of these criteria are missing, the score for that metric is 0.
              </Typography>

              <Typography variant="h6" gutterBottom>2. Privacy Document Scope</Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Intent & Importance</strong>: This section measures how well the privacy policy communicates key details about data collection, processing, and sharing. A transparent privacy policy should outline what data is collected, how it is gathered, and for what purpose. Additionally, users should be informed if their data is shared with third parties and what security measures are in place to protect it. Without these details, users are left in the dark about how their personal information is handled, making informed decision-making impossible.
              </Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Scoring Method</strong>: Each metric in this section is scored as 1 if the policy provides clear and comprehensive information, and 0 if it is missing or ambiguous. If the policy states all methods of data collection, explains the reason for data usage, identifies third parties involved, and outlines security protections, it achieves full points in this category. A vague or incomplete policy results in lower scores.
              </Typography>

              <Typography variant="h6" gutterBottom>3. Browser Storage</Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Intent & Importance</strong>: This section assesses whether the website uses browser storage techniques such as cookies, HTML5 Local Storage, or other tracking technologies. The intent is to determine whether users are informed about these tracking mechanisms and whether they can reasonably limit their exposure without sacrificing website functionality. Many websites rely on cookies and local storage to enhance user experience, but some exploit these technologies for invasive tracking. It’s important that users can disable unnecessary tracking without losing access to essential site functions.
              </Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Scoring Method</strong>: Websites that avoid persistent tracking methods (e.g., third-party cookies, HTML5 local storage) and provide clear disclosures earn 1 point per metric. If a website becomes difficult to use without cookies or does not disclose tracking methods, it receives 0 points. A high score in this section indicates that the site respects user control over browser storage and tracking.
              </Typography>

              <Typography variant="h6" gutterBottom>4. Third-Party Tracking</Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Intent & Importance</strong>: This section evaluates how much user data is shared with third parties and whether tracking mechanisms persist beyond the website itself. Third-party scripts, beacons, and persistent cookies are often used for advertising, analytics, and behavioral profiling. Websites should be transparent about their reliance on third-party tracking and provide users with options to opt out. Unrestricted third-party tracking can significantly erode user privacy, as data may be collected across multiple sites without consent.
              </Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Scoring Method</strong>: Websites that avoid unnecessary third-party tracking earn 1 point per metric. If tracking is unavoidable, clear disclosures and opt-out mechanisms are required to receive full credit. A 0 is assigned when the site engages in undisclosed third-party tracking, continues to function poorly when tracking is blocked, or uses tracking techniques that bypass standard protections.
              </Typography>

              <Typography variant="h6" gutterBottom>5. Data Handling</Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Intent & Importance</strong>: This section focuses on how securely the website manages user data, whether users have control over their stored information, and whether retention policies are reasonable. The goal is to ensure that users can access, modify, or delete their data and that the website adheres to security best practices such as HTTPS enforcement. A responsible data handling policy reduces risks related to data breaches, unauthorized access, and indefinite data retention.
              </Typography>
              <Typography variant="body2" paragraph align="left" color="text.secondary">
                <strong>Scoring Method</strong>: Websites that allow users to access, modify, and delete their data, and that default to HTTPS for secure communication, earn 1 point per metric. A 0 is given if data retention policies are vague or excessive, if HTTPS is not enforced by default, or if users lack meaningful control over their data. A high score in this section signifies a strong commitment to data security and user rights.
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Why Tab */}
        {tabValue === 1 && (
            <Card>
              <CardContent>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    How Our Private Health Data Is Exploited Online
                  </Typography>
                  <CardContent>
                    <Typography variant="body1" paragraph align="left">
                      Today, a booming business of data brokers collects, analyzes, and sells our private health information in ways that defy most Americans’ expectations and evade HIPAA restrictions. Everything these data brokers can access appears to be fair game: your online orders, social media updates, socioeconomic status, race, weight, magazine subscriptions, pet ownership, hobbies, education, delinquent payments, media consumption, and more.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      If you’re a minority who belongs to a low-income family, it turns out that patterns in vast troves of digital footprints suggest that you may face heightened health risks and cost an insurance company more money. If you’re a woman who purchases plus-size clothing, you’re evidently at risk of depression [<a href="https://www.propublica.org/article/health-insurers-are-vacuuming-up-details-about-you-and-it-could-raise-your-rates" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>]. In 2020 alone, 25 large data brokers in the US spent $29 million on lobbying the United States federal government [<a href="https://themarkup.org/privacy/2021/04/01/the-little-known-data-broker-industry-is-spending-big-bucks-lobbying-congress" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>]. This industry exists under the guise of improving health outcomes, but the evidence suggests this data is used for other, more nefarious purposes as well.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      Recent years have witnessed a number of high-profile cases in which Americans’ health information has been exploited. The online therapy platform BetterHelp collected sensitive mental health information from its patients and assured its users that “We never sell or rent any information you share with us.” The firm collected information on sensitive topics, including experience with depression, medication use, and self-harm tendencies.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      However, the firm actually shared data from over 7 million users with Facebook, Snapchat, Criteo, and Pinterest. The Federal Trade Commission fined BetterHelp $7.8 million in 2023, the same year it levied a $1.5 million civil penalty against GoodRx as part of an enforcement action for the firm’s practice of sharing consumers’ personal data with a number of large tech platforms [<a href="https://www.ftc.gov/business-guidance/blog/2023/03/ftc-says-online-counseling-service-betterhelp-pushed-people-handing-over-health-information-broke" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>]. GoodRx helped patients access discounted prices on prescription drugs.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      A February 2023 report published by Duke University researcher Joanne Kim found that people seeking mental health services online “often unknowingly [put] their sensitive mental health data at risk” and that the industry underlying this marketplace for sensitive data “appears to lack a set of best practices for handling individuals’ mental health data” [<a href="https://techpolicy.sanford.duke.edu/wp-content/uploads/sites/4/2023/02/Kim-2023-Data-Brokers-and-the-Sale-of-Americans-Mental-Health-Data.pdf" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>].
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      In one case, the cost of 5,000 records of mental health-related information was just $275 – less than 6 cents per record. About a dozen data brokers were found to “sell mental health data for dirt cheap” with little effort to limit how the purchased data would be used by potential buyers [<a href="https://compliancy-group.com/health-data-brokers-sell-lists-of-depression-anxiety-sufferers/" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>].
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      In addition to the problems inherent in having one’s private information violated through these transactions, the risks of selling such sensitive information span identity theft, insurance fraud, blackmail, downstream sales on gray markets, and targeting at-risk groups [<a href="https://compliancy-group.com/health-data-brokers-sell-lists-of-depression-anxiety-sufferers/" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>]. A related investigation into health data brokers by the compliance management, tracking, and reporting firm Compliancy Group entitled “How Health Data Brokers Sell Lists of Depression & Anxiety Sufferers” found that information for sale can include personally-identifiable information, like name, address, contact information, prescription records, social media activity, health insurance claims, electronic health records, medical history, and data compiled from public records – at least some of which appear to constitute violations of HIPAA [<a href="https://compliancy-group.com/health-data-brokers-sell-lists-of-depression-anxiety-sufferers/" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>]. This information is reportedly aggregated and sold to marketers, insurance firms, and pharmaceutical companies.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      How is this information amassed in the first place? For starters, a vast collection of tracking technologies that power the economic model of the modern Internet – advertising – hoovers up data about our online activities. Cookies and tracking pixels, for instance, are used to connect health data to activity on social media platforms.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      An investigation by The Markup, “Facebook Is Receiving Sensitive Medical Information from Hospital Websites,” published in June 2022, found that Meta’s Pixel was present on the websites of 33 of the country’s top 100 hospitals. The tracking technology enabled information on patients’ medical conditions, appointments, and prescriptions to be shared with Meta. When scheduling an appointment with a doctor on the website of the University Hospitals Cleveland Medical Center, this tracking Pixel sent Meta information about the physician's name and the query used to reach her online: “pregnancy termination” [<a href="https://themarkup.org/pixel-hunt/2022/06/16/facebook-is-receiving-sensitive-medical-information-from-hospital-websites" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>].
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      The investigation revealed that data on patients’ sexual orientation and medical conditions from appointment scheduling services were shared with Meta, too. IP address information, which can be used to link appointment scheduling events to individuals or households, was shared with Meta as well. Moreover, the Pixel was found to be present within password-protected websites that many users would assume to be confidential.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      When patients accessed such sites with Meta’s Pixel while logged into Facebook, Meta can link such activity to individual Facebook profiles. In response to these findings, Professor Glenn Cohen – director of Harvard Law School’s Petrie-Flom Center for Health Law Policy, Biotechnology, and Bioethics – noted:
                    </Typography>

                    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', ml: 4 }} align="left">
                      “Almost any patient would be shocked to find out that Facebook is being provided an easy way to associate their prescriptions with their name…Even if perhaps there’s something in the legal architecture that permits this to be lawful, it’s totally outside the expectations of what patients think the health privacy laws are doing for them” [<a href="https://themarkup.org/pixel-hunt/2022/06/16/facebook-is-receiving-sensitive-medical-information-from-hospital-websites" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>].
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      A related 2018 investigation by ProPublica and NPR was aptly titled “Health Insurers Are Vacuuming Up Details About You — And It Could Raise Your Rates.” While some firms that collect, sell, and purchase healthcare data online denied that their insights could be used to compute insurance premiums for certain patient populations, others suggested that these analyses could inform pricing.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      The article mentions a study by the company SAS with an unnamed insurer. The study found that “higher health care costs could be predicted by looking at things like ethnicity, watching TV, and mail order purchases” [<a href="https://www.propublica.org/article/health-insurers-are-vacuuming-up-details-about-you-and-it-could-raise-your-rates" target="_blank" rel="noopener noreferrer">
                      Source
                    </a>].
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      Our health data – what medications we take, what side effects we sustain, what troubles our minds, what symptoms we experience, what diets we adhere to, which chronic conditions we manage – is some of the most private information about us. At a time when health insurers want access to all this information about us, those of us interested in protecting our online privacy must be selective about those entities with whom we entrust this sensitive information.
                    </Typography>

                    <Typography variant="body1" paragraph align="left">
                      We are all patients at some point in our lives, and protecting our online privacy helps ensure we keep sensitive information safe while also sending a sign to businesses that we demand measured treatment of our most private data. PrivacyLens was created to help us accomplish precisely this goal.
                    </Typography>
                  </CardContent>
                </Box>
              </CardContent>
            </Card>
        )}
      </Box>

      {/* Chat Window */}
      {/*<ChatWindow
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        chatMessages={chatMessages}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
      />*/}
    </Container>
  );
};

export default PrivacyDashboard;