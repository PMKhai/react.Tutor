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
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Alert } from 'antd';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import HireFormDialog from '../../components/hireTutorForm';
import { API, VIEWTUTOR } from '../../config';
import Review from './review';

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
  rightContent: {
    height: '100%',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div> {children}</div>}
    </Typography>
  );
}

const ShowProfile = (props) => {
  const classes = useStyles();

  // eslint-disable-next-line react/destructuring-assignment
  const { search } = props.location;
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [reviews, setReviews] = useState([]);
  // eslint-disable-next-line no-undef
  const user = JSON.parse(localStorage.getItem('user'));
  const [alert, setAlert] = useState({
    type: 'error',
    message: null,
  });
  const fecthTutorInfo = async () => {
    try {
      const res = await axios.get(`${api}${search}`);
      const { tutorInfo, returncode, returnMessage } = res.data;
      console.log(res.data);
      if (returncode === 1) {
        setProfile(() => tutorInfo);
        setReviews(tutorInfo.reviews);
      } else console.log(returnMessage);
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
    if (user) {
      if (user.isTutor === true) {
        setAlert({
          ...alert,
          message: 'You can not hire a tutor because you are a tutor !!!',
        });
      } else {
        setOpen(true);
      }
    } else {
      props.history.push('/signin');
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <Grid item xs={4}>
          {alert.message && (
            <div className="alert-field">
              <Alert
                message={alert.message}
                type={alert.type}
                showIcon
                closable
              />
            </div>
          )}
        </Grid>
        <HireFormDialog
          profile={profile}
          open={open}
          handleClose={handleClose}
          setAlert={setAlert}
        />
        <Grid item xs={8}>
          <Paper square>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Comment" />
              <Tab label="Tutor's history" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Review reviews={reviews} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShowProfile;
