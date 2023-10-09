import React, { memo, useState, useEffect } from 'react';

//mui
import { styled } from "@mui/material/styles";
import { Box, Grid, TextField, Button, CircularProgress, Card, CardContent, CardActions, Typography } from '@mui/material';

//library import
import axios from 'axios';
import { useSnackbar } from '../context/SnackBarContext';


const OuterWrapper = styled('section')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    padding: '100px',
});

const FormWrapper = styled('form')({
    paddingBottom: '20px'
});
const CreatePost = memo(() => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const snackbar = useSnackbar();

    const URL = 'https://jsonplaceholder.typicode.com/posts/';


    const getAllPost = async (uri) => {
        try {
            setLoading(true);
            const res = await axios.get(uri);
            const data = await res.data;
            setItems(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            snackbar(error.message);
        }
    }
    useEffect(() => {
        getAllPost(URL)
    }, [])


    const updateData = async (uri) => {
        try {
            setLoading(true);
            const response = await axios.post(uri, {
                title: title,
                body: body,
            });
            if (response.status !== 201) {
                return
            }
            else {
                const data = response.data;
                setItems((prev) => [...prev, data]);
                setTitle('');
                setBody('');
                setLoading(false);
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
                        <TextField placeholder='Enter title' id="my-input" aria-describedby="my-helper-text" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <TextField placeholder='Enter Description' id="my-input2" aria-describedby="my-helper-text2" fullWidth value={body} onChange={(e) => setBody(e.target.value)} />
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <Button size="medium" type='submit' variant='contained' >Add Post</Button>
                    </Grid>
                </Grid>
            </FormWrapper>
            {/* Map and display the items */}
            {
                loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        <Grid container spacing={2}>
                            <>
                                {
                                    items && items.map((item, id) => {
                                        return (
                                            <Grid item lg={4} md={6} xs={12} key={id}>
                                                <Card variant="outlined">
                                                    <CardContent>
                                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                            {
                                                                item.title
                                                            }
                                                        </Typography>

                                                        <Typography variant="body2">
                                                            {
                                                                item.body
                                                            }
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button size="small" onClick={() => handleGoToIndividualPost(item.id)}>Learn More</Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        )
                                    })
                                }
                            </>
                        </Grid>
                    </Box>
                )
            }
        </OuterWrapper>

    )
})

export default CreatePost