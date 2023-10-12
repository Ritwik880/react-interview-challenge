// Write two functional components to display a list broken into pages that are traversable via a list of clickable page numbers below the list. The first component — the parent component — should fetch a list of users and conditionally render a loading status or the next component, the actual list generated from the data. The user array fetched in the parent component should be passed to the child component as a prop along with the number of items that should be displayed on each page. The child component should display the first page of items and clickable links to the remaining pages of users

import React, { memo } from 'react';
import { UserWrapper } from '../styles/StyledComponent';
import Users from './Users';
import useApi from './useApi';

const Challenge16 = memo(() => { 
       
    const URL = `https://randomuser.me/api/?results=19`;

    const { users, loading, total, setPage } = useApi(URL);

    const handleClick = (selectedPage) => {
        setPage(selectedPage.selected + 1);
    }

    return (
        <UserWrapper>
            <Users users={users} handleClick={handleClick} loading={loading} total={total} /> {/* Pass page instead of setPage */}
        </UserWrapper>
    );
});

export default Challenge16;
