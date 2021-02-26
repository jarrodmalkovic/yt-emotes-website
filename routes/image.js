const express = require('express');
const multer = require('multer');

const image = require('../controllers/image');

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), image.uploadImage);

module.exports = router;
