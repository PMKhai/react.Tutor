import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { API, GETME } from '../../../config';
import 'antd/dist/antd.css';

const apiGetMe = `${API}${GETME}`;

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

const NormalNavbar = (props) => {
  const classes = useStyles();
  let prof = null;
  let [profileUser, setProfileUser] = useState(null);
  let isLogged = false;
  const menu = (profileUser) => (
    <Menu>
      <Menu.Item>
        <h3>Hi, {profileUser.name}</h3>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/signin">Logout</Link>
      </Menu.Item>
    </Menu>
  );
  const fetchApiUserInfo = async () => {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const Authorization = `Bearer ${token}`;
        const res = await axios.get(apiGetMe, {
          headers: { Authorization },
        });
        if (res.data.returncode === 1) {
          // eslint-disable-next-line no-undef
          // setIsLogged(true);
          setProfileUser(res.data.user);
          // prof = res.data.user;
          // console.log("sdsd",prof);
          // return prof;
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    fetchApiUserInfo(profileUser);
  }, profileUser);

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
      {profileUser && (
        <Dropdown overlay={menu(profileUser)}>
          <a className="ant-dropdown-link" href="##">
            <Avatar src={profileUser.urlAvatar} alt="avatar" />
          </a>
        </Dropdown>
      )}
      {!profileUser && (
        <Button
          variant="outlined"
          size="small"
          className={classes.customButton}
        >
          Sign up
        </Button>
      )}
      {!profileUser && (
        <Button variant="outlined" color="secondary" size="small">
          Sign in
        </Button>
      )}
    </Toolbar>
  );
};

export default NormalNavbar;
