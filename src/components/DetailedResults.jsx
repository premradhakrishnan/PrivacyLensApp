// components/DetailedResults.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    List, 
    ListItem, 
    ListItemText,
    Button,
    CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const DetailedResults = () => {
    const [searchParams] = useSearchParams();
    const [domains, setDomains] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Get all domains from URL parameters
        const domainParams = searchParams.getAll('domains[]');
        setDomains(domainParams);
        setIsLoading(false);
    }, [searchParams]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Button 
                    startIcon={<ArrowBack />} 
                    onClick={() => navigate('/')}
                    sx={{ mb: 3 }}
                >
                    Back to Dashboard
                </Button>

                <Typography variant="h4" gutterBottom>
                    Detailed Analysis Results
                </Typography>

                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Analyzed Domains
                            </Typography>
                            <List>
                                {domains.map((domain, index) => (
                                    <ListItem key={index} divider={index !== domains.length - 1}>
                                        <ListItemText 
                                            primary={domain}
                                            secondary="Click for detailed analysis"
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            {domains.length === 0 && (
                                <Typography color="text.secondary">
                                    No domains provided for analysis.
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                )}
            </Box>
        </Container>
    );
};

export default DetailedResults;