import React, { useState, memo } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Modal } from '@mui/material';
import { BodyWrapper, InputWrapper } from '../styles/StyledComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Challenge6 = memo(() => {
    const [value, setValue] = useState('');
    const [strings, setStrings] = useState([]);
    const [open, setOpen] = useState(false);
    const [showWholeString, setShowWholeString] = useState('');

    const handleChange = (newValue) => {
        setValue(newValue);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const trimmedValue = value.trim();
            if (trimmedValue.length > 0) {
                setStrings([...strings, trimmedValue]);
                setValue('');
            }
        }
    }

    const truncateStr = (str) => {
        return str.length <= 5 ? str : str.slice(0, 5) + '...';
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleShowModal = (string) => {
        setShowWholeString(string);
    }
    const handleShowFullString = (str) => {
        handleShowModal(str);
    }

    const renderCards = (data) => {
        return data.map((item, index) => (
            <Grid item lg={6} md={6} xs={12} key={index}>
                <Card variant="outlined">
                    <CardContent onClick={() => (setOpen(true), handleShowFullString(item))}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            {truncateStr(item)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ));
    };



    return (
        <BodyWrapper>
            <Box sx={{ width: '100%' }}>
                <InputWrapper>
                    <TextField
                        id="outlined-basic"
                        label="Enter a string"
                        variant="outlined"
                        fullWidth
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </InputWrapper>
                <Grid container spacing={2}>
                    {renderCards(strings)}
                </Grid>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description">
                            {showWholeString}
                        </Typography>
                    </Box>
                </Modal>

            </Box>
        </BodyWrapper>
    );
});

export default Challenge6;
