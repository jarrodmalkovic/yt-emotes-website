import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getEmotes, clearEmotes } from '../../actions/emotes';
import EmoteCard from './EmoteCard';

import 'query-string';

const useStyles = makeStyles((theme) => ({
  centeredDiv: {
    textAlign: 'center',
  },
}));

function BrowseEmotesPage({
  getEmotes,
  clearEmotes,
  emotes,
  loading,
  channelEmotes,
  channelId,
  isAuthenticated,
  _id,
  location,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [limit] = useState(50);

  async function getNextData(usePage = page) {
    !location.search
      ? await getEmotes('?', usePage, limit)
      : await getEmotes(location.search, usePage, limit);

    setPage(usePage + 1);
  }

  useEffect(() => {
    if (emotes.length) {
      clearEmotes();
    }

    setPage(1);
    getNextData(1);
    // eslint-disable-next-line
  }, [location.search]);

  return (
    <Fragment>
      <Helmet>
        <title>Browse Emotes | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Browse Emotes</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Browse Emotes</Typography>
      <Typography variant="h5">
        {location.search
          ? `Showing all results for "${location.search.split('=')[1]}"`
          : 'Browsing all emotes'}
      </Typography>
      <div className={classes.centeredDiv}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : emotes.length ? (
          <InfiniteScroll
            dataLength={emotes.length}
            next={getNextData}
            hasMore={emotes.length % limit === 0}
            loader={<CircularProgress color="secondary" />}
          >
            {emotes.map((emote, index) => (
              <EmoteCard
                key={index}
                emote={emote}
                channelId={channelId}
                isAuthenticated={isAuthenticated}
                contains={
                  channelEmotes.filter((e) => e.emoteName === emote.emoteName)
                    .length > 0
                }
                userId={_id}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <Typography variant="h6">No emotes found</Typography>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  emotes: state.emotes.emotes,
  loading: state.emotes.loading,
  _id: state.user._id,
  name: state.user.name,
  channelEmotes: state.user.channelEmotes,
  isAuthenticated: state.user.isAuthenticated,
  channelId: state.user.userId,
});

export default connect(mapStateToProps, { getEmotes, clearEmotes })(
  BrowseEmotesPage
);
