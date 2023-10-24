import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { BodyWrapper, CardContentWrapper } from '../styles/StyledComponent';
import { Box, TextField, Grid, Button, Card, Typography } from '@mui/material';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

const Timer = memo(({ seconds, removeTimer }) => {
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
                            <Typography fontSize={16} fontWeight={600} color="text.secondary">
                                {time}s
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContentWrapper>
            </Card>
        </Grid>
    );
});

const OptimiseChallenge21 = memo(() => {
    const [inputValue, setInputValue] = useState('');
    const [timers, setTimers] = useState([]);
    const timerIdCounter = useRef(0);

    const handleAddTimer = useCallback(() => {
        const seconds = parseInt(inputValue, 10);

        if (!isNaN(seconds) && seconds > 0) {
            setTimers((prevTimers) => [
                ...prevTimers,
                {
                    seconds,
                    id: timerIdCounter.current++,
                },
            ]);
            setInputValue('');
        }
    }, [inputValue]);

    const removeTimer = useCallback((id) => {
        setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
    }, []);

    return (
        <BodyWrapper>
            <Box>
                <Grid item lg={12} md={12}>
                    <TextField
                        id='outlined-basic'
                        label='Search'
                        variant='outlined'
                        fullWidth
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        sx={{ marginRight: '10px' }}
                    />
                    <Button variant='contained' type='submit' size="medium" onClick={handleAddTimer} sx={{ marginTop: '6px' }}>
                        Add Timer
                    </Button>
                </Grid>
                <Grid container spacing={2} marginTop={2}>
                    {timers.map((timer) => (
                        <Timer key={timer.id} seconds={timer.seconds} removeTimer={() => removeTimer(timer.id)} />
                    ))}
                </Grid>
                {timers.length === 0 && (
                    <Typography fontSize={16} fontWeight={600} color="text.secondary" textAlign='center'>
                        No timers found!
                    </Typography>
                )}
            </Box>
        </BodyWrapper>
    );
});

export default OptimiseChallenge21;
