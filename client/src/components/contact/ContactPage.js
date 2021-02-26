import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Typography } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';

import { sendFeedback } from '../../actions/feedback';

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
  container: {
    padding: 0,
    margin: 0,
    width: '100%',
  },
}));

function ContactPage({ sendFeedback }) {
  const classes = useStyles();
  const [tos, setTos] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    message: '',
    email: '',
  });

  const { firstName, lastName, message, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    sendFeedback(firstName, lastName, message, email, 'contact', tos);
  };

  return (
    <>
      <Helmet>
        <title>Contact | Emotes.live</title>
      </Helmet>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        <Typography color="textPrimary">Contact</Typography>
      </Breadcrumbs>
      <Typography variant="h4">Contact</Typography>
      <div className={classes.container}>
        <Box pt={2} pb={10}>
          <Box>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={firstName}
                    onChange={onChange}
                    variant="outlined"
                    required
                    fullWidth
                    autoComplete="fname"
                    name="firstName"
                    id="firstName"
                    label="First name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={lastName}
                    onChange={onChange}
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    id="lastName"
                    label="Last name"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={email}
                    onChange={onChange}
                    variant="outlined"
                    required
                    fullWidth
                    name="email"
                    id="email"
                    label="Email address"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={message}
                    onChange={onChange}
                    variant="outlined"
                    required
                    multiline
                    rows={10}
                    fullWidth
                    autoComplete="message"
                    name="message"
                    id="message"
                    label="Message"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="terms"
                        value={tos}
                        onChange={() => setTos(!tos)}
                        color="primary"
                      />
                    }
                    label="I agree to the terms of use and privacy policy."
                  />
                </Grid>
              </Grid>
              <Box my={2}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default connect(null, { sendFeedback })(ContactPage);
