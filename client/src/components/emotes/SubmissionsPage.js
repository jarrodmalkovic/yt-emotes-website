import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import EmoteCard from './EmoteCard';

const useStyles = makeStyles({
  centeredDiv: {
    textAlign: 'center',
  },
});

function SubmissionsPage({
  isAuthenticated,
  emotes,
  _id,
  channelEmotes,
  channelId,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <Helmet>
        <title>Your Emote Submissions | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Your Emote Submissions</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Your Emote Submissions</Typography>
      <div className={classes.centeredDiv}>
        {emotes.map((emote, index) => (
          <EmoteCard
            key={index}
            emote={emote}
            channelId={channelId}
            contains={
              channelEmotes.filter((e) => e.emoteName === emote.emoteName)
                .length > 0
            }
            isAuthenticated={isAuthenticated}
            userId={_id}
          />
        ))}
      </div>
      {isAuthenticated && emotes.length === 0 && (
        <div>
          <Typography>You have uploaded no emotes</Typography>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  loading: state.user.loading,
  emotes: state.user.uploadedEmotes,
  _id: state.user._id,
  name: state.user.name,
  channelEmotes: state.user.channelEmotes,
  channelId: state.user.userId,
});

export default connect(mapStateToProps)(SubmissionsPage);
