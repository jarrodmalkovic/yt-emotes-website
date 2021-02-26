const express = require('express');

const feedback = require('../controllers/feedback');

const router = express.Router();

router.post('/', feedback.createFeedback);

module.exports = router;
