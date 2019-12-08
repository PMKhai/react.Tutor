import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileCard from '../../../components/profilecard';

const TopTutor = (props) => {
  const { ...rest } = props;

  return (
    <Grid container justify="space-around">
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ProfileCard path="/view?id=111" {...rest} />
      </Grid>
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ProfileCard path="/view?id=111" {...rest} />
      </Grid>
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ProfileCard path="/view?id=111" {...rest} />
      </Grid>
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <ProfileCard path="/view?id=111" {...rest} />
      </Grid>
    </Grid>
  );
};

export default TopTutor;
