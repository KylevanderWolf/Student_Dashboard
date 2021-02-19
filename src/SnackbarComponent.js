import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';


//STYLING
const styles = {
    snackbar: {
        backgroundColor: 'white',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        color: 'black'
    },
}

const SnackbarComponent = ({ handleCLose, handleOpen, snackbarMessage, snackbarColor }) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={handleOpen}
            autoHideDuration={2500}
            onClose={handleCLose}
            message={snackbarMessage}
            ContentProps={{
                style: styles.snackbar
            }}
            action={
                <IconButton size="small" aria-label="close" color="inherit" >
                    <FavoriteIcon style={{ color: snackbarColor }} />
                </IconButton>
            }
        />

    )
}

export default SnackbarComponent