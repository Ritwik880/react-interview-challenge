import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom';

//mui import
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Card, CardContent, CardActions, Button, Typography, Grid, TextField } from '@mui/material';

//custom-hook
import useApi from '../custom-hooks/useApi';

import { Wrapper } from '../styles/StyledComponent'


const Challenge1 = memo(() => {

    const URL = `https://jsonplaceholder.typicode.com/posts`;

    const [value, setValue] = useState('');
    const [filterItem, setFilterItem] = useState([]);

    const { items, filterData, loading, setItems, setFilterData } = useApi(URL);

    const navigate = useNavigate();

    const handleChange = (newValue) => {
        setValue(newValue);
        if (newValue !== '') {
            const filteredData = filterData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(newValue.toLowerCase());
            });
            setFilterItem(filteredData);
        } else {
            setFilterItem(items);
        }
    }


    const handleGoToIndividualPost = (id) => {
        navigate(`/${id}`);
    }
    const handleGoToAllPost = () => {
        navigate('/newPost')
    }

    const handleDeletePost = (uniqueId) => {
        const updatedItems = items.filter((item) => item.id !== uniqueId);

        // Also update the filterData array to reflect the same change
        const updatedFilterData = filterData.filter((item) => item.id !== uniqueId);

        // Update both state variables
        setItems(updatedItems);
        setFilterData(updatedFilterData);
    }

    const renderCards = (data) => {
        return data.map((item) => (
            <Grid item lg={4} md={6} xs={12} key={item.id}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {item.title}
                        </Typography>
                        <Typography variant="body2">
                            {item.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => handleGoToIndividualPost(item.id)}>Learn More</Button>
                        <Button size="small" onClick={handleGoToAllPost}>Create A Post</Button>
                        <Button size="small" onClick={() => handleDeletePost(item.id)}>Delete A Post</Button>
                    </CardActions>
                </Card>
            </Grid>
        ));
    };
    return (
        <Wrapper>
            {
                loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                            <Grid item lg={6} md={12}>
                                <TextField
                                    id="outlined-basic"
                                    label="Search"
                                    variant="outlined"
                                    fullWidth
                                    value={value}
                                    onChange={(e) => handleChange(e.target.value)}
                                    sx={{marginBottom: '10px'}}
                                />
                            </Grid>
                            <Grid container spacing={2}>
                                {value.length > 0 ? (
                                    renderCards(filterItem)
                                ) : (
                                    renderCards(items)
                                )}
                            </Grid>
                            <Grid>
                                {
                                    items.length === 0 && <Typography>
                                        No data to show
                                    </Typography>
                                }
                            </Grid>
                        </Grid>


                    </>
                )
            }

        </Wrapper>
    )
})

export default Challenge1