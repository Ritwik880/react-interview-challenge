import React, { useState, memo } from 'react';

//mui
import { Grid, TextField, Button, Box, CircularProgress, Card, CardContent, Typography, CardActions, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//library import
import { useSnackbar } from '../context/SnackBarContext';

import { OuterWrapper, FormWrapper } from '../styles/StyledComponent'

import { USERSDATA } from '../utils/constant';

const Challenge3 = memo(() => {
    const [items, setItems] = useState(USERSDATA);
    const [newItems, setNewItems] = useState([])
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const showSnackbar = useSnackbar();

    const isTitleValid = (value) => value.trim() !== '' || value === null;
    const isBodyValid = (value) => value.length >= 5 || value === null;

    const checkUser = () => {
        const user = items.find((user) => user.userName === userName && user.password === password);
        if (user) {
            const error = "This user is already present in our database!"
            return showSnackbar(error);

        }
        else {

            const updatedItems = [
                ...items,
                {
                    userName: userName,
                    password: password,
                },
            ];
            setNewItems(updatedItems);
            setItems(updatedItems);
            setUserName('');
            setPassword('');
            setLoading(false);
            showSnackbar('User added successfully! ');
        }
    }
    const updateData = () => {
        try {
            setLoading(true);
            checkUser();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showSnackbar(error.message)
        }

    }
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateData();
    }

    const renderCards = () => {
        return newItems && newItems.map((item) => (
            <Grid item lg={4} md={6} xs={12} key={item.id}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {item.userName}
                        </Typography>
                        <Typography variant="body2">
                            {item.password}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                        <Button size="small">Create A Post</Button>
                        <Button size="small">Delete A Post</Button>
                    </CardActions>
                </Card>
            </Grid>
        ));
    };

    return (

        <OuterWrapper>
            <FormWrapper onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item lg={6} xs={12}>
                        <TextField error={!isTitleValid(userName)}
                            helperText={!isTitleValid(userName) ? 'Title cannot be empty' : ''}
                            required
                            placeholder='Enter title'
                            id="my-input"
                            aria-describedby="my-helper-text"
                            fullWidth
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField type={showPassword ? "text" : "password"}
                            required
                            placeholder='Enter Description'
                            id="my-input2"
                            aria-describedby="my-helper-text2"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment sx={{ cursor: 'pointer' }} position='end' onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                        {
                                            showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
                                        }
                                    </InputAdornment>
                                )
                            }}
                            error={!isBodyValid(password)}
                            helperText={!isBodyValid(password) ? 'Body must be at least 5 characters long' : ''} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Button size="medium" type='submit' variant='contained' onClick={() => checkUser()}>Add Post</Button>
                    </Grid>
                </Grid>
            </FormWrapper>
            {
                loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        <Grid container spacing={2}>

                            {
                                newItems.length !== 0 ? (
                                    renderCards()
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography fontSize={30} fontWeight={500} sx={{ paddingTop: '20px' }} color="text.secondary" gutterBottom>
                                            No New Data Yet!
                                        </Typography>
                                    </Box>
                                )
                            }
                        </Grid>
                    </Box>
                )
            }
        </OuterWrapper>

    )
})

export default Challenge3