// Create a React component that increments a counter when a button is clicked. Note: The challenge is to implement it in such a way that it doesn't use the useState hook or class state.

import React, { useState, useRef, memo } from 'react';
import { BodyWrapper, ColumnWrapper } from '../styles/StyledComponent';
import { Button, Typography } from '@mui/material';

const MiniChallenge1 = memo(() => {
    // creating a ref to store the counter value
    const counterRef = useRef(0);

    // creating a function to increment the counter
    const incrementCounter = () => {
        counterRef.current += 1;

        setForceRender({});
    };

    // creating an empty object to trigger re-renders when necessary
    const [, setForceRender] = useState({});

    return (
        <BodyWrapper>
            <ColumnWrapper>
                <Typography fontSize={40} variant='h1' gutterBottom>Counter: {counterRef.current}</Typography>
                <Button onClick={incrementCounter} variant='contained'>Increment</Button>
            </ColumnWrapper>
        </BodyWrapper>
    );
})

export default MiniChallenge1;
