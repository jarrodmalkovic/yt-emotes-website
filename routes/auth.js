const express = require('express');
const passport = require('passport');
const auth = require('../controllers/auth');

const router = express.Router();

router.get('/login/success', auth.loginSuccess);

router.get('/login/failed', auth.loginFailure);

router.get('/logout', auth.logout);

router.get('/youtube', passport.authenticate('youtube'));

router.get(
  '/youtube/redirect',
  passport.authenticate('youtube', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000',
  })
);

module.exports = router;
