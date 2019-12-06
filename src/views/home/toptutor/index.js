import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileCard from '../../../components/profilecard';

const TopTutor = () => (
  <Grid container justify="space-around">
    <Grid
      item
      xs={6}
      sm={3}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <ProfileCard />
    </Grid>
    <Grid
      item
      xs={6}
      sm={3}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <ProfileCard />
    </Grid>
    <Grid
      item
      xs={6}
      sm={3}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <ProfileCard />
    </Grid>
    <Grid
      item
      xs={6}
      sm={3}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <ProfileCard />
    </Grid>
  </Grid>
);

export default TopTutor;
