// components/results/OverviewTab.jsx
import React from 'react';
import { Typography, Grid, Card, CardContent, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { textStyles } from '../../utils/textStyles';
import { calculateAverageScore, findHighestScore, findLowestScore } from '../../utils/resultsUtils';
import { getCommonPrivacyIssues } from '../../utils/privacyIssuesUtils';
import ScoreDistributionChart from './ScoreDistributionChart';
import SiteScoreCard from './SiteScoreCard';
import SiteScoreCardSearch from "./SiteScoreCardSearch.jsx";

/**
 * Overview tab for results page
 * @param {Object} props
 * @param {Array} props.results - List of site results
 * @param {string|null} props.expandedSite - Domain of currently expanded site
 * @param {Function} props.onSiteSelect - Callback when a site is selected
 */
const OverviewTabSearch = ({ results, expandedSite, onSiteSelect }) => {
    // Get common privacy issues from the data

    return (
        <>
            <Typography variant="h5" sx={{ mt: 4, mb: 2, ...textStyles.headingLeft }}>
                Individual Site Analysis
            </Typography>

            {results.map(site => (
                <SiteScoreCardSearch
                    key={site.domain}
                    site={site}
                    onSelectSite={onSiteSelect}
                    isExpanded={true}
                />
            ))}
        </>
    );
};

export default OverviewTabSearch;