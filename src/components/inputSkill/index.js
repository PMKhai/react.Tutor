import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { API, ALLSKILL } from '../../config';

const useStyles = makeStyles({});
const api = `${API}${ALLSKILL}`;
// const listSkill = ['Math', 'Physic', 'Literature', 'Chemistry'];
const InputSkill = (props) => {
  const classes = useStyles();
  const { skills, handleChange } = props;
  const [listSkill, setListSkill] = useState([]);
  const fetchListSkill = async () => {
    try {
      const res = await axios.get(api);
      const { returncode, result, returnMessage } = await res.data;

      if (returncode === 1) {
        setListSkill(result);
      } else console.log(returnMessage);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchListSkill();
  }, []);
  return (
    <div>
      <Autocomplete
        multiple
        id="skills"
        name="skills"
        options={listSkill}
        getOptionLabel={(option) => option.name}
        filterSelectedOptions
        value={skills}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            label="Skills"
            placeholder="Enter skills here"
            margin="normal"
            fullWidth
          />
        )}
      />
    </div>
  );
};

export default InputSkill;
