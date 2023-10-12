// Write a custom hook called useBitcoin() that returns the value of Bitcoin in US dollars. Every minute, the price should be re-fetched and the returned variable should be updated (this is the same rate at which the API updates the price). To retrieve the price of Bitcoin in US dollars, issue a GET request to the following URL: https://api.coindesk.com/v1/bpi/currentprice.json.

import React, { useState, useEffect } from 'react';
import { useSnackbar } from '../context/SnackBarContext';

const useBitCoin = () => {
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);

    const URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

    const snackbar = useSnackbar();

    const getBitCoinPrice = async (uri) => {
        try {
            setLoading(true);
            const res = await fetch(uri);
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setItems(data.bpi);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }
    };

    useEffect(() => {
        getBitCoinPrice(URL);

        const interval = setInterval(() => {
            getBitCoinPrice(URL);
        }, 60000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return { items, loading };
};

export default useBitCoin;
