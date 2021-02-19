import React, { useEffect, useState } from 'react'
import Appbar from './Appbar'
import { Grid } from '@material-ui/core/';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux'
import Rating from '@material-ui/lab/Rating';
import { Typography, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { filteredArray } from './Actions/actions'

//STYLING
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        backgroundColor: 'white'
    },
    favoriteTracksContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'auto',
    },
    table: {
        minHeight: '60vh',
        maxHeight: 'auto',
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
    },
    listItem: {
    },
    selectOptions: {
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
        outline: 'none',
        border: '1px solid #a2a2a2',
        cursor: 'pointer',
        padding: '4px',
        fontSize: '0,9em'
    },
    formControl: {
        minWidth: '130px',
        margin: '0px 10px'
    },
}


const FavoritePage = () => {

    const dispatch = useDispatch()

    const [searchInput, setSearchInput] = useState({
        artistName: '',
        title: '',
        genre: '',
        rating: "",
    })

    //STATE FROM REDUX
    const searchArray = useSelector(state => state.filteredArray)
    const favoriteTracks = useSelector(state => state.formData.filter(e => e.favorite === true))


    //CHANGE STATE INPUT FIELD VALUES
    const handleChange = (e) => {
        e.preventDefault()
        const { value, name } = e.target
        setSearchInput({ ...searchInput, [name]: value })
    }

    //FILTER SEARCH 
    useEffect(() => {
        const filterSearch = favoriteTracks.filter(e =>
            e.rating.toString().includes(searchInput.rating) &&
            e.songTitle.includes(searchInput.title) &&
            e.artistName.includes(searchInput.artistName) &&
            e.genre.includes(searchInput.genre)
        )
        return filterSearch ? dispatch(filteredArray(filterSearch)) : dispatch(filteredArray(favoriteTracks))
    }, [searchInput])



    return (
        <div >
            <Appbar />
            <Grid container style={styles.container}>
                <Grid style={styles.favoriteTracksContainer} item xs={12} sm={12} md={11} lg={8} xl={6}>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        style={{ marginBottom: '20px' }}
                    >
                        Favorite Tracks
                    </Typography>
                    <TableContainer style={styles.table} component={Paper}>
                        <Table aria-label="simple table" stickyHeader>
                            <TableHead >
                                <TableRow>
                                    <TableCell align="left">
                                        <TextField
                                            onChange={handleChange}
                                            name="artistName"
                                            value={searchInput.artistName}
                                            style={{ minWidth: '100px' }}
                                            autoComplete='off'
                                            label="Search ArtistName" >
                                        </TextField>
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            onChange={handleChange}
                                            name="title"
                                            value={searchInput.title}
                                            style={{ minWidth: '100px' }}
                                            autoComplete='off'
                                            label="Search Title" >
                                        </TextField>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControl style={styles.formControl}>
                                            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={handleChange}
                                                value={searchInput.genre}
                                                name="genre"
                                            >
                                                <MenuItem value="">All</MenuItem>
                                                <MenuItem value='House'>House</MenuItem>
                                                <MenuItem value='Techno'>Techno</MenuItem>
                                                <MenuItem value='R&B'>R&B</MenuItem>
                                                <MenuItem value='Hip-Hop'>Hip-Hop</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControl style={styles.formControl}>
                                            <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={handleChange}
                                                value={searchInput.rating}
                                                name="rating"
                                            >
                                                <MenuItem value="">All</MenuItem>
                                                <MenuItem value='0'>0</MenuItem>
                                                <MenuItem value='1'>1</MenuItem>
                                                <MenuItem value='2'>2</MenuItem>
                                                <MenuItem value='3'>3</MenuItem>
                                                <MenuItem value='4'>4</MenuItem>
                                                <MenuItem value='5'>5</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchArray.map(item => (
                                    <TableRow key={item.id} style={styles.listItem}>
                                        <TableCell align="left">{item.artistName}</TableCell>
                                        <TableCell align="left">{item.songTitle}</TableCell>
                                        <TableCell align="left">{item.genre}</TableCell>
                                        <TableCell align="left">
                                            <Rating
                                                style={styles.rating}
                                                size="large"
                                                name="rating"
                                                value={item.rating}
                                                readOnly
                                                required
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div >

    )
}

export default FavoritePage