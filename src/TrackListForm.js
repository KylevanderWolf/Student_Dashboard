import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Rating from '@material-ui/lab/Rating';
import { useDispatch, useSelector } from 'react-redux'
import { formData } from './Actions/actions'
import { Typography } from '@material-ui/core';

//STYLING
const styles = {
    form: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        padding: '20px',
        height: 'auto',
        color: 'black',
        borderRadius: '10px'
    },
    artistInputField: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #a2a2a2',
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
        outline: 'none',

    },
    titleInputField: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #a2a2a2',
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
        outline: 'none'
    },
    selectOptions: {
        boxShadow: `rgba(149, 157, 165, 0.2) 0px 8px 24px`,
        outline: 'none',
        border: '1px solid #a2a2a2',
        cursor: 'pointer',
        padding: '4px',
        fontSize: '0,9em'
    },
    rating: {
        marginBottom: '10px',
    },

    searchBtn: {
        backgroundColor: '#1DB954',
        color: 'white',

    }
}


const TrackListForm = () => {

    const [ratingMessage, setRatingMessage] = useState('')
    const [id, setId] = useState(null)

    //FORM STATE FROM REDUX
    const data = useSelector(state => state.formData)

    //DISPATCH FUNCTION
    const dispatch = useDispatch()

    //STATE OF INPUT FIELDS
    const [trackInfo, setTrackInfo] = useState({
        id: null,
        artistName: '',
        songTitle: '',
        genre: '',
        rating: 0,
        favorite: false,
    })

    //CHANGE STATE INPUT FIELD VALUES
    const handleChange = (e) => {
        const { name, value } = e.target
        return setTrackInfo({ ...trackInfo, [name]: value })
    }

    //DISPATCH FORM STATE ON SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault()
        setId(prevId => prevId + 1)
        return dispatch(formData({ ...trackInfo, id: id }))
    }

    //LIFECYCLE
    useEffect(() => {
        setId(data.length)
        return data;
    }, [data])

    return (
        <form
            style={styles.form}
            onSubmit={handleSubmit}
        >
            <Typography variant="h4" style={{ marginBottom: '30px' }}>Save your tracks</Typography>
            <Typography variant="subtitle1" >Artist Name</Typography>
            <input
                autoFocus
                style={styles.artistInputField}
                type="text"
                placeholder="Artist Name"
                onChange={handleChange}
                value={trackInfo.artistName}
                name="artistName"
                required
            />
            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Title</Typography>
            <input
                style={styles.titleInputField}
                type="text"
                placeholder="Song Title"
                onChange={handleChange}
                value={trackInfo.songTitle}
                name="songTitle"
                required
            />

            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Genre</Typography>
            <FormControl>
                <Select
                    disableUnderline
                    style={styles.selectOptions}
                    value={trackInfo.genre}
                    name="genre"
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    required
                >
                    <MenuItem value="" disabled>Select Genre</MenuItem>
                    <MenuItem value='House'>House</MenuItem>
                    <MenuItem value='Techno'>Techno</MenuItem>
                    <MenuItem value='R&B'>R&B</MenuItem>
                    <MenuItem value='Hip-Hop'>Hip-Hop</MenuItem>
                </Select>
            </FormControl >

            <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Rating</Typography>
            <Rating
                style={styles.rating}
                size="large"
                name="rating"
                value={trackInfo.rating}
                required
                onChange={(e, newValue) => {
                    newValue > 0 && setRatingMessage('')
                    setTrackInfo({ ...trackInfo, rating: newValue });
                }}
            />
            <span style={{ marginLeft: '10px', marginBottom: '20px', }}>
                {ratingMessage}
            </span>


            < Button
                style={styles.searchBtn}
                type="submit"
                variant="contained"
                color="secondary"
            > Add To Playlist
            </Button >
        </form >
    )
}

export default TrackListForm