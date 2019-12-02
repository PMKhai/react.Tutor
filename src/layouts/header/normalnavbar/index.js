import React from 'react';
import {
  Typography,
  IconButton,
  Button,
  Toolbar,
  InputBase,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import { Search } from '@material-ui/icons';
import { makeStyles, fade } from '@material-ui/core/styles';
import 'antd/dist/antd.css';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  customButton: {
    marginRight: '5px',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const menu = (profileUser) => (
  <Menu>
    <Menu.Item>
      <h3>Hi, Huy</h3>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/login">Logout</Link>
    </Menu.Item>
  </Menu>
);
const NormalNavbar = () => {
  const classes = useStyles();
  const profileUser = null;
  const isLogged = true;
  return (
    <Toolbar className={classes.toolbar}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="left"
        noWrap
        className={classes.toolbarTitle}
      >
        Logo...
      </Typography>
      <div className={classes.search}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <IconButton>
        <Search />
      </IconButton>
      {isLogged && (
        <Dropdown overlay={menu(profileUser)}>
          <a className="ant-dropdown-link" href="##">
            <Avatar
              src="https://firebasestorage.googleapis.com/v0/b/caro-react-redux.appspot.com/o/images%2F70898022_2767181436700422_2814379463616233472_n.jpg?alt=media&token=b0552190-559d-45d9-bc2d-e013ecaa76fe"
              alt="avatar"
            />
          </a>
        </Dropdown>
      )}
      {!isLogged && (
        <Button
          variant="outlined"
          size="small"
          className={classes.customButton}
        >
          Sign up
        </Button>
      )}
      {!isLogged && (
        <Button variant="outlined" color="secondary" size="small">
          Sign in
        </Button>
      )}
    </Toolbar>
  );
};

export default NormalNavbar;
