import React, { useState } from 'react';
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
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

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
});

const list = [
  {
    name: 'Khải Phạm',
    content: 'Content...',
    avatar:
      'https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526',
  },
  {
    name: 'Khải Phạm',
    content: 'Content...',
    avatar:
      'https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526',
  },
  {
    name: 'Khải Phạm',
    content: 'Content...',
    avatar:
      'https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526',
  },
  {
    name: 'Khải Phạm',
    content: 'Content...',
    avatar:
      'https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526',
  },
  {
    name: 'Khải Phạm',
    content: 'Content...',
    avatar:
      'https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526',
  },
];

const Message = () => {
  const classes = useStyles();
  const initial = Array(list.length).fill(false);
  initial[0] = true;
  const [isActive, setIsActive] = useState(initial);

  const handleClick = (index, email) => {
    const temp = Array(list.length).fill(false);
    temp[index] = true;
    setIsActive(temp);
  };

  return (
    <Container>
      <Card>
        <Grid container className={classes.card}>
          <Grid item sm={4}>
            <ScrollBar component="div">
              <div className={classes.card}>
                {list.map((item, index) => (
                  <Button
                    className={
                      isActive[index] ? classes.active : classes.itemsInList
                    }
                    onClick={() => handleClick(index, item.email)}
                    key={index}
                  >
                    <Avatar
                      src={item.avatar}
                      alt="avatar"
                      className={classes.avatar}
                    />
                    <div className={classes.textLeft}>
                      <div> {item.name}</div>
                      <div className={classes.content}> {item.content}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollBar>
          </Grid>
          <Grid item sm={8}>
            <ScrollBar component="div" className={classes.displayMessage}>
              <div className={classes.displayMessage}>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.rightChip}>
                  <Chip
                    label="Khải đẹp chai quá đi Khải đẹp chai quá đi Khải đẹp chai quá đi "
                    color="primary"
                  />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
                <div className={classes.leftChip}>
                  <Chip label="sss" />
                </div>
              </div>
            </ScrollBar>
            <div>
              <form>
                <InputBase
                  inputProps={{ 'aria-label': 'naked' }}
                  placeholder="Type a message"
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
