import React from 'react';
import './style.css';
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
} from '@material-ui/core';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SOCIAL_APP_ID from '../../constants/socialLogin';

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

export default function SignIn() {
  const classes = useStyles();

  const responseFacebook = (response) => {
    try {
      console.log('fb--', response);
      const { email, name, picture } = response;

      const user = {};
      user.password = SOCIAL_APP_ID.SOCIAL_PASSWORD;
      user.email = email;
      user.name = name;
      user.urlAvatar = picture.data.url;
      //this.props.register(user, true);
    } catch (e) {
      console.log(e);
    }
  };

  const responseGoogle = (response) => {
    try {
      console.log('gg--', response);
      const { email, name, imageUrl } = response.profileObj;
      const user = {};
      user.password = SOCIAL_APP_ID.SOCIAL_PASSWORD;
      user.email = email;
      user.name = name;
      user.urlAvatar = imageUrl;
      // this.props.register(user, true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container maxWidth="sm" className={classes.widthForm}>
      <div className={classes.paper}>
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
          >
            Sign In
          </Button>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Typography>or</Typography>
          </div>
          <Grid container>
            {/* <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.buttonAuth}
              style={{ marginRight: '2%', marginBottom: '5px' }}
            >
              Facebook
            </Button>
            */
            // <Button
            //   type="button"
            //   fullWidth
            //   variant="contained"
            //   color="secondary"
            //   className={classes.buttonAuth}
            //   style={{ marginBottom: '5px' }}
              
            // >
             
            // </Button> 
          }
            
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
