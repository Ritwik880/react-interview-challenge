import React, { useState, useEffect, memo } from 'react'
import { BodyWrapper, FormWrapper, CardWrapper, CardContentWrapper } from '../styles/StyledComponent';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useSnackbar } from '../context/SnackBarContext';

const Challenge21 = memo(() => {
    const [value, setValue] = useState('');
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0);

    const snackbar = useSnackbar();

    const handleSubmit = (e) => {
        e.preventDefault();
        const allWords = value.split(' ');
        if (allWords.length <= 1) {
            snackbar('Enter more than one word!')
        }
        else {
            setWords(allWords);
            setIndex(0);
            setValue('');
        }
    }

    useEffect(() => {
        let timer;
        if (words.length > 0 && index < words.length) {
            timer = setInterval(() => {
                setIndex((prev) => prev + 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        }
    }, [words, index])


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
                            sx={{marginRight: '10px'}}
                        />
                        <Button variant='contained' type='submit' size='large'>
                            Submit
                        </Button>
                    </FormWrapper>
                </Grid>
                <Grid item lg={12} md={6} xs={12}>
                    {
                        words.length !== 0 && <CardWrapper variant='outlined'>
                            <CardContentWrapper>
                                <Typography>
                                    {
                                        words.slice(0, index + 1).join(' ')
                                    }
                                </Typography>
                            </CardContentWrapper>
                        </CardWrapper>
                    }
                </Grid>
            </Grid>

        </BodyWrapper>
    )
})

export default Challenge21