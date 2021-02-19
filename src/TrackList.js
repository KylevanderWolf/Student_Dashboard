import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite } from './Actions/actions'
import FavoriteIcon from '@material-ui/icons/Favorite';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Rating from '@material-ui/lab/Rating';
import SnackbarComponent from './SnackbarComponent'
import { Typography } from '@material-ui/core';

//STYLING
const styles = {
    table: {
        overflowY: 'scroll',
        minHeight: '50vh',
        maxHeight: '50vh',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,

    },
    listItem: {
        backgroundColor: 'transparent',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
    },
    filterBtn: {
        marginLeft: 'auto',
        border: "1px solid #a2a2a2",
    }
}



const PlayListItems = () => {

    //STATES
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState()

    //DISPATCH FUNCTION
    const dispatch = useDispatch()

    //FORM STATE FROM REDUX
    const data = useSelector(state => state.formData)

    //LIFECYCLE
    useEffect(() => {
        return data
    }, [data])


    //UPDATE FAVORITE SONGS IN REDUX && SHOW SNACKBAR (POPUP)
    const favoriteClick = (item) => {
        setOpenSnackbar(true)
        if (item.favorite === false) {
            setMessage('Added to Favorites')
            setColor('#1DB954')
            return dispatch(addFavorite({ ...item, favorite: true }))
        } else {
            setMessage('Deleted from Favorites')
            setColor('#a2a2a2')
            return dispatch(addFavorite({ ...item, favorite: false }))
        }
    }

    //CLOSE SNACKBAR
    const handleCloseSnackbar = (i, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false)
    }


    return (
        <div>
            <Typography variant="h4" style={{ marginBottom: '20px' }} align="center">Tracklist</Typography>
            <Typography
                variant="subtitle1"
                style={{ marginBottom: '20px' }}
                align="center">
                Click <FavoriteIcon style={{ color: '#a2a2a2', marginRight: '5px' }} />
                 to Add to Favorites
            </Typography>
            <TableContainer style={styles.table} component={Paper}>
                <Table aria-label="simple table" stickyHeader>
                    <TableHead >
                        <TableRow>
                            <TableCell align="left">Artist Name</TableCell>
                            <TableCell align="left">Song Title</TableCell>
                            <TableCell align="left">Genre</TableCell>
                            <TableCell align="left">Rating</TableCell>
                            <TableCell align="right">Favorite</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id} style={styles.listItem}>
                                <TableCell align="left">{item.artistName}</TableCell>
                                <TableCell align="left">{item.songTitle}</TableCell>
                                <TableCell align="left">{item.genre}</TableCell>
                                <TableCell align="left">
                                    <Rating
                                        style={styles.rating}
                                        name="rating"
                                        value={item.rating}
                                        readOnly
                                        required
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <FavoriteIcon
                                        style={{ color: item.favorite === true ? "#1DB954" : '#a2a2a2', cursor: 'pointer' }}
                                        onClick={() => favoriteClick(item)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <SnackbarComponent
                handleOpen={openSnackbar}
                handleCLose={handleCloseSnackbar}
                snackbarMessage={message}
                snackbarColor={color}
            />

        </div>

    )
}

export default PlayListItems