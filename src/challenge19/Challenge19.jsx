// Write two functional components to display a list broken into pages that are traversable via a list of clickable page numbers below the list. The first component — the parent component — should fetch a list of users and conditionally render a loading status or the next component, the actual list generated from the data. The user array fetched in the parent component should be passed to the child component as a prop along with the number of items that should be displayed on each page. The child component should display the first page of items and clickable links to the remaining pages of users



import React, { useState, useEffect, memo } from 'react'
import { UserWrapper } from '../styles/StyledComponent';
import { useSnackbar } from '../context/SnackBarContext';
import Users from './Users';
const Challenge19 = () => {
    // Api end point
    const [page, setPage] = useState(1);

    const URL = `https://randomuser.me/api/?results=19&page=${page}`;

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const snackbar = useSnackbar();

    const getUsers = async (uri)=>{
        try {
            setLoading(true);
            const response = await fetch(uri);
            const data = await response.json();
            console.log(data);
            setUsers(data.results);
            setTotal(data.info.results);
             (false);
        } catch (error) {
            setLoading(false);
            snackbar(error.message)
            
        }
    }

    const handleClick = (selectedPage)=>{
        setPage(selectedPage.selected + 1);
    }
    useEffect(() => {
      getUsers(URL)
    }, [page])
    
    return (
        <UserWrapper>
            <Users users={users} loading={loading} total={total} handleClick={handleClick}/>
        </UserWrapper>
    )
}

export default Challenge19