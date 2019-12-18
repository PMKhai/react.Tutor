import React from 'react';
import { Avatar, Container, Card, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScrollBar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const useStyles = makeStyles({
  card: {
    maxHeight: 510,
    minHeight: 510,
  },
  list: {
    width: '100%',
    height: 70,
    display: 'flex',
    justifyContent: 'left',
  },
  avatar: { marginRight: 5 },
  content: { fontSize: 8, color: 'gray' },
  left: { textAlign: 'left' },
});

const Message = () => {
  const classes = useStyles();

  return (
    <Container>
      <Card>
        <Grid container className={classes.card}>
          <Grid item sm={4}>
            <ScrollBar component="div">
              <div>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
                <Button className={classes.list}>
                  <Avatar
                    src="https://scontent-sin2-2.xx.fbcdn.net/v/t1.0-9/s960x960/64587413_1161079827404829_7900354979624386560_o.jpg?_nc_cat=107&_nc_oc=AQmP31Qt58HdHJXJqhkBwjxUE3qUPUQchgvXB558uVyW5qwY4sydcGmH34K13HfCkAY&_nc_ht=scontent-sin2-2.xx&oh=5fddca592eb809dfb65ebe25c6b2190c&oe=5E7BB526"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <div className={classes.left}>
                    <div> Khải Phạm</div>
                    <div className={classes.content}> Content...</div>
                  </div>
                </Button>
              </div>
            </ScrollBar>
          </Grid>
          <Grid item sm={8}>
            content
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Message;
