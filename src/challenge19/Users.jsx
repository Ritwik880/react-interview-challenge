import React, { memo } from 'react'
import { Box, CircularProgress, Grid, Card, CardContent, Typography } from '@mui/material'
import ReactPaginate from 'react-paginate';


const UserCard = ({ item }) => (
  <Grid item lg={4} md={6} xs={12}>
    <Card variant="outlined">
      <CardContent>
        <Typography>
          {`${item.name ? item.name.first : 'User'} ${item.name ? item.name.last : 'Test'}`}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
)


const Users = ({ users, loading, total, handleClick }) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'

    }}>
      <Grid container spacing={2}>
        {
          loading ? (

            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'

            }}>
              <CircularProgress />
            </Box>
          ) : (
            users && users.map((item, index) => <UserCard key={index} item={item} />
            )
          )
        }
        <Grid item lg={12} md={12}>
          <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
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
          pageCount={total}
          onPageChange={handleClick}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Users