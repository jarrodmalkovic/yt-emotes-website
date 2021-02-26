import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import StyledLink from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  rootBox: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
  copy: {
    textAlign: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <Container>
        <Box
          py={6}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          className={classes.rootBox}
        >
          <StyledLink to="#" variant="h5" color="inherit" underline="none">
            <img
              src="mui-assets/img/logo-pied-piper-grey.png"
              alt=""
              width="120"
            />
          </StyledLink>
          <Box component="nav" className={classes.footerNav}>
            <StyledLink
              to="/privacy"
              variant="body1"
              color="textSecondary"
              component={Link}
              className={classes.footerLink}
            >
              Privacy Policy
            </StyledLink>
            <StyledLink
              to="/guidelines"
              variant="body1"
              color="textSecondary"
              component={Link}
              className={classes.footerLink}
            >
              Emote Guidelines
            </StyledLink>
            <StyledLink
              to="/tos"
              variant="body1"
              color="textSecondary"
              component={Link}
              className={classes.footerLink}
            >
              Terms of Service
            </StyledLink>
            <StyledLink
              to="/contact"
              variant="body1"
              color="textSecondary"
              component={Link}
              className={classes.footerLink}
            >
              Contact
            </StyledLink>
          </Box>
          <Typography
            color="textSecondary"
            component="p"
            variant="body2"
            gutterBottom={false}
            className={classes.copy}
          >
            © 2020 Pied Piper. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </footer>
  );
}
