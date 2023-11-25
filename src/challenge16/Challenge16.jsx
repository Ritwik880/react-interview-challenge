import React, { memo } from 'react';
import useApi from './useApi';
import {UserWrapper} from '../styles/StyledComponent';
import Users from './Users';
const Challenge16 = memo(() => {
    const { users, loading, total, setPage } = useApi();
    console.log(users);

    const handlePageClick = (selectedPage)=>{
        setPage(selectedPage.selected + 1);
    }

    return (
        <UserWrapper>
            <Users users={users} loading={loading} handlePageClick={handlePageClick} total={total}/>
        </UserWrapper>
    );
});

export default Challenge16;

