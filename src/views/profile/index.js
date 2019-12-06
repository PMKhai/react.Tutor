import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Typography,
  Grid,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Container,
  CircularProgress,
} from '@material-ui/core';
import 'antd/dist/antd.css';
import './style.css';
import { Form, Input, Select, Upload, message, Progress } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';
import axios from 'axios';
import { PeopleAltOutlined } from '@material-ui/icons';
import { API, REGISTER } from '../../config';
import { storage } from '../../config/firebase';

const api = `${API}${REGISTER}`;
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
    urlImage: null,
  });
  // eslint-disable-next-line consistent-return
  const handleSignup = async (e) => {
    try {
      e.preventDefault();

      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));

      const res = await axios.post(api, formState.values);
      if (res.data.returncode === 1) {
        props.history.push('/signin');
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.message);
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
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
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
            .then((urlImage) => {
              console.log('urlImage', urlImage);
              setUploadState({ urlImage });
            });
        },
      );
    }
  };
  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
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

  const handleClick = () => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        isTutor: !formState.values.isTutor,
      },
    }));
  };

  return (
    <Container maxWidth="sm" className={classes.widthForm}>
      <div className={classes.paper}>
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
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleUploadChange}
                >
                  {uploadState.urlImage ? (
                    <img
                      src={uploadState.urlImage}
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
                {uploadState.uploading && <CircularProgress size={20} style={{ marginLeft: '170px' }} />}
                {uploadState.loading && <Progress percent={uploadState.progress} />}
              </Grid>
              <Grid item xs={12}>
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
                  disabled="true"
                  value={user.email || ''}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
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
                    hasError('p_number') ? formState.errors.p_number[0] : null
                  }
                  onChange={handleChange}
                  value={formState.values.p_number || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  error={hasError('address')}
                  helperText={
                    hasError('address') ? formState.errors.address[0] : null
                  }
                  onChange={handleChange}
                  value={formState.values.address || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="overview"
                  label="Overview"
                  id="overview"
                  autoComplete="overview"
                  error={hasError('overview')}
                  helperText={
                    hasError('overview') ? formState.errors.overview[0] : null
                  }
                  onChange={handleChange}
                  value={formState.values.overview || ''}
                  multiline="true"
                  rows="10"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                handleSignup(e);
              }}
              disabled={!formState.isValid}
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
