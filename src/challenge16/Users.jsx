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
