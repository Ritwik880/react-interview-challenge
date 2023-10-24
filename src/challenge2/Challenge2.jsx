import React, { useState, memo } from 'react';

import { useNavigate } from 'react-router-dom';

//mui
import { Grid, TextField } from '@mui/material';

//library import
import axios from 'axios';
import { useSnackbar } from '../context/SnackBarContext';

import { OuterWrapper, FormWrapper } from '../styles/StyledComponent'
import { LoadingButton } from '@mui/lab';


const Challenge2 = memo(() => {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
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
                return;
            } else {
                const data = response.data;
                setItems((prevItems) => [...prevItems, data]);
                const existingItems = JSON.parse(localStorage.getItem('items')) || [];
                const updatedItems = [...existingItems, data];
                localStorage.setItem('items', JSON.stringify(updatedItems));
                setTitle('');
                setBody('');
                setLoading(false);

                navigate('/postPage', { state: { items: updatedItems } });
            }
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }
    }


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
                            type="text"
                            required
                            placeholder='Enter Description'
                            id="my-input2"
                            aria-describedby="my-helper-text2"
                            fullWidth
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            error={!isBodyValid(body)}
                            helperText={!isBodyValid(body) ? 'Body must be at least 5 characters long' : ''}
                        />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <LoadingButton size="medium" type='submit' variant='contained' loading={loading}>Add Post</LoadingButton>
                    </Grid>
                </Grid>
            </FormWrapper>
        </OuterWrapper>

    )
})

export default Challenge2