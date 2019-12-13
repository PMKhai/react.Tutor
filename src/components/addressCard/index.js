import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Autocomplete,
  TextField,
  Typography,
} from '@material-ui/core';

const jsonPlacesData = require('../../constants/dataPlaces.json');

const listProvince = Object.values(jsonPlacesData).map((value) => {
  return value.name;
});
const listDistrict = Object.values(jsonPlacesData).map((value) => {
  return Object.values(value.districts).map((value) => {
    return value;
  });
});
const useStyles = makeStyles({

});
const AddressCard = (props) => {
  const classes = useStyles();
  const { path, rating, name, price, urlAvatar, skills } = props;

  const handleClick = () => {
    props.history.push(path);
  };

  const displaySkills = skills
    ? skills.map((skill) => (
        // eslint-disable-next-line react/jsx-indent
        <Chip label={skill} key={skill} className={classes.chip} />
      ))
    : null;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={urlAvatar}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
            <Typography>{price || 0} USD/h</Typography>
          </Typography>
          <Rating name="read-only" value={rating || 0} readOnly />
          <div>{displaySkills}</div>
        </CardContent>
      </CardActionArea>
    </Card>
    <div>
        <Typography>Address</Typography>
                    <Typography> --- </Typography>
                    <Autocomplete
               //       id="combo-box-demo"
                      options={listProvince}
                     // getOptionLabel={(option) => option}
                     // filterSelectedOptions
                      onChange={handleProvinceChange}
                      value={address.province || ''}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Province"
                          variant="outlined"
                          placeholder="Enter province here"
                          fullWidth
                        />
                      )}
                    />
                    <Typography> --- </Typography>
                    <Autocomplete
                  //    id="combo-box-demo"
                      options={listDistrict[indexProvince]}
                //      getOptionLabel={(option) => option}
                  //    filterSelectedOptions
                      onChange={handleDistrictChange}
                      value={address.district || ''}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="District"
                          variant="outlined"
                          placeholder="Enter district here"
                          fullWidth
                        />
                      )}
                    />

    </div>
  );
};

export default AddressCard;
