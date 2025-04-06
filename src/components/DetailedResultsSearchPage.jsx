// components/DetailedResults.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    CircularProgress,
    Tabs,
    Tab
} from '@mui/material';
import {
    ArrowBack,
    FilterList,
    Search,
    BarChart
} from '@mui/icons-material';

import PageContainer from './layout/PageContainer';
import ResultsHeader from './results/ResultsHeader';
import OverviewTab from './results/OverviewTab';
import DetailedScoresTab from './results/DetailedScoresTab';
import CompareTab from './results/CompareTab';
import { fetchDetailedResults } from '../api/resultsApi';
import OverviewTabSearch from "./results/OverviewTabSearch.jsx";

const DetailedResultsSearch = () => {
    const [searchParams] = useSearchParams();
    const [domains, setDomains] = useState([]);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedSite, setExpandedSite] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Get domains from URL parameters
        const domainParams = searchParams.getAll('domains[]');
        setDomains(domainParams);

        // Fetch detailed results
        const loadResults = async () => {
            try {
                const data = await fetchDetailedResults(domainParams);
                setResults(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching detailed results:", error);
                setIsLoading(false);
            }
        };

        loadResults();
    }, [searchParams]);

    const handleSiteSelect = (site) => {
        setExpandedSite(expandedSite === site.domain ? null : site.domain);
    };

    return (
        <PageContainer>
            <Box sx={{ pb: 2 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/')}
                    sx={{ mb: 3 }}
                >
                    Back to Dashboard
                </Button>

                {/*<ResultsHeader title="Privacy Analysis Results">
                     <Button
            startIcon={<FilterList />}
            size="small"
            sx={{ mr: 1 }}
          >
            Filter
          </Button>
          <Button
            startIcon={<Search />}
            size="small"
          >
            Search
          </Button>
                </ResultsHeader>*/}

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {/*<Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
                        >
                            <Tab label="Overview" />
                        </Tabs>*/}

                        {activeTab === 0 && (
                            <OverviewTabSearch
                                results={results}
                                expandedSite={expandedSite}
                                onSiteSelect={handleSiteSelect}
                            />
                        )}

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBack />}
                                onClick={() => navigate('/')}
                            >
                                Back to Dashboard
                            </Button>

                            {/* <Button
                variant="contained"
                color="primary"
                startIcon={<BarChart />}
              >
                Export Analysis
              </Button> */}
                        </Box>
                    </>
                )}
            </Box>
        </PageContainer>
    );
};

export default DetailedResultsSearch;