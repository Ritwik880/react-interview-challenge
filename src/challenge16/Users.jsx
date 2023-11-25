import React from 'react'
import { Grid, CircularProgress } from '@mui/material'
import { LoadingWrapper } from '../styles/StyledComponent';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ item }) => {
  const { name, picture, gender, email, id } = item;
  const firstName = name?.first || 'User';
  const lastName = name?.last || 'Test';

  const navigate = useNavigate();

 const handleViewProfile = (id) => {
  console.log(id);
  navigate(`/user/${id}`);
}
  return (
    <Grid item lg={3} md={6} xs={12}>
      <div className="card">
        <img src={picture.large} className="card-img-top" alt={gender} />
        <div className="card-body">
          <h5 className="card-title">Name: {firstName} {lastName}</h5>
          <p className="card-text">Email: {email}</p>
          <button className="btn btn-primary" onClick={() => handleViewProfile(id.value)}>View Profile</button>
        </div>
      </div>
    </Grid>
  )
}
const Users = ({ users, loading, handlePageClick, total }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={12} md={12}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={total}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName='pagination justify-content-center'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakLinkClassName='page-link'
          activeClassName='active'
        />

      </Grid>
      {
        loading ? (
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        ) : (
          users?.map((item, index) => <UserCard key={index} item={item} />)
        )
      }
    </Grid>
  )
}

export default Users