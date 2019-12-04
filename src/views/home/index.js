import React from 'react';
import { Container } from '@material-ui/core';
import Banner from './banner';
import TopTutor from './toptutor';

const Home = () => (
  <div>
    <Container maxWidth="lg">
      <Banner />
    </Container>
    <Container maxWidth="lg">
      <TopTutor />
    </Container>
  </div>
);

export default Home;
