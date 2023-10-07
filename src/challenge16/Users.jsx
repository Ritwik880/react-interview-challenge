import React, { memo } from 'react';
import ReactPaginate from 'react-paginate';
import { Box, CircularProgress, Grid, Card, CardContent, Typography } from '@mui/material';

// Extract UserCard component
const UserCard = ({ item }) => (
    <Grid item lg={4} md={6} xs={12}>
        <Card variant="outlined">
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>
                    {`${item.name ? item.name.first : 'User'} ${item.name ? item.name.last : 'Test'}`}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
);

const Users = memo(({ users, handleClick, loading, total }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    }}>
        <Grid container spacing={2}>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh',
                        width: '100%'
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                users && users.map((item, index) => <UserCard key={index} item={item} />)
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
    </Box>
));

export default Users;
