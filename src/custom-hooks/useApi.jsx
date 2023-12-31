import React, { useState, useEffect } from 'react'
import { useSnackbar } from '../context/SnackBarContext';

const useApi = (uri) => {
    const [items, setItems] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const limit = 10;
    const newUrl = `${uri}/?_limit=${limit}&_page=${page}`;

    const snackbar = useSnackbar();

    const getData = async (url) => {
        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
    
            // Check for duplicates and only add unique items
            const uniqueData = data.filter((newItem) => !items.some((item) => item.id === newItem.id));
            setItems((prev) => [...prev, ...uniqueData]);
            setItems(uniqueData)
            setFilterData(uniqueData);
            setLoading(false);
        } catch (error) {
            snackbar(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData(newUrl);
    }, [page, newUrl]);


    //infinite scrolling
    //key points
    // document.documentElement.scrollHeight;
    // window.innerHeight;
    // document.documentElement.scrollTop;

    //for the end page 
    // innerHeight + screenTop = scrollHeight

    const handleInfiniteScroll = () => {
        try {
            if (document.documentElement.scrollTop + window.innerHeight + 1 >= document.documentElement.scrollHeight) {
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            snackbar(error.message);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll);
        return () => {
            window.removeEventListener('scroll', handleInfiniteScroll);
        };
    }, []);

    return { items, filterData, loading, setPage, setItems, setFilterData };
}

export default useApi