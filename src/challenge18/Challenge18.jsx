import React, { useState, useEffect, memo } from 'react'
import { useSnackbar } from '../context/SnackBarContext';
import { InputAdornment, TextField, Grid, Typography, Button, Card, CardContent, CardMedia, Box, CircularProgress } from '@mui/material';
import { InputWrapper, UserWrapper } from '../styles/StyledComponent';
import { LoadingButton } from '@mui/lab';
import { PILLS as pills } from '../utils/constant';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Challenge18 = memo(() => {
    const URL = `https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231`;
    const URL2 = `https://devapi.wtfup.me/gym/places`

    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const snackbar = useSnackbar();

    const getUsers = async (uri) => {
        try {
            setLoading(true);
            const res = await fetch(uri);
            const data = await res.json();
            if (data.status) {
                console.log(data.data);
                setUsers(data.data);
            } else {
                throw new Error(`Failed to fetch data. Status code: ${data.status}`);
            }
        } catch (error) {
            snackbar(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers(URL);
    }, []);

    const handleSearch = () => {
        getUsers(`${URL2}?query=${value}`);
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <UserWrapper>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12}>
                    <InputWrapper>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={value}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <LoadingButton
                                            variant='contained'
                                            color='primary'
                                            onClick={handleSearch}
                                            loading={loading}
                                        >
                                            Search
                                        </LoadingButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </InputWrapper>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <Typography>
                        Location
                    </Typography>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        placeholder='Enter location'
                        fullWidth
                        value={value}
                    // onChange={handleChange}
                    />
                    <Typography>
                        Category
                    </Typography>
                    {
                        pills && pills.map((item, index) => {
                            return (
                                <Button key={index} variant='contained' color='error' sx={{ margin: '10px' }}>
                                    {item.name}
                                </Button>
                            )
                        })
                    }

                </Grid>
                <Grid item lg={8} md={6} xs={12}>
                    {
                        loading ? (
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
                            <>
                                {
                                    users && users.map((item, id) => {
                                        return (
                                            <Card sx={{ display: 'flex', background: '#000', justifyContent: 'center', alignItems: 'center' }} key={id}>
                                                <Grid item lg={4} md={6} xs={12}>
                                                    <CardMedia
                                                        component="img"
                                                        // sx={{ width: 151 }}
                                                        image={item.cover_image ? item.cover_image : 'image'}
                                                        alt={item.category_name ? item.category_name : 'image'}
                                                    />
                                                </Grid>
                                                <Grid item lg={8} md={6} xs={12}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <CardContent sx={{ flex: '1 0 auto', color: '#fff' }}>
                                                            <Typography component="div" variant="h5">
                                                                {item.gym_name}
                                                            </Typography>
                                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                                <LocationOnOutlinedIcon />
                                                                {item.city} {item.country}
                                                            </Typography>
                                                        </CardContent>
                                                    </Box>
                                                </Grid>


                                            </Card>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </Grid>
            </Grid>
        </UserWrapper>
    )
})

export default Challenge18;
