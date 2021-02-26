import React, { Fragment } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';

const DrawerList = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          exact={true}
          to="/"
          key="Home"
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          to="/about"
          key="About"
        >
          <ListItemText primary="About" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          to="/browse"
          key="Rainbow Text"
        >
          <ListItemText primary="Browse Emotes" />
        </ListItem>
        {isAuthenticated && (
          <Fragment>
            <ListItem
              button
              component={NavLink}
              activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
              to="/submit"
              key="Rainbow Text"
            >
              <ListItemText primary="Submit an Emote" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
              to="/submissions"
              key="Submissions"
            >
              <ListItemText primary="Your Emote  Submissions" />
            </ListItem>
            <ListItem
              button
              component={NavLink}
              activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
              to="/emotes"
              key="Channels Emotes"
            >
              <ListItemText primary="Your Channels Emotes" />
            </ListItem>
          </Fragment>
        )}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={NavLink}
          to="/downloads"
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          key="Download Extension"
        >
          <ListItemText primary="Download Extension" />
        </ListItem>
        <ListItem
          button
          component={NavLink}
          to="/contact"
          activeStyle={{ backgroundColor: '#e4e4e4', color: 'black' }}
          key="Contact Us"
        >
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(DrawerList);
