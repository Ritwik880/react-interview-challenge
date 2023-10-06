import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom';

//mui import
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Card, CardContent, CardActions, Button, Typography, Grid, TextField } from '@mui/material';

//custom-hook
import useApi from '../custom-hooks/useApi';

import { BodyWrapper, InputWrapper } from '../styles/StyledComponent'


const Challenge4 = memo(() => {

    const [value, setValue] = useState('');

    const URL = `https://jsonplaceholder.typicode.com/posts`;
    const { items, loading } = useApi(URL);

    const navigate = useNavigate();

    const handleGoToIndividualPost = (id) => {
        navigate(`/${id}`);
    }


    const renderCards = (data) => {
        const filteredData = data.filter((user) =>
            user.title.toLowerCase().includes(value.toLowerCase())
        );

        if (filteredData.length === 0) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography fontSize={30} fontWeight={500} sx={{ paddingTop: '20px' }} color="text.secondary" gutterBottom textAlign='center'>
                        No Data to show!
                    </Typography>
                </Box>
            );
        }

        return filteredData.map((user) => (
            <Grid item lg={4} md={6} xs={12} key={user.id}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {user.title}
                        </Typography>
                        <Typography variant="body2">
                            {user.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleGoToIndividualPost(user.id)}>Learn More</Button>
                        <Button size="small">Create A Post</Button>
                    </CardActions>
                </Card>
            </Grid>
        ));
    };
    return (
        <BodyWrapper>
            {
                loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        <InputWrapper><TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        /></InputWrapper>

                        <Grid container spacing={2}>
                            {value !== '' ? (
                                renderCards(items)
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography fontSize={30} fontWeight={500} sx={{ paddingTop: '20px' }} color="text.secondary" gutterBottom>
                                        No Data to show!
                                    </Typography>
                                </Box>
                            )}
                        </Grid>
                    </Box>
                )
            }

        </BodyWrapper>
    )
})

export default Challenge4