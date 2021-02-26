import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Emotes.live</title>
      </Helmet>
      <Container maxWidth="md">
        <Box py={8} textAlign="center">
          <Typography variant="h3" component="h2" gutterBottom={true}>
            Emotes.live
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph={true}>
            Decentralized, secure, private. The PiperNet is on it's way to
            revolutionize every smartphone, PC, and smart-fridge near you.
          </Typography>
          <Box mt={4}>
            <Button
              component={Link}
              to="/downloads"
              variant="contained"
              color="primary"
            >
              Download Now
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
