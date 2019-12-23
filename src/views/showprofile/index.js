import React, { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button,
  Chip,
} from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import HireFormDialog from '../../components/hireTutorForm';
import { API, VIEWTUTOR } from '../../config';

const api = `${API}${VIEWTUTOR}`;

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 276,
  },
  chip: {
    marginRight: '5px',
    marginTop: '2px',
  },
});

const ShowProfile = (props) => {
  const classes = useStyles();

  // eslint-disable-next-line react/destructuring-assignment
  const { search } = props.location;
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);
  const fecthTutorInfo = async () => {
    try {
      const res = await axios.get(`${api}${search}`);
      const { tutorInfo, returncode, returnMessage } = res.data;
      if (returncode === 1) setProfile(() => tutorInfo);
      else console.log(returnMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const { skills } = profile;
  const displaySkills = skills
    ? Object.values(skills).map((value) => (
        // eslint-disable-next-line react/jsx-indent
        <Chip label={value.name} key={value.name} className={classes.chip} />
      ))
    : null;

  useEffect(() => {
    fecthTutorInfo();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={profile.urlAvatar}
              title={profile.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {profile.name}
                <Typography>{profile.price || 0} USD/h</Typography>
              </Typography>
              <Rating name="read-only" value={profile.rating} readOnly />

              <Typography variant="body2" color="textSecondary" component="p">
                {profile.overview || 'Awaiting update...'}
              </Typography>
              <div>{displaySkills}</div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                style={{ width: '100%' }}
                onClick={handleOpen}
              >
                Hire
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <HireFormDialog
          profile={profile}
          open={open}
          handleClose={handleClose}
        />
      </Grid>
    </Container>
  );
};

export default ShowProfile;
