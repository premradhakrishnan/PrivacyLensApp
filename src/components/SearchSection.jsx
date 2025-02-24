import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Card,
    CardContent,
    CardHeader,
    Alert,
    InputAdornment,
    Checkbox,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SearchSection = ({
                           searchQuery,
                           setSearchQuery,
                           handleSearch,
                           error,
                           searchResults,
                           isLoading,
                           isSearchTriggered, // New prop to track if a manual search happened
                       }) => {
    const [openIndexes, setOpenIndexes] = useState([]);
    const [persistedResults, setPersistedResults] = useState([]);

    // Combine persisted results with the latest search results, avoiding duplicates
    const combinedResults = [
        ...persistedResults,
        ...searchResults.filter((result) =>
            !persistedResults.some((persisted) => persisted.domain === result.domain)
        ),
    ];

    // Handle expanding or collapsing the row
    const toggleCollapse = (index) => {
        setOpenIndexes((prevIndexes) =>
            prevIndexes.includes(index)
                ? prevIndexes.filter((i) => i !== index)
                : [...prevIndexes, index]
        );
    };

    // Handle checkbox actions for persisting websites
    const handlePersistChange = (result, checked) => {
        if (checked) {
            setPersistedResults((prev) => [...prev, result]); // Add to persisted list
        } else {
            setPersistedResults((prev) =>
                prev.filter((persisted) => persisted.domain !== result.domain)
            ); // Remove from persisted list
        }
    };

    return (
        <Box sx={{ space: 'y-6' }}>
            {/* Search Form */}
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 6 }}>
                <TextField
                    fullWidth
                    placeholder="Search for analyzed websites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={<Search />}
                                >
                                    Search
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
                {error && (
                    <Alert severity="error">Website not found or incorrect input</Alert>
                )}
            </Box>

            {/* Search Results */}
            <Card>
                <CardHeader title="Privacy Policy Analysis Results" />
                <CardContent>
                    {isLoading ? (
                        <Alert severity="info">Loading results...</Alert>
                    ) : !isLoading && isSearchTriggered && combinedResults.length === 0 && !error ? (
                        <Alert severity="warning">No results found</Alert>
                    ) : (
                        combinedResults.map((result, index) => {
                            const isPersisted = persistedResults.some(
                                (persisted) => persisted.domain === result.domain
                            );

                            return (
                                <Card key={index} sx={{ mb: 4, border: '1px solid #e0e0e0' }}>
                                    {/* Collapsible Header */}
                                    <CardHeader
                                        sx={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundColor: '#f9f9f9',
                                            padding: '16px',
                                        }}
                                        titleTypographyProps={{
                                            sx: {
                                                display: 'flex',
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: '12px',
                                                flexWrap: 'wrap',
                                            },
                                        }}
                                        title={
                                            <React.Fragment>
                                                {/* Collapse Icon */}
                                                <span
                                                    onClick={() => toggleCollapse(index)}
                                                    style={{
                                                        display: 'flex',
                                                        fontSize: 18,
                                                        color: '#555',
                                                        transform: openIndexes.includes(index)
                                                            ? 'rotate(180deg)'
                                                            : 'rotate(0deg)',
                                                        transition: 'transform 0.2s',
                                                    }}
                                                >
                          ▼
                        </span>

                                                {/* Title and Score */}
                                                <span>{result.domain}</span>
                                                <span
                                                    style={{
                                                        padding: '4px 8px',
                                                        borderRadius: 12,
                                                        fontSize: 14,
                                                        marginLeft: 'auto',
                                                        backgroundColor:
                                                            result.finalScore >= 24
                                                                ? 'rgba(46, 125, 50, 0.1)'
                                                                : result.finalScore >= 14
                                                                    ? 'rgba(249, 168, 37, 0.1)'
                                                                    : 'rgba(198, 40, 40, 0.1)',
                                                        color:
                                                            result.finalScore >= 24
                                                                ? '#2e7d32'
                                                                : result.finalScore >= 14
                                                                    ? '#f9a825'
                                                                    : '#c62828',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                          Score: {result.finalScore >= 24 ? 'Weak' : result.finalScore >= 14 ? 'Moderate' : 'Strong'}
                        </span>

                                                {/* Persist Checkbox */}
                                                <Checkbox
                                                    checked={isPersisted}
                                                    onChange={(e) =>
                                                        handlePersistChange(result, e.target.checked)
                                                    }
                                                    sx={{ marginLeft: '8px' }}
                                                />
                                            </React.Fragment>
                                        }
                                        onClick={() => toggleCollapse(index)}
                                    />

                                    {/* Collapsible Content */}
                                    <Collapse isOpened={openIndexes.includes(index)}>
                                        <CardContent sx={{ padding: '16px', borderTop: '1px solid #e0e0e0' }}>
                                            {/* Policy Summary */}
                                            <div style={{ marginBottom: '16px' }}>
                                                <h4 style={{ fontSize: '1rem', fontWeight: '500' }}>
                                                    Privacy Policy Summary
                                                </h4>
                                                <p style={{ color: '#555' }}>{result.PrivacyLensAssessmentSummary}</p>
                                                <a
                                                    href={result.privacyPolicyURL}
                                                    style={{
                                                        color: '#1976d2',
                                                        textDecoration: 'none',
                                                        fontWeight: 500,
                                                    }}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Full Policy
                                                </a>
                                            </div>

                                            {/* Section Scores */}
                                            <div>
                                                <h4 style={{ fontSize: '1rem', fontWeight: '500' }}>
                                                    Section Scores
                                                </h4>
                                                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                                    {Object.entries(result.sectionScores).map(
                                                        ([section, score], idx) => (
                                                            <li
                                                                key={idx}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    marginBottom: '8px',
                                                                    padding: '8px',
                                                                    backgroundColor: '#f9f9f9',
                                                                    borderRadius: '4px',
                                                                }}
                                                            >
                                <span style={{ fontWeight: '500' }}>
                                  {section}
                                </span>
                                                                <span
                                                                    style={{
                                                                        fontWeight: '500',
                                                                        color:
                                                                            score >= 80
                                                                                ? '#2e7d32'
                                                                                : score >= 70
                                                                                    ? '#f9a825'
                                                                                    : '#c62828',
                                                                    }}
                                                                >
                                  {score}
                                </span>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            );
                        })
                    )}
                </CardContent>
            </Card>

            {/* View Detailed Results Button */}
            <Button
                component={Link}
                to="/detailed-results"
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
            >
                View Detailed Results
            </Button>
        </Box>
    );
};

// PropTypes Validation
SearchSection.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    error: PropTypes.string,
    searchResults: PropTypes.arrayOf(
        PropTypes.shape({
            domain: PropTypes.string.isRequired,
            PrivacyLensAssessmentSummary: PropTypes.string.isRequired,
            privacyPolicyURL: PropTypes.string.isRequired,
            finalScore: PropTypes.number.isRequired,
            sectionScores: PropTypes.objectOf(PropTypes.number).isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSearchTriggered: PropTypes.bool.isRequired, // New prop added to validate manual search
};

export default SearchSection;