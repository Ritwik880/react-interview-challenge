// Write a functional component that accepts an extended piece of text from the user and prints the text to the screen, beginning with the first word and appending the next word every half-second until the entire text is displayed on the screen. For example, if the user submits “Hi my name is Bob”, the screen should read “Hi”, then “Hi my”, then “Hi my name”, and so on. If the user submits another piece of text reset the display and begin printing the new text. 

import React, { useState, useEffect, memo } from 'react';
import { useSnackbar } from '../context/SnackBarContext';
import { BodyWrapper, FormWrapper, CardContentWrapper, CardWrapper } from '../styles/StyledComponent';
import { Button, Typography, Grid, TextField } from '@mui/material';

const OptimiseChallenge18 = memo(() => {
    const [value, setValue] = useState('');
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0); // Start from index 0
    const snackbar = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();
        const allWords = value.split(' ');
        if (allWords.length <= 1) {
            snackbar('Enter more than one word');
        } else {
            setWords(allWords);
            setIndex(0); // Start displaying from the first word
            setValue('');
            clearInterval(timer); // Clear the timer when submitting
        }
    };

    useEffect(() => {
        let timer;
        if (words.length > 0 && index < words.length) {
            timer = setInterval(() => {
                setIndex((prevIndex) => prevIndex + 1);
            }, 1000);
        }

        return () => clearInterval(timer);

    }, [words, index]);

    let timer; // Declare timer outside of useEffect

    return (
        <BodyWrapper>
            <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                <Grid item lg={6} md={12}>
                    <FormWrapper onSubmit={handleSubmit}>
                        <TextField
                            id='outlined-basic'
                            label='Search'
                            variant='outlined'
                            fullWidth
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            sx={{ marginRight: '10px' }}
                        />
                        <Button variant='contained' type='submit' size="large">
                            Submit
                        </Button>
                    </FormWrapper>
                </Grid>
                <Grid item lg={12} md={6} xs={12}>
                    {words.length !== 0 && (
                        <CardWrapper variant='outlined'>
                            <CardContentWrapper>
                                <Typography>{words.slice(0, index + 1).join(' ')}</Typography>
                            </CardContentWrapper>
                        </CardWrapper>
                    )}
                </Grid>
            </Grid>
        </BodyWrapper>
    );
});

export default OptimiseChallenge18;
