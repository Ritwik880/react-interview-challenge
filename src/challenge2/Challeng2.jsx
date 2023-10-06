import React, { useState, memo } from 'react';

import { useNavigate } from 'react-router-dom';

//mui
import { Grid, TextField, Button, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

//library import
import axios from 'axios';
import { useSnackbar } from '../context/SnackBarContext';

import { OuterWrapper, FormWrapper } from '../styles/StyledComponent'


const Challenge2 = memo(() => {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const URL = 'https://jsonplaceholder.typicode.com/posts/';

    const snackbar = useSnackbar();
    const navigate = useNavigate();

    const isTitleValid = (value) => value.trim() !== '' || value === null;
    const isBodyValid = (value) => value.length >= 5 || value === null;

    const updateData = async (uri) => {
        try {
            setLoading(true);
            if (!isTitleValid(title) || !isBodyValid(body)) {
                snackbar('Title and body validation failed.');
                setLoading(false);
                return;
            }
            const response = await axios.post(uri, {
                title: title,
                body: body,
            });
            if (response.status !== 201) {
                return
            }
            else {
                const data = response.data;
                setItems((prevItems) => [...prevItems, data]);
                const existingItems = JSON.parse(localStorage.getItem('items')) || [];
                const updatedItems = [...existingItems, data];
                localStorage.setItem('items', JSON.stringify(updatedItems));
                setTitle('');
                setBody('');
                setLoading(false);
                navigate('/postPage', { state: { items: [...items, data] } });
            }

        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }

    }

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const handleSubmit = (e) => {

        e.preventDefault();
        updateData(URL);
    }

    return (

        <OuterWrapper>
            <FormWrapper onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item lg={6} xs={12}>
                        <TextField
                            error={!isTitleValid(title)}
                            helperText={!isTitleValid(title) ? 'Title cannot be empty' : ''}
                            required
                            placeholder='Enter title'
                            id="my-input"
                            aria-describedby="my-helper-text"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder='Enter Description'
                            id="my-input2"
                            aria-describedby="my-helper-text2"
                            fullWidth
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
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
                            error={!isBodyValid(body)}
                            helperText={!isBodyValid(body) ? 'Body must be at least 5 characters long' : ''}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Button size="medium" type='submit' variant='contained' >Add Post</Button>
                    </Grid>
                </Grid>
            </FormWrapper>
        </OuterWrapper>

    )
})

export default Challenge2