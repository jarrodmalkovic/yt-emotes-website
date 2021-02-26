import React, { useCallback, useState, Fragment, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useHistory } from 'react-router-dom';

import { submitEmote } from '../../actions/emotes';

const useStyles = makeStyles((theme) => ({
  formgroup: {
    paddingBottom: theme.spacing(3),
  },
  text: {
    textalign: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
  },
}));

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '60px',
  margin: '2px 0',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function SubmitEmotePage({ submitEmote, userId }) {
  const classes = useStyles();
  const history = useHistory();
  const [picture, setPicture] = useState({});
  const [verified, setVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    tos: false,
    guidelines: false,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await submitEmote(picture, name, desc, tos, guidelines, verified, history);
    setSubmitting(false);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) {
      if (
        acceptedFiles[0]['type'] === 'image/gif' ||
        acceptedFiles[0]['type'] === 'image/png'
      ) {
        acceptedFiles[0]['preview'] = URL.createObjectURL(acceptedFiles[0]);
        setPicture(acceptedFiles[0]);
      }
    }
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const verifyCallback = (e) => {
    setVerified(true);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ['image/png', 'image/gif'],
  });

  const thumbs = picture.path ? (
    <p key={picture.path}>
      {picture.path} - {picture.size} bytes
    </p>
  ) : (
    ''
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const { name, desc, tos, guidelines } = formData;

  return (
    <Fragment>
      <Helmet>
        <title>Submit an Emote | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Submit an Emote</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Submit an Emote</Typography>
      <form onSubmit={onSubmit}>
        <div className={classes.formgroup}>
          <Typography variant="h5">Emote Name</Typography>
          <TextField
            id="outlined-basic"
            label="e.g. EZ"
            className={classes.input}
            name="name"
            required={true}
            value={name}
            onChange={onChange}
            variant="outlined"
          />
        </div>
        <div className={classes.formgroup}>
          <Typography variant="h5">Short Description of Emote</Typography>
          <TextField
            id="outlined-basic"
            label="e.g. This emote is a GIF of..."
            className={classes.input}
            name="desc"
            rows={7}
            multiline
            value={desc}
            required={true}
            onChange={onChange}
            variant="outlined"
          />
        </div>
        <div className={classes.formgroup}>
          <Typography variant="h5">Upload Emote Image</Typography>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag 'n' drop your emote here, or click here to select your
                emote. Must be a .PNG or .GIF
              </p>
            )}
          </div>
          <p>
            Emotes must be of size 112x112, lower than 1mb in size and either a
            .PNG or .GIF
          </p>
          <aside className={classes.thumbsContainer}>{thumbs}</aside>{' '}
        </div>
        <div className={classes.formgroup}>
          <FormControlLabel
            control={
              <Checkbox
                name="tos"
                checked={tos}
                onClick={() => {
                  setFormData({ ...formData, tos: !tos });
                }}
              />
            }
            label="I agree to the Terms Of Service and Privacy Policy"
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                name="guidelines"
                checked={guidelines}
                onClick={() => {
                  setFormData({ ...formData, guidelines: !guidelines });
                }}
              />
            }
            label="I agree to the Emote Guidelines"
          />
          <ReCAPTCHA
            name="verified"
            sitekey="6Lcck9cUAAAAAIuHfUVETNVzklfJ6QkJ69V5tor0"
            onChange={verifyCallback}
          />
        </div>
        <div className={classes.buttongroup}>
          <Button type="submit" variant="contained" color="primary">
            {submitting ? 'Submitting...' : 'Submit your emote'}
          </Button>
        </div>
      </form>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  userId: state.user._id,
});

export default connect(mapStateToProps, { submitEmote })(SubmitEmotePage);
