import React, { useState, useEffect } from 'react';
import { useSnackbar } from '../context/SnackBarContext';

const useApi = (id) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const snackbar = useSnackbar();

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            let apiUrl = 'https://randomuser.me/api/?results=19';

            // Check if id is defined and not empty
            if (id) {
                apiUrl += `&id=${id}`;
            }

            apiUrl += `&page=${page}`;

            try {
                setLoading(true);
                const res = await fetch(apiUrl, { signal });
                const data = await res.json();
                console.log(data);
                const fetchedUsers = data.results || [];
                setUsers(fetchedUsers);
                setTotal(data.info.results);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                snackbar(error.message);
                console.error(error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function to cancel the ongoing API request
            abortController.abort();
        };
    }, [id, page, snackbar]);

    return { users, loading, total, setPage, page };
};

export default useApi;
