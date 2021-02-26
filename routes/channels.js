const express = require('express');
const channels = require('../controllers/channels');

const router = express.Router();

router.get('/:userId', channels.getProfile);

router.get('/:userId/channelEmotes', channels.getUserChannelEmotes);

router.get('/:userId/submittedEmotes', channels.getUserSubmittedEmotes);

module.exports = router;
