import React, { Fragment } from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

function TermsOfServicePage() {
  return (
    <Fragment>
      <Helmet>
        <title>Terms of Service</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Terms of Service</Typography>
      </Breadcrumbs>
      <h2>
        <strong>Terms and Conditions</strong>
      </h2>
    </Fragment>
  );
}

export default TermsOfServicePage;
