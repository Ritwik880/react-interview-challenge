// Write a functional component called CustomBlur to render an image from Lorem Picsum. Below it, include a slider that allows the user to adjust the blur effect on the image. If you use the native img element as I do in the solution below, be sure to include a seed in the image so that the image is not replaced as the blur parameter changes. 

import React, { useState, useEffect, memo } from 'react';
import { BodyWrapper } from '../styles/StyledComponent';
import { Box, CircularProgress, Grid, Slider, ImageListItem, Typography } from '@mui/material';
import { useSnackbar } from '../context/SnackBarContext';
const Challenge20 = memo((() => {

    const URL = `https://picsum.photos/seed/sameimage/300`;

    const [allImages, setAllImages] = useState('');
    const [loading, setLoading] = useState(false);
    const [blurLevel, setBlurLevel] = useState(0);

    const snackbar = useSnackbar();

    const handleGenerateImage = async (uri) => {
        try {
            setLoading(true);
            const response = await fetch(uri);
            if (response.ok) {
                const data = response;
                console.log(data.url);
                setAllImages(data.url);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }
    }

    const handleBlurChange = (event, newValue) => {
        setBlurLevel(newValue);
    }

    useEffect(() => {
        handleGenerateImage(URL)
    }, [])


    const imageStyle = {
        filter: `blur(${blurLevel}px)`,
    };


    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    {
                        loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid>
                                <ImageListItem>
                                    <img srcSet={allImages}
                                        src={allImages}
                                        alt='Image'
                                        loading='lazy'
                                        style={imageStyle}
                                    />
                                </ImageListItem>

                                <Box sx={{ paddingTop: '20px' }}>
                                    <Slider
                                        value={blurLevel}
                                        onChange={handleBlurChange}
                                        min={0}
                                        max={20}
                                        step={1}
                                        aria-label="Blur"
                                        valueLabelDisplay="auto"
                                        color='secondary'
                                    />
                                </Box>
                                <Box sx={{ paddingTop: '20px' }}>
                                  <Typography fontSize={30} textAlign='center'>
                                    Blur level: {blurLevel}px
                                  </Typography>
                                </Box>
                            </Grid>

                        )
                    }
                </Grid>
            </Box>
        </BodyWrapper>
    )
}))

export default Challenge20