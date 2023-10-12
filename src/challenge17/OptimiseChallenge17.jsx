// Write a functional component to display an input field allowing the user to enter a name. When the user submits, the name should be added to a list of names displayed below the input field. Below the list, render two input fields to allow the user to enter two names, and when the user submits, the first name should follow the name. In other words, the second name should be added to the first name’s following and the first name should be added to the second name’s followers

import React, { memo, useState } from 'react';
import { BodyWrapper } from '../styles/StyledComponent';
import { useSnackbar } from '../context/SnackBarContext';
import { InputWrapper, FormWrapper } from '../styles/StyledComponent';
import { TextField, Grid, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const OptimiseChallenge17 = memo(() => {
    const [state, setState] = useState({
        users: [],
        value: '',
        firstInput: '',
        secondInput: '',
        relation: [],
    });
    const { users, value, firstInput, secondInput, relation } = state;

    const snackbar = useSnackbar();

    const handleChange = (newValue) => {
        setState((prev) => ({ ...prev, value: newValue }));
    }

    const handleKeyPress = (e) => {
        if (value.trim() !== '' && e.key === 'Enter') {
            setState((prev) => ({ ...prev, users: [...prev.users, value.trim()], value: '' }));
        } else {
            snackbar('You are not supposed to enter empty values!');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const firstUser = firstInput.trim();
        const secondUser = secondInput.trim();

        if (firstUser !== '' && secondUser !== '') {
            if (users.includes(firstUser) && users.includes(secondUser)) {
                setState((prev) => ({
                    ...prev,
                    relation: [
                        ...prev.relation,
                        {
                            follower: firstUser,
                            following: secondUser,
                        },
                    ],
                    firstInput: '',
                    secondInput: '',
                }));
            } else {
                snackbar('Both names should exist in the list of users.');
            }
        } else {
            snackbar('You are not supposed to enter empty values!');
        }
    }

    return (
        <BodyWrapper>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12}>
                    <InputWrapper>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </InputWrapper>
                </Grid>

                <Grid item lg={12} md={12}>
                    {
                        users.length ? (
                            users.map((item, index) => (
                                <List key={index}>
                                    <ListItem>
                                        <ListItemText primary={`Name: ${item}`} />
                                    </ListItem>
                                </List>
                            ))
                        ) : (
                            <Typography>No Users Found!</Typography>
                        )
                    }
                </Grid>
                <FormWrapper onSubmit={handleSubmit}>
                    <Grid container spacing={2} display='flex' justifyContent='center' alignItems='center'>
                        <Grid item lg={12} xs={12}>
                            <TextField
                                required
                                placeholder='Enter Name'
                                id="my-input"
                                aria-describedby="my-helper-text"
                                fullWidth
                                value={firstInput}
                                onChange={(e) => setState({ ...state, firstInput: e.target.value })}
                            />
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <TextField
                                required
                                placeholder='Enter Name'
                                id="my-input2"
                                aria-describedby="my-helper-text2"
                                fullWidth
                                value={secondInput}
                                onChange={(e) => setState({ ...state, secondInput: e.target.value })}
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Button size="medium" type='submit' variant='contained'>Submit</Button>
                        </Grid>
                    </Grid>
                </FormWrapper>
                <Grid item lg={12} md={12}>
                    {
                        relation && relation.map((item, index) => {
                            return (
                                <List key={index}>
                                    <ListItem>
                                        <ListItemText
                                            primary={`${item.follower} will now follow ${item.following}`}
                                        />
                                    </ListItem>
                                </List>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </BodyWrapper>
    );
});

export default OptimiseChallenge17
