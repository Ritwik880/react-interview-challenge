import React, { useState, useEffect, memo } from 'react';
import { Box, CircularProgress, Grid, Slider, ImageListItem, Typography } from '@mui/material';
import { useSnackbar } from '../context/SnackBarContext';

const OptimiseChallenge20 = memo(() => {
    const URL = `https://picsum.photos/seed/sameimage/300`;

    const [allImages, setAllImages] = useState('');
    const [loading, setLoading] = useState(true);
    const [blurLevel, setBlurLevel] = useState(0);

    const snackbar = useSnackbar();

    const handleGenerateImage = async (uri) => {
        try {
            const response = await fetch(uri);
            if (response.ok) {
                const data = response;
                setAllImages(data.url);
            }
        } catch (error) {
            snackbar(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleBlurChange = (event, newValue) => {
        setBlurLevel(newValue);
    }

    useEffect(() => {
        handleGenerateImage(URL);
    }, []);

    return (
        <Box p={2}>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    <ImageListItem>
                        <img
                            src={`${allImages}&blur=${blurLevel}`}
                            alt="Image"
                            loading="lazy"
                            style={{ filter: `blur(${blurLevel}px)` }}
                        />
                    </ImageListItem>

                    <Box pt={2}>
                        <Slider
                            value={blurLevel}
                            onChange={handleBlurChange}
                            min={0}
                            max={20}
                            step={1}
                            aria-label="Blur"
                            valueLabelDisplay="auto"
                        />
                    </Box>

                    <Box pt={2}>
                        <Typography variant="h5" align="center">
                            Blur level: {blurLevel}px
                        </Typography>
                    </Box>
                </Grid>
            )}
        </Box>
    );
});

export default OptimiseChallenge20;
