// SnackbarContext.js
import React, { useContext, createContext, useState } from "react";
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
                open={open}
                autoHideDuration={6000}
                message={message}
                action={action}
                severity="success"
                onClose={() => setOpen(false)} // Close Snackbar when user clicks the action button
            />
        </SnackbarContext.Provider>
    );
}

