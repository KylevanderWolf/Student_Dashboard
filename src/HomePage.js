import React from 'react';
import TrackListForm from './TrackListForm'
import { Grid } from '@material-ui/core/';
import Appbar from './Appbar'
import TrackList from './TrackList'


//Styling
const styles = {
  container: {
    backgroundColor: 'transparent',
    minHeight: '100vh',
    maxHeight: 'auto',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '0',
    margin: '0'
  },
  heroContainer: {
    minHeight: '90vh',
    maxHeight: 'auto',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '0px',
  },
  searchContainer: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: '20px',
    minHeight: '50vh',
    boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
    borderRadius: '10px'
  },
  trackListContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: '20px',
    minHeight: '60vh',
    maxHeight: '60vh',
    borderRadius: '10px',
    margin: '20px'
  },
}

function HomePage() {
  return (
    <div className="App" style={styles.container}>
      <Appbar />

      <Grid container style={styles.heroContainer}>
        <Grid style={styles.searchContainer} item xs={12} sm={12} md={5} lg={4} xl={4}>
          <TrackListForm />
        </Grid>

        <Grid style={styles.trackListContainer} item xs={12} sm={12} md={12} lg={6} xl={6}>
          <TrackList />
        </Grid>
      </Grid>
    </div >

  );
}

export default HomePage;
