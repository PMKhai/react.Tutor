import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Container, Paper } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';
import _ from 'lodash';
import { API, ALLTUTOR } from '../../config';
import List from './list';

const api = `${API}${ALLTUTOR}`;
const theme = createMuiTheme();

const TutorListing = (props) => {
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

        const display = _.slice(result, offset, offset + 9);
        setDisplayListing(display);
      } else console.log(returnMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (offset) => {
    console.log(offset);
    setOffset(offset);
    const display = _.slice(tutorListing, offset, offset + 9);
    setDisplayListing(display);
  };

  useEffect(() => {
    fetchTutorListing();
    setTotal(tutorListing.lenght);
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={6} sm={3}>
          <Paper style={{ margin: 4 }}>filter...</Paper>
        </Grid>
        <Grid item xs={6} sm={9}>
          <div style={{ margin: 4 }}>
            <List {...rest} tutor={displayListing} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MuiThemeProvider theme={theme}>
              <Pagination
                limit={9}
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
