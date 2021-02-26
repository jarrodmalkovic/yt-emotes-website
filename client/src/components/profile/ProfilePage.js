import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getProfile, clearProfile } from '../../actions/profile';
import EmoteCard from '../emotes/EmoteCard';

const useStyles = makeStyles((theme) => ({
  centeredDiv: {
    textAlign: 'center',
  },
}));

function ProfilePage({
  getProfile,
  isAuthenticated,
  clearProfile,
  match,
  name,
  loading,
  userChannelEmotes,
  profileChannelEmotes,
  _id,
  profileUploadedEmotes,
}) {
  const classes = useStyles();

  useEffect(() => {
    getProfile(match.params.userId);

    return () => {
      clearProfile();
    };
  }, [match.params.userId, clearProfile, getProfile]);

  return loading ? (
    <div className={classes.centeredDiv}>
      <CircularProgress color="secondary" />
    </div>
  ) : (
    <>
      <Helmet>
        <title>{name} Profile | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">{name}</Typography>
      </Breadcrumbs>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5">Emote Submissions</Typography>
      {!loading && profileUploadedEmotes.length !== 0 ? (
        <div className={classes.centeredDiv}>
          {profileUploadedEmotes.map((emote, index) => (
            <EmoteCard
              key={index}
              emote={emote}
              isAuthenticated={isAuthenticated}
              contains={
                userChannelEmotes.filter((e) => e.emoteName === emote.emoteName)
                  .length > 0
              }
              userId={_id}
            />
          ))}
        </div>
      ) : (
        <div>
          <Typography>{name} has no emote submissions</Typography>
        </div>
      )}
      <br />
      <Typography variant="h5">Channel Emotes</Typography>
      {!loading && profileChannelEmotes.length !== 0 ? (
        <div className={classes.centeredDiv}>
          {profileChannelEmotes.map((emote, index) => (
            <EmoteCard
              key={index}
              emote={emote}
              isAuthenticated={isAuthenticated}
              contains={
                userChannelEmotes.filter((e) => e.emoteName === emote.emoteName)
                  .length > 0
              }
              userId={_id}
            />
          ))}
        </div>
      ) : (
        <div>
          <Typography>{name} has added no emotes to there channel</Typography>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  name: state.profile.name,
  profileUploadedEmotes: state.profile.uploadedEmotes,
  profileChannelEmotes: state.profile.channelEmotes,
  userChannelEmotes: state.user.channelEmotes,
  isAuthenticated: state.user.isAuthenticated,
  _id: state.user._id,
  loading: state.profile.loading,
});

export default connect(mapStateToProps, { getProfile, clearProfile })(
  ProfilePage
);
