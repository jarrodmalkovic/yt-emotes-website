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

function ChannelEmotesPage({
  emotes,
  loading,
  isAuthenticated,
  _id,
  channelId,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <Helmet>
        <title>Your Channel Emotes | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Your Channels Emotes</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Your Channels Emotes</Typography>
      <div className={classes.centeredDiv}>
        {isAuthenticated &&
          !loading &&
          emotes.map((emote, index) => (
            <EmoteCard
              key={index}
              emote={emote}
              channelId={channelId}
              isAuthenticated={isAuthenticated}
              contains={true}
              userId={_id}
            />
          ))}
      </div>
      {isAuthenticated && emotes.length === 0 && (
        <div>
          <Typography>
            You have no emotes that are currently active in your channel
          </Typography>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  loading: state.user.loading,
  emotes: state.user.channelEmotes,
  _id: state.user._id,
  name: state.user.name,
  channelId: state.user.userId,
});

export default connect(mapStateToProps)(ChannelEmotesPage);
