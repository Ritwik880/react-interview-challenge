import React, { memo, useState, useCallback } from 'react';
import { Box, Grid, TextField, ImageList, ImageListItem, CircularProgress } from '@mui/material';

import { BodyWrapper } from '../styles/StyledComponent';

const OptimiseChallenge10 = memo(() => {
    const URL = `https://robohash.org/`;

    const [string, setString] = useState('');
    const [loading, setLoading] = useState(false);
    const [allImages, setAllImages] = useState([]);

    const handleGenerateCard = useCallback(async (input) => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}${input}`);
            if (response.ok) {
                const data = response;
                setAllImages((prev) => [...prev, data.url]);
                setLoading(false);
                setString('');
            } else {
                throw new Error(`Failed to fetch data. Status code: ${response.status}`);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        } finally{
            setLoading(false);
        }
    }, [])

    const handleChange = useCallback((value) => {
        setString(value);
    }, [])

    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                const getValue = string.trim();
                if (getValue === '') {
                    // Clear the image URL if the input is empty
                    setAllImages([]);
                } else {
                    handleGenerateCard(getValue); // Pass getValue to handleGenerateCard
                }
            }
        }, [string, handleGenerateCard]
    )

    const handleRemoveImage = useCallback((image) => {
        setLoading(true);
        const updatedImagesList = allImages.filter((item) => item !== image);
        setAllImages(updatedImagesList);
        setLoading(false);
    }, [])

    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={12} xs={12}>
                        <TextField
                            required
                            placeholder='Enter title'
                            id="my-input"
                            aria-describedby="my-helper-text"
                            fullWidth
                            value={string}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </Grid>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: '20px' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid item lg={12} md={12} display='flex' justifyContent='center' alignItems='center'>
                            <ImageList sx={{ width: 500, height: 450 }} cols={4} rowHeight={164} alignItems='center'>
                                {allImages.map((item) => (
                                    <ImageListItem key={item}>
                                        <img
                                            srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                            alt="Robo Image"
                                            loading="lazy"
                                            onClick={() => handleRemoveImage(item)}
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </BodyWrapper>
    );
});

export default OptimiseChallenge10;
