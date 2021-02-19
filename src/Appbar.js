import React from 'react'
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import { Typography } from '@material-ui/core';

//Styling
const styles = {
    appbar: {
        backgroundColor: 'white',
        width: '100%',
        padding: '10px 0px',
        display: 'flex',
        height: 'auto',
        alignItems: 'center'
    },
    favoriteBtn: {
        backgroundColor: 'transparent',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        padding: '10px',
        color: "black",
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
        marginLeft: 'auto',
        marginRight: '10px'
    },
    favoriteIcon: {
        color: "#1DB954"
    },
    homeBtn: {
        backgroundColor: 'transparent',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        padding: '10px',
        color: "black",
        borderRadius: '5px',
        cursor: 'pointer',
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10px'
    },
    homeIcon: {
        display: 'flex',
        cursor: 'pointer',
        color: 'black',
        textDecoration: 'none'
    },
}

const Appbar = () => {
    return (
        <div style={styles.appbar}>

            <Button
                style={styles.homeBtn}
                component={Link}
                to="/"
                startIcon={<HomeIcon style={styles.homeIcon} />}
            >
                <Typography variant="subtitle2">Homepage</Typography>

            </Button>

            <Button component={Link}
                style={styles.favoriteBtn}
                to="/FavoritePage"
                endIcon={<FavoriteIcon style={styles.favoriteIcon} />}
                variant="contained"
                color="secondary"
            >
                <Typography variant="subtitle2">My Favorites</Typography>
            </Button>

        </div>
    )
}

export default Appbar