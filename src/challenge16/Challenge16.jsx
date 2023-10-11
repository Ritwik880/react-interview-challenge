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
