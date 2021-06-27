import React from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function Status({open, message}) {

    return (
        <Snackbar open={open} autoHideDuration={4000} >
            <Alert severity="success">
                {message}
            </Alert>
        </Snackbar>
    )
}
