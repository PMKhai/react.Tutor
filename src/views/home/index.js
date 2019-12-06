import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Banner from './banner';
import TopTutor from './toptutor';
import Introduce from './introduce';

const Home = () => (
  <div>
    <Container maxWidth="lg" style={{ marginBottom: '5px' }}>
      <Banner />
    </Container>
    <Container maxWidth="lg">
      <Typography
        variant="h5"
        color="initial"
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          marginBottom: '5px',
        }}
        component="h3"
      >
        Top tutor
      </Typography>
      <TopTutor />
      <div style={{ width: '100%', textAlign: 'end' }}>
        <Link
          color="inherit"
          variant="body2"
          href="/"
          to="/"
          style={{ flexShrink: '0', marginRight: '20px' }}
        >
          See more...
        </Link>
      </div>
      <Typography
        variant="h5"
        color="initial"
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          marginBottom: '5px',
        }}
        component="h3"
      >
        Introduce and service
      </Typography>
      <Introduce />
    </Container>
  </div>
);

export default Home;
