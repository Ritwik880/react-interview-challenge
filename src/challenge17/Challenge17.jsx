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
    const [relation, setRelation] = useState([])

    const snackbar = useSnackbar();


    const handleChange = (newValue) => {
        setValue(newValue);
    }

    const handleKeyPress = (e) => {
        if (value.trim() !== '') {
            if (e.key === "Enter") {
                setUsers((prev) => [...prev, value.trim()]);
                setValue('');
            }
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
                setRelation((prev) => [
                    ...prev,
                    {
                        follower: firstUser,
                        following: secondUser,
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
                    <InputWrapper><TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={handleKeyPress}
                    /></InputWrapper>
                </Grid>

                <Grid item lg={12} md={12}>
                    {
                        users ? (
                            users.map((item, index) => {
                                return (
                                    <List key={index}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Name: ${item}`}
                                            // secondary={secondary ? 'Secondary text' : null}
                                            />
                                        </ListItem>,
                                    </List>
                                )
                            })
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
                                onChange={(e) => setFirstInput(e.target.value)}
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
                                onChange={(e) => setSecondInput(e.target.value)}
                            />
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Button size="medium" type='submit' variant='contained' >Submit</Button>
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
                                        // secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </ListItem>,
                                </List>
                            )
                        })
                    }
                </Grid>
            </Grid>


        </BodyWrapper>
    );
});

export default Challenge17;
