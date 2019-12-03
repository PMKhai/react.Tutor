import React from 'react';
import { Carousel } from 'antd';
import './style.css';
import Image from 'material-ui-image';
import banner1 from '../../../assets/images/banner.png';

const Banner = () => (
  <Carousel autoplay>
    <div>
      <Image src={banner1} />
    </div>
    <div>
      <Image src={banner1} />
    </div>
    <div>
      <Image src={banner1} />
    </div>
    <div>
      <Image src={banner1} />
    </div>
  </Carousel>
);

export default Banner;
