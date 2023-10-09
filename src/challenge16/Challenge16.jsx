import React, { memo, useState, useEffect } from 'react';
import { UserWrapper } from '../styles/StyledComponent';
import { useSnackbar } from '../context/SnackBarContext';
import Users from './Users';

const Challenge16 = memo(() => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const URL = `https://randomuser.me/api/?results=19&page=${page}`;

    const snackbar = useSnackbar();

    const getUsers = async (uri) => {
        try {
            setLoading(true);
            const res = await fetch(uri);
            const data = await res.json();
            setUsers(data.results);
            setTotal(data.info.results);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }
    };

    const handleClick = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    }

    useEffect(() => {
        getUsers(URL);
    }, [page]);

    return (
        <UserWrapper>
            <Users users={users} handleClick={handleClick} loading={loading} total={total} /> {/* Pass page instead of setPage */}
        </UserWrapper>
    );
});

export default Challenge16;
