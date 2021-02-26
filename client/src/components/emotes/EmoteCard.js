import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StyledLink from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';

import {
  addEmoteToChannel,
  removeEmoteFromChannel,
  deleteEmoteFromDatabase,
} from '../../actions/emotes';

const useStyles = makeStyles({
  root: {
    margin: 6,
    display: 'inline-block',
  },
  media: {
    padding: 80,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  text: {
    textAlign: 'center',
  },
  img: {
    margin: 'auto 0',
  },
});

function EmoteCard({
  emote,
  addEmoteToChannel,
  deleteEmoteFromDatabase,
  contains,
  isAuthenticated,
  removeEmoteFromChannel,
  userId,
}) {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleAddToChannel = () => {
    addEmoteToChannel(emote._id);
    setOpen(false);
  };

  const handleRemoveFromChannel = () => {
    removeEmoteFromChannel(emote._id);
    setOpen(false);
  };

  const handleDeleteFromDatabase = () => {
    deleteEmoteFromDatabase(emote._id);
    setOpen(false);
  };

  const handleVisitProfile = () => {
    history.push(`/users/${emote.uploadedBy.userId}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Card onClick={handleClickOpen} className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={emote.largeImgUrl}
            title="Emote"
          />
          <CardContent>
            <Typography className={classes.text}>{emote.emoteName}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {!isAuthenticated && (
            <Typography variant="h6">Not logged in</Typography>
          )}
          {isAuthenticated && !contains && (
            <Typography variant="h6">
              Add "{emote.emoteName}" to your channel?
            </Typography>
          )}
          {isAuthenticated && contains && (
            <Typography variant="h6">
              Remove "{emote.emoteName}" from your channel?
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {!isAuthenticated && (
            <Typography paragraph>
              You must be logged in to add "{emote.emoteName}" to your channel
            </Typography>
          )}
          {isAuthenticated && !contains && (
            <Typography paragraph>
              Adding this emote will allow your viewers with the BetterYT
              Extention installed to see "{emote.emoteName}" in your YouTube
              channels comments section and livestream chat.
            </Typography>
          )}
          {isAuthenticated && contains && (
            <Typography paragraph>
              Removing this emote means that "{emote.emoteName}" will no longer
              be able to used in your YouTube Channels comment section and
              livestream chat
            </Typography>
          )}
          {isAuthenticated && userId !== emote.uploadedBy._id && (
            <Typography>
              Submitted by{' '}
              <StyledLink component={Link} onClick={handleVisitProfile}>
                {emote.uploadedBy.name}
              </StyledLink>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            component={Link}
            to={`/emotes/${emote._id}/report`}
            color="primary"
            autoFocus
          >
            Report Emote
          </Button>
          {isAuthenticated && !contains && (
            <Button onClick={handleAddToChannel} color="primary" autoFocus>
              Yes, add to my channel
            </Button>
          )}
          {isAuthenticated && contains && (
            <Button onClick={handleRemoveFromChannel} color="primary" autoFocus>
              Yes, remove from my channel
            </Button>
          )}
          {!isAuthenticated && (
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          )}
        </DialogActions>{' '}
        {isAuthenticated && userId === emote.uploadedBy._id && (
          <Fragment>
            <DialogContent>
              <Typography variant="h6">
                Delete "{emote.emoteName}" from YTEmotes.com?
              </Typography>
              <Typography>
                Deleting this emote means it will be removed from the YTEmotes
                website and removed from every channel it is currently active
                in. <strong>This cannot be undone.</strong>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeleteFromDatabase}
                color="secondary"
                autofocus
              >
                Yes, Delete from YTEmotes
              </Button>
            </DialogActions>
          </Fragment>
        )}
      </Dialog>
    </Fragment>
  );
}

export default connect(null, {
  addEmoteToChannel,
  deleteEmoteFromDatabase,
  removeEmoteFromChannel,
})(EmoteCard);
