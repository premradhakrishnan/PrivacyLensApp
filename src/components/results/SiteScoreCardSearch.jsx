// components/results/SiteScoreCard.jsx
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    Button,
    Divider,
    Tooltip,
    LinearProgress,
    Collapse,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Avatar
} from '@mui/material';
import {
    InfoOutlined,
    ExpandMore,
    ExpandLess,
    CheckCircle,
    Cancel,
    WarningAmber,
    FormatQuoteRounded,
    OpenInNew
} from '@mui/icons-material';

import { textStyles } from '../../utils/textStyles';
import {
    getScoreColor,
    getScoreRating,
    getScoreDisplay,
    groupScoresBySection,
    calculateSectionScore,
    getScoreLevelInfo,
    findSectionByEnumeration
} from '../../utils/resultsUtils';
import { brandColors, MAX_SCORE } from '../../utils/constants';

/**
 * Card component that displays site score and details
 * @param {Object} props
 * @param {Object} props.site - Site data object
 * @param {Function} props.onSelectSite - Callback when site is selected
 * @param {boolean} props.isExpanded - Whether card is expanded
 */
const SiteScoreCardSearch = ({ site, onSelectSite, isExpanded }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const [showExcerpt, setShowExcerpt] = useState({});

    // Handle null or undefined site data
    if (!site) return null;

    const finalScore = site.finalScore !== undefined ? site.finalScore : null;
    const scoreColor = getScoreColor(finalScore);
    const scoreRating = getScoreRating(finalScore);

    // Safely extract assessment scores
    const assessmentScores = site.assessment?.PrivacyLensAssessmentScore || [];

    // Safely extract summary data with null checks
    // Handle both object and array formats for summary
    let summary = null;
    if (site.assessment?.PrivacyLensAssessmentSummary) {
        if (Array.isArray(site.assessment.PrivacyLensAssessmentSummary)) {
            summary = site.assessment.PrivacyLensAssessmentSummary[0];
        } else {
            summary = site.assessment.PrivacyLensAssessmentSummary;
        }
    }

    const hasPositives = summary?.positives && Array.isArray(summary.positives);
    const hasConcerns = summary?.concerns && Array.isArray(summary.concerns);

    // Function to toggle section expansion
    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Function to toggle excerpt visibility
    const toggleExcerpt = (id) => {
        setShowExcerpt(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Get grouped scores by section
    const groupedScores = groupScoresBySection(assessmentScores);

    // Open full analysis dialog
    const handleOpenFullAnalysis = () => {
        setOpenDialog(true);
    };

    // Close full analysis dialog
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Get score level indicator (0-2 scale)
    const getScoreLevelIndicator = (score) => {
        const { label, color } = getScoreLevelInfo(score);
        return (
            <Chip
                label={label}
                size="small"
                sx={{
                    bgcolor: color,
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                }}
            />
        );
    };

    return (
        <Card
            sx={{
                mb: 2,
                borderLeft: `4px solid ${scoreColor}`,
                transition: 'all 0.3s ease',
                boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
                '&:hover': {
                    boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                }
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" sx={textStyles.headingLeft}>
                            {site.domain}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {site.dateCaptured ?
                                `Analyzed: ${new Date(site.dateCaptured).toLocaleDateString()}` :
                                "Not yet analyzed"
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3} sx={{ textAlign: { xs: 'left', sm: 'center' } }}>

                    </Grid>
                    <Grid item xs={6} sm={3} sx={{ textAlign: 'right' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="h5" sx={{ color: scoreColor, fontWeight: 'bold', mr: 1 }}>
                                {getScoreDisplay(finalScore, MAX_SCORE)}
                            </Typography>
                            {finalScore !== null && (
                                <Tooltip title={`Score Rating: ${scoreRating}`}>
                                    <InfoOutlined fontSize="small" />
                                </Tooltip>
                            )}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Typography variant="h5" sx={{ color: scoreColor, fontWeight: 'bold', mr: 1 }}>
                                {finalScore !== null ? scoreRating : "Not scored"}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {isExpanded && assessmentScores.length > 0 && (
                    <Box mt={2}>
                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" fontWeight="bold" sx={textStyles.headingLeft}>
                            Summary
                        </Typography>
                        {summary ? (
                            <>
                                <Typography variant="body2" paragraph sx={textStyles.bodyLeft}>
                                    {summary.overview || "No overview available."}
                                </Typography>

                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={textStyles.headingLeft}>
                                            Positives
                                        </Typography>
                                        {hasPositives && summary.positives.length > 0 ? (
                                            <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                                                {summary.positives.map((item, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2">{item}</Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary" sx={textStyles.bodyLeft}>
                                                No positive points identified.
                                            </Typography>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="subtitle2" fontWeight="bold" sx={textStyles.headingLeft}>
                                            Concerns
                                        </Typography>
                                        {hasConcerns && summary.concerns.length > 0 ? (
                                            <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                                                {summary.concerns.map((item, index) => (
                                                    <li key={index}>
                                                        <Typography variant="body2">{item}</Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <Typography variant="body2" color="text.secondary" sx={textStyles.bodyLeft}>
                                                No concerns identified.
                                            </Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={textStyles.bodyLeft}>
                                Detailed assessment information is not available for this site.
                            </Typography>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" fontWeight="bold" sx={textStyles.headingLeft}>
                            Category Scores
                        </Typography>

                        {Object.keys(groupedScores).length > 0 ? (
                            <Box sx={{ mt: 2 }}>
                                {Object.entries(groupedScores).map(([section, items]) => {
                                    if (items.length === 0) return null;

                                    const { score, maxPossible, percentage } = calculateSectionScore(items);

                                    // Count items by score level (0, 1, 2)
                                    const scoreBreakdown = {
                                        0: items.filter(item => parseInt(item.score) === 0).length,
                                        1: items.filter(item => parseInt(item.score) === 1).length,
                                        2: items.filter(item => parseInt(item.score) === 2).length
                                    };

                                    // Check if there are any issues (score < 2)
                                    const hasIssues = scoreBreakdown[0] > 0 || scoreBreakdown[1] > 0;

                                    return (
                                        <Box key={section} sx={{ mb: 2 }}>
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item xs={6}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => toggleSection(section)}
                                                    >
                                                        {expandedSections[section] ? <ExpandLess /> : <ExpandMore />}
                                                        <Typography variant="body2" sx={{ ml: 1 }}>
                                                            {section}
                                                            {hasIssues && (
                                                                <Tooltip title={`${scoreBreakdown[0]} missing, ${scoreBreakdown[1]} partial compliance`}>
                                                                    <WarningAmber
                                                                        fontSize="small"
                                                                        color="warning"
                                                                        sx={{ ml: 1, verticalAlign: 'middle' }}
                                                                    />
                                                                </Tooltip>
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography variant="body2" align="right">
                                                        {score}/{maxPossible}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ width: '100%', mr: 1 }}>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={percentage}
                                                                sx={{
                                                                    height: 8,
                                                                    borderRadius: 4,
                                                                    backgroundColor: '#e0e0e0',
                                                                    '& .MuiLinearProgress-bar': {
                                                                        backgroundColor: percentage > 70 ? brandColors.green :
                                                                            percentage > 40 ? '#f3c01d' :
                                                                                '#f44336'
                                                                    }
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Collapse in={expandedSections[section]} timeout="auto" unmountOnExit>
                                                <Box sx={{ pl: 4, pr: 2, pt: 1, pb: 1 }}>
                                                    {items.map((item, index) => {
                                                        const itemId = `${section}-${item.enumeration}-${index}`;
                                                        const scoreLevel = parseInt(item.score);
                                                        const hasExcerpt = item.excerpt && item.excerpt.trim().length > 0;

                                                        return (
                                                            <Box key={itemId} sx={{ mb: 2, pb: 1, borderBottom: '1px dashed #e0e0e0' }}>
                                                                <Grid container>
                                                                    <Grid item xs={8}>
                                                                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                                                            <Avatar
                                                                                sx={{
                                                                                    width: 20,
                                                                                    height: 20,
                                                                                    fontSize: '0.75rem',
                                                                                    mr: 1,
                                                                                    bgcolor: scoreLevel === 2 ? 'success.main' :
                                                                                        scoreLevel === 1 ? 'warning.main' : 'error.main'
                                                                                }}
                                                                            >
                                                                                {item.enumeration}
                                                                            </Avatar>
                                                                            <Box>
                                                                                {item.question}
                                                                            </Box>
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                                                                        {getScoreLevelIndicator(scoreLevel)}
                                                                        {hasExcerpt && (
                                                                            <Tooltip title="View text excerpt">
                                                                                <IconButton
                                                                                    size="small"
                                                                                    onClick={() => toggleExcerpt(itemId)}
                                                                                    sx={{ ml: 1 }}
                                                                                >
                                                                                    <FormatQuoteRounded fontSize="small" />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        )}
                                                                    </Grid>

                                                                    {item.justification && (
                                                                        <Grid item xs={12}>
                                                                            <Typography
                                                                                variant="caption"
                                                                                color="text.secondary"
                                                                                sx={{
                                                                                    display: 'block',
                                                                                    mt: 1,
                                                                                    fontStyle: scoreLevel < 2 ? 'italic' : 'normal',
                                                                                    color: scoreLevel === 0 ? 'error.main' :
                                                                                        scoreLevel === 1 ? 'warning.main' : 'text.secondary'
                                                                                }}
                                                                            >
                                                                                {item.justification}
                                                                            </Typography>
                                                                        </Grid>
                                                                    )}

                                                                    {hasExcerpt && showExcerpt[itemId] && (
                                                                        <Grid item xs={12}>
                                                                            <Box
                                                                                sx={{
                                                                                    mt: 1,
                                                                                    p: 1.5,
                                                                                    bgcolor: 'rgba(0,0,0,0.03)',
                                                                                    borderLeft: '3px solid',
                                                                                    borderColor: scoreLevel === 2 ? 'success.main' :
                                                                                        scoreLevel === 1 ? 'warning.main' : 'error.main',
                                                                                    borderRadius: '0 4px 4px 0',
                                                                                    fontSize: '0.8rem'
                                                                                }}
                                                                            >
                                                                                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                                                                                    {item.excerpt}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Grid>
                                                                    )}
                                                                </Grid>
                                                            </Box>
                                                        );
                                                    })}
                                                </Box>
                                            </Collapse>
                                        </Box>
                                    );
                                })}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Category scores are not available for this site.
                            </Typography>
                        )}

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<OpenInNew />}
                                onClick={() => window.open(`https://${site.domain}`, '_blank')}
                            >
                                Visit Website
                            </Button>
                            {site.privacyPolicyURL && (
                                <Button
                                    sx={{ ml: 2 }}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    startIcon={<OpenInNew />}
                                    onClick={() => window.open(site.privacyPolicyURL, '_blank')}
                                >
                                    View Privacy Policy
                                </Button>
                            )}
                            <Button
                                sx={{ ml: 2 }}
                                variant="outlined"
                                color="secondary"
                                size="small"
                                onClick={handleOpenFullAnalysis}
                                disabled={assessmentScores.length === 0}
                            >
                                Full Analysis Report
                            </Button>
                        </Box>
                    </Box>
                )}
            </CardContent>

            {/* Full Analysis Report Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h6">
                        Full Privacy Analysis Report: {site.domain}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Score: <span style={{ fontWeight: 'bold', color: scoreColor }}>{getScoreDisplay(finalScore, MAX_SCORE)}</span> - {scoreRating}
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    {summary && (
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                                Executive Summary
                            </Typography>
                            <Typography variant="body2" paragraph>
                                {summary.overview}
                            </Typography>

                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                                        Strengths
                                    </Typography>
                                    {hasPositives && summary.positives.length > 0 ? (
                                        <ul>
                                            {summary.positives.map((item, index) => (
                                                <li key={index}>
                                                    <Typography variant="body2">{item}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No strengths identified.
                                        </Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                                        Areas of Concern
                                    </Typography>
                                    {hasConcerns && summary.concerns.length > 0 ? (
                                        <ul>
                                            {summary.concerns.map((item, index) => (
                                                <li key={index}>
                                                    <Typography variant="body2">{item}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No concerns identified.
                                        </Typography>
                                    )}
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {/* Detailed Assessment Section with new scoring display */}
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
                        Detailed Assessment by Category
                    </Typography>

                    {Object.entries(groupedScores).map(([section, items]) => {
                        if (items.length === 0) return null;

                        const { score, maxPossible, percentage } = calculateSectionScore(items);

                        return (
                            <Box key={section} sx={{ mb: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {section}
                                    </Typography>
                                    <Box sx={{
                                        ml: 2,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 1,
                                        bgcolor: percentage > 70 ? 'success.light' : percentage > 40 ? 'warning.light' : 'error.light',
                                        display: 'inline-block'
                                    }}>
                                        <Typography variant="body2" fontWeight="bold">
                                            {score}/{maxPossible} ({Math.round(percentage)}%)
                                        </Typography>
                                    </Box>
                                </Box>

                                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                                <TableCell width="5%"><strong>#</strong></TableCell>
                                                <TableCell width="45%"><strong>Criteria</strong></TableCell>
                                                <TableCell width="15%" align="center"><strong>Score</strong></TableCell>
                                                <TableCell width="35%"><strong>Assessment</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map((item) => {
                                                const scoreLevel = parseInt(item.score);
                                                const hasExcerpt = item.excerpt && item.excerpt.trim().length > 0;

                                                return (
                                                    <TableRow
                                                        key={item.enumeration}
                                                        sx={{
                                                            backgroundColor: scoreLevel === 0 ? 'rgba(255, 235, 235, 0.3)' :
                                                                scoreLevel === 1 ? 'rgba(255, 248, 225, 0.3)' :
                                                                    'rgba(232, 245, 233, 0.3)'
                                                        }}
                                                    >
                                                        <TableCell>{item.enumeration}</TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {item.question}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {getScoreLevelIndicator(scoreLevel)}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {item.justification}
                                                            </Typography>

                                                            {hasExcerpt && (
                                                                <Box
                                                                    sx={{
                                                                        mt: 1,
                                                                        p: 1,
                                                                        bgcolor: 'rgba(0,0,0,0.03)',
                                                                        borderLeft: '3px solid',
                                                                        borderColor: scoreLevel === 2 ? 'success.main' :
                                                                            scoreLevel === 1 ? 'warning.main' : 'error.main',
                                                                        borderRadius: '0 4px 4px 0',
                                                                        fontSize: '0.8rem'
                                                                    }}
                                                                >
                                                                    <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block' }}>
                                                                        <FormatQuoteRounded fontSize="inherit" sx={{ opacity: 0.6, mr: 0.5 }} />
                                                                        {item.excerpt}
                                                                    </Typography>
                                                                </Box>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        );
                    })}

                    {/* Score Distribution */}
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mt: 3 }}>
                        Score Distribution
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        {[0, 1, 2].map(scoreValue => {
                            const count = assessmentScores.filter(item => parseInt(item.score) === scoreValue).length;
                            const percentage = Math.round((count / assessmentScores.length) * 100);
                            const { label, color } = getScoreLevelInfo(scoreValue);

                            return (
                                <Grid item xs={4} key={scoreValue}>
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            textAlign: 'center',
                                            borderColor: 'transparent',
                                            bgcolor: `${color}20` // 20% opacity version of the color
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ color: color, fontWeight: 'bold' }}>
                                            {count}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: color }}>
                                            {label} ({percentage}%)
                                        </Typography>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {site.assessment?.assumptions_or_gaps && (
                        <Box>
                            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                                Assessment Notes & Assumptions
                            </Typography>
                            <ul>
                                {site.assessment.assumptions_or_gaps.map((item, index) => (
                                    <li key={index}>
                                        <Typography variant="body2">{item}</Typography>
                                    </li>
                                ))}
                            </ul>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                    {site.privacyPolicyURL && (
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<OpenInNew />}
                            onClick={() => window.open(site.privacyPolicyURL, '_blank')}
                        >
                            View Privacy Policy
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default SiteScoreCardSearch;