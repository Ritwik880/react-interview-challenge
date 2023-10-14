import React, {memo} from 'react'
import { useParams } from 'react-router-dom';


//mui import
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import useIndividualApi from '../custom-hooks/useIndividualApi';

import { UserWrapper } from '../styles/StyledComponent';


const IndividualPost = memo(() => {
    const { id } = useParams();
    const URL = `https://jsonplaceholder.typicode.com/posts/${id}`;

    const {items, loading} = useIndividualApi(URL);

    return (
        <MainWrapper>
            {
                loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item lg={12} md={12} xs={12}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            {
                                                items.title
                                            }
                                        </Typography>

                                        <Typography variant="body2">
                                            {
                                                items.body
                                            }
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )
            }

        </MainWrapper>
    )
})

export default IndividualPost