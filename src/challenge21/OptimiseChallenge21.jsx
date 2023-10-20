import React, { useState, useEffect, memo, useCallback } from 'react';
import { BodyWrapper, CardContentWrapper } from '../styles/StyledComponent';
import { Box, TextField, Grid, Button, Card, Typography } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const Timer = ({ seconds, removeTimer }) => {
    const [time, setTime] = useState(seconds);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        if (time === 0) {
            clearInterval(timer);
            removeTimer();
        }

        return () => {
            clearInterval(timer);
        };
    }, [time, removeTimer]);

    return (
        <Grid item lg={4} md={6} xs={12}>
            <Card variant="outlined">
                <CardContentWrapper>
                    <Grid display='flex' justifyContent='center' alignItems='center'>
                        <Grid>
                            <TimerOutlinedIcon />
                        </Grid>
                        <Grid>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {`${time}s`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContentWrapper>
            </Card>
        </Grid>
    )
};

const OptimiseChallenge21 = memo(() => {
    const [inputValue, setInputValue] = useState('');
    const [timers, setTimers] = useState([]);

    const handleAddTimer = useCallback(() => {
        const seconds = parseInt(inputValue, 10);

        if (!isNaN(seconds) && seconds > 0) {
            setTimers((prevTimers) => [
                ...prevTimers,
                {
                    seconds,
                    id: new Date().getTime(),
                },
            ]);
            setInputValue('');
        }
    }, [inputValue, setTimers]);

    const removeTimer = useCallback((id) => {
        setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
    }, [setTimers]);

    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12}>
                        <FormWrapper>
                            <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                fullWidth
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                sx={{ marginRight: '10px' }}
                            />
                            <Button variant="contained" type="submit" size="medium" onClick={handleAddTimer}>
                                Add Timer
                            </Button>
                        </FormWrapper>
                    </Grid>
                    <Grid container spacing={2} marginTop={2}>
                        {timers.map((timer, index) => (
                            <Timer
                                key={index}
                                seconds={timer.seconds}
                                removeTimer={() => removeTimer(timer.id)}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </BodyWrapper>
    );
});

export default OptimiseChallenge21;
