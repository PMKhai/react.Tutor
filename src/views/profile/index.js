import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  CircularProgress,
  Slider,
  Card,
  CardContent,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'antd/dist/antd.css';
import './style.css';
import { Alert, Upload, message, Progress } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';
import axios from 'axios';
import { PeopleAltOutlined, Edit } from '@material-ui/icons';
import { API, EDIT } from '../../config';
import { storage } from '../../config/firebase';
import AddressCard from '../../components/addressCard';
import InputSkill from '../../components/inputSkill';

//
const jsonPlacesData = require('../../constants/dataPlaces.json');

const listProvince = Object.values(jsonPlacesData).map((value) => value.name);
const api = `${API}${EDIT}`;
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error('Image must smaller than 3MB!');
  }
  return isJpgOrPng && isLt3M;
};
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  widthForm: {
    width: '35%',
  },
}));

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32,
    },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 128,
    },
  },
};

const Profile = (props) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('token'));

  function priceText(value) {
    return `${value}$`;
  }

  const [formState, setFormState] = useState({
    isValid: false,
    values: user,
    touched: {},
    errors: {},
    isLoading: false,
  });
  const [uploadState, setUploadState] = useState({
    uploading: false,
    loading: false,
    progress: 0,
    urlAvatar: null,
  });
  const [alert, setAlert] = useState({
    type: 'error',
    message: null,
  });
  const [price, setPrice] = useState(formState.values.price);
  const [address, setAddress] = useState(formState.values.address);
  const [indexProvince, setIndexProvince] = useState(-1);
  const handleProvinceChange = (event, value) => {
    setIndexProvince(listProvince.indexOf(value));
    setAddress({
      province: value,
      district: '',
    });
  };
  const handleDistrictChange = (event, value) => {
    setAddress((address) => ({
      ...address,
      district: value,
    }));
  };
  // eslint-disable-next-line consistent-return
  const handleEdit = async (e) => {
    try {
      e.preventDefault();

      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
      const { urlAvatar } = uploadState;
      formState.values.urlAvatar = urlAvatar || formState.values.urlAvatar;
      formState.values.address = address || formState.values.address;
      formState.values.price = price;
      const Authorization = `Bearer ${token}`;
      const res = await axios.put(api, formState.values, {
        headers: { Authorization },
      });
      if (res.data.returncode === 1) {
        localStorage.setItem('user', JSON.stringify(res.data.newUser));
        props.history.push('/profile');
        // eslint-disable-next-line no-restricted-globals
        location.reload(true);
        setAlert({
          type: 'success',
          message: res.data.returnmessage,
        });
      } else {
        setAlert({ ...alert, message: res.data.returnmessage });
      }

      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
    } catch (err) {
      setAlert({ ...alert, message: err.message });
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
    }
  };
  const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      // setUploadState((uploadState) => ({ ...uploadState, uploading: true }));
      setUploadState({ uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const image = info.file.originFileObj;
      console.log('yeahhhh', image.name);
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // progrss function ....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadState({ loading: true, uploading: false, progress });
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((urlAvatar) => {
              console.log('urlAvatar', urlAvatar);
              setUploadState({ urlAvatar });
            });
        }
      );
    }
  };
  const handleChange = (event, value) => {
    event.persist();
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        skills: value || formState.values.skills,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    });
    console.log('ad', formState.values);
  };

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values]);

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);
  return (
    <Container maxWidth="sm" className={classes.widthForm}>
      <div className={classes.paper}>
        {alert.message && (
          <div className="alert-field">
            <Alert message={alert.message} type={alert.type} showIcon />
          </div>
        )}
        <Avatar className={classes.avatar}>
          <PeopleAltOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        {user && (
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Upload
                  name="urlAvatar"
                  id="urlAvatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleUploadChange}
                >
                  {uploadState.urlAvatar ? (
                    <img
                      src={uploadState.urlAvatar}
                      alt="avatar"
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={user.urlAvatar}
                      alt="avatar"
                    />
                  )}
                </Upload>
                {uploadState.uploading && (
                  <CircularProgress size={20} style={{ marginLeft: '170px' }} />
                )}
                {uploadState.loading && (
                  <Progress percent={uploadState.progress} />
                )}
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography>Common Information</Typography>
                    <Typography>---</Typography>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={hasError('email')}
                      helperText={
                        hasError('email') ? formState.errors.email[0] : null
                      }
                      onChange={handleChange}
                      disabled
                      value={user.email || ''}
                    />
                    <Typography>---</Typography>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      error={hasError('name')}
                      helperText={
                        hasError('name') ? formState.errors.Name[0] : null
                      }
                      onChange={handleChange}
                      value={formState.values.name || ''}
                    />
                    <Typography>---</Typography>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      type="number"
                      id="p_number"
                      label="Phone Number"
                      name="p_number"
                      autoComplete="p_number"
                      error={hasError('p_number')}
                      helperText={
                        hasError('p_number')
                          ? formState.errors.p_number[0]
                          : null
                      }
                      onChange={handleChange}
                      value={formState.values.p_number || ''}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <AddressCard
                      address={address}
                      indexProvince={indexProvince}
                      handleProvinceChange={handleProvinceChange}
                      handleDistrictChange={handleDistrictChange}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <InputSkill
                      handleChange={handleChange}
                      skills={formState.values.skills}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography>Hourly Price: {price}$</Typography>
                    <Slider
                      name="price"
                      value={price || 0}
                      onChange={(event, value) => setPrice(value)}
                      valueLabelDisplay="auto"
                      getAriaValueText={priceText}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography>Overview</Typography>
                    <Typography>---</Typography>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="overview"
                      // label="Overview"
                      placeholder="Tell something about you !!!"
                      id="overview"
                      autoComplete="overview"
                      error={hasError('overview')}
                      helperText={
                        hasError('overview')
                          ? formState.errors.overview[0]
                          : null
                      }
                      onChange={handleChange}
                      value={formState.values.overview || ''}
                      multiline
                      rows="10"
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                handleEdit(e);
              }}
              disabled={formState.isValid}
            >
              {formState.isLoading && (
                <CircularProgress size={20} style={{ marginRight: '5px' }} />
              )}
              Update
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default Profile;
