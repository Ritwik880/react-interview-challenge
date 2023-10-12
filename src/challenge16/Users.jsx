// Write two functional components to display a list broken into pages that are traversable via a list of clickable page numbers below the list. The first component — the parent component — should fetch a list of users and conditionally render a loading status or the next component, the actual list generated from the data. The user array fetched in the parent component should be passed to the child component as a prop along with the number of items that should be displayed on each page. The child component should display the first page of items and clickable links to the remaining pages of users

import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { CircularProgress, Grid, Card, CardContent, Typography } from '@mui/material';
import { BoxWrapper, LoadingWrapper } from '../styles/StyledComponent';

// Extract UserCard component
const UserCard = ({ item }) => {
    const { name } = item;
    const firstName = name?.first || 'User';
    const lastName = name?.last || 'Test';
  
    return (
      <Grid item lg={4} md={6} xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 14 }}>
              {`${firstName} ${lastName}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

const Users = memo(({ users, handleClick, loading, total }) => (
    <BoxWrapper>
        <Grid container spacing={2}>
            {loading ? (
                <LoadingWrapper>
                    <CircularProgress />
                </LoadingWrapper>
            ) : (
                users?.map((item, index) => <UserCard key={index} item={item} />)
            )}
            <Grid item lg={12} md={12}>
                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={total}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handleClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </Grid>
        </Grid>
    </BoxWrapper>
));

export default Users;
