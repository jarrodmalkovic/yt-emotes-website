const passport = require('passport');
const YoutubeV3Strategy = require('passport-youtube-v3').Strategy;

const User = require('../models/user');

require('dotenv').config({ path: './config.env' });
require('../models/emotes');

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .populate({
      path: 'uploadedEmotes channelEmotes',
      populate: {
        path: 'uploadedBy',
      },
    })
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      console.log('Error deserializing');
      done(new Error('Failed to deserialize an user'));
    });
});

passport.use(
  new YoutubeV3Strategy(
    {
      clientID: process.env.YOUTUBE_APP_ID,
      clientSecret: process.env.YOUTUBE_APP_SECRET,
      callbackURL: 'http://localhost:5000/api/auth/youtube/redirect',
      scope: ['https://www.googleapis.com/auth/youtube.readonly'],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('Finding user');

      User.findOne({
        userId: profile.id,
      }).exec(function (err, user) {
        if (!profile.id) {
          return done(
            new Error(
              'There is no YouTube account associated with that Google account'
            )
          );
        }

        if (err) {
          return done(err);
        }

        if (!user) {
          user = new User({
            name: profile.displayName,
            userId: profile.id,
            profilePic: profile._json.items[0].snippet.thumbnails.default.url, // profile picture
            provider: 'youtube',
          });
          user.save(function (err) {
            if (err) console.log(err);
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  )
);
