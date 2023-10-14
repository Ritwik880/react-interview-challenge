import React, { memo, useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import { BodyWrapper } from '../styles/StyledComponent';

const Challenge11 = memo(() => {
    const initialObject = {
        taxi: "a car licensed to transport passengers in return for payment of a fare",
        food: {
            sushi: "a traditional Japanese dish of prepared rice accompanied by seafood and vegetables",
            apple: {
                Honeycrisp: "an apple cultivar developed at the MAES Horticultural Research Center",
                Fuji: "an apple cultivar developed by growers at Tohoku Research Station",
            },
        },
    };

    const [object, setObject] = useState(initialObject);

    const renderObject = (obj, depth = 0) => {
        return Object.entries(obj).map(([key, value]) => (
            <CardContent key={key}>
                <Typography sx={{ fontSize: 14 }}>
                    {key}:
                    {typeof value === 'object' ? (
                        <ul>
                            {renderObject(value, depth + 1)}
                        </ul>
                    ) : ` ${value}`}
                </Typography>
            </CardContent>
        ));
    };

    useEffect(() => {
        setObject(initialObject); // Initialize object with your initial data
    }, []);

    return (
        <BodyWrapper>
            <Box>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12}>
                        <Card variant="outlined">
                            {renderObject(object)}
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </BodyWrapper>
    );
});

export default Challenge11;
