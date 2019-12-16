/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
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

const Revenue = () => {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'This year',
        backgroundColor: colors.indigo[500],
        data: [18, 5, 19, 27, 29, 19, 20, 18, 5, 19, 27, 29, 19, 20],
      },
    ],
  });

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
