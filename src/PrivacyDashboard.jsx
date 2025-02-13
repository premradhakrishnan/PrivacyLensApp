import  { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Collapse,
    Container,
    Fab,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Grid, useTheme
} from '@mui/material';
import {
    Search,
    Chat,
    ExpandMore,
    Remove,
    Send, Search as SearchIcon, Security, ArrowForward, Assignment, Visibility, TrendingUp
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PrivacyDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pinnedSites, setPinnedSites] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [expandedItems, setExpandedItems] = useState({});
    const theme = useTheme();

    const exploitationStories = "Today, \na booming business of data brokers collect, analyze, and sell our private health information in ways that defy most Americans’ expectations and evade HIPAA restrictions. Everything these data brokers can access appears to be fair game: your online orders, social media updates, socioeconomic status, race, weight, magazine subscriptions, pet ownerships, hobbies, education, delinquent payments, media consumption, and more. If you’re a minority who belongs to a low-income family, it turns out that associations in these vast troves of digital footprints suggest that you may face heighted health risks. If you’re a woman who purchases plus-size clothing, you’re evidently at risk of depression [Source K]. In 2020 alone, 25 large data brokers in the US spent $29 million on lobbying the federal government [Source E]. This industry exists under the guise of improving health outcomes, but the evidence suggests this data is used for other purposes as well.\n" +
        "\tRecent years have witnessed a number of high-profile cases in which Americans’ health information has been exploited. The online therapy platform Betterhelp collected sensitive mental health-related information from its patients and assured its users that “We never sell or rent any information you share with us.” The firm collected information on sensitive topics, including experience with depression, medication use, and self-harm tendencies. However, the firm actually shared data from over 7 million users with Facebook, Snapchat, Criteo, and Pinterest. The Federal Trade Commission fined Betterhelp $7.8 million in 2023, the same year it levied a $1.5 million civil penalty against GoodRx as part of an enforcement action for sharing consumers’ personal data with a number of large tech platforms [Source, Source]. GoodRx helped patients access discounted prices on prescription drugs. \n" +
        "\tA February 2023 report published by Duke University researcher Joanne Kim found that people seeking mental health services online “often unknowingly [put] their sensitive mental health data at risk” and that the industry underlying this marketplace for sensitive data “appears to lack a set of best practices for handling individuals’ mental health data” [Source B]. In one case, the cost of 5,000 records of mental health-related information was just $275 – less than 6 cents per record. About a dozen data brokers were found to “sell mental health data for dirt cheap” with little effort to limit how the purchased data would be used by potential buyers [Source F]. In addition to the problems inherent in having one’s private information violated, the risks of selling such sensitive information includes identity theft, insurance fraud, blackmail, downstream sales on gray markets, and targeting at-risk groups [Source F]. A related investigation into health data brokers by the compliance comanagement, tracking, and reporting company Compliancy Group entitled “How Health Data Brokers Sell Lists of Depression & Anxiety Sufferers” found that information for sale can include personally-identifiable information, like name, address, contact information, prescription records, social media activity, health insurance claims, electronic health records, medical history, and data compiled from public records – at least some of which appear to constitute violations of HIPAA [Source F]. This information is reportedly aggregated and sold to marketers, insurance firms, and pharmaceutical companies. \n" +
        "\tTracking technologies like cookies and pixels are used to connect health data to activity on social media platforms. An investigation by The Markup, “Facebook Is Receiving Sensitive Medical Information from Hospital Websites”, published in June 2022 found that Meta’s Pixel was present on the websites of 33 of the country’s top 100 hospitals. The tracking technology shared information on patients’ medical conditions, appointments, and prescriptions with Meta. For instance, when scheduling an appointment with a doctor on the website of the University Hospitals Cleveland Medical Center, Meta sent information about the physician's name and and the search term we used to find her: “pregnancy termination” [Source A]. The investigation revealed that data on patients’ sexual orientation and medical conditions from appointment scheduling dropdown menus were shared with Meta. IP address information, which can be used to link appointment scheduling events to individuals / households, were also shared with Meta. Moreover, the Pixel was also found to be present within password-protected websites that many users would assume to be confidential. In cases in which patients are accessing sites with Meta’s pixel while logged into Facebook, Meta can link external website activity to individual Facebook profiles. In response to these findings, Professor Glenn Cohen – director of Harvard Law School’s Petrie-Flom Center for Health Law Policy, Biotechnology, and Bioethics – noted that, “Almost any patient would be shocked to find out that Facebook is being provided an easy way to associate their prescriptions with their name…Even if perhaps there’s something in the legal architecture that permits this to be lawful, it’s totally outside the expectations of what patients think the health privacy laws are doing for them” [Source A].\n" +
        "\tA related 2018 investigation by ProPublica and NPR was aptly titled “Health Insurers Are Vacuuming Up Details About You — And It Could Raise Your Rates.” While some firms that collect, sell, and purchase healthcare data online denied that their insights could be used to raise insurance premiums for certain patient populations, others suggested that these analyses could inform prices. The article mentions a study by the company SAS with an unnamed insurer. The study found that “higher health care costs could be predicted by looking at things like ethnicity, watching TV and mail order purchases” [Source K].\n";

    // Mock data remains the same as in your original code
    const searchResults = [
        {
            website: "healthinfo.com",
            overallScore: 85,
            policyUrl: "https://healthinfo.com/privacy",
            policySummary: "Strong privacy practices with clear data handling policies and HIPAA compliance.",
            sectionScores: {
                "Data Collection": 90,
                "Data Sharing": 85,
                "User Rights": 88,
                "Security Measures": 82,
                "Data Retention": 80,
                "Policy Clarity": 85
            }
        },
        {
            website: "healthinfo.com",
            overallScore: 85,
            policyUrl: "https://healthinfo.com/privacy",
            policySummary: "Strong privacy practices with clear data handling policies and HIPAA compliance.",
            sectionScores: {
                "Data Collection": 90,
                "Data Sharing": 85,
                "User Rights": 88,
                "Security Measures": 82,
                "Data Retention": 80,
                "Policy Clarity": 85
            }
        },
        {
            website: "healthinfo.com",
            overallScore: 85,
            policyUrl: "https://healthinfo.com/privacy",
            policySummary: "Strong privacy practices with clear data handling policies and HIPAA compliance.",
            sectionScores: {
                "Data Collection": 90,
                "Data Sharing": 85,
                "User Rights": 88,
                "Security Measures": 82,
                "Data Retention": 80,
                "Policy Clarity": 85
            }
        },
        {
            website: "healthinfo.com",
            overallScore: 85,
            policyUrl: "https://healthinfo.com/privacy",
            policySummary: "Strong privacy practices with clear data handling policies and HIPAA compliance.",
            sectionScores: {
                "Data Collection": 90,
                "Data Sharing": 85,
                "User Rights": 88,
                "Security Measures": 82,
                "Data Retention": 80,
                "Policy Clarity": 85
            }
        },
        {
            website: "healthinfo.com",
            overallScore: 85,
            policyUrl: "https://healthinfo.com/privacy",
            policySummary: "Strong privacy practices with clear data handling policies and HIPAA compliance.",
            sectionScores: {
                "Data Collection": 90,
                "Data Sharing": 85,
                "User Rights": 88,
                "Security Measures": 82,
                "Data Retention": 80,
                "Policy Clarity": 85
            }
        },
        // ... other results remain the same
    ];

    const historicalData = [
        { section: "Data Collection", average: 82 },
        { section: "Data Sharing", average: 75 },
        { section: "User Rights", average: 80 },
        { section: "Security Measures", average: 78 },
        { section: "Data Retention", average: 73 },
        { section: "Policy Clarity", average: 77 }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const togglePinSite = (website) => {
        setPinnedSites(prev =>
            prev.includes(website)
                ? prev.filter(site => site !== website)
                : [...prev, website]
        );
    };

    const toggleExpanded = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (messageInput.trim()) {
            setChatMessages(prev => [...prev, { text: messageInput, sender: 'user' }]);
            setMessageInput('');
            setTimeout(() => {
                setChatMessages(prev => [...prev, {
                    text: "Thank you for your question. How else can I help?",
                    sender: 'bot'
                }]);
            }, 1000);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'success.main';
        if (score >= 70) return 'warning.main';
        return 'error.main';
    };

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
    
    const stats = [
        { label: "Websites Analyzed", value: "10,000+" },
        { label: "Active Users", value: "50,000+" },
        { label: "Privacy Issues Identified", value: "25,000+" },
        { label: "Average Response Time", value: "2.5s" }
    ];

    const steps = [
        {
            number: "1",
            title: "Install Plugin",
            description: "Add our extension to your browser"
        },
        {
            number: "2",
            title: "Enter Website",
            description: "Type or paste the URL you want to analyze"
        },
        {
            number: "3",
            title: "View Results",
            description: "Get instant privacy analysis and scores"
        }
    ];
    
    return (
        <Container
            maxWidth="lg"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start', // Ensures the content is aligned to the top
                minHeight: '100vh', // Makes the container span the full height of the browser
                paddingTop: theme.spacing(4), // Optional: Add spacing at the top
                boxSizing: 'border-box',
                py: 6
            }}
        >

            {/* Tabs */}
            <Box sx={{ width: '100%' }}>
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

                {/* Search Results Tab */}
                {tabValue === 0 && (
                    <Box>
                        {/* Hero Section */}
                        <Card
                            sx={{
                                mb: 6,
                                bgcolor: 'primary.main',
                                color: 'white',
                                backgroundImage: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
                            }}
                        >
                            <CardContent sx={{ py: 8 }}>
                                <Grid container spacing={4} alignItems="center">
                                    <Grid item xs={12} md={7}>
                                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                            Understand Privacy Policies at a Glance
                                        </Typography>
                                        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                                            Make informed decisions about your health data privacy with our AI-powered analysis tool
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            sx={{
                                                bgcolor: 'white',
                                                color: 'primary.main',
                                                '&:hover': {
                                                    bgcolor: 'grey.100'
                                                }
                                            }}
                                            startIcon={<SearchIcon />}
                                        >
                                            Analyze a Website
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Security sx={{ fontSize: 200, opacity: 0.9 }} />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Stats Section */}
                        <Grid container spacing={3} sx={{ mb: 6 }}>
                            {stats.map((stat, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)'
                                            }
                                        }}
                                    >
                                        <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Features Section */}
                        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                            Key Features
                        </Typography>
                        <Grid container spacing={4} sx={{ mb: 8 }}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Paper
                                        elevation={2}
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            transition: 'transform 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)'
                                            }
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                borderRadius: '50%',
                                                bgcolor: 'primary.light',
                                                opacity: 0.1
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            {feature.title}
                                        </Typography>
                                        <Typography color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Getting Started Guide */}
                        <Card sx={{ mb: 6 }}>
                            <CardContent sx={{ py: 6 }}>
                                <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
                                    Getting Started Guide
                                </Typography>
                                <Grid container spacing={4} sx={{ mb: 4 }}>
                                    {steps.map((step, index) => (
                                        <Grid item xs={12} md={4} key={index}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: 4,
                                                    height: '100%',
                                                    bgcolor: 'grey.50',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: '50%',
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        mb: 3,
                                                        fontSize: 24,
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {step.number}
                                                </Box>
                                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                                    {step.title}
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {step.description}
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowForward />}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: 50,
                                            textTransform: 'none',
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        Get Started Now
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}
                {tabValue === 1 && (
                    <Box sx={{ space: 'y-6' }}>
                        {/* Search Bar */}
                        <Box component="form" onSubmit={handleSearch} sx={{ mb: 6 }}>
                <TextField
                    fullWidth
                    placeholder="Search for analyzed websites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button type="submit" variant="contained" startIcon={<Search />}>
                                    Search
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
                        <Card>
                            <CardHeader title="Privacy Policy Analysis Results" />
                            <CardContent>
                                {searchResults.map((result, index) => (
                                    <Paper key={index} sx={{ mb: 2, overflow: 'hidden' }}>
                                        <Box sx={{ p: 2, bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Checkbox
                                                    checked={pinnedSites.includes(result.website)}
                                                    onChange={() => togglePinSite(result.website)}
                                                />
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {result.website}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        px: 2,
                                                        py: 0.5,
                                                        borderRadius: 'full',
                                                        bgcolor: `${getScoreColor(result.overallScore)}`,
                                                        color: 'white'
                                                    }}
                                                >
                                                    Score: {result.overallScore}
                                                </Box>
                                            </Box>
                                            <IconButton onClick={() => toggleExpanded(index)}>
                                                <ExpandMore
                                                    sx={{
                                                        transform: expandedItems[index] ? 'rotate(180deg)' : 'rotate(0)',
                                                        transition: 'transform 0.3s'
                                                    }}
                                                />
                                            </IconButton>
                                        </Box>

                                        <Collapse in={expandedItems[index]}>
                                            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                                                <Typography variant="h6" gutterBottom>Policy Details</Typography>
                                                <Link href={result.policyUrl}>View Full Policy</Link>
                                                <Typography color="text.secondary" sx={{ mt: 2 }}>
                                                    {result.policySummary}
                                                </Typography>

                                                <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Section Scores</Typography>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Section</TableCell>
                                                            <TableCell>Score</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {Object.entries(result.sectionScores).map(([section, score], idx) => (
                                                            <TableRow key={idx}>
                                                                <TableCell>{section}</TableCell>
                                                                <TableCell>{score}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </Paper>
                                ))}
                            </CardContent>
                        </Card>

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
                                            <Bar dataKey="average" fill="#1976d2" name="Average Score" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                )}

                {/* About Tab */}
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
                                },
                                {
                                    title: "Data Collection",
                                    description: "Evaluates what personal information is collected and how clearly it's disclosed."
                                },
                                {
                                    title: "Data Sharing",
                                    description: "Assesses how user data is shared with third parties and for what purposes."
                                },
                                {
                                    title: "Data Collection",
                                    description: "Evaluates what personal information is collected and how clearly it's disclosed."
                                },
                                {
                                    title: "Data Sharing",
                                    description: "Assesses how user data is shared with third parties and for what purposes."
                                },
                                // ... Add other sections
                            ].map((section, index) => (
                                <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                    <Typography variant="subtitle1" gutterBottom>{section.title}</Typography>
                                    <Typography color="text.secondary">{section.description}</Typography>
                                </Paper>
                            ))}

                            {/*<Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Our Mission & Impact</Typography>
                            {[
                                {
                                    title: "Why We Started",
                                    content: "Our journey began with a simple observation: people searching for health information online often struggle to understand how their sensitive data is being handled. We set out to change that by creating a tool that makes privacy policies transparent and accessible."
                                },
                                // ... Add other sections
                            ].map((section, index) => (
                                <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                    <Typography variant="subtitle1" gutterBottom>{section.title}</Typography>
                                    <Typography color="text.secondary">{section.content}</Typography>
                                </Paper>
                            ))}*/}
                        </CardContent>
                    </Card>
                )}

                {tabValue === 3 && (
                    <Card>
                        <CardHeader title="How our private data is exploited online?" />
                        <CardContent>
                            {/*<Typography variant="h6" gutterBottom>Story 1</Typography>*/}
                            {[
                                {
                                    title: "Story 1",
                                    description: "Today, a booming business of data brokers collect, analyze, and sell our private health information in ways that defy most Americans’ expectations and evade HIPAA restrictions. Everything these data brokers can access appears to be fair game: your online orders, social media updates, socioeconomic status, race, weight, magazine subscriptions, pet ownerships, hobbies, education, delinquent payments, media consumption, and more. If you’re a minority who belongs to a low-income family, it turns out that associations in these vast troves of digital footprints suggest that you may face heighted health risks. If you’re a woman who purchases plus-size clothing, you’re evidently at risk of depression [Source K]. In 2020 alone, 25 large data brokers in the US spent $29 million on lobbying the federal government [Source E]. This industry exists under the guise of improving health outcomes, but the evidence suggests this data is used for other purposes as well.\n" +
                                        "\tRecent years have witnessed a number of high-profile cases in which Americans’ health information has been exploited. The online therapy platform Betterhelp collected sensitive mental health-related information from its patients and assured its users that “We never sell or rent any information you share with us.” The firm collected information on sensitive topics, including experience with depression, medication use, and self-harm tendencies. However, the firm actually shared data from over 7 million users with Facebook, Snapchat, Criteo, and Pinterest. The Federal Trade Commission fined Betterhelp $7.8 million in 2023, the same year it levied a $1.5 million civil penalty against GoodRx as part of an enforcement action for sharing consumers’ personal data with a number of large tech platforms [Source, Source]. GoodRx helped patients access discounted prices on prescription drugs. \n" +
                                        "\tA February 2023 report published by Duke University researcher Joanne Kim found that people seeking mental health services online “often unknowingly [put] their sensitive mental health data at risk” and that the industry underlying this marketplace for sensitive data “appears to lack a set of best practices for handling individuals’ mental health data” [Source B]. In one case, the cost of 5,000 records of mental health-related information was just $275 – less than 6 cents per record. About a dozen data brokers were found to “sell mental health data for dirt cheap” with little effort to limit how the purchased data would be used by potential buyers [Source F]. In addition to the problems inherent in having one’s private information violated, the risks of selling such sensitive information includes identity theft, insurance fraud, blackmail, downstream sales on gray markets, and targeting at-risk groups [Source F]. A related investigation into health data brokers by the compliance comanagement, tracking, and reporting company Compliancy Group entitled “How Health Data Brokers Sell Lists of Depression & Anxiety Sufferers” found that information for sale can include personally-identifiable information, like name, address, contact information, prescription records, social media activity, health insurance claims, electronic health records, medical history, and data compiled from public records – at least some of which appear to constitute violations of HIPAA [Source F]. This information is reportedly aggregated and sold to marketers, insurance firms, and pharmaceutical companies. \n" +
                                        "\tTracking technologies like cookies and pixels are used to connect health data to activity on social media platforms. An investigation by The Markup, “Facebook Is Receiving Sensitive Medical Information from Hospital Websites”, published in June 2022 found that Meta’s Pixel was present on the websites of 33 of the country’s top 100 hospitals. The tracking technology shared information on patients’ medical conditions, appointments, and prescriptions with Meta. For instance, when scheduling an appointment with a doctor on the website of the University Hospitals Cleveland Medical Center, Meta sent information about the physician's name and and the search term we used to find her: “pregnancy termination” [Source A]. The investigation revealed that data on patients’ sexual orientation and medical conditions from appointment scheduling dropdown menus were shared with Meta. IP address information, which can be used to link appointment scheduling events to individuals / households, were also shared with Meta. Moreover, the Pixel was also found to be present within password-protected websites that many users would assume to be confidential. In cases in which patients are accessing sites with Meta’s pixel while logged into Facebook, Meta can link external website activity to individual Facebook profiles. In response to these findings, Professor Glenn Cohen – director of Harvard Law School’s Petrie-Flom Center for Health Law Policy, Biotechnology, and Bioethics – noted that, “Almost any patient would be shocked to find out that Facebook is being provided an easy way to associate their prescriptions with their name…Even if perhaps there’s something in the legal architecture that permits this to be lawful, it’s totally outside the expectations of what patients think the health privacy laws are doing for them” [Source A].\n" +
                                        "\tA related 2018 investigation by ProPublica and NPR was aptly titled “Health Insurers Are Vacuuming Up Details About You — And It Could Raise Your Rates.” While some firms that collect, sell, and purchase healthcare data online denied that their insights could be used to raise insurance premiums for certain patient populations, others suggested that these analyses could inform prices. The article mentions a study by the company SAS with an unnamed insurer. The study found that “higher health care costs could be predicted by looking at things like ethnicity, watching TV and mail order purchases” [Source K].\n"
                                },
                                /*{
                                    title: "Story 2",
                                    description: "Our journey began with a simple observation: people searching for health information online often struggle to understand how their sensitive data is being handled. We set out to change that by creating a tool that makes privacy policies transparent and accessible.Our journey began with a simple observation: people searching for health information online often struggle to understand how their sensitive data is being handled. We set out to change that by creating a tool that makes privacy policies transparent and accessible.Our journey began w"
                                },*/
                                // ... Add other sections
                            ].map((section, index) => (
                                <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                    <Typography variant="subtitle1" gutterBottom>{section.title}</Typography>
                                    <Typography color="text.secondary">{section.description}</Typography>
                                </Paper>
                            ))}

                            {/*<Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Our Mission & Impact</Typography>
                            {[
                                {
                                    title: "Why We Started",
                                    content: "Our journey began with a simple observation: people searching for health information online often struggle to understand how their sensitive data is being handled. We set out to change that by creating a tool that makes privacy policies transparent and accessible."
                                },
                                // ... Add other sections
                            ].map((section, index) => (
                                <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                    <Typography variant="subtitle1" gutterBottom>{section.title}</Typography>
                                    <Typography color="text.secondary">{section.content}</Typography>
                                </Paper>
                            ))}*/}
                        </CardContent>
                    </Card>
                )}
            </Box>

            {/* Chat Window */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    transition: 'all 0.3s',
                    width: isChatOpen ? 320 : 'auto'
                }}
            >
                {!isChatOpen ? (
                    <Fab color="primary" onClick={() => setIsChatOpen(true)}>
                        <Chat />
                    </Fab>
                ) : (
                    <Card>
                        <CardHeader
                            title="Need Help?"
                            action={
                                <IconButton onClick={() => setIsChatOpen(false)}>
                                    <Remove />
                                </IconButton>
                            }
                            sx={{ py: 2 }}
                        />
                        <CardContent>
                            <Box sx={{ height: 300, overflowY: 'auto', mb: 2 }}>
                                {chatMessages.map((msg, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            p: 1,
                                            mb: 1,
                                            borderRadius: 1,
                                            bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                                            ml: msg.sender === 'user' ? 4 : 0,
                                            mr: msg.sender === 'bot' ? 4 : 0
                                        }}
                                    >
                                        <Typography>{msg.text}</Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box component="form" onSubmit={sendMessage} sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type your question..."
                                />
                                <Button type="submit" variant="contained" endIcon={<Send />}>
                                    Send
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default PrivacyDashboard;