import React, { Fragment } from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

function EmoteGuidelinesPage() {
  return (
    <Fragment>
      <Helmet>
        <title>Emote Guidelines | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Emote Guidelines</Typography>
      </Breadcrumbs>
      <h2>Emote Guidelines</h2>
    </Fragment>
  );
}

export default EmoteGuidelinesPage;
