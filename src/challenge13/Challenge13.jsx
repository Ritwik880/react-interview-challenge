import React, { useState, useEffect, memo } from 'react';
import { Box, Button } from '@mui/material';
import { BodyWrapper } from '../styles/StyledComponent';

const Challenge13 = memo(() => {
    const [height, setHeight] = useState(50);
    const [width, setWidth] = useState(80);
    const [shrink, setShrink] = useState(false); // Track if the button is currently shrinking

    const handleClick = () => {
        // Check if the button is currently shrinking; if not, start the shrink animation
        if (!shrink) {
            setShrink(true);

            // Define the shrinking animation interval
            const shrinkInterval = setInterval(() => {
                setWidth((prevWidth) => prevWidth - 5);
                setHeight((prevHeight) => prevHeight - 5);
            }, 20);

            // Clear the shrinking interval after 500ms
            setTimeout(() => {
                clearInterval(shrinkInterval);
                setShrink(false); // Reset the shrink state after the animation
            }, 500);
        }
    }

    // Timer for expanding the button
    useEffect(() => {
        let timer;

        if (!shrink) {
            timer = setInterval(() => {
                setWidth((prevWidth) => prevWidth + 5);
                setHeight((prevHeight) => prevHeight + 5);
            }, 500);
        }

        return () => {
            clearInterval(timer);
        }
    }, [width, height, shrink]);

    return (
        <BodyWrapper>
            <Box>
                <Button
                    sx={{ width: width, height: height }}
                    variant='contained'
                    onClick={handleClick}
                >
                    {shrink ? 'Shrinking...' : 'Shrink'}
                </Button>
            </Box>
        </BodyWrapper>
    );
});

export default Challenge13;
