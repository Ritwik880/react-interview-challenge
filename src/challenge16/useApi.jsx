// Write two functional components to display a list broken into pages that are traversable via a list of clickable page numbers below the list. The first component — the parent component — should fetch a list of users and conditionally render a loading status or the next component, the actual list generated from the data. The user array fetched in the parent component should be passed to the child component as a prop along with the number of items that should be displayed on each page. The child component should display the first page of items and clickable links to the remaining pages of users

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
