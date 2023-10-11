import React, { useState, memo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Modal,
} from '@mui/material';
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

const TruncateString = ({ text, onClick }) => {
  const truncatedText = text.length <= 5 ? text : text.slice(0, 5) + '...';

  return (
    <Card variant="outlined" onClick={onClick}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {truncatedText}
        </Typography>
      </CardContent>
    </Card>
  );
};

const OptimiseChallenge6 = memo(() => {
  const [inputValue, setInputValue] = useState('');
  const [strings, setStrings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedString, setSelectedString] = useState('');

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const trimmedValue = inputValue.trim();
      if (trimmedValue.length > 0) {
        setStrings([...strings, trimmedValue]);
        setInputValue('');
      }
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = (string) => {
    setSelectedString(string);
    setOpen(true);
  };

  const renderCards = (data) => {
    return data.map((item, index) => (
      <Grid item lg={6} md={6} xs={12} key={index}>
        <TruncateString text={item} onClick={() => handleOpenModal(item)} />
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
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </InputWrapper>
        <Grid container spacing={2}>
          {renderCards(strings)}
        </Grid>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description">
              {selectedString}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </BodyWrapper>
  );
});

export default OptimiseChallenge6;
