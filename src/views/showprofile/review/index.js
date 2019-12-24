import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagination from 'material-ui-flat-pagination';

const theme = createMuiTheme();

const Review = (props) => {
  const { reviews } = props;
  const [offset, setOffset] = useState(0);

  const handleClick = (offset) => {
    setOffset(offset);
  };

  return (
    <div>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography component="div">
                  <Rating name="read-only" value={2} readOnly />
                </Typography>
                I'll be in your neighborhood doing errands this…
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '5' }}
      >
        <MuiThemeProvider theme={theme}>
          <Pagination
            limit={1}
            offset={offset}
            total={1}
            onClick={(e, offset) => handleClick(offset)}
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

export default Review;
