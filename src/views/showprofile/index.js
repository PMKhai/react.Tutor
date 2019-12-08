import React, { useEffect } from 'react';
import {
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button,
  Chip,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  chip: {
    marginRight: '5px',
    marginTop: '2px',
  },
});

const ShowProfile = (props) => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_ohc=7xgG5BNr6HsAQnnuVMaYrBo2v17vjHH1BrESbqmt5hprwBsZxbWvxQjIQ&_nc_ht=scontent.fsgn2-1.fna&oh=30bdeaeaaf5347da499581278c6413a0&oe=5E7BB526"
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Lizard
          <Typography>1 USD/h</Typography>
        </Typography>
        <Rating name="read-only" value={3} readOnly />

        <Typography variant="body2" color="textSecondary" component="p">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <div>
          <Chip label="Toán" className={classes.chip} />
          <Chip label="Toán" className={classes.chip} />
          <Chip label="Tin học" className={classes.chip} />
        </div>
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
