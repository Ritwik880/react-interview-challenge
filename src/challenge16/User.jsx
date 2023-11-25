import React from 'react';
import { useParams } from 'react-router-dom';
import { UserWrapper } from '../styles/StyledComponent';
import useApi from './useApi';
import { Box, CircularProgress, Grid, Typography, Card, CardContent } from '@mui/material';

const User = () => {
    const { id } = useParams();
    const { users, loading } = useApi(id); // Pass id directly

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!users) {
        // Handle the case when the user data is not available
        return <div>User not found</div>;
    }

    return (
        <UserWrapper>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {users.name ? users.name.first : 'User'}
                            </Typography>
                            <Typography variant="body2">
                                {users.name ? users.name.last : 'Test'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </UserWrapper>
    );
}

export default User;
