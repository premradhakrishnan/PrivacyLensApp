import React from 'react';
import { Box, Card, CardContent, Grid, Paper, Typography, Button } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';

const steps = [
    { number: 1, title: 'Step 1', description: 'Set up your account and configure your preferences.' },
    { number: 2, title: 'Step 2', description: 'Learn more about the features available to you.' },
    { number: 3, title: 'Step 3', description: 'Start exploring the app and achieving your goals!' }
];

class GettingStarted extends React.Component {
    render() {
        return (
            <Card sx={{ mb: 6 }}>
                <CardContent sx={{ py: 6 }}>
                    {/* Title Section */}
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            mb: 4,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}
                    >
                        Getting Started Guide
                    </Typography>

                    {/* Steps Section */}
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
                                    {/* Step Number */}
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

                                    {/* Step Title */}
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        {step.title}
                                    </Typography>

                                    {/* Step Description */}
                                    <Typography color="text.secondary">
                                        {step.description}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Button Section */}
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
                            onClick={() => console.log('Get Started button clicked')}
                        >
                            Get Started Now
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        );
    }
}

export default GettingStarted;