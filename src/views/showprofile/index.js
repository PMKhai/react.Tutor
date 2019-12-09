import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button,
  Chip,
} from '@material-ui/core';
import axios from 'axios';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { API, VIEWTUTOR } from '../../config';

const api = `${API}${VIEWTUTOR}`;

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    minWidth: 345,
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

  const fecthTutorInfo = async () => {
    try {
      const res = await axios.get(`${api}${search}`);
      const { tutorInfo, returncode, returnMessage } = res.data;
      if (returncode === 0) setProfile(() => tutorInfo);
      else console.log(returnMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const { skills } = profile;
  const displaySkills = skills
    ? skills.map((skill) => (
        // eslint-disable-next-line react/jsx-indent
        <Chip label={skill} key={skill} className={classes.chip} />
      ))
    : null;

  useEffect(() => {
    fecthTutorInfo();
  }, []);

  return (
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
        <Button size="small" color="primary" style={{ width: '100%' }}>
          Employ
        </Button>
      </CardActions>
    </Card>
  );
};

export default ShowProfile;
