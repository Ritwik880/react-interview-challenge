import React, { memo, useState } from 'react';
import { Box, Grid, TextField, ImageList, ImageListItem, CircularProgress } from '@mui/material';

import { BodyWrapper } from '../styles/StyledComponent';

const Challenge10 = memo(() => {
    const URL = `https://robohash.org/`;

    const [string, setString] = useState('');
    const [loading, setLoading] = useState(false);
    const [allImages, setAllImages] = useState([]);

    const handleGenerateCard = async (input) => {
        try {
            setLoading(true);
            const response = await fetch(`${URL}${input}`);
            if (response.ok) {
                const data = response;
                setAllImages((prev) => [...prev, data.url]);
                setLoading(false);
                console.log(data);
            } else {
                throw new Error(`Failed to fetch data. Status code: ${response.status}`);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    }

    const handleChange = (value) => {
        setString(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const getValue = string.trim();
            if (getValue === '') {
                // Clear the image URL if the input is empty
                setAllImages([]);
            } else {
                handleGenerateCard(getValue); // Pass getValue to handleGenerateCard
            }
        }
    }

    const handleRemoveImage = (image) => {
        setLoading(true);
        const updatedImagesList = allImages.filter((item) => item !== image);
        setAllImages(updatedImagesList);
        setLoading(false);
    }

    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={6} xs={12}>
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
                        <Grid item lg={12} md={12}>
                            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                                {allImages.map((item, index) => (
                                    <ImageListItem key={index}>
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

export default Challenge10;
