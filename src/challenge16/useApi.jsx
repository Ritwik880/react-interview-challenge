import React, { useState, useEffect } from 'react';
import { useSnackbar } from '../context/SnackBarContext';

const useApi = (uri) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const snackbar = useSnackbar();

    const newUrl = `${uri}&page=${page}`;

    const getUsers = async (link) => {
        try {
            setLoading(true);
            const res = await fetch(link);
            const data = await res.json();
            // Assuming the API response contains an array of users under 'results'
            const fetchedUsers = data.results || [];
            console.log(fetchedUsers);
            setUsers(fetchedUsers);
            setTotal(data.info.results);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        getUsers(newUrl);
    }, [page, newUrl]);

    return { users, loading, total, setPage, page };
};

export default useApi;
