// Write a custom hook called useBitcoin() that returns the value of Bitcoin in US dollars. Every minute, the price should be re-fetched and the returned variable should be updated (this is the same rate at which the API updates the price). To retrieve the price of Bitcoin in US dollars, issue a GET request to the following URL: https://api.coindesk.com/v1/bpi/currentprice.json.

import React, { memo } from 'react';
import { BodyWrapper, CardWrapper, CardContentWrapper } from '../styles/StyledComponent';
import { Typography, Box, CircularProgress } from '@mui/material';
import useBitCoin from './useBitCoin';

const Challenge21 = memo(() => {
    const { items, loading } = useBitCoin();

    return (
        <BodyWrapper>
            {loading ? (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <CircularProgress />
                </Box>
            ) : (
                <CardWrapper variant='outlined'>
                    <CardContentWrapper>
                            <Typography>Bitcoin Price: $ {items.USD ? items.USD.rate : '0'}</Typography>
                    </CardContentWrapper>
                </CardWrapper>
            )}
        </BodyWrapper>
    );
});

export default Challenge21;
