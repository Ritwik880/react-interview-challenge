// SnackbarContext.js
import React, { useContext, createContext, useState } from "react";
import { Typography, Box } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

const SnackbarContext = createContext();

export const useSnackbar = () => {
    return useContext(SnackbarContext);
}

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [action, setAction] = useState('');

    const showSnackbar = (message, action = '', duration = 6000) => {
        setMessage(message);
        setAction(action);
        setOpen(true);

        setTimeout(() => {
            setOpen(false);
        }, duration);
    }

    // Expose the showSnackbar function globally
    window.showSnackbar = showSnackbar;

    return (
        <SnackbarContext.Provider value={showSnackbar}>
            {children}
            <Snackbar
                anchorOrigin={{
                    vertical: 'top', // Set it to 'top' to fix it at the top
                    horizontal: 'center', // You can adjust horizontal alignment as needed
                }}
                open={open}
                autoHideDuration={6000}
                message={
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{ width: '100%' }} // Ensure the Box takes the full width
                    >
                        <Typography sx={{ fontSize: 18 }}>
                            {message}
                        </Typography>
                    </Box>
                }
                action={action}
                severity="success"
                onClose={() => setOpen(false)} // Close Snackbar when user clicks the action button
            />
        </SnackbarContext.Provider>
    );
}

