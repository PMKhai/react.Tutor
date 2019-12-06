import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Tag } from 'antd';

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
  },
});
const ProfileCard = () => {
  const classes = useStyles();
  const handleClick = () => {
    console.log('handle...');
  };
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_ohc=7xgG5BNr6HsAQnnuVMaYrBo2v17vjHH1BrESbqmt5hprwBsZxbWvxQjIQ&_nc_ht=scontent.fsgn2-1.fna&oh=30bdeaeaaf5347da499581278c6413a0&oe=5E7BB526"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
            <Typography>1 USD/h</Typography>
          </Typography>
          <Rating name="read-only" value={3} readOnly />
          <Typography variant="body2" component="p">
            <Tag color="cyan">Toán</Tag>
            <Tag color="cyan">Toán</Tag>
            <Tag color="cyan">Toán</Tag>
            <Tag color="cyan">Toán</Tag>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
