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
  useTheme
} from '@mui/material';
import { 
  Security, 
  Visibility, 
  TrendingUp, 
  Assignment 
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import components
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import ChatWindow from './components/ChatWindow';
import SearchSection from './components/SearchSection';

const PrivacyDashboard = () => {
  // State management
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchResultsRef = useRef([]);
  const theme = useTheme();

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

  // Historical data for chart
  const historicalData = [
    { section: "Data Collection", average: 82 },
    { section: "Data Sharing", average: 75 },
    { section: "User Rights", average: 80 },
    { section: "Security Measures", average: 78 },
    { section: "Data Retention", average: 73 },
    { section: "Policy Clarity", average: 77 }
  ];

  // Search handler
  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const postResponse = await fetch('http://127.0.0.1:8000/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });

      if (!postResponse.ok) {
        throw new Error(`POST request failed: ${postResponse.status}`);
      }

      const getResponse = await fetch('http://127.0.0.1:8000/searchresults');
      
      if (getResponse.ok) {
        const jsonResponse = await getResponse.json();
        if (jsonResponse?.data) {
          searchResultsRef.current = jsonResponse.data;
        }
      } else {
        throw new Error(`GET request failed: ${getResponse.status}`);
      }
    } catch (error) {
      console.error('Error during search:', error);
      setError(true);
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: '100%' }}>
        {/* Navigation Tabs */}
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ mb: 4 }}
        >
          <Tab label="Home" />
          <Tab label="Search Results Analysis" />
          <Tab label="About Our Rubric" />
          <Tab label="Why?" />
        </Tabs>

        {/* Home Tab */}
        {tabValue === 0 && (
          <Box>
            <HeroSection />
            <StatsSection stats={stats} />
            <FeaturesSection features={features} />
          </Box>
        )}

        {/* Search Results Tab */}
        {tabValue === 1 && (
          <Box>
            <SearchSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              error={error}
              searchResults={searchResultsRef.current}
              isLoading={isLoading}
            />
            
            {/* Chart */}
            <Card sx={{ mt: 4 }}>
              <CardHeader title="Historical Performance by Section" />
              <CardContent>
                <Box sx={{ height: 400 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="section" angle={-45} textAnchor="end" height={100} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="average" fill="#4282AA" name="Average Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}

        {/* About Our Rubric Tab */}
        {tabValue === 2 && (
          <Card>
            <CardHeader title="Our Privacy Policy Rubric" />
            <CardContent>
              <Typography variant="h6" gutterBottom>How We Grade Privacy Policies</Typography>
              {[
                {
                  title: "Data Collection",
                  description: "Evaluates what personal information is collected and how clearly it's disclosed."
                },
                {
                  title: "Data Sharing",
                  description: "Assesses how user data is shared with third parties and for what purposes."
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
        {tabValue === 3 && (
          <Card>
            <CardHeader title="How our private data is exploited online?" />
            <CardContent>
              <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle1" gutterBottom>Story 1</Typography>
                <Typography color="text.secondary">
                Today, a booming business of data brokers collect, analyze, and sell our private health information in ways that defy most Americans’ expectations and evade HIPAA restrictions. Everything these data brokers can access appears to be fair game: your online orders, social media updates, socioeconomic status, race, weight, magazine subscriptions, pet ownerships, hobbies, education, delinquent payments, media consumption, and more. If you’re a minority who belongs to a low-income family, it turns out that associations in these vast troves of digital footprints suggest that you may face heighted health risks. If you’re a woman who purchases plus-size clothing, you’re evidently at risk of depression [Source K]. In 2020 alone, 25 large data brokers in the US spent $29 million on lobbying the federal government [Source E]. This industry exists under the guise of improving health outcomes, but the evidence suggests this data is used for other purposes as well.\n" +
                                        "\tRecent years have witnessed a number of high-profile cases in which Americans’ health information has been exploited. The online therapy platform Betterhelp collected sensitive mental health-related information from its patients and assured its users that “We never sell or rent any information you share with us.” The firm collected information on sensitive topics, including experience with depression, medication use, and self-harm tendencies. However, the firm actually shared data from over 7 million users with Facebook, Snapchat, Criteo, and Pinterest. The Federal Trade Commission fined Betterhelp $7.8 million in 2023, the same year it levied a $1.5 million civil penalty against GoodRx as part of an enforcement action for sharing consumers’ personal data with a number of large tech platforms [Source, Source]. GoodRx helped patients access discounted prices on prescription drugs. \n" +
                                        "\tA February 2023 report published by Duke University researcher Joanne Kim found that people seeking mental health services online “often unknowingly [put] their sensitive mental health data at risk” and that the industry underlying this marketplace for sensitive data “appears to lack a set of best practices for handling individuals’ mental health data” [Source B]. In one case, the cost of 5,000 records of mental health-related information was just $275 – less than 6 cents per record. About a dozen data brokers were found to “sell mental health data for dirt cheap” with little effort to limit how the purchased data would be used by potential buyers [Source F]. In addition to the problems inherent in having one’s private information violated, the risks of selling such sensitive information includes identity theft, insurance fraud, blackmail, downstream sales on gray markets, and targeting at-risk groups [Source F]. A related investigation into health data brokers by the compliance comanagement, tracking, and reporting company Compliancy Group entitled “How Health Data Brokers Sell Lists of Depression & Anxiety Sufferers” found that information for sale can include personally-identifiable information, like name, address, contact information, prescription records, social media activity, health insurance claims, electronic health records, medical history, and data compiled from public records – at least some of which appear to constitute violations of HIPAA [Source F]. This information is reportedly aggregated and sold to marketers, insurance firms, and pharmaceutical companies. \n" +
                                        "\tTracking technologies like cookies and pixels are used to connect health data to activity on social media platforms. An investigation by The Markup, “Facebook Is Receiving Sensitive Medical Information from Hospital Websites”, published in June 2022 found that Meta’s Pixel was present on the websites of 33 of the country’s top 100 hospitals. The tracking technology shared information on patients’ medical conditions, appointments, and prescriptions with Meta. For instance, when scheduling an appointment with a doctor on the website of the University Hospitals Cleveland Medical Center, Meta sent information about the physician's name and and the search term we used to find her: “pregnancy termination” [Source A]. The investigation revealed that data on patients’ sexual orientation and medical conditions from appointment scheduling dropdown menus were shared with Meta. IP address information, which can be used to link appointment scheduling events to individuals / households, were also shared with Meta. Moreover, the Pixel was also found to be present within password-protected websites that many users would assume to be confidential. In cases in which patients are accessing sites with Meta’s pixel while logged into Facebook, Meta can link external website activity to individual Facebook profiles. In response to these findings, Professor Glenn Cohen – director of Harvard Law School’s Petrie-Flom Center for Health Law Policy, Biotechnology, and Bioethics – noted that, “Almost any patient would be shocked to find out that Facebook is being provided an easy way to associate their prescriptions with their name…Even if perhaps there’s something in the legal architecture that permits this to be lawful, it’s totally outside the expectations of what patients think the health privacy laws are doing for them” [Source A].\n" +
                                        "\tA related 2018 investigation by ProPublica and NPR was aptly titled “Health Insurers Are Vacuuming Up Details About You — And It Could Raise Your Rates.” While some firms that collect, sell, and purchase healthcare data online denied that their insights could be used to raise insurance premiums for certain patient populations, others suggested that these analyses could inform prices. The article mentions a study by the company SAS with an unnamed insurer. The study found that “higher health care costs could be predicted by looking at things like ethnicity, watching TV and mail order purchases” [Source K].\n
                </Typography>
              </Paper>
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