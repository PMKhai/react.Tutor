import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Container,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Slider,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import _ from 'lodash';
import { API, ALLTUTOR, LIMITPERPAGE } from '../../config';
import List from './list';

const api = `${API}${ALLTUTOR}`;
const theme = createMuiTheme();

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    width: 230,
  },
});

const TutorListing = (props) => {
  const [rating, setRating] = useState(1);
  const [price, setPrice] = useState([10, 50]);
  function priceText(value) {
    return `${value}$`;
  }
  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };
  const { ...rest } = props;

  const [tutorListing, setTutorListing] = useState([]);
  const [displayListing, setDisplayListing] = useState([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchTutorListing = async () => {
    try {
      const res = await axios.get(api);
      const { returncode, result, returnMessage } = await res.data;

      if (returncode === 1) {
        setTutorListing(result);

        const temp = result.length;
        setTotal(temp);

        const display = _.slice(result, offset, offset + LIMITPERPAGE);
        setDisplayListing(display);
      } else console.log(returnMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (offset) => {
    console.log(offset);
    setOffset(offset);
    const display = _.slice(tutorListing, offset, offset + LIMITPERPAGE);
    setDisplayListing(display);
  };
  const handleSeeAllClick = () => {
    const temp = tutorListing.length;
    setOffset(0);
    setTotal(temp);
    const display = _.slice(tutorListing, offset, offset + LIMITPERPAGE);
    setDisplayListing(display);
  };
  const handleFilterClick = () => {
    console.log('rating', rating);
    console.log('price', price);
    console.log('tutor', tutorListing);
    const filterTutor = [];
    tutorListing.forEach((element) => {
      if (
        element.rating === rating &&
        element.price >= price[0] &&
        element.price <= price[1]
      ) {
        filterTutor.push(element);
      }
    });
    console.log('fit', filterTutor);
    const temp = filterTutor.length;
      setOffset(0);
   console.log('fisst', temp);
      setTotal(temp);

    const display = _.slice(filterTutor, offset, offset + LIMITPERPAGE);
    setDisplayListing(display);
  };

  useEffect(() => {
    fetchTutorListing();
    setTotal(tutorListing.lenght);
  }, []);

  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={6} sm={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Filter
              </Typography>
              <Typography variant="h5" component="h2"></Typography>
              <Typography>Rating</Typography>
              <Rating
                name="rating"
                value={rating}
                onChange={handleRatingChange}
              />
              <Typography>Hourly Price($)</Typography>
              <div className={classes.root}>
                <Slider
                  name="price"
                  value={price}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={priceText}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleFilterClick}>
                OK
              </Button>
              <Button size="small" onClick={handleSeeAllClick}>
                See All
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={9}>
          <div style={{ margin: 4 }}>
            <List {...rest} tutor={displayListing} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MuiThemeProvider theme={theme}>
              <Pagination
                limit={LIMITPERPAGE}
                offset={offset}
                total={total}
                onClick={(e, offset) => handleClick(offset)}
              />
            </MuiThemeProvider>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TutorListing;
