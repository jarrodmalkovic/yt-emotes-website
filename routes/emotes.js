const express = require('express');

const emotes = require('../controllers/emotes');
const channels = require('../controllers/channels');
const auth = require('../controllers/auth');

const router = express.Router();

router.get('/', emotes.getAllEmotes);

router.post('/', auth.checkAuth, emotes.submitEmote);

router.delete('/:emote/delete', auth.checkAuth, emotes.removeEmote);

router.post('/:emote/add', auth.checkAuth, emotes.addEmoteToUser);

router.post('/:emote/remove', auth.checkAuth, emotes.removeEmoteFromUser);

module.exports = router;
