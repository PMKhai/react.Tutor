import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Typography,
  Grid,
  TextField,
  Link,
  Checkbox,
  Button,
  FormControlLabel,
  Container,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';

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

const Signup = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: { isTutor: false },
    touched: {},
    errors: {},
  });

  const handleSignup = (e) => {
    e.preventDefault();
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                error={hasError('firstName')}
                helperText={
                  hasError('firstName') ? formState.errors.firstName[0] : null
                }
                onChange={handleChange}
                value={formState.values.firstName || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                error={hasError('lastName')}
                helperText={
                  hasError('lastName') ? formState.errors.lastName[0] : null
                }
                onChange={handleChange}
                value={formState.values.lastName || ''}
              />
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
                value={formState.values.email || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={hasError('password')}
                helperText={
                  hasError('password') ? formState.errors.password[0] : null
                }
                onChange={handleChange}
                value={formState.values.password || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    color="primary"
                    name="tutor"
                    onChange={handleClick}
                  />
                }
                label="Are you tutor?"
                labelPlacement="end"
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Signup;