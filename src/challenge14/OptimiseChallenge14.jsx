import React, { useCallback, useState, useEffect, memo, useMemo } from 'react';
import { Box, Button, Grid, CircularProgress, ImageList, ImageListItem, Typography } from '@mui/material';
import { BodyWrapper } from '../styles/StyledComponent';

//constants
import { ONE, TWO, THREE, FOUR, FIVE, SIX } from '../utils/constant';

//library import
import { useSnackbar } from '../context/SnackBarContext';

const OptimiseChallenge14 = memo(() => {

    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([]);
    const [showData, setShowData] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [randomNumber, setRandomNumber] = useState(null);
    const snackbar = useSnackbar();

    const getAllImages = async (urls) => {
        try {
            setLoading(true);
            const response = Promise.all(urls.map(url => fetch(url)));
            const data = await Promise.all((await response).map(response => {
                if (response.ok) {
                    return response.url;
                }
                else {
                    throw new Error(`Failed to execute the code ${response.status}`)
                }
            }))
            setAllData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }
    }

    const generateRandomNumber = () => {
        const min = 1;
        const max = 5;
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandomNumber(random);
        setShowButton(false);
    }

    useEffect(() => {
        getAllImages([ONE, TWO, THREE, FOUR, FIVE, SIX])
    }, [])

    const handleClick = useCallback(() => {
        generateRandomNumber()
        setShowData(true);
    }, [])

    const handleMatchIndex = useCallback((indexPoint) => {
        if (indexPoint === randomNumber) {
            setShowData(false);
            setRandomNumber(null);
            setShowButton(true);
        }
        else {
            showSnackbar('Try Again !');
        }
    }, [randomNumber, showSnackbar])


    const imageListJSX = useMemo(() => {
        if (showData) {
            return (
                <ImageList sx={{ width: 700, height: 290 }} cols={3} rowHeight={114}>
                    {allData && allData.map((item, index) => (
                        <ImageListItem key={index} sx={{ cursor: 'pointer' }}>
                            <img
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                alt="Random Images"
                                loading="lazy"
                                onClick={() => handleMatchIndex(index)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            )
        }
        return null;
    }, [showData, allData])

    return (
        <BodyWrapper>
            <Box textAlign='center'>
                {showButton && (
                    <Button
                        alignItems='center'
                        variant='contained'
                        onClick={handleClick}
                        sx={{ marginBottom: '10px' }}
                    >
                        I am not a robot
                    </Button>
                )}
                <Typography fontSize={24} fontWeight={500} gutterBottom textAlign='center' alignItems='center'>
                    {
                        randomNumber && `Select: ${randomNumber}`
                    }
                </Typography>
                <Grid container spacing={2}>
                    {
                        loading ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100vh',
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid item lg={12} md={12}>
                                {imageListJSX}
                            </Grid>
                        )
                    }
                </Grid>

            </Box>
        </BodyWrapper>
    );
});

export default OptimiseChallenge14;
