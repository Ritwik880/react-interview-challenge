import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { BodyWrapper } from '../styles/StyledComponent';

const OptimiseChallenge13 = () => {
    const [size, setSize] = useState({ width: 80, height: 50 });
    const [shrink, setShrink] = useState(false);

    const startShrinking = useCallback(() => {
        if (!shrink) {
            setShrink(true);
            const shrinkInterval = setInterval(() => {
                setSize((prevSize) => ({
                    width: prevSize.width - 1,
                    height: prevSize.height - 1,
                }));
            }, 20);
            setTimeout(() => {
                clearInterval(shrinkInterval);
                setShrink(false);
            }, 500);
        }
    }, [shrink]);

    const startExpanding = useCallback(() => {
        if (!shrink) {
            const expandInterval = setInterval(() => {
                setSize((prevSize) => ({
                    width: prevSize.width + 1,
                    height: prevSize.height + 1,
                }));
            }, 500);
            return () => clearInterval(expandInterval);
        }
    }, [shrink]);

    useEffect(() => {
        const expandTimer = startExpanding();
        return () => expandTimer();
    }, [startExpanding]);

    return (
        <BodyWrapper>
            <Box>
                <Button
                    sx={{ width: size.width, height: size.height }}
                    variant="contained"
                    onClick={startShrinking}
                >
                    {shrink ? 'Shrinking...' : 'Shrink'}
                </Button>
            </Box>
        </BodyWrapper>
    );
};

export default OptimiseChallenge13;
