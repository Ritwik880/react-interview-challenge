import React, { memo, useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BodyWrapper } from '../styles/StyledComponent';

const PostPage = memo(() => {
    const location = useLocation();
    const { state } = location;
    const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('items')) || []);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearTimeout(loadingTimer);
        };
    }, []);

    return (
        <BodyWrapper>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Grid container spacing={2}>
                        {items.map((item) => (
                            <Grid item lg={6} md={6} xs={12} key={item.id}>
                                <Card variant="outlined" sx={{ marginBottom: '10px' }}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {item.body}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </BodyWrapper>
    );
});

export default PostPage;
