import React, { Fragment } from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

function PrivacyPolicyPage() {
  return (
    <Fragment>
      <Helmet>
        <title>Privacy Policy | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Privacy Policy</Typography>
      </Breadcrumbs>
      <h2>Privacy Policy</h2>
    </Fragment>
  );
}

export default PrivacyPolicyPage;
