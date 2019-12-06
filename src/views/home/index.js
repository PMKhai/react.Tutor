import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Banner from './banner';
import TopTutor from './toptutor';

const Home = () => (
  <div>
    <Container maxWidth="lg" style={{ marginBottom: '5px' }}>
      <Banner />
    </Container>
    <Container maxWidth="lg">
      <Typography
        variant="subtitle1"
        color="initial"
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          marginBottom: '5px',
        }}
      >
        Top tutor:
      </Typography>
      <TopTutor />
      <div style={{ width: '100%', textAlign: 'end' }}>
        <Link
          color="inherit"
          variant="body2"
          href="/"
          to="/"
          style={{ flexShrink: '0' }}
        >
          See more
        </Link>
      </div>
    </Container>
  </div>
);

export default Home;
