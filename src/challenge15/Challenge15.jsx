import React, { useState, memo } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { BodyWrapper } from '../styles/StyledComponent';

const Challenge15 = memo(() => {
    const [string, setString] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState(null);

    const handleChange = (value) => {
        setString(value);
    };

    const handleCalculate = (operationFn) => {
        setOperation(operationFn);
    };

    const handleClick = () => {
        if (operation && string !== '') {
            const newValue = operation(string);
            setResult(newValue.toString()); // Convert the result to a string
        }
    };

    const half = (value) => {
        return parseFloat(value) / 2;
    };

    const double = (value) => {
        return parseFloat(value) * 2;
    };

    const increment = (value) => {
        return parseFloat(value) + 1;
    };

    const decrement = (value) => {
        return parseFloat(value) - 1;
    };

    const clear = () => {
        return '';
    };

    return (
        <BodyWrapper>
            <Grid container spacing={2}>
                <Grid item lg={12} md={6} xs={12}>
                    <Button variant='contained' onClick={() => handleCalculate(half)}>
                        Half
                    </Button>
                    <Button variant='contained' onClick={() => handleCalculate(double)}>
                        Double
                    </Button>
                    <Button variant='contained' onClick={() => handleCalculate(increment)}>
                        Increment
                    </Button>
                    <Button variant='contained' onClick={() => handleCalculate(decrement)}>
                        Decrement
                    </Button>
                    <Button variant='contained' onClick={() => handleCalculate(clear)}>
                        Clear
                    </Button>
                </Grid>
                <Grid item lg={12} xs={12}>
                    <TextField
                        required
                        placeholder='Enter value'
                        id='my-input'
                        aria-describedby='my-helper-text'
                        fullWidth
                        value={string}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <Button variant='contained' onClick={handleClick}>
                        Submit
                    </Button>
                </Grid>
                {result !== '' && (
                    <Grid item lg={12} xs={12}>
                        <Typography variant='h6'>Result: {result}</Typography>
                    </Grid>
                )}
            </Grid>
        </BodyWrapper>
    );
});

export default Challenge15;
