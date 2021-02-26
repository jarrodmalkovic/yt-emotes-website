import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    margin: 0,
  },
}));

const PageNotFound = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Page Not Found | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        <Typography color="textPrimary">Contact</Typography>
      </Breadcrumbs>
      <Container className={classes.container}>
        <Box pb={10}>
          <Typography variant="h1">404</Typography>
          <Typography variant="h4" component="h2" gutterBottom={true}>
            Naaah, page not found...
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            The requested page couldn't be located. Checkout for any URL
            misspelling.
          </Typography>
          <Box mt={4}>
            <Button
              variant="contained"
              to="/"
              component={RouterLink}
              color="primary"
            >
              Return to the homepage
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PageNotFound;
