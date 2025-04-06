import React, { useEffect, useState } from "react";
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
    Typography,
    Snackbar,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Collapse } from "react-collapse";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const SearchSection = ({
                           searchQuery,
                           setSearchQuery,
                           handleSearch,
                           error,
                           searchResults,
                           isLoading,
                           isSearchTriggered,
                       }) => {
    const predefinedQueries = ["mayoclinic.org", "healthline.com", "webmd.com"];
    const navigate = useNavigate();

    useEffect(() => {
        // Trigger handleSearch for each predefined website on initial page load
        predefinedQueries.forEach((query) => {
            handleSearch(null, query); // Use the handleSearch method to fetch each predefined website
        });
    }, []);

    const [openIndexes, setOpenIndexes] = useState([]);
    const [persistedResults, setPersistedResults] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    // Combine persisted results with the latest search results, avoiding duplicates
    const combinedResults = [
        ...persistedResults,
        ...searchResults.filter(
            (result) =>
                !persistedResults.some(
                    (persisted) => persisted.domain === result.domain
                )
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
            setPersistedResults((prev) => [...prev, result]);
        } else {
            setPersistedResults((prev) =>
                prev.filter((persisted) => persisted.domain !== result.domain)
            );
        }
    };

    const handleRequestRegrade = async (domain) => {
        try {
            if (!domain) {
                throw new Error("Domain cannot be empty");
            }

            const bodyData = new URLSearchParams();
            bodyData.append("requestRegrade", "true");
            bodyData.append("domain", domain);

            const postResponse = await fetch("http://127.0.0.1:8000/requestRegrade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: bodyData.toString(),
            });

            if (!postResponse.ok) {
                throw new Error(`POST request failed with status: ${postResponse.status}`);
            }

            setShowPopup(true); // Show success popup
        } catch (error) {
            console.error("Error during regrade request:", error);
        }
    };

    const handleNavigateToDetails = (domain) => {
        // Craft the URL with domains[] as the parameter name
        const baseUrl = "/detailed-results-search";
        const params = new URLSearchParams();
        params.append("domains[]", domain); // Use domains[] as the parameter name
        const craftedUrl = `${baseUrl}?${params.toString()}`;

        // Navigate to the crafted URL
        navigate(craftedUrl);
    };

    return (
        <Box sx={{ space: "y-6" }}>
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
                    <Alert severity="error">
                        Website not found or incorrect input
                    </Alert>
                )}
            </Box>

            {/* Search Results */}
            <Card>
                <CardHeader title="Privacy Policy Analysis Results" />
                <CardContent>
                    {isLoading ? (
                        <Alert severity="info">Loading results...</Alert>
                    ) : !isLoading &&
                    isSearchTriggered &&
                    combinedResults.length === 0 &&
                    !error ? (
                        <Alert severity="warning">No results found</Alert>
                    ) : (
                        combinedResults.map((result, index) => {
                            const isPersisted = persistedResults.some(
                                (persisted) => persisted.domain === result.domain
                            );

                            return (
                                <Card key={index} sx={{ mb: 4, border: "1px solid #e0e0e0" }}>
                                    {/* Collapsible Header */}
                                    <CardHeader
                                        sx={{
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            backgroundColor: "#f9f9f9",
                                            padding: "16px",
                                        }}
                                        titleTypographyProps={{
                                            sx: {
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                gap: "12px",
                                                flexWrap: "wrap",
                                            },
                                        }}
                                        title={
                                            <React.Fragment>
                                                {/* Collapse Icon */}
                                                <span
                                                    onClick={() => toggleCollapse(index)}
                                                    style={{
                                                        display: "flex",
                                                        fontSize: 18,
                                                        color: "#555",
                                                        transform: openIndexes.includes(index)
                                                            ? "rotate(180deg)"
                                                            : "rotate(0deg)",
                                                        transition: "transform 0.2s",
                                                    }}
                                                >
                                                    ▼
                                                </span>

                                                {/* Title and Score */}
                                                <span>{result.domain}</span>
                                                <span
                                                    style={{
                                                        padding: "4px 8px",
                                                        borderRadius: 12,
                                                        fontSize: 14,
                                                        marginLeft: "auto",
                                                        backgroundColor:
                                                            result.finalScore > 50
                                                                ? "rgba(46, 125, 50, 0.1)"
                                                                : result.finalScore > 20
                                                                    ? "rgba(249, 168, 37, 0.1)"
                                                                    : "rgba(198, 40, 40, 0.1)",
                                                        color:
                                                            result.finalScore > 50
                                                                ? "#2e7d32"
                                                                : result.finalScore > 20
                                                                    ? "#f9a825"
                                                                    : "#c62828",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Score:{" "}
                                                    {result.finalScore > 50
                                                        ? "Strong"
                                                        : result.finalScore > 20
                                                            ? "Moderate"
                                                            : "Weak"}
                                                </span>

                                                {/* Persist Checkbox */}
                                                <Checkbox
                                                    checked={isPersisted}
                                                    onChange={(e) =>
                                                        handlePersistChange(
                                                            result,
                                                            e.target.checked
                                                        )
                                                    }
                                                    sx={{ marginLeft: "8px" }}
                                                />
                                            </React.Fragment>
                                        }
                                        onClick={() => toggleCollapse(index)}
                                    />

                                    {/* Collapsible Content */}
                                    <Collapse isOpened={openIndexes.includes(index)}>
                                        <CardContent
                                            sx={{
                                                padding: "16px",
                                                borderTop: "1px solid #e0e0e0",
                                            }}
                                        >
                                            {/* Privacy Policy Summary */}
                                            <Typography
                                                variant="h6"
                                                sx={{ mb: 2, fontWeight: "500" }}
                                            >
                                                Privacy Policy Summary
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{ color: "#555", mb: 2 }}
                                            >
                                                {result.PrivacyLensAssessmentSummary}
                                            </Typography>
                                            <a
                                                href={result.privacyPolicyURL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#1976d2",
                                                }}
                                            >
                                                View Full Policy
                                            </a>

                                            {/* Section Scores */}
                                            <Typography
                                                variant="h6"
                                                sx={{ mt: 3, mb: 1, fontWeight: "500" }}
                                            >
                                                Section Scores
                                            </Typography>
                                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                                {Object.entries(result.sectionScores).map(
                                                    ([section, score], idx) => (
                                                        <li
                                                            key={idx}
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                padding: "8px",
                                                                marginBottom: "8px",
                                                                backgroundColor: "#f9f9f9",
                                                                borderRadius: "4px",
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="body2"
                                                                sx={{ fontWeight: "500" }}
                                                            >
                                                                {section}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: "500",
                                                                    color:
                                                                        score >= 80
                                                                            ? "#2e7d32"
                                                                            : score >= 70
                                                                                ? "#f9a825"
                                                                                : "#c62828",
                                                                }}
                                                            >
                                                                {score}
                                                            </Typography>
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            {/* Buttons */}
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: 2,
                                                    justifyContent: "center",
                                                    mt: 3,
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={() =>
                                                        handleNavigateToDetails(result.domain)
                                                    }
                                                    sx={{
                                                        px: 4,
                                                        py: 1,
                                                        fontSize: "16px",
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    View Detailed Results
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleRequestRegrade(result.domain)
                                                    }
                                                    variant="contained"
                                                    sx={{
                                                        px: 4,
                                                        py: 1,
                                                        fontSize: "16px",
                                                        textTransform: "none",
                                                    }}
                                                >
                                                    Request Regrade
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            );
                        })
                    )}
                </CardContent>
            </Card>

            {/* Snackbar for Regrade Request */}
            <Snackbar
                open={showPopup}
                autoHideDuration={3000}
                onClose={() => setShowPopup(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setShowPopup(false)}
                    severity="success"
                    sx={{
                        backgroundColor: "#e0f7fa",
                        color: "#00695c",
                        borderRadius: "8px",
                    }}
                >
                    <Typography variant="body1" sx={{ fontWeight: "500" }}>
                        Regrade request received
                    </Typography>
                </Alert>
            </Snackbar>
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
    isSearchTriggered: PropTypes.bool.isRequired,
};

export default SearchSection;