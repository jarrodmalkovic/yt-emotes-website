import React, { Fragment } from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

function DownloadPage() {
  return (
    <Fragment>
      <Helmet>
        <title>Download | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Download</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Download</Typography>
      <Typography variant="h5">Chrome</Typography>
      <Typography>Coming soon...</Typography>
      <br />
      <Typography variant="h5">Firefox</Typography>
      <Typography>Coming soon...</Typography>
      <br />
      <Typography variant="h5">Safari</Typography>
      <Typography>Coming soon...</Typography>
    </Fragment>
  );
}

export default DownloadPage;
