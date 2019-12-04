import React, { useState, useEffect } from 'react';
import './style.css';
import { Alert } from 'antd';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import SOCIAL_APP_ID from '../../constants/socialLogin';
import { API, LOGIN, REGISTER } from '../../config';

const apiLogin = `${API}${LOGIN}`;
const apiRegister = `${API}${REGISTER}`;
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 0),
  },
  widthForm: {
    width: '35%',
  },
  buttonAuth: {
    width: '49%',
    margin: theme.spacing(0, 0, 0),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: { isTutor: false },
    touched: {},
    errors: {},
    isLoading: false,
  });
  const [result, setResult] = useState(false);
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
  const handleApiLogin = async (user) => {
    const res = await axios.post(apiLogin, user);
    if (res.data.returncode === 1) {
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', JSON.stringify(res.data.token));
      props.history.push('/home');
    } else {
      setResult(res.data.returnmessage);
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
    }
  };
  const handleApiSocialLogin = async (user) => {
    let res = await axios.post(apiRegister, user);
    if (res.data) {
      res = await axios.post(apiLogin, user);
      if (res.data.returncode === 1) {
        // eslint-disable-next-line no-undef
        localStorage.setItem('token', JSON.stringify(res.data.token));
        props.history.push('/home');
      } else {
        setResult(res.data.returnmessage);
        setFormState((formState) => ({
          ...formState,
          isLoading: !formState.isLoading,
          isValid: !formState.isValid,
        }));
      }
    }
  };
  const handleSignIn = async (e) => {
    try {
      e.preventDefault();

      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
      handleApiLogin(formState.values);
    } catch (err) {
      setResult('Failed to fetch');
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
    }
  };
  const responseFacebook = async (response) => {
    const user = {};
    try {
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
      console.log('fb--', response);

      const { email, name, picture } = response;

      user.password = SOCIAL_APP_ID.SOCIAL_PASSWORD;
      user.email = email;
      user.name = name;
      user.urlAvatar = picture.data.url;
      handleApiSocialLogin(user);
    } catch (e) {
      try {
        const res = await axios.post(apiLogin, user);
        if (res.data.returncode === 1) {
          props.history.push('/home');
        }
      } catch (err) {
        setResult('Failed to fetch');
        setFormState((formState) => ({
          ...formState,
          isLoading: !formState.isLoading,
          isValid: !formState.isValid,
        }));
      }
    }
  };

  const responseGoogle = async (response) => {
    const user = {};
    try {
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
      console.log('gg--', response);
      const { email, name, imageUrl } = response.profileObj;
      user.password = SOCIAL_APP_ID.SOCIAL_PASSWORD;
      user.email = email;
      user.name = name;
      user.urlAvatar = imageUrl;
      handleApiSocialLogin(user);
    } catch (e) {
      try {
        const res = await axios.post(apiLogin, user);
        if (res.data.returncode === 1) {
          props.history.push('/home');
        }
      } catch (err) {
        setResult('Failed to fetch');
        setFormState((formState) => ({
          ...formState,
          isLoading: !formState.isLoading,
          isValid: !formState.isValid,
        }));
      }
    }
  };
  return (
    <Container maxWidth="sm" className={classes.widthForm}>
      <div className={classes.paper}>
        {result && (
          <div className="alert-field">
            <Alert message={result} type="error" showIcon />
          </div>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              handleSignIn(e);
            }}
            disabled={formState.isValid}
          >
            {formState.isLoading && (
              <CircularProgress size={20} style={{ marginRight: '5px' }} />
            )}
            Sign In
          </Button>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Typography>or</Typography>
          </div>
          <Grid container>
            <div>
              <GoogleLogin
                className="ggBtnLogin"
                clientId={SOCIAL_APP_ID.GOOGLE_CLIENTID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>
            <div>
              <FacebookLogin
                cssClass="fBtnLogin"
                appId={SOCIAL_APP_ID.FACEBOOK_APPID}
                fields="name,email,picture"
                icon="fa-facebook"
                callback={responseFacebook}
              />
            </div>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link href="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
