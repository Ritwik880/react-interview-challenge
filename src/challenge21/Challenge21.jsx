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
