import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});
const ProfileCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={console.log('ss')}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_ohc=7xgG5BNr6HsAQnnuVMaYrBo2v17vjHH1BrESbqmt5hprwBsZxbWvxQjIQ&_nc_ht=scontent.fsgn2-1.fna&oh=30bdeaeaaf5347da499581278c6413a0&oe=5E7BB526"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
