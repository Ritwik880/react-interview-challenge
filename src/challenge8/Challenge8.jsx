import React, { useContext, memo } from 'react'

//mui import
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { BodyWrapper } from '../styles/StyledComponent'

import ApiDataContext from '../context/context';

const Challenge8 = memo(() => {


    const userState = useContext(ApiDataContext);
    // const extractedData = Object.keys(userState).map((item) => item);
    const extractUserOnlineInfo = Object.entries(userState);
    console.log(extractUserOnlineInfo);

    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    {
                        extractUserOnlineInfo && extractUserOnlineInfo.map(([item, status]) => {
                            return (
                                <Grid item lg={6} md={6} xs={12} key={item}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography sx={{ fontSize: 14 }}>
                                                    {
                                                        item
                                                    }


                                                </Typography>
                                                <Typography color='success' fontSize={11}>
                                                <AccountCircleIcon />
                                                    {
                                                        status ? 'Online' : 'Offline'
                                                    }
                                                </Typography>
                                                

                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
        </BodyWrapper>
    )
})

export default Challenge8