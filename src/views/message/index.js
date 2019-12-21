import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Container,
  Card,
  Grid,
  Button,
  InputBase,
  Chip,
} from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { API, ALLMESSAGES } from '../../config';

const api = `${API}${ALLMESSAGES}`;

const useStyles = makeStyles({
  card: {
    maxHeight: 510,
    minHeight: 510,
  },
  itemsInList: {
    width: '100%',
    height: 70,
    display: 'flex',
    justifyContent: 'left',
    textTransform: 'none',
  },
  avatar: { marginRight: 5 },
  content: { fontSize: 10, color: 'gray' },
  textLeft: { textAlign: 'left' },
  inputForm: {
    width: '90%',
    paddingLeft: 5,
  },
  buttonForm: {
    width: '10%',
  },
  displayMessage: {
    minHeight: 470,
    maxHeight: 470,
  },
  leftChip: {
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  rightChip: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  active: {
    width: '100%',
    height: 70,
    display: 'flex',
    justifyContent: 'left',
    textTransform: 'none',
    background: '#d9dee2',
  },
  divider: {
    borderRightStyle: 'groove',
  },
});

const Message = () => {
  const classes = useStyles();
  // const initial = Array(list.length).fill(false);
  // initial[0] = true;
  const [isActive, setIsActive] = useState([]);
  const [isMe, setIsMe] = useState('');
  const [contactList, setContactList] = useState([]);
  const [displayMessage, setDisplayMessage] = useState({});

  // eslint-disable-next-line no-undef
  const token = JSON.parse(localStorage.getItem('token'));

  const fetchMessages = async () => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.get(api, {
        headers: { Authorization },
      });
      const { returnCode } = res.data;
      if (returnCode === 1) {
        const { email, contactList } = res.data.payload;
        const initial = Array(contactList.length).fill(false);
        initial[0] = true;
        setIsActive(initial);
        setContactList(contactList);
        setIsMe(email);
        setDisplayMessage(contactList[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleClick = (index, email) => {
    const temp = Array(contactList.length).fill(false);
    temp[index] = true;
    setIsActive(temp);
    setDisplayMessage(contactList[index]);
  };

  return (
    <Container>
      <Card>
        <Grid container className={classes.card}>
          <Grid item sm={4} className={classes.divider}>
            <ScrollBar component="div">
              <div className={classes.card}>
                {contactList.map((item, index) => (
                  <Button
                    className={
                      isActive[index] ? classes.active : classes.itemsInList
                    }
                    onClick={() => handleClick(index, item.email)}
                    key={index}
                  >
                    <Avatar
                      src={item.contact.avatar}
                      alt="avatar"
                      className={classes.avatar}
                    />
                    <div className={classes.textLeft}>
                      <div> {item.contact.name}</div>
                      <div className={classes.content}>
                        {' '}
                        {item.contact.content}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollBar>
          </Grid>
          <Grid item sm={8}>
            <ScrollBar component="div" className={classes.displayMessage}>
              <div className={classes.displayMessage}>
                {/* <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div> */}
                {!!displayMessage.messages &&
                  displayMessage.messages.map((item, index) => {
                    return item.owner === isMe ? (
                      <div className={classes.rightChip} key={index}>
                        <Chip label={item.message} color="primary" />
                      </div>
                    ) : (
                      <div className={classes.leftChip} key={index}>
                        <Chip label={item.message} />
                      </div>
                    );
                  })}
              </div>
            </ScrollBar>
            <div>
              <form>
                <InputBase
                  inputProps={{ 'aria-label': 'naked' }}
                  placeholder="Type a message..."
                  className={classes.inputForm}
                />
                <Button type="submit" className={classes.buttonForm}>
                  <Send color="primary" />
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Message;
