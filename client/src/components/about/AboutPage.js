import React from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About | Emotes.live </title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">About</Typography>
      </Breadcrumbs>
      <Typography variant="h4">About</Typography>
      <Typography variant="h5">Page Coming Soon</Typography>
    </>
  );
}

export default AboutPage;
