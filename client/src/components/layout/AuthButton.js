import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { connect } from 'react-redux';
import { getCookieConsentValue } from 'react-cookie-consent';

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 9999,
  },
  circleButton: {
    marginRight: theme.spacing(1),
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function AuthButton({ isAuthenticated, profilePic, userId }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleLogInClick = () => {
    if (!getCookieConsentValue('cookiesAllowed'))
      return alert('You must first allow cookies before logging in');

    window.open('http://localhost:5000/api/auth/youtube', '_self');
  };

  const handleLogOutClick = () => {
    window.open('http://localhost:5000/api/auth/logout', '_self');
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <Fragment>
      {isAuthenticated && (
        <Fragment>
          <div>
            <IconButton
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar src={profilePic}></Avatar>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper className={classes.paper}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleLogOutClick}>
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </IconButton>
          </div>
        </Fragment>
      )}

      {!isAuthenticated && (
        <div>
          <Button onClick={handleLogInClick} color="inherit">
            Log In
          </Button>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  loading: state.user.loading,
  userId: state.user.userId,
  profilePic: state.user.profilePic,
});

export default connect(mapStateToProps)(AuthButton);
