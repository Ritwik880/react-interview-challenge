// Write a functional component to display an input field allowing the user to enter a name. When the user submits, the name should be added to a list of names displayed below the input field. Below the list, render two input fields to allow the user to enter two names, and when the user submits, the first name should follow the name. In other words, the second name should be added to the first name’s following and the first name should be added to the second name’s followers

import React, { memo, useState } from 'react';
import { BodyWrapper } from '../styles/StyledComponent';
import { useSnackbar } from '../context/SnackBarContext';
import { InputWrapper, FormWrapper } from '../styles/StyledComponent';
import { TextField, Grid, List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const Challenge17 = memo(() => {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState('');
    const [firstInput, setFirstInput] = useState('');
    const [secondInput, setSecondInput] = useState('');
    const [relationships, setRelationships] = useState([]);
    const snackbar = useSnackbar();

    const handleChange = (newValue) => {
        setValue(newValue);
    }

    const handleNameSubmit = () => {
        if (value.trim() !== '') {
            setUsers((prev) => [...prev, value.trim()]);
            setValue('');
        } else {
            snackbar('You are not supposed to enter empty values!');
        }
    }

    const handleRelationshipSubmit = (e) => {
        e.preventDefault();
        const firstUser = firstInput.trim();
        const secondUser = secondInput.trim();

        if (firstUser !== '' && secondUser !== '') {
            if (users.includes(firstUser) && users.includes(secondUser)) {
                setRelationships((prev) => [
                    ...prev,
                    {
                        follower: firstUser,
                        following: secondUser,
                    },
                    {
                        follower: secondUser,
                        following: firstUser,
                    },
                ]);
            } else {
                snackbar('Both names should exist in the list of users.');
            }
        } else {
            snackbar('You are not supposed to enter empty values!');
        }

        setFirstInput('');
        setSecondInput('');
    }

    return (
        <BodyWrapper>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12}>
                    <InputWrapper>
                        <TextField
                            id="outlined-basic"
                            label="Enter a Name"
                            variant="outlined"
                            fullWidth
                            value={value}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <Button
                            size="medium"
                            variant="contained"
                            onClick={handleNameSubmit}
                        >
                            Submit Name
                        </Button>
                    </InputWrapper>
                </Grid>

                <Grid item lg={12} md={12}>
                    {users.length ? (
                        users.map((item, index) => (
                            <List key={index}>
                                <ListItem>
                                    <ListItemText primary={`Name: ${item}`} />
                                </ListItem>
                            </List>
                        ))
                    ) : (
                        <Typography>No Users Found!</Typography>
                    )}
                </Grid>
                <FormWrapper onSubmit={handleRelationshipSubmit}>
                    <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center">
                        <Grid item lg={12} xs={12}>
                            <TextField
                                required
                                placeholder="Enter First Name"
                                aria-describedby="my-helper-text"
                                fullWidth
                                value={firstInput}
                                onChange={(e) => setFirstInput(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={12} xs={12}>
                            <TextField
                                required
                                placeholder="Enter Second Name"
                                aria-describedby="my-helper-text2"
                                fullWidth
                                value={secondInput}
                                onChange={(e) => setSecondInput(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Button size="medium" type="submit" variant="contained">
                                Create Relationship
                            </Button>
                        </Grid>
                    </Grid>
                </FormWrapper>
                <Grid item lg={12} md={12}>
                    {relationships.map((item, index) => (
                        <List key={index}>
                            <ListItem>
                                <ListItemText primary={`${item.follower} is following ${item.following}`} />
                            </ListItem>
                        </List>
                    ))}
                </Grid>
            </Grid>
        </BodyWrapper>
    );
});

export default Challenge17;
