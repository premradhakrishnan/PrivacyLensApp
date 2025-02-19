import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {Alert, Slider} from '@mui/material';
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
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';

const PrivacyDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pinnedSites, setPinnedSites] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [expandedItems, setExpandedItems] = useState({});
    const theme = useTheme();
    const [error, setError] = useState(false); //


    const searchResultsRef = useRef([]);


    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [error1, setError1] = useState(null);


    // Mock data remains the same as in your original code


    const historicalData = [
        { section: "Data Collection", average: 82 },
        { section: "Data Sharing", average: 75 },
        { section: "User Rights", average: 80 },
        { section: "Security Measures", average: 78 },
        { section: "Data Retention", average: 73 },
        { section: "Policy Clarity", average: 77 }
    ];

    const [numBins, setNumBins] = useState(10); // Default number of bins

    // Function to handle slider value change
    const handleSliderChange = (event, newValue) => {
        setNumBins(newValue);
    };


    const data = {
        invasiveness: [
            {
                "score": 0.2994278883
            },
            {
                "score": 0.4547953068
            },
            {
                "score": 0.7915772518
            },
            {
                "score": 0.8222388472
            },
            {
                "score": 0.5567117072
            },
            {
                "score": 0.6242091757
            },
            {
                "score": 0.8333803638
            },
            {
                "score": 0.8706964414
            },
            {
                "score": 0.3942061671
            },
            {
                "score": 0.07365237903
            },],
        storage: [
            { score: 1, count: 20 },
            { score: 2, count: 25 },
            { score: 3, count: 30 },
            // Add more data points
        ],
        tracking: [
            { score: 1, count: 18 },
            { score: 2, count: 22 },
            { score: 3, count: 28 },
            // Add more data points
        ],
        handling: [
            { score: 1, count: 15 },
            { score: 2, count: 25 },
            { score: 3, count: 30 },
            // Add more data points
        ],
        access: [
            { score: 1, count: 20 },
            { score: 2, count: 28 },
            { score: 3, count: 25 },
            // Add more data points
        ]
    };

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

    const ScoreChart = ({ data, title, color }) => {
        const [numBins, setNumBins] = useState(5); // Default number of bins

        // Recalculate binned data when numBins changes
        const binnedData = createBins(data, numBins);

        return (
            <Box>
                {/* Slider to adjust the number of bins */}
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
                />

                {/* Chart */}
                <Typography variant="h5" align="center" gutterBottom>
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
        );
    };


    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent the page refresh on form submission
        setIsLoading(true);
        setError1(null);

        try {
            // Step 1: Perform POST request
            const postResponse = await fetch('http://127.0.0.1:8000/domains', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchQuery: searchQuery, // Replace with actual form/query data
                }),
            });

            if (!postResponse.ok) {
                throw new Error(`POST request failed: ${postResponse.status} ${postResponse.statusText}`);
            }

            console.log('POST request successful');

            // Step 2: Perform GET request
            const getResponse = await fetch('http://127.0.0.1:8000/searchresults');

            if (getResponse.ok) {
                const jsonResponse = await getResponse.json();

                if (jsonResponse?.data) {
                    searchResultsRef.current = jsonResponse.data;
                    console.log('GET request results:', searchResultsRef.current);
                } else {
                    console.error('Invalid or empty response data from GET request');
                }
            } else {
                throw new Error(`GET request failed: ${getResponse.status} ${getResponse.statusText}`);
            }
        } catch (error) {
            console.error('Error during handleSearch:', error.message);
            setError1(error.message);
        } finally {
            setIsLoading(false);
        }
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
        if (score == "Low") return 'success.main';
        if (score == "Medium") return 'warning.main';
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

    //if (isLoading) return <div>Loading...</div>; // Loading state
    if (error1) return <div>Error: {error1}</div>;


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
                    <Tab label="Graph?" />
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
                            {error && ( // Conditionally render the error message
                                <Alert severity="error">Website not found or incorrect input</Alert>
                            )}

                        </Box>
                        <Card>
                            <CardHeader title="Privacy Policy Analysis Results" />
                            <CardContent>
                                <Box sx={{ mt: 4 }}>
                                    {searchResultsRef.current.length > 0 ? (
                                        searchResultsRef.current.map((result, index) => (
                                            <Paper key={index} sx={{ mb: 2, overflow: 'hidden' }}>
                                                <Box sx={{ p: 2, bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Typography key={index} variant="body1">
                                                            {result?.domain_name || "No domain name available"}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                px: 2,
                                                                py: 0.5,
                                                                borderRadius: 'full',
                                                                bgcolor: `${getScoreColor("Medium")}`,
                                                                color: 'white'
                                                            }}
                                                        >
                                                            Score: {"Medium"}
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
                                                                {searchResultsRef.current.length > 0 ? (
                                                                    searchResultsRef.current.map((result, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {/* Render domain_url directly if it's a string */}
                                                                            <TableRow>
                                                                                <TableCell>URL</TableCell>
                                                                                <TableCell>{result.domain_url}</TableCell>
                                                                            </TableRow>

                                                                            {/* Render privacy_rating directly if it's a string */}
                                                                            <TableRow>
                                                                                <TableCell>Privacy Rating</TableCell>
                                                                                <TableCell>{result.privacy_rating}</TableCell>
                                                                            </TableRow>
                                                                        </React.Fragment>
                                                                    ))
                                                                ) : (
                                                                    <TableRow>
                                                                        <TableCell colSpan={2}>No results found</TableCell>
                                                                    </TableRow>
                                                                )}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </Paper>

                                        ))
                                    ) : (
                                        !isLoading && !error1 && (
                                            <Typography variant="body2" color="textSecondary">
                                                No results to display. Click "Search" to fetch data.
                                            </Typography>
                                        )
                                    )}
                                </Box>

                            </CardContent>

                            {/*<CardHeader title="Privacy Policy Analysis Results" />
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
                            </CardContent>*/}
                        </Card>
                    </Box>
                )}

                {tabValue === 2 && (
                    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                        <h3>Cumulative Number of Domains Over Time</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <Typography variant="h6" gutterBottom>
                                Adjust Number of Bins
                            </Typography>
                            {/*<Slider
                                value={numBins}
                                min={1} // Minimum bins
                                max={50} // Maximum bins
                                step={1} // Bin increment
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                            />*/}

                            <ScoreChart
                                data={data.invasiveness}
                                title="Invasiveness"
                                color="#DEB887"  // Brown color for invasiveness
                            />
                            <ScoreChart
                                data={data.storage}
                                title="Storage"
                                color="#F08080"  // Light coral for storage
                            />
                            <ScoreChart
                                data={data.tracking}
                                title="Tracking"
                                color="#CD5C5C"  // Indian red for tracking
                            />
                            <ScoreChart
                                data={data.handling}
                                title="Handling"
                                color="#4169E1"  // Royal blue for handling
                            />
                            <ScoreChart
                                data={data.access}
                                title="Access"
                                color="#663399"  // Rebecca purple for access
                            />
                            <LineChart data={[
                                {
                                    "date_added": "2025-01-01",
                                    "cumulative_count": 11
                                },
                                {
                                    "date_added": "2025-01-02",
                                    "cumulative_count": 24
                                },
                                {
                                    "date_added": "2025-01-03",
                                    "cumulative_count": 34
                                },
                                {
                                    "date_added": "2025-01-04",
                                    "cumulative_count": 49
                                },
                                {
                                    "date_added": "2025-01-05",
                                    "cumulative_count": 57
                                },
                                {
                                    "date_added": "2025-01-06",
                                    "cumulative_count": 68
                                },
                                {
                                    "date_added": "2025-01-07",
                                    "cumulative_count": 86
                                },
                                {
                                    "date_added": "2025-01-08",
                                    "cumulative_count": 96
                                },
                                {
                                    "date_added": "2025-01-09",
                                    "cumulative_count": 108
                                },
                                {
                                    "date_added": "2025-01-10",
                                    "cumulative_count": 122
                                },
                                {
                                    "date_added": "2025-01-11",
                                    "cumulative_count": 127
                                },
                                {
                                    "date_added": "2025-01-12",
                                    "cumulative_count": 140
                                },
                                {
                                    "date_added": "2025-01-13",
                                    "cumulative_count": 161
                                },
                                {
                                    "date_added": "2025-01-14",
                                    "cumulative_count": 179
                                },
                                {
                                    "date_added": "2025-01-15",
                                    "cumulative_count": 190
                                },
                                {
                                    "date_added": "2025-01-16",
                                    "cumulative_count": 197
                                },
                                {
                                    "date_added": "2025-01-17",
                                    "cumulative_count": 209
                                },
                                {
                                    "date_added": "2025-01-18",
                                    "cumulative_count": 220
                                },
                                {
                                    "date_added": "2025-01-19",
                                    "cumulative_count": 235
                                },
                                {
                                    "date_added": "2025-01-20",
                                    "cumulative_count": 243
                                },
                                {
                                    "date_added": "2025-01-21",
                                    "cumulative_count": 254
                                },
                                {
                                    "date_added": "2025-01-22",
                                    "cumulative_count": 268
                                },
                                {
                                    "date_added": "2025-01-23",
                                    "cumulative_count": 277
                                },
                                {
                                    "date_added": "2025-01-24",
                                    "cumulative_count": 287
                                },
                                {
                                    "date_added": "2025-01-25",
                                    "cumulative_count": 305
                                },
                                {
                                    "date_added": "2025-01-26",
                                    "cumulative_count": 323
                                },
                                {
                                    "date_added": "2025-01-27",
                                    "cumulative_count": 337
                                },
                                {
                                    "date_added": "2025-01-28",
                                    "cumulative_count": 355
                                },
                                {
                                    "date_added": "2025-01-29",
                                    "cumulative_count": 362
                                },
                                {
                                    "date_added": "2025-01-30",
                                    "cumulative_count": 379
                                },
                                {
                                    "date_added": "2025-01-31",
                                    "cumulative_count": 390
                                },
                                {
                                    "date_added": "2025-02-01",
                                    "cumulative_count": 396
                                },
                                {
                                    "date_added": "2025-02-02",
                                    "cumulative_count": 405
                                },
                                {
                                    "date_added": "2025-02-03",
                                    "cumulative_count": 416
                                },
                                {
                                    "date_added": "2025-02-04",
                                    "cumulative_count": 424
                                },
                                {
                                    "date_added": "2025-02-05",
                                    "cumulative_count": 438
                                },
                                {
                                    "date_added": "2025-02-06",
                                    "cumulative_count": 450
                                },
                                {
                                    "date_added": "2025-02-07",
                                    "cumulative_count": 464
                                },
                                {
                                    "date_added": "2025-02-08",
                                    "cumulative_count": 470
                                },
                                {
                                    "date_added": "2025-02-09",
                                    "cumulative_count": 481
                                },
                                {
                                    "date_added": "2025-02-10",
                                    "cumulative_count": 500
                                }
                            ]} margin={{ top: 20, right: 30, left: 50, bottom: 100 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date_added"
                                    label={{ value: 'Date Added', position: 'bottom', offset: 50 }}
                                    angle={-45}
                                    textAnchor="end"
                                    dy={0}
                                    tickFormatter={(value) => value.substring(0, 10)}
                                />
                                <YAxis label={{ value: 'Cumulative Count', angle: -90, position: 'left', offset: 0 }} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="cumulative_count"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                    isAnimationActive={true}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    /*<Card>

                        {/!*<CardContent>
                            <Box>
                                 Chart
                                <Card sx={{ mt: 4 }}>
                                    <CardHeader title="Historical Performance by Section" />
                                    <CardContent>
                                        <Box sx={{ height: 400 }}>

                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        </CardContent>*!/}
                    </Card>*/
                )}

                {/* About Tab */}
                {tabValue === 3 && (
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
                                    If you’re a minority who belongs to a low-income family, it turns out that patterns in vast troves of digital footprints suggest that you may face heightened health risks and cost an insurance company more money. If you’re a woman who purchases plus-size clothing, you’re evidently at risk of depression [Source K]. In 2020 alone, 25 large data brokers in the US spent $29 million on lobbying the United States federal government [Source E]. This industry exists under the guise of improving health outcomes, but the evidence suggests this data is used for other, more nefarious purposes as well.
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    Recent years have witnessed a number of high-profile cases in which Americans’ health information has been exploited. The online therapy platform BetterHelp collected sensitive mental health information from its patients and assured its users that “We never sell or rent any information you share with us.” The firm collected information on sensitive topics, including experience with depression, medication use, and self-harm tendencies.
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    However, the firm actually shared data from over 7 million users with Facebook, Snapchat, Criteo, and Pinterest. The Federal Trade Commission fined BetterHelp $7.8 million in 2023, the same year it levied a $1.5 million civil penalty against GoodRx as part of an enforcement action for the firm’s practice of sharing consumers’ personal data with a number of large tech platforms [Source, Source]. GoodRx helped patients access discounted prices on prescription drugs.
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    A February 2023 report published by Duke University researcher Joanne Kim found that people seeking mental health services online “often unknowingly [put] their sensitive mental health data at risk” and that the industry underlying this marketplace for sensitive data “appears to lack a set of best practices for handling individuals’ mental health data” [Source B].
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    In one case, the cost of 5,000 records of mental health-related information was just $275 – less than 6 cents per record. About a dozen data brokers were found to “sell mental health data for dirt cheap” with little effort to limit how the purchased data would be used by potential buyers [Source F].
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    In addition to the problems inherent in having one’s private information violated through these transactions, the risks of selling such sensitive information span identity theft, insurance fraud, blackmail, downstream sales on gray markets, and targeting at-risk groups [Source F]. A related investigation into health data brokers by the compliance management, tracking, and reporting firm Compliancy Group entitled “How Health Data Brokers Sell Lists of Depression & Anxiety Sufferers” found that information for sale can include personally-identifiable information, like name, address, contact information, prescription records, social media activity, health insurance claims, electronic health records, medical history, and data compiled from public records – at least some of which appear to constitute violations of HIPAA [Source F]. This information is reportedly aggregated and sold to marketers, insurance firms, and pharmaceutical companies.
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    How is this information amassed in the first place? For starters, a vast collection of tracking technologies that power the economic model of the modern Internet – advertising – hoovers up data about our online activities. Cookies and tracking pixels, for instance, are used to connect health data to activity on social media platforms.
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    An investigation by The Markup, “Facebook Is Receiving Sensitive Medical Information from Hospital Websites,” published in June 2022, found that Meta’s Pixel was present on the websites of 33 of the country’s top 100 hospitals. The tracking technology enabled information on patients’ medical conditions, appointments, and prescriptions to be shared with Meta. When scheduling an appointment with a doctor on the website of the University Hospitals Cleveland Medical Center, this tracking Pixel sent Meta information about the physician's name and the query used to reach her online: “pregnancy termination” [Source A].
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    The investigation revealed that data on patients’ sexual orientation and medical conditions from appointment scheduling services were shared with Meta, too. IP address information, which can be used to link appointment scheduling events to individuals or households, was shared with Meta as well. Moreover, the Pixel was found to be present within password-protected websites that many users would assume to be confidential.
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    When patients accessed such sites with Meta’s Pixel while logged into Facebook, Meta can link such activity to individual Facebook profiles. In response to these findings, Professor Glenn Cohen – director of Harvard Law School’s Petrie-Flom Center for Health Law Policy, Biotechnology, and Bioethics – noted:
                                </Typography>

                                <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', ml: 4 }}>
                                    “Almost any patient would be shocked to find out that Facebook is being provided an easy way to associate their prescriptions with their name…Even if perhaps there’s something in the legal architecture that permits this to be lawful, it’s totally outside the expectations of what patients think the health privacy laws are doing for them” [Source A].
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    A related 2018 investigation by ProPublica and NPR was aptly titled “Health Insurers Are Vacuuming Up Details About You — And It Could Raise Your Rates.” While some firms that collect, sell, and purchase healthcare data online denied that their insights could be used to compute insurance premiums for certain patient populations, others suggested that these analyses could inform pricing.
                                </Typography>

                                <Typography variant="body1" paragraph>
                                    The article mentions a study by the company SAS with an unnamed insurer. The study found that “higher health care costs could be predicted by looking at things like ethnicity, watching TV, and mail order purchases” [Source K].
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