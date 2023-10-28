import React, {memo} from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '@mui/material';

const ThemedButton = memo(() => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button variant='contained' onClick={toggleTheme} className={`button ${theme}`}>
            Toggle Theme
        </Button>
    );
})

export default ThemedButton;
