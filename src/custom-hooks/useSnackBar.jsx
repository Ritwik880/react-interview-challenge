import React from 'react'
import Snackbar from '@mui/material/Snackbar';

const useSnackBar = ({error}) => {
    return (
        <Snackbar
            // open={loading}
            autoHideDuration={6000}
            message={error}
            // action={action}
        />
    )
}

export default useSnackBar