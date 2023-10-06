import React, { memo, useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { BodyWrapper } from '../styles/StyledComponent';

const Challenge9 = memo(() => {
    let URL = `https://www.boredapi.com/api/activity`;
    const initialList = {
        "activity1": "Take your dog on a walk",
        "type1": "relaxation",
        "participants1": 1,
        "price1": 0,
        "link1": "",
        "key1": "9318514",
        "accessibility1": 0.2
    };

    const [additionalList, setAdditionalList] = useState({});
    const [loading, setLoading] = useState(false);

    const handleGenerateCard = async () => {
        try {
            setLoading(true);
            const response = await fetch(URL);
            const data = await response.json();
            setAdditionalList((prev) => ({ ...prev, data }));
            setShowOtherAllItems(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    }


    const [showAllItems, setShowAllItems] = useState(false);
    const [showOtherAllItems, setShowOtherAllItems] = useState(false);

    const handleShowAllItems = () => {
        setShowAllItems(true);
        // setLoading(false);
    };

    const handleShowAllOtherItems = () => {
        setShowOtherAllItems(true);
        // setLoading(false);
    }

    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} xs={12}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }}>
                                    {initialList["activity1"]}
                                </Typography>
                                {showAllItems && (
                                    <>
                                        {Object.entries(initialList).map(([key, value]) => (
                                            <Typography key={key} sx={{ fontSize: 14 }}>
                                                {key}: {value}
                                            </Typography>
                                        ))}

                                    </>
                                )}
                            </CardContent>
                        </Card>
                        {!showAllItems && (
                            <Button variant="contained" onClick={handleShowAllItems} sx={{ marginTop: '10px' }}>
                                Show All
                            </Button>
                        )}
                    </Grid>
                    <Grid item lg={12} md={12} xs={12}>
                        <LoadingButton variant="contained" onClick={handleGenerateCard} sx={{ marginTop: '10px' }} loading={loading}>
                            Generate Card
                        </LoadingButton>
                    </Grid>
                    {
                        loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>

                                {showOtherAllItems && (
                                    <Grid item lg={12} md={12} xs={12}>
                                        <Card variant="outlined">
                                            <>
                                                {Object.entries(additionalList).map(([key, value]) => (
                                                    <CardContent key={key}>
                                                        <Typography sx={{ fontSize: 14 }}>
                                                            {key}: {value}
                                                        </Typography>
                                                    </CardContent>
                                                ))}
                                            </>
                                            {showOtherAllItems && (
                                                <LoadingButton variant="contained" onClick={handleShowAllOtherItems} sx={{ margin: '10px' }}>
                                                    Show All
                                                </LoadingButton>
                                            )}
                                        </Card>
                                    </Grid>
                                )}

                            </>

                        )
                    }
                </Grid>
            </Box>
        </BodyWrapper>
    );
});

export default Challenge9;
