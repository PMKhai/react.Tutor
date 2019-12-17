/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import {
  colors,
  Card,
  CardHeader,
  Divider,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Input,
} from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import { options, labels } from './chartOption';
import { API, ALLREVENUE } from '../../config';

const api = `${API}${ALLREVENUE}`;

const calculate = (revenue, year) => {
  const result = Array(12).fill(0);
  const reveneuByYear = _.filter(revenue, (o) => {
    return moment(o.dayOfPayment).year() === year;
  });

  for (let i = 0; i < 12; i += 1) {
    let temp = 0;
    reveneuByYear.forEach((element) => {
      if (moment(element.dayOfPayment).month() === i) {
        temp += element.payment;
      }
    });
    result[i] = temp;
  }
  return result;
};

const Revenue = () => {
  // eslint-disable-next-line no-undef
  const token = JSON.parse(localStorage.getItem('token'));

  const [revenueListing, setRevenueListing] = useState([]);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'This year',
        backgroundColor: colors.indigo[500],
        data: Array(12).fill(0),
      },
    ],
  });

  const fetchRevenueList = async () => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.get(api, {
        headers: { Authorization },
      });

      const { returnCode, revenue } = res.data;
      if (returnCode === 1) {
        setRevenueListing(revenue);
        const display = calculate(revenue, 2019);
        setData({
          labels,
          datasets: [
            {
              label: 'This year',
              backgroundColor: colors.indigo[500],
              data: display,
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    const year = parseInt(e.target.value, 10);
    const display = calculate(revenueListing, year);
    setData({
      labels,
      datasets: [
        {
          label: `${year}`,
          backgroundColor: colors.indigo[500],
          data: display,
        },
      ],
    });
  };

  useEffect(() => {
    fetchRevenueList();
  }, []);

  return (
    <Card>
      <CardHeader
        title="Revenue (total: $12)"
        action={
          <FormControl>
            <InputLabel htmlFor="grouped-native-select">Years</InputLabel>
            <Select
              native
              defaultValue="2019"
              input={<Input id="grouped-native-select" />}
              onChange={handleClick}
            >
              <option value={2019}>2019</option>
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
            </Select>
          </FormControl>
        }
      />
      <Divider />
      <CardContent>
        <div style={{ height: 400, position: 'relative' }}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Revenue;
