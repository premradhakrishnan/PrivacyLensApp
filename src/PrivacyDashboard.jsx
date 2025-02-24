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
      description: "Instant analysis of website privacy policies using our comprehensive scoring system.",
      icon: <Assignment sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Real-time Monitoring",
      description: "Stay updated with changes to privacy policies of your favorite healthcare websites.",
      icon: <Visibility sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Security Metrics",
      description: "Detailed security assessment of healthcare platforms and their data protection measures.",
      icon: <Security sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Trend Analysis",
      description: "Track privacy policy changes and trends across the healthcare industry.",
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
          <Tab label="Search" />
          <Tab label="Historical Analysis" />
          <Tab label="About Our Rubric" />
          <Tab label="Why?" />
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
        {tabValue === 1 && (
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

        {tabValue === 2 && (
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
        {tabValue === 3 && (
          <Card style={{
            width: '100%',
            minWidth: '1200px',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px', // Add consistent padding inside the container
          }}>
            <CardHeader title="How We Grade Privacy Policies" />
            <CardContent>
              {[
                {
                  title: "Privacy Document Accessibility",
                  description: "Privacy policies serve as the foundation of user trust. This section measures how easily users can locate and comprehend the privacy policy of a website. A transparent and well-structured privacy policy ensures that users are informed about their data rights. It is crucial that the document is readily accessible, includes a 'last-updated' date for accountability, and provides timely notifications to users about policy changes. Without proactive communication, users might unknowingly agree to terms that could negatively impact their privacy."
                },
                {
                  title: "Privacy Document Scope",
                  description: "The scope and clarity of a privacy policy are vital indicators of a website’s transparency. This section evaluates whether the privacy policy clearly explains what data is collected, how it is processed, and whether it is shared with third parties. Users deserve comprehensive, straightforward information to empower them to make informed decisions. To achieve full marks, the policy must describe the methods of data collection, the purposes for which data is collected, any third-party involvement, and the security measures taken to protect user data."
                },
                {
                  title: "Browser Storage",
                  description: "Browser storage plays a key role in both user experience and tracking practices. This section assesses if websites reveal their use of browser storage techniques like cookies and HTML5 Local Storage. While these technologies often enable improved functionality, they can also be used for invasive tracking. A high score in this section reflects a website’s ability to maintain functionality without abusing browser storage or engaging in persistent monitoring."
                },
                {
                  title: "Third-Party Tracking",
                  description: "This section focuses on the extent of third-party tracking and its potential implications for user privacy. Transparency around third-party scripts, tracking beacons, and cookies is critical. A responsible website limits unnecessary third-party tracking and provides mechanisms for users to opt out where tracking is unavoidable."
                },
                {
                  title: "Data Handling",
                  description: "Data handling practices are an essential aspect of digital privacy. This section evaluates how securely websites manage user data and whether users are granted reasonable control over their information. High-performing websites in this category enforce HTTPS protocols, maintain clear and reasonable data retention policies, and empower users to access, modify, and delete their data."
                }
              ].map((section, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="subtitle1" gutterBottom>{section.title}</Typography>
                    <Typography color="text.secondary">{section.description}</Typography>
                  </Paper>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Why Tab */}
        {tabValue === 4 && (
            <Card>
              <CardContent>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    How Our Private Health Data Is Exploited Online
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Today, a booming business of data brokers collects, analyzes, and sells our private health information in ways that defy most Americans’ expectations and evade HIPAA restrictions. Everything these data brokers can access appears to be fair game: your online orders, social media updates, socioeconomic status, race, weight, magazine subscriptions, pet ownership, hobbies, education, delinquent payments, media consumption, and more.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    If you’re a minority who belongs to a low-income family, it turns out that patterns in vast troves of digital footprints suggest that you may face heightened health risks and cost an insurance company more money. If you’re a woman who purchases plus-size clothing, you’re evidently at risk of depression [<a href="https://www.propublica.org/article/health-insurers-are-vacuuming-up-details-about-you-and-it-could-raise-your-rates" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>]. In 2020 alone, 25 large data brokers in the US spent $29 million on lobbying the United States federal government [<a href="https://themarkup.org/privacy/2021/04/01/the-little-known-data-broker-industry-is-spending-big-bucks-lobbying-congress" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>]
                    . This industry exists under the guise of improving health outcomes, but the evidence suggests this data is used for other, more nefarious purposes as well.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Recent years have witnessed a number of high-profile cases in which Americans’ health information has been exploited. The online therapy platform BetterHelp collected sensitive mental health information from its patients and assured its users that “We never sell or rent any information you share with us.” The firm collected information on sensitive topics, including experience with depression, medication use, and self-harm tendencies.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    However, the firm actually shared data from over 7 million users with Facebook, Snapchat, Criteo, and Pinterest. The Federal Trade Commission fined BetterHelp $7.8 million in 2023, the same year it levied a $1.5 million civil penalty against GoodRx as part of an enforcement action for the firm’s practice of sharing consumers’ personal data with a number of large tech platforms [<a href="https://www.ftc.gov/business-guidance/blog/2023/03/ftc-says-online-counseling-service-betterhelp-pushed-people-handing-over-health-information-broke" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>]. GoodRx helped patients access discounted prices on prescription drugs.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    A February 2023 report published by Duke University researcher Joanne Kim found that people seeking mental health services online “often unknowingly [put] their sensitive mental health data at risk” and that the industry underlying this marketplace for sensitive data “appears to lack a set of best practices for handling individuals’ mental health data” [<a href="https://techpolicy.sanford.duke.edu/wp-content/uploads/sites/4/2023/02/Kim-2023-Data-Brokers-and-the-Sale-of-Americans-Mental-Health-Data.pdf" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>].
                  </Typography>

                  <Typography variant="body1" paragraph>
                    In one case, the cost of 5,000 records of mental health-related information was just $275 – less than 6 cents per record. About a dozen data brokers were found to “sell mental health data for dirt cheap” with little effort to limit how the purchased data would be used by potential buyers [<a href="https://compliancy-group.com/health-data-brokers-sell-lists-of-depression-anxiety-sufferers/" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>].
                  </Typography>

                  <Typography variant="body1" paragraph>
                    In addition to the problems inherent in having one’s private information violated through these transactions, the risks of selling such sensitive information span identity theft, insurance fraud, blackmail, downstream sales on gray markets, and targeting at-risk groups [<a href="https://compliancy-group.com/health-data-brokers-sell-lists-of-depression-anxiety-sufferers/" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>]. A related investigation into health data brokers by the compliance management, tracking, and reporting firm Compliancy Group entitled “How Health Data Brokers Sell Lists of Depression & Anxiety Sufferers” found that information for sale can include personally-identifiable information, like name, address, contact information, prescription records, social media activity, health insurance claims, electronic health records, medical history, and data compiled from public records – at least some of which appear to constitute violations of HIPAA [<a href="https://compliancy-group.com/health-data-brokers-sell-lists-of-depression-anxiety-sufferers/" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>]. This information is reportedly aggregated and sold to marketers, insurance firms, and pharmaceutical companies.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    How is this information amassed in the first place? For starters, a vast collection of tracking technologies that power the economic model of the modern Internet – advertising – hoovers up data about our online activities. Cookies and tracking pixels, for instance, are used to connect health data to activity on social media platforms.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    An investigation by The Markup, “Facebook Is Receiving Sensitive Medical Information from Hospital Websites,” published in June 2022, found that Meta’s Pixel was present on the websites of 33 of the country’s top 100 hospitals. The tracking technology enabled information on patients’ medical conditions, appointments, and prescriptions to be shared with Meta. When scheduling an appointment with a doctor on the website of the University Hospitals Cleveland Medical Center, this tracking Pixel sent Meta information about the physician's name and the query used to reach her online: “pregnancy termination” [<a href="https://themarkup.org/pixel-hunt/2022/06/16/facebook-is-receiving-sensitive-medical-information-from-hospital-websites" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>].
                  </Typography>

                  <Typography variant="body1" paragraph>
                    The investigation revealed that data on patients’ sexual orientation and medical conditions from appointment scheduling services were shared with Meta, too. IP address information, which can be used to link appointment scheduling events to individuals or households, was shared with Meta as well. Moreover, the Pixel was found to be present within password-protected websites that many users would assume to be confidential.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    When patients accessed such sites with Meta’s Pixel while logged into Facebook, Meta can link such activity to individual Facebook profiles. In response to these findings, Professor Glenn Cohen – director of Harvard Law School’s Petrie-Flom Center for Health Law Policy, Biotechnology, and Bioethics – noted:
                  </Typography>

                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', ml: 4 }}>
                    “Almost any patient would be shocked to find out that Facebook is being provided an easy way to associate their prescriptions with their name…Even if perhaps there’s something in the legal architecture that permits this to be lawful, it’s totally outside the expectations of what patients think the health privacy laws are doing for them” [<a href="https://themarkup.org/pixel-hunt/2022/06/16/facebook-is-receiving-sensitive-medical-information-from-hospital-websites" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>].
                  </Typography>

                  <Typography variant="body1" paragraph>
                    A related 2018 investigation by ProPublica and NPR was aptly titled “Health Insurers Are Vacuuming Up Details About You — And It Could Raise Your Rates.” While some firms that collect, sell, and purchase healthcare data online denied that their insights could be used to compute insurance premiums for certain patient populations, others suggested that these analyses could inform pricing.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    The article mentions a study by the company SAS with an unnamed insurer. The study found that “higher health care costs could be predicted by looking at things like ethnicity, watching TV, and mail order purchases” [<a href="https://www.propublica.org/article/health-insurers-are-vacuuming-up-details-about-you-and-it-could-raise-your-rates" target="_blank" rel="noopener noreferrer">
                    Source
                  </a>].
                  </Typography>

                  <Typography variant="body1" paragraph>
                    Our health data – what medications we take, what side effects we sustain, what troubles our minds, what symptoms we experience, what diets we adhere to, which chronic conditions we manage – is some of the most private information about us. At a time when health insurers want access to all this information about us, those of us interested in protecting our online privacy must be selective about those entities with whom we entrust this sensitive information.
                  </Typography>

                  <Typography variant="body1" paragraph>
                    We are all patients at some point in our lives, and protecting our online privacy helps ensure we keep sensitive information safe while also sending a sign to businesses that we demand measured treatment of our most private data. PrivacyLens was created to help us accomplish precisely this goal.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
        )}
      </Box>

      {/* Chat Window */}
      <ChatWindow
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        chatMessages={chatMessages}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

export default PrivacyDashboard;