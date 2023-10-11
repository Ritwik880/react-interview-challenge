// Write a functional component that includes a text input field and, below it, a list of images. At the start, the list should be empty. When the user submits some string input-string, the function should append the robot image corresponding to that string to the current list of images. When a user clicks on a robot image, the image should be removed from the list. Finally, if you are inclined to take on styling details, center the input field and display the robot list in centered rows that wrap to the next line after exceeding the page’s width.



import React, { useState, useEffect, memo } from 'react';
import { BodyWrapper } from '../styles/StyledComponent';
import { Box, CircularProgress, Grid, ImageList, TextField, ImageListItem } from '@mui/material';
import { useSnackbar } from '../context/SnackBarContext';
const Challenge22 = memo((() => {

    const URL = `https://robohash.org/`;

    const [value, setValue] = useState('');
    const [allImages, setAllImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const snackbar = useSnackbar();


    const handleGenerateImages = async (input) => {
        try {
            setLoading(true);
            const response = await fetch(`${URL}${input}`);
            if (response.ok) {
                const data = response;
                console.log(data);
                console.log(data.url);
                setAllImages((prev) => [...prev, data.url]);
                setLoading(false);
                setValue('');
            }
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }
    }
    const handleChange = (value) => {
        setValue(value);
        console.log(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const getValue = value.trim();
            console.log(getValue);
            if (getValue === '') {
                setAllImages([]);
            }
            else {
                handleGenerateImages(getValue);
            }
        }
    }

    const handleRemoveImage = (image)=>{
        setLoading(true);
        const updateImageList = allImages.filter((item)=> item !== image);
        console.log(updateImageList);
        setAllImages(updateImageList);
        setLoading(false)
    }
    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={12} xs={12}>
                        <TextField
                            required
                            placeholder='Enter title'
                            id='my-input'
                            araia-aria-describedby='my-helper-text'
                            fullWidth
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </Grid>
                    {
                        loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Grid>
                                <ImageList sx={{ width: 500, height: 450 }} cold={3} rowHeight={164}>
                                    {
                                        allImages.map((item, index) => (
                                            <ImageListItem key={`image-${index}`}>
                                                    <img srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                    alt='Robo Image'
                                                    loading='lazy'
                                                    onClick={()=> handleRemoveImage(item)}
                                                    />
                                            </ImageListItem>
                                        ))
                                    }

                                </ImageList>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </BodyWrapper>
    )
}))

export default Challenge22